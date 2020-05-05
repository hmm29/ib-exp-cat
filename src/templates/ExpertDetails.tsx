import * as React from 'react'
import * as expertDetailsStyles from './ExpertDetails.module.scss'

const ExpertDetails = ({ pageContext }) => (
  <div>
    <button onClick={() => history.back()} className={expertDetailsStyles.backButton}>Back</button>
      <h1>{`${pageContext.firstName} ${pageContext.lastName.charAt(0)}.`}</h1>
    <h3>
      {pageContext.undergradInst
        ? `${((new Date).getFullYear() <= pageContext.undergradGradYear) ? 'Graduates' : 'Graduated'} from ${pageContext.undergradInst}`
        : ''}
      {pageContext.undergradGradYear
        ? ` in ${pageContext.undergradGradYear}`
        : ''}
      {pageContext.undergradDegrees
        ? ` with degree(s) in ${pageContext.undergradDegrees}`
        : ''}
    </h3>
    <h3>
      {pageContext.gradInst ? `${((new Date).getFullYear() <= pageContext.gradGradYear) ? 'Graduates' : 'Graduated'} from ${pageContext.gradInst}` : ''}
      {pageContext.gradGradYear ? ` in ${pageContext.gradGradYear}` : ''}
      {pageContext.gradDegrees
        ? ` with degree(s) in ${pageContext.gradDegrees}`
        : ''}
    </h3>
    {pageContext.photo ? (
      <img
        src={pageContext.photo[0].url}
        alt={'Photo'}
        style={{ float: 'left', marginRight: '1rem', width: 100 }}
      />
    ) : null}
    {pageContext.employer1 && pageContext.employer1.logo ? (
      <img
        src={pageContext.employer1 && pageContext.employer1.logo[0].url}
        alt={'Photo'}
        style={{ float: 'right', marginRight: '1rem', width: 100 }}
      />
    ) : null}
    {pageContext.employer2 && pageContext.employer2.logo ? (
      <img
        src={pageContext.employer2.logo[0].url}
        alt={'Photo'}
        style={{ float: 'right', marginRight: '1rem', width: 100 }}
      />
    ) : null}
    {pageContext.graduateLogo ? (
      <img
        src={pageContext.graduateLogo[0].url}
        alt={'Photo'}
        style={{ float: 'right', marginRight: '1rem', width: 100 }}
      />
    ) : null}
    {pageContext.undergraduateLogo ? (
      <img
        src={pageContext.undergraduateLogo[0].url}
        alt={'Photo'}
        style={{ float: 'right', marginRight: '1rem', width: 100 }}
      />
    ) : null}
    <p>
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
    </p>
    <p>{pageContext.languages ? `Speaks ${pageContext.languages}` : ''}</p>
    <p>{pageContext.comments}</p>
    <button
      className={expertDetailsStyles.bookButton}
      onClick={() => alert(`You've booked ${pageContext.firstName}`)}
    >
      BOOK {pageContext.firstName && pageContext.firstName.toUpperCase()}
    </button>
  </div>
)

export default ExpertDetails
