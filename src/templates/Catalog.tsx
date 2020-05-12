import * as React from 'react'
import { PropsWithChildren, useState } from 'react'
import { CatalogExpertRow } from './CatalogExpertRow'
import 'ka-table/style.scss'
import '../styles/styles.scss'
import * as catalogStyles from './Catalog.module.scss'

import { connect } from 'react-redux'
import { updateCatalogModeInStateAction, updatePageIndexInStateAction } from '../state/actions'

import { ITableProps, kaReducer, Table } from 'ka-table'
import { search, updatePageIndex } from 'ka-table/actionCreators'
import { DataType, SortDirection, SortingMode } from 'ka-table/enums'
import { DataRowFuncPropsWithChildren, DispatchFunc } from 'ka-table/types'

const dataArray: any[] = []
const PAGE_SIZE = 5;

const DataRow: React.FC<DataRowFuncPropsWithChildren> = ({ rowData }, i) => {
  return <CatalogExpertRow key={i} rowData={rowData} />
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

export interface ICatalogWithPageContext {
  catalogMode: string
  pageContext: { experts: any[] }
  pageIndex: number
  updateCatalogModeInState: Function
  updatePageIndexInState: Function
}

const Catalog: React.FC<ICatalogWithPageContext> = ({
  pageContext,
  pageIndex,
  updatePageIndexInState,
}) => {
  let init = {
    ...expertTablePropsInit,
    data: pageContext.experts,
    paging: {
      enabled: true,
      pageIndex,
      pageSize: PAGE_SIZE,
    },
  }

  const [tableProps, changeTableProps] = useState(init)

  updatePageIndexInState(tableProps.paging.pageIndex)

  const dispatch: DispatchFunc = action => {
    changeTableProps((prevState: ITableProps) => kaReducer(prevState, action))
    window.scrollTo(0, 0) // top of next page of results
  }
  return (
    <div className={catalogStyles.catalog}>
      <div className={catalogStyles.searchContainerWrapper}>
        <div className={catalogStyles.searchContainer}>
          <input
            type="text"
            defaultValue={tableProps.search}
            placeholder="Search expert name, school, subject, or service..."
            onChange={event => {
              if (tableProps.paging.pageIndex > 0) {
                dispatch(updatePageIndex(0)) // update locally in table
                updatePageIndexInState(0) // update in global page index tracker
              }
              dispatch(search(event.currentTarget.value))
            }}
            className="top-element"
          />
        </div>
      </div>
      <Table {...tableProps} dispatch={dispatch} />
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
    }
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
