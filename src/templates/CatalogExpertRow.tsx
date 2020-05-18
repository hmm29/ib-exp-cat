import * as React from 'react'
import { Tags } from './Tags'
import { Link } from 'gatsby'
import * as catalogExpertRowStyles from './CatalogExpertRow.module.scss'

export interface ICatalogExpertRowProps {
  rowData: {
    First_Name?: string
    Last_Name?: string
    Location?: string
    Headline?: string
    Comments?: string
    Email?: string
    id?: string
    Rate?: number
    Calendly_Link?: string
    Undergraduate_Institution?: string
    Undergraduate_Degrees?: string
    Undergraduate_Graduation_Year?: number
    Graduate_Institution?: string
    Graduate_Degrees?: string
    Graduate_Graduation_Year?: number
    Languages?: string
    Specialties?: [string]
    Photo?: [
      {
        url: string
        thumbnails: {
          full: { url: string }
          large: { url: string }
          small: { url: string }
        }
      }
    ]
    Undergraduate_Logo?: [
      {
        url: string
        thumbnails: {
          full: { url: string }
          large: { url: string }
          small: { url: string }
        }
      }
    ]
    Graduate_Logo?: [
      {
        url: string
        thumbnails: {
          full: { url: string }
          large: { url: string }
          small: { url: string }
        }
      }
    ]
    Employer_1_Name?: string
    Employer_1_Logo?: [
      {
        url: string
        thumbnails: {
          full: { url: string }
          large: { url: string }
          small: { url: string }
        }
      }
    ]
    Employer_1_Title?: string
    Employer_2_Name?: string
    Employer_2_Logo?: [
      {
        url: string
        thumbnails: {
          full: { url: string }
          large: { url: string }
          small: { url: string }
        }
      }
      ]
    Employer_2_Title?: string
  }
  [x: string]: any // for remaining props (rest)
}

export const CatalogExpertRow: React.FC<ICatalogExpertRowProps> = props => {
  const { rowData, ...rest } = props

  return (
    <div {...rest} className={catalogExpertRowStyles.row}>
      <div className={catalogExpertRowStyles.expertImages}>
        <img
          className={catalogExpertRowStyles.expertProfile}
          src={
            (rowData.Photo && rowData.Photo[0].url) ||
            'https://res.cloudinary.com/dxdsyeoz9/image/upload/v1581576681/cle-2xx_o6jd0b.png'
          }
        />
        <img
          className={catalogExpertRowStyles.expertInstitution}
          src={
            (rowData.Employer_1_Logo && rowData.Employer_1_Logo[0].url) ||
            (rowData.Graduate_Logo && rowData.Graduate_Logo[0].url) ||
            (rowData.Undergraduate_Logo && rowData.Undergraduate_Logo[0].url) ||
            'https://res.cloudinary.com/dxdsyeoz9/image/upload/v1534393640/Yale_University_p6zc63.png'
          }
        />
      </div>
      <div className={catalogExpertRowStyles.expertRowContent}>
        <div className={catalogExpertRowStyles.expertRowInfo}>
          <h1>
            {rowData && rowData.Headline}
          </h1>
          <h4
            style={{
              color: 'black',
            }}
          >
            {rowData && rowData.Location}
          </h4>
          <div>
            <Tags
              bgColor="#F1F5F7"
              hoverbgColor="#ddd"
              hoverborderColor="#ccc"
              fontColor="#111"
              paddingTop={5}
              paddingBottom={5}
              paddingRight={10}
              paddingLeft={10}
              borderRadius={200}
              tags={
                rowData.Specialties ? rowData.Specialties.join(", ") : null              }
            />
          </div>
          <div className={catalogExpertRowStyles.description}>
            <ul>
              {rowData.Undergraduate_Institution ? <li>
                {rowData.Undergraduate_Institution
                  ? `${
                    new Date().getFullYear() <= rowData.Undergraduate_Graduation_Year
                      ? 'Graduates'
                      : 'Graduated'
                    } from ${rowData.Undergraduate_Institution}`
                  : ''}
                {rowData.Undergraduate_Graduation_Year
                  ? ` in ${rowData.Undergraduate_Graduation_Year}`
                  : ''}
                {rowData.Undergraduate_Degrees
                  ? ` with degree(s) in ${rowData.Undergraduate_Degrees}`
                  : ''}
              </li> : null}
              {rowData.Graduate_Institution ? <li>
                {rowData.Graduate_Institution
                  ? `${
                    new Date().getFullYear() <= rowData.Graduate_Graduation_Year
                      ? 'Graduates'
                      : 'Graduated'
                    } from ${rowData.Graduate_Institution}`
                  : ''}
                {rowData.Graduate_Graduation_Year ? ` in ${rowData.Graduate_Graduation_Year}` : ''}
                {rowData.Graduate_Degrees
                  ? ` with degree(s) in ${rowData.Graduate_Degrees}`
                  : ''}
              </li> : null}
              {rowData.Employer_1_Name || rowData.Employer_2_Name ? <li>
                {rowData.Employer_1_Name || rowData.Employer_2_Name
                  ? 'Worked at '
                  : ''}
                {rowData.Employer_1_Name
                  ? `${rowData.Employer_1_Name} ${
                    rowData.Employer_1_Title
                      ? `as a ${rowData.Employer_1_Title}`
                      : ''
                    }`
                  : ''}{' '}
                {rowData.Employer_2_Name
                  ? `and ${rowData.Employer_2_Name} ${
                    rowData.Employer_2_Title
                      ? `as a ${rowData.Employer_2_Title}`
                      : ''
                    }`
                  : ''}
              </li> : null}
              {rowData.Comments ? <li>
                {rowData.Comments}
              </li> : null}
            </ul>
          </div>
          <div className={catalogExpertRowStyles.expertQuickFacts}>
            <div className={catalogExpertRowStyles.expertQuickFactEntry}>
              <p className={catalogExpertRowStyles.label}>Education</p>
              <p className={catalogExpertRowStyles.quickFact}>
                {rowData.Undergraduate_Institution}
                {rowData.Graduate_Institution
                  ? `, ${rowData.Graduate_Institution}`
                  : null}
              </p>
            </div>
            <div className={catalogExpertRowStyles.expertQuickFactEntry}>
              <p className={catalogExpertRowStyles.label}>Field(s)</p>
              <p className={catalogExpertRowStyles.quickFact}>
                {rowData.Undergraduate_Degrees
                  ? `${rowData.Undergraduate_Degrees} (Undergrad)`
                  : null}
                <br />
                {rowData.Graduate_Degrees
                  ? `${rowData.Graduate_Degrees} (Graduate)`
                  : null}
              </p>
            </div>
            <div className={catalogExpertRowStyles.expertQuickFactEntry}>
              <p className={catalogExpertRowStyles.label}>Language(s)</p>
              <p className={catalogExpertRowStyles.quickFact}>
                {rowData.Languages || 'English'}
              </p>
            </div>
          </div>
        </div>
      </div>
      <div className={catalogExpertRowStyles.expertActionButtons}>
        <p className={catalogExpertRowStyles.price}>{rowData.Rate ? `$${rowData.Rate} USD` : "Custom Pricing"}</p>
        <p>{rowData.Rate ? "per hour" : "Talk to Sales"}</p>
        <div>
          <span role="img">⭐</span>
          <span role="img">⭐</span>
          <span role="img">⭐</span>
          <span role="img">⭐</span>
          <span role="img">⭐</span>
        </div>

        <Link to={`/${rowData.id}`}>
          <button className={catalogExpertRowStyles.learnMoreButton}>
            MARKETING PROFILE
          </button>
        </Link>

        {rowData.Calendly_Link ? <button
          className={catalogExpertRowStyles.bookButton}
          onClick={() => window.open(`https://www.${rowData.Calendly_Link}`, '_blank')}
        >
          BOOK {rowData.First_Name && rowData.First_Name.toUpperCase()}
        </button> : null}
      </div>
    </div>
  )
}
