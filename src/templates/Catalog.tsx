import * as React from 'react'
import { PropsWithChildren, useState } from "react"
import { CatalogExpertRow } from './CatalogExpertRow'
import 'ka-table/style.scss'
import '../styles/styles.scss'
import * as catalogStyles from './Catalog.module.scss'

import { connect } from 'react-redux'

import { ITableProps, kaReducer, Table } from 'ka-table'
import { search, updatePageIndex } from 'ka-table/actionCreators'
import { DataType, SortDirection, SortingMode } from 'ka-table/enums'
import { DataRowFuncPropsWithChildren, DispatchFunc } from 'ka-table/types'

const dataArray: any[] = [
]

const DataRow: React.FC<DataRowFuncPropsWithChildren> = ({ rowData }, i) => {
  return <CatalogExpertRow key={i} rowData={rowData} />
}

const tablePropsInit: ITableProps = {
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
      key: 'Last_Name',
      sortDirection: SortDirection.Descend,
      style: { width: 60 },
      title: 'Last Name',
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
    pageSize: 10,
  },
}

export interface ICatalogWithPageContext {
  pageContext: { experts: any[]}
}

export const Catalog: React.FC<ICatalogWithPageContext> = ({ pageContext }) => {
  let init = {...tablePropsInit, data: pageContext.experts};

  const [tableProps, changeTableProps] = useState(init)
  const dispatch: DispatchFunc = action => {
    changeTableProps((prevState: ITableProps) => kaReducer(prevState, action));
    window.scrollTo(0, 0); // top of next page of results
  }
  return (
    <div className={catalogStyles.catalog}>
      <div className={catalogStyles.searchContainer}>
        <input
          type="text"
          defaultValue={tableProps.search}
          placeholder="Search expert name, school, subject, or service..."
          onChange={event => {
            if(tableProps.paging.pageIndex > 0) dispatch(updatePageIndex(0))
            dispatch(search(event.currentTarget.value))
          }}
          className="top-element"
        />
      </div>
      <Table {...tableProps} dispatch={dispatch} />
    </div>
  )
}

export default Catalog;


