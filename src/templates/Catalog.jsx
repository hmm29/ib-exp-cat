"use strict";
var __assign = (this && this.__assign) || Object.assign || function(t) {
    for (var s, i = 1, n = arguments.length; i < n; i++) {
        s = arguments[i];
        for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
            t[p] = s[p];
    }
    return t;
};
Object.defineProperty(exports, "__esModule", { value: true });
var React = require("react");
var react_1 = require("react");
var CatalogExpertRow_1 = require("./CatalogExpertRow");
require("ka-table/style.scss");
require("../styles/styles.scss");
var catalogStyles = require("./Catalog.module.scss");
var ka_table_1 = require("ka-table");
var actionCreators_1 = require("ka-table/actionCreators");
var enums_1 = require("ka-table/enums");
var dataArray = [];
var DataRow = function (_a, i) {
    var rowData = _a.rowData;
    return <CatalogExpertRow_1.CatalogExpertRow key={i} rowData={rowData}/>;
};
var tablePropsInit = {
    columns: [
        {
            dataType: enums_1.DataType.String,
            key: 'First_Name',
            sortDirection: enums_1.SortDirection.Ascend,
            style: { width: 60 },
            title: 'First Name',
        },
        {
            dataType: enums_1.DataType.String,
            key: 'Last_Name',
            sortDirection: enums_1.SortDirection.Descend,
            style: { width: 60 },
            title: 'Last Name',
        },
    ],
    data: [],
    dataRow: function (props) { return <DataRow {...props}/>; },
    noDataRow: function () { return 'No results on this page...'; },
    rowKeyField: 'id',
    sortingMode: enums_1.SortingMode.Single,
    paging: {
        enabled: true,
        pageIndex: 0,
        pageSize: 10,
    },
};
exports.Catalog = function (_a) {
    var pageContext = _a.pageContext;
    var init = __assign({}, tablePropsInit, { data: pageContext.experts });
    var _b = react_1.useState(init), tableProps = _b[0], changeTableProps = _b[1];
    var dispatch = function (action) {
        changeTableProps(function (prevState) { return ka_table_1.kaReducer(prevState, action); });
        window.scrollTo(0, 0); // top of next page of results
    };
    return (<div className={catalogStyles.catalog}>
      <div className={catalogStyles.searchContainer}>
        <input type="text" defaultValue={tableProps.search} placeholder="Search expert name, school, subject, or service..." onChange={function (event) {
        if (tableProps.paging.pageIndex > 0)
            dispatch(actionCreators_1.updatePageIndex(0));
        dispatch(actionCreators_1.search(event.currentTarget.value));
    }} className="top-element"/>
      </div>
      <ka_table_1.Table {...tableProps} dispatch={dispatch}/>
    </div>);
};
exports.default = exports.Catalog;
