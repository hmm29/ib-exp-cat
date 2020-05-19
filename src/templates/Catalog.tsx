import * as React from 'react'
import { PropsWithChildren, useState } from 'react'
import { CatalogServiceRow } from './CatalogServiceRow'
import { CatalogExpertRow } from './CatalogExpertRow'
import Fuse from 'fuse.js'

import 'ka-table/style.scss'
import '../styles/styles.scss'
import * as catalogStyles from './Catalog.module.scss'
import styled from 'styled-components'

import { connect } from 'react-redux'
import {
  updateCatalogModeInStateAction,
  updateExpertSearchTextInStateAction,
  updatePageIndexInStateAction,
  updateSearchResultCountInStateAction,
} from '../state/actions'

import { ITableProps, kaReducer, Table } from 'ka-table'
import { search, updatePageIndex } from 'ka-table/actionCreators'
import { searchData } from 'ka-table/Utils/FilterUtils'
import { DataType, SortDirection, SortingMode } from 'ka-table/enums'
import { DataRowFuncPropsWithChildren, DispatchFunc } from 'ka-table/types'

const PAGE_SIZE: number = 8

const ExpertsTableWrapper = styled.div`
  .ka-paging-pages {
    & > .ka-paging-page-index {
      display: none;
    }

    ${props =>
      props.pageCount &&
      `& > div:nth-child(-n+${props.pageCount}) {
      display: block;
    }`};
  }
`

export interface ICatalogProps {
  catalogMode: string
  expertSearchText: string
  pageContext: { experts: any[]; services: any[] }
  pageIndex: number
  searchResultCount: number
  updateCatalogModeInState: Function
  updateExpertSearchTextInState: Function
  updatePageIndexInState: Function
  updateSearchResultCountInState: Function
}

const Catalog: React.FC<ICatalogProps> = ({
  catalogMode,
  expertSearchText,
  pageContext,
  pageIndex,
  searchResultCount,
  updateCatalogModeInState,
  updateExpertSearchTextInState,
  updatePageIndexInState,
  updateSearchResultCountInState,
}) => {
  const expertsTablePropsInit: ITableProps = {
    columns: [
      {
        dataType: DataType.String,
        key: 'First_Name',
        sortDirection: SortDirection.Ascend,
        style: { width: 60 },
        title: 'First Name',
      },
      {
        dataType: DataType.String,
        key: 'Headline',
        sortDirection: SortDirection.Ascend,
        style: { width: 60 },
        title: 'Headline',
      },
      {
        dataType: DataType.String,
        key: 'Undergraduate_Institution',
        sortDirection: SortDirection.Ascend,
        style: { width: 60 },
        title: 'Undergraduate School Name',
      },
      {
        dataType: DataType.String,
        key: 'Undergraduate_Degrees',
        sortDirection: SortDirection.Ascend,
        style: { width: 60 },
        title: 'Undergraduate Degrees',
      },
      {
        dataType: DataType.String,
        key: 'Graduate_Institution',
        sortDirection: SortDirection.Ascend,
        style: { width: 60 },
        title: 'Graduate School Name',
      },
      {
        dataType: DataType.String,
        key: 'Graduate_Degrees',
        sortDirection: SortDirection.Ascend,
        style: { width: 60 },
        title: 'Graduate Degrees',
      },
      {
        dataType: DataType.String,
        key: 'Languages',
        sortDirection: SortDirection.Ascend,
        style: { width: 60 },
        title: 'Languages',
      },
      {
        dataType: DataType.String,
        key: 'Services_Text',
        sortDirection: SortDirection.Ascend,
        style: { width: 60 },
        title: 'Services',
      },
    ],
    data: pageContext.experts,
    dataRow: props => <DataRow {...props} />,
    noDataRow: () => '0 results - please try another search',
    rowKeyField: 'id',
    sortingMode: SortingMode.Single,
    paging: {
      enabled: true,
      pageIndex,
      pageSize: PAGE_SIZE,
    },
    search: expertSearchText,
  }

  const servicesTablePropsInit: ITableProps = {
    columns: [
      {
        dataType: DataType.String,
        key: 'Name',
        sortDirection: SortDirection.Ascend,
        style: { width: 60 },
        title: 'Service Name',
      },
    ],
    data: pageContext.services,
    dataRow: props => <DataRowServices {...props} />,
    noDataRow: () => '0 results - please try another search',
    rowKeyField: 'id',
    sortingMode: SortingMode.Single,
  }

  // HOOKS

  // PRO TIP: don't actually fuck with these hooks outside of the dispatch func
  const [expertsViewTableProps, changeExpertsViewTableProps] = useState(
    expertsTablePropsInit,
  )

  const [servicesViewTableProps, changeServicesViewTableProps] = useState(
    servicesTablePropsInit,
  )

  const [searchResultCounter, changeSearchResultCounter] = useState(
    searchResultCount > 0 ? searchResultCount : pageContext.experts.length,
  )

  updatePageIndexInState(expertsViewTableProps.paging.pageIndex) // Important: save global here when table props update
  // save search result count here too
  updateSearchResultCountInState(searchResultCounter)

  const dispatch: DispatchFunc = action => {
    changeExpertsViewTableProps((prevState: ITableProps) =>
      kaReducer(prevState, action),
    )

    // top of next page of results
    window.scrollTo(0, 0)
  }

  const servicesDispatch: DispatchFunc = action => {
    changeServicesViewTableProps((prevState: ITableProps) =>
      kaReducer(prevState, action),
    )
  }

  const DataRow: React.FC<DataRowFuncPropsWithChildren> = ({ rowData }, i) => {
    return <CatalogExpertRow key={i} rowData={rowData} />
  }

  const DataRowServices: React.FC<DataRowFuncPropsWithChildren> = (
    { rowData },
    i,
  ) => {
    return (
      <CatalogServiceRow
        key={i}
        updateCatalogModeInState={updateCatalogModeInState}
        updateExpertSearchTextInState={updateExpertSearchTextInState}
        dispatch={value => {
          dispatch(search(value))
          const servicesPageResults = searchData(
            expertsViewTableProps.columns,
            expertsViewTableProps.data,
            value,
          )
          changeSearchResultCounter(servicesPageResults.length)
        }}
        rowData={rowData}
      />
    )
  }

  const fuse = new Fuse(expertsViewTableProps.data, {
    keys: [
      'First_Name',
      'Headline',
      'Undergraduate_Institution',
      'Undergraduate_Degrees',
      'Graduate_Institution',
      'Graduate_Degrees',
      'Languages',
      'Services_Text',
    ],
  })

  const expertsView = (
    <>
      <div className={catalogStyles.title}>
        <h2>IvyBridge - Your Verified Experts</h2>
      </div>
      <button
        onClick={() => {
          updateCatalogModeInState('services')
          dispatch(updatePageIndex(0)) // reset pagination
          updatePageIndexInState(0) // global state update
          changeSearchResultCounter(pageContext.experts.length) // clear search results
          window.scrollTo(0, 0) // back to top
        }}
        className={catalogStyles.switchModeButton}
      >
        View All Services ({pageContext.services.length})
      </button>
      <div className={catalogStyles.searchContainerWrapper}>
        <div className={catalogStyles.searchContainer}>
          <input
            type="search"
            defaultValue={expertsViewTableProps.search}
            placeholder="Search expert name, school, subject, or specialty..."
            onChange={event => {
              const value = event.currentTarget.value

              if (expertsViewTableProps.paging.pageIndex > 0) {
                dispatch(updatePageIndex(0)) // update locally in table to first page
                updatePageIndexInState(0) // update in global page index tracker
              }

              // this is to change the props / view
              dispatch(search(value)) // when you need to manipulate props, just use the dispatcher

              // this is to calculate data (util function)
              const results = searchData(
                expertsViewTableProps.columns,
                expertsViewTableProps.data,
                value,
              )

              const fuzzySearchResults = fuse
                .search(value)
                .map((e, i) => e.item)

              // the purpose of this if/else branch is to track search results from regular table search and fuzzy search
              // the search results count is also used to calculate the number of page numbers to show, depending on the search results
              if (results.length) {
                // regular case, pagination taken care of
                if (!value.length) {
                  // if clear search
                  changeSearchResultCounter(pageContext.experts.length) // reinitialize
                } else {
                  changeSearchResultCounter(results.length)
                } // this just counts so you know how many pages to show
                updateExpertSearchTextInState(value) // global state update
              } else if (!results.length && fuzzySearchResults.length) {
                // TODO: dispatch action that shows only rows from fuzzy search
                // don't fuck with data (dispatch(updateData) or changeExpertsViewTableProps)

                // just search for top one in fuzzySearchResults (best guess)
                dispatch(search(fuzzySearchResults[0].Headline))
                changeSearchResultCounter(1)
                updateExpertSearchTextInState(fuzzySearchResults[0].Headline) // save fuzzy-corrected headline
              }
            }}
            className="top-element"
          />
        </div>
      </div>
      <ExpertsTableWrapper
        pageCount={Math.ceil(searchResultCounter / PAGE_SIZE)}
      >
        <Table {...expertsViewTableProps} dispatch={dispatch} />
      </ExpertsTableWrapper>
    </>
  )

  const servicesView = (
    <>
      <div className={catalogStyles.title}>
        <h2>IvyBridge - Your Full Services Catalog</h2>
      </div>
      <button
        onClick={() => {
          updateCatalogModeInState('experts')
          window.scrollTo(0, 0) // back to top
        }}
        className={catalogStyles.switchModeButton}
      >
        View All Experts
      </button>
      <div className={catalogStyles.searchContainerWrapper}>
        <div className={catalogStyles.searchContainer}>
          <input
            type="search"
            defaultValue={servicesViewTableProps.search}
            placeholder="Search for an educational service..."
            onChange={event => {
              servicesDispatch(search(event.currentTarget.value))
            }}
            className="top-element"
          />
        </div>
        <button
          className={catalogStyles.customServiceButton}
          onClick={() =>
            window.open(
              `https://ivybridge.co/mod/page/view.php?id=27`,
              '_parent',
            )
          }
        >
          REQUEST A SERVICE
        </button>
      </div>
      <Table {...servicesViewTableProps} dispatch={servicesDispatch} />
    </>
  )

  return (
    <div className={catalogStyles.catalog}>
      {catalogMode === 'services' ? servicesView : null}
      {catalogMode === 'experts' ? expertsView : null}
    </div>
  )
}

const mapDispatchToProps = dispatch => {
  return {
    updateCatalogModeInState: catalogMode => {
      dispatch(updateCatalogModeInStateAction(catalogMode))
    },
    updateExpertSearchTextInState: expertSearchText => {
      dispatch(updateExpertSearchTextInStateAction(expertSearchText))
    },
    updatePageIndexInState: pageIndex => {
      dispatch(updatePageIndexInStateAction(pageIndex))
    },
    updateSearchResultCountInState: searchResultCount => {
      dispatch(updateSearchResultCountInStateAction(searchResultCount))
    },
  }
}

const mapStateToProps = state => {
  return {
    catalogMode: state.catalogMode,
    expertSearchText: state.expertSearchText,
    pageIndex: state.pageIndex,
    searchResultCount: state.searchResultCount,
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Catalog)
