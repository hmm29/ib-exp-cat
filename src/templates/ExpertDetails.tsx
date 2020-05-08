import * as React from 'react'
import * as expertDetailsStyles from './ExpertDetails.module.scss'
import { Tags } from './Tags'

const ExpertDetails = ({ pageContext }) => (
  <div className={expertDetailsStyles.container}>
    <button
      onClick={() => history.back()}
      className={expertDetailsStyles.backButton}
    >
      Back
    </button>
    <div className={expertDetailsStyles.topBar}>
      <h1>{pageContext.headline}</h1>
      <div className={expertDetailsStyles.logos}>
        {pageContext.employer1 && pageContext.employer1.logo ? (
          <img
            src={pageContext.employer1 && pageContext.employer1.logo[0].url}
            alt={'employer 1 logo'}
            className={expertDetailsStyles.institutionLogo}
          />
        ) : null}
        {pageContext.employer2 && pageContext.employer2.logo ? (
          <img
            src={pageContext.employer2.logo[0].url}
            alt={'employer 2 logo'}
            className={expertDetailsStyles.institutionLogo}
          />
        ) : null}
        {pageContext.graduateLogo ? (
          <img
            src={pageContext.graduateLogo[0].url}
            alt={'graduate school logo'}
            className={expertDetailsStyles.institutionLogo}
          />
        ) : null}
        {pageContext.undergraduateLogo ? (
          <img
            src={pageContext.undergraduateLogo[0].url}
            alt={'undergraduate school logo'}
            className={expertDetailsStyles.institutionLogo}
          />
        ) : null}
      </div>
    </div>
    <div className={expertDetailsStyles.mainContent}>
      <div>
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
            justifyContent="center"
            tags={
              pageContext.specialties ? pageContext.specialties.join(", ") : null
            }
          />
        </div>
        <div className={expertDetailsStyles.expertQuickFacts}>
          <div className={expertDetailsStyles.expertQuickFactEntry}>
            <p className={expertDetailsStyles.label}>Education</p>
            <p className={expertDetailsStyles.quickFact}>
              {pageContext.undergradInst}
              {pageContext.gradInst
                ? `, ${pageContext.gradInst}`
                : null}
            </p>
          </div>
          <div className={expertDetailsStyles.expertQuickFactEntry}>
            <p className={expertDetailsStyles.label}>Field(s)</p>
            <p className={expertDetailsStyles.quickFact}>
              {pageContext.undergradDegrees
                ? `${pageContext.undergradDegrees} (Undergrad)`
                : null}
              <br />
              {pageContext.gradDegrees
                ? `${pageContext.gradDegrees} (Graduate)`
                : null}
            </p>
          </div>
          <div className={expertDetailsStyles.expertQuickFactEntry}>
            <p className={expertDetailsStyles.label}>Language(s)</p>
            <p className={expertDetailsStyles.quickFact}>
              {pageContext.languages || 'English'}
            </p>
          </div>
          <div className={expertDetailsStyles.expertQuickFactEntry}>
            <p className={expertDetailsStyles.label}>Rate</p>
            <p className={expertDetailsStyles.quickFact}>
              {pageContext.rate ? `$${pageContext.rate} USD/hour` : "Custom Pricing"}
            </p>
          </div>
        </div>
      </div>
      <div className={expertDetailsStyles.profileContainer}>
        {pageContext.photo ? (
          <img
            src={pageContext.photo[0].url}
            alt={'Photo'}
            className={expertDetailsStyles.profile}
          />
        ) : null}
        <button
          className={expertDetailsStyles.bookButton}
          onClick={() => pageContext.calendlyLink ? window.open(`https://www.${pageContext.calendlyLink}`, '_blank') : null}
        >
          BOOK {pageContext.firstName && pageContext.firstName.toUpperCase()}
        </button>
      </div>
      <div className={expertDetailsStyles.description}>
        <p className={expertDetailsStyles.label}>{pageContext.firstName}'s Credentials for Your Client</p>
        <ul>
          {pageContext.undergradInst ? <li>
            {pageContext.undergradInst
              ? `${
                  new Date().getFullYear() <= pageContext.undergradGradYear
                    ? 'Graduates'
                    : 'Graduated'
                } from ${pageContext.undergradInst}`
              : ''}
            {pageContext.undergradGradYear
              ? ` in ${pageContext.undergradGradYear}`
              : ''}
            {pageContext.undergradDegrees
              ? ` with degree(s) in ${pageContext.undergradDegrees}`
              : ''}
          </li> : null}
          {pageContext.gradInst ? <li>
            {pageContext.gradInst
              ? `${
                  new Date().getFullYear() <= pageContext.gradGradYear
                    ? 'Graduates'
                    : 'Graduated'
                } from ${pageContext.gradInst}`
              : ''}
            {pageContext.gradGradYear ? ` in ${pageContext.gradGradYear}` : ''}
            {pageContext.gradDegrees
              ? ` with degree(s) in ${pageContext.gradDegrees}`
              : ''}
          </li> : null}
          {pageContext.employer1.name || pageContext.employer2.name ? <li>
            {pageContext.employer1.name || pageContext.employer2.name
              ? 'Worked at '
              : ''}
            {pageContext.employer1.name
              ? `${pageContext.employer1.name} ${
                  pageContext.employer1.title
                    ? `as a ${pageContext.employer1.title}`
                    : ''
                }`
              : ''}{' '}
            {pageContext.employer2.name
              ? `and ${pageContext.employer2.name} ${
                  pageContext.employer2.title
                    ? `as a ${pageContext.employer2.title}`
                    : ''
                }`
              : ''}
          </li> : null}
          {pageContext.comments ? <li><strong>
            {pageContext.comments}</strong>
          </li> : null}
        </ul>
      </div>
    </div>
  </div>
)

export default ExpertDetails
