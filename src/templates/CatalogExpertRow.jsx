"use strict";
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) if (e.indexOf(p[i]) < 0)
            t[p[i]] = s[p[i]];
    return t;
};
Object.defineProperty(exports, "__esModule", { value: true });
var React = require("react");
var Tags_1 = require("./Tags");
var gatsby_1 = require("gatsby");
var catalogExpertRowStyles = require("./CatalogExpertRow.module.scss");
exports.CatalogExpertRow = function (props) {
    var rowData = props.rowData, rest = __rest(props, ["rowData"]);
    return (<div {...rest} className={catalogExpertRowStyles.row}>
      <div className={catalogExpertRowStyles.expertImages}>
        <img className={catalogExpertRowStyles.expertProfile} src={(rowData.Photo && rowData.Photo[0].url) ||
        'https://res.cloudinary.com/dxdsyeoz9/image/upload/v1581576681/cle-2xx_o6jd0b.png'}/>
        <img className={catalogExpertRowStyles.expertInstitution} src={(rowData.Employer_1_Logo && rowData.Employer_1_Logo[0].url) ||
        (rowData.Graduate_Logo && rowData.Graduate_Logo[0].url) ||
        (rowData.Undergraduate_Logo && rowData.Undergraduate_Logo[0].url) ||
        'https://res.cloudinary.com/dxdsyeoz9/image/upload/v1534393640/Yale_University_p6zc63.png'}/>
      </div>
      <div className={catalogExpertRowStyles.expertRowContent}>
        <div className={catalogExpertRowStyles.expertRowInfo}>
          <h1>
            {rowData.First_Name + " " + rowData.Last_Name.charAt(0) + "."}
          </h1>
          <h4 style={{
        color: 'black',
    }}>
            {rowData && rowData.Location}
          </h4>
          <div>
            <Tags_1.Tags bgColor="#eee" hoverbgColor="#ddd" hoverborderColor="#ccc" fontColor="#111" paddingTop={5} paddingBottom={5} paddingRight={10} paddingLeft={10} borderRadius={200} tags={'📚 College Application Review, 📝 English Essays, 🎤 Public Speaking, 🗣️ Debate (Public Forum)'}/>
          </div>
          <div className={catalogExpertRowStyles.description}>
            This expert was formerly one of the top providers in the country. 8
            years of experience in Debate Skills Coaching.
          </div>
          <div className={catalogExpertRowStyles.expertQuickFacts}>
            <div className={catalogExpertRowStyles.expertQuickFactEntry}>
              <p className={catalogExpertRowStyles.label}>Education</p>
              <p className={catalogExpertRowStyles.quickFact}>
                {rowData.Undergraduate_Institution}
                {rowData.Graduate_Institution
        ? ", " + rowData.Graduate_Institution
        : null}
              </p>
            </div>
            <div className={catalogExpertRowStyles.expertQuickFactEntry}>
              <p className={catalogExpertRowStyles.label}>Field(s)</p>
              <p className={catalogExpertRowStyles.quickFact}>
                {rowData.Undergraduate_Degrees
        ? rowData.Undergraduate_Degrees + " (Undergrad)"
        : null}
                <br />
                {rowData.Graduate_Degrees
        ? rowData.Graduate_Degrees + " (Graduate)"
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
        <p className={catalogExpertRowStyles.price}>$100 USD</p>
        <p>per hour</p>
        <div>
          <span role="img">⭐</span>
          <span role="img">⭐</span>
          <span role="img">⭐</span>
          <span role="img">⭐</span>
          <span role="img">⭐</span>
        </div>

        <gatsby_1.Link to={"/" + rowData.First_Name.trim()}>
          <button className={catalogExpertRowStyles.learnMoreButton}>
            LEARN MORE
          </button>
        </gatsby_1.Link>

        <button className={catalogExpertRowStyles.bookButton} onClick={function () { return alert("You've booked " + rowData.First_Name); }}>
          BOOK {rowData.First_Name && rowData.First_Name.toUpperCase()}
        </button>
      </div>
    </div>);
};
