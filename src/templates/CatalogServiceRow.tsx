import * as React from 'react'
import * as catalogServiceRowStyles from './CatalogServiceRow.module.scss'

interface ICatalogServiceRowProps {
  rowData: {
    Name?: string
    Emoji?: string
    Description?: string
    id?: string
  }
  updateCatalogModeInState?: Function
  [x: string]: any
}

export const CatalogServiceRow: React.FC<ICatalogServiceRowProps> = (props) => {
  const { rowData, updateCatalogModeInState, ...rest } = props;

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
          <h4
            style={{
              color: 'black',
            }}
          />
          <div />
          <div className={catalogServiceRowStyles.description}>
            {rowData && rowData.Description}
          </div>
        </div>
      </div>
      <div className={catalogServiceRowStyles.expertActionButtons}>

        <button
          className={catalogServiceRowStyles.bookButton}
          onClick={() => {
            updateCatalogModeInState('experts');
            window.scrollTo(0, 0); // back to top
          }}
        >
          BROWSE SERVICE PROVIDERS
        </button>
      </div>
    </div>
  )
}
