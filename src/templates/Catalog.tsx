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
  pageContext: { experts: any[]; services: any[] }
  pageIndex: number
  updateCatalogModeInState: Function
  updatePageIndexInState: Function
}

const Catalog: React.FC<ICatalogProps> = ({
  catalogMode,
  pageContext,
  pageIndex,
  updateCatalogModeInState,
  updatePageIndexInState,
}) => {
  const DataRow: React.FC<DataRowFuncPropsWithChildren> = ({ rowData }, i) => {
    return <CatalogExpertRow key={i} rowData={rowData} />
  }

  const DataRowServices: React.FC<DataRowFuncPropsWithChildren> = ({ rowData }, i) => {
    return <CatalogServiceRow key={i} updateCatalogModeInState={updateCatalogModeInState} rowData={rowData} />
  }

  const expertTablePropsInit: ITableProps = {
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
    data: [],
    dataRow: props => <DataRow {...props} />,
    noDataRow: () => 'No results on this page...',
    rowKeyField: 'id',
    sortingMode: SortingMode.Single,
    paging: {
      enabled: true,
      pageIndex: 0,
      pageSize: PAGE_SIZE,
    },
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
    data: [],
    dataRow: props => <DataRowServices {...props} />,
    noDataRow: () => 'No results on this page...',
    rowKeyField: 'id',
    sortingMode: SortingMode.Single,
  }

  let expertsViewPropsInit = {
    ...expertTablePropsInit,
    data: pageContext.experts,
    paging: {
      enabled: true,
      pageIndex,
      pageSize: PAGE_SIZE,
    },
  }

  let servicesViewPropsInit = {
    ...servicesTablePropsInit,
    data: pageContext.services,
  }

  const [expertsViewTableProps, changeExpertsViewTableProps] = useState(
    expertsViewPropsInit,
  )
  const [servicesViewTableProps, changeServicesViewTableProps] = useState(
    servicesViewPropsInit,
  )

  updatePageIndexInState(expertsViewTableProps.paging.pageIndex)

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

  let expertsView = (
    <>
      <div className={catalogStyles.title}>
        <h2>IvyBridge - Your Verified Experts</h2>
      </div>
      <button
        onClick={() => {
          updateCatalogModeInState("services");
          window.scrollTo(0, 0); // back to top
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
            }}
            className="top-element"
          />
        </div>
      </div>
      <Table {...expertsViewTableProps} dispatch={dispatch} />
    </>
  )

  let servicesView = (
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
            }}
            className="top-element"
          />
        </div>
        <button
          className={catalogStyles.customServiceButton}
          onClick={() => window.open(`https://airtable.com/shr4clpmP2JgszBpD`, '_blank')}
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
      {catalogMode === 'services' ? servicesView : expertsView}
    </div>
  )
}

const mapDispatchToProps = dispatch => {
  return {
    updateCatalogModeInState: catalogMode => {
      dispatch(updateCatalogModeInStateAction(catalogMode))
    },
    updatePageIndexInState: pageIndex => {
      dispatch(updatePageIndexInStateAction(pageIndex))
    },
  }
}

const mapStateToProps = state => {
  return {
    catalogMode: state.catalogMode,
    pageIndex: state.pageIndex,
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Catalog)
