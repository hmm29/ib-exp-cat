import * as React from 'react'
import * as catalogServiceRowStyles from './CatalogServiceRow.module.scss'
import { updateExpertSearchTextInStateAction } from "../state/actions"

interface ICatalogServiceRowProps {
  rowData: {
    Name?: string
    Emoji?: string
    Description?: string
    id?: string
  }
  dispatch?: Function
  updateCatalogModeInState?: Function
  updateExpertSearchTextInState?: Function
  [x: string]: any
}

export const CatalogServiceRow: React.FC<ICatalogServiceRowProps> = (props) => {
  const { rowData, dispatch, updateCatalogModeInState, updateExpertSearchTextInState, ...rest } = props;

  return (
    <div {...rest} className={catalogServiceRowStyles.row}>
      <div className={catalogServiceRowStyles.expertImages}>
        <div className={catalogServiceRowStyles.expertProfile}>
          {rowData && rowData.Emoji}
        </div>
      </div>
      <div className={catalogServiceRowStyles.expertRowContent}>
        <div className={catalogServiceRowStyles.expertRowInfo}>
          <h1>{rowData && rowData.Name}</h1>
          {/*<h4*/}
            {/*style={{*/}
              {/*color: 'black',*/}
            {/*}}*/}
          {/*/>*/}
          {/*<div />*/}
          <div className={catalogServiceRowStyles.description}>
            {rowData && rowData.Description}
          </div>
        </div>
      </div>
      <div className={catalogServiceRowStyles.expertActionButtons}>

        <button
          className={catalogServiceRowStyles.browseButton}
          onClick={() => {
            // dispatch(rowData.Name); // perform search locally
            // updateExpertSearchTextInState(rowData.Name); // track search text value in global state
            updateCatalogModeInState('experts');
            window.scrollTo(0, 0); // back to top
          }}
        >
          {rowData.Emoji} VIEW EXPERTS
        </button>
      </div>
    </div>
  )
}
