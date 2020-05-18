import * as React from 'react'
import { PropsWithChildren, useState } from 'react'
import { CatalogServiceRow } from './CatalogServiceRow'
import { CatalogExpertRow } from './CatalogExpertRow'

import 'ka-table/style.scss'
import '../styles/styles.scss'
import * as catalogStyles from './Catalog.module.scss'

import { connect } from 'react-redux'
import {
  updateCatalogModeInStateAction,
  updateExpertSearchTextInStateAction,
  updatePageIndexInStateAction,
} from '../state/actions'

import { ITableProps, kaReducer, Table } from 'ka-table'
import { search, updatePageIndex } from 'ka-table/actionCreators'
import { DataType, SortDirection, SortingMode } from 'ka-table/enums'
import { DataRowFuncPropsWithChildren, DispatchFunc } from 'ka-table/types'

const dataArray: any[] = []
const PAGE_SIZE = 8

export interface ICatalogProps {
  catalogMode: string
  expertSearchText: string
  pageContext: { experts: any[]; services: any[] }
  pageIndex: number
  updateCatalogModeInState: Function
  updateExpertSearchTextInState: Function
  updatePageIndexInState: Function
}

const Catalog: React.FC<ICatalogProps> = ({
  catalogMode,
  expertSearchText,
  pageContext,
  pageIndex,
  updateCatalogModeInState,
  updateExpertSearchTextInState,
  updatePageIndexInState,
}) => {
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
        dispatch={(value) => dispatch(search(value))}
        rowData={rowData}
      />
    )
  }

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
        title: 'Description',
      },
      {
        dataType: DataType.String,
        key: 'Undergraduate_Institution',
        sortDirection: SortDirection.Ascend,
        style: { width: 60 },
        title: 'Undergrad School Name',
      },
      {
        dataType: DataType.String,
        key: 'Undergraduate_Degrees',
        sortDirection: SortDirection.Ascend,
        style: { width: 60 },
        title: 'Undergrad Degrees',
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
        key: 'Graduate_Institution',
        sortDirection: SortDirection.Ascend,
        style: { width: 60 },
        title: 'Grad School Name',
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
        key: 'Specialties_Text',
        sortDirection: SortDirection.Ascend,
        style: { width: 60 },
        title: 'Specialties',
      },
    ],
    data: pageContext.experts,
    dataRow: props => <DataRow {...props} />,
    noDataRow: () => 'No results on this page...',
    rowKeyField: 'id',
    sortingMode: SortingMode.Single,
    paging: {
      enabled: true,
      pageIndex,
      pageSize: PAGE_SIZE,
    }
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
    noDataRow: () => 'No results on this page...',
    rowKeyField: 'id',
    sortingMode: SortingMode.Single,
  }

  const [expertsViewTableProps, changeExpertsViewTableProps] = useState(
    expertsTablePropsInit,
  )
  const [servicesViewTableProps, changeServicesViewTableProps] = useState(
    servicesTablePropsInit,
  )

  updatePageIndexInState(pageIndex);

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

  const expertsView = (
    <>
      <div className={catalogStyles.title}>
        <h2>IvyBridge - Your Verified Experts</h2>
      </div>
      <button
        onClick={() => {
          updateCatalogModeInState('services')
          window.scrollTo(0, 0) // back to top
        }}
        className={catalogStyles.backToServices}
      >
        Back to Services
      </button>
      <div className={catalogStyles.searchContainerWrapper}>
        <div className={catalogStyles.searchContainer}>
          <input
            type="text"
            defaultValue={expertsViewTableProps.search}
            placeholder="Search expert name, school, subject, or specialty..."
            onChange={event => {
              if (expertsViewTableProps.paging.pageIndex > 0) {
                dispatch(updatePageIndex(0)) // update locally in table
                updatePageIndexInState(0) // update in global page index tracker
              }
              dispatch(search(event.currentTarget.value))

              console.log(expertsViewTableProps.data.length) // TODO: take count - divide by page size and using styld componnts remove pages with 0 results
            }}
            className="top-element"
          />
        </div>
      </div>
      <Table {...expertsViewTableProps} dispatch={dispatch} />
    </>
  )

  const servicesView = (
    <>
      <div className={catalogStyles.title}>
        <h2>IvyBridge - Your Full Services Catalog</h2>
      </div>
      <div className={catalogStyles.searchContainerWrapper}>
        <div className={catalogStyles.searchContainer}>
          <input
            type="text"
            defaultValue={servicesViewTableProps.search}
            placeholder="Search for an educational service..."
            onChange={event => {
              servicesDispatch(search(event.currentTarget.value))

              console.log(servicesViewTableProps.data.length) // TODO: take count - divide by page size and using styld componnts remove pages with 0 results
            }}
            className="top-element"
          />
        </div>
        <button
          className={catalogStyles.customServiceButton}
          onClick={() =>
            window.open(`https://airtable.com/shr4clpmP2JgszBpD`, '_blank')
          }
        >
          REQUEST A CUSTOM SERVICE
        </button>
      </div>
      <Table {...servicesViewTableProps} dispatch={servicesDispatch} />
    </>
  )

  return (
    <div className={catalogStyles.catalog}>
      {/* update tab here, and reset the page index to 0 when a service is clicked on in services mode  */}
      {catalogMode === "services" ? servicesView : expertsView}
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
  }
}

const mapStateToProps = state => {
  return {
    catalogMode: state.catalogMode,
    expertSearchText: state.expertSearchText,
    pageIndex: state.pageIndex,
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Catalog)
