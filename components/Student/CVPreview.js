import React from "react";

export default function CVPreview({ data }) {
  return (
    <>
      <div className="cv">
        <div className="cv-document cv-preview">
          <div className="left-temp">
            <div>
              <h4>objective</h4>
              <p>{data.objective}</p>
            </div>
            <PersonalInfomation
              emailAddress={data.personalInfo.emailAddress}
              phoneNumber={data.personalInfo.phoneNumber}
              physicalAddress={data.personalInfo.physicalAddress}
              nationality={data.personalInfo.nationality}
              age={data.personalInfo.age}
              gender={data.personalInfo.gender}
              personalInfo={data.personalInfo}
            />
            <Education education={data.education} />
            <div>
              <h4>skills</h4>

              {data.skills.map((skill, index) => {
                return (
                  skill && (
                    <li key={index}>
                      <p>{skill !== "" && skill}</p>
                    </li>
                  )
                );
              })}
            </div>
          </div>
          <div className="right-temp">
            <div style={{ display: "flex", flexDirection: "column" }}>
              <p
                style={{ fontSize: "2rem", width: "100%", overflow: "hidden" }}
              >
                {data.name}
              </p>

              <p>{data.studyProgram}</p>

              <p>{data.briefIntro}</p>
            </div>
            <div>
              <h4>qualities</h4>
              {data.qualities.map((quality, index) => {
                return (
                  quality && (
                    <li key={index}>
                      <p>{quality}</p>
                    </li>
                  )
                );
              })}
            </div>
            <div>
              <h4>Languages</h4>

              {data.languages.map((language, index) => {
                return (
                  language && (
                    <li key={index}>
                      <p>{language}</p>
                    </li>
                  )
                );
              })}
            </div>
            <div>
              <h4>references</h4>

              {data.references.map((reference, index) => (
                <div key={index} style={{ padding: "10px 0" }}>
                  <p>{reference.name}</p>
                  <p>{reference.relation}</p>
                  <p>{reference.contact}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

const PersonalInfomation = ({
  emailAddress,
  phoneNumber,
  physicalAddress,
  nationality,
  age,
  gender,
  personalInfo,
}) => {
  return (
    <>
      <div>
        <h4>personal Information</h4>
        {emailAddress && (
          <li>
            <p>{emailAddress}</p>
          </li>
        )}
        {phoneNumber && (
          <li>
            <p>{phoneNumber}</p>
          </li>
        )}
        {physicalAddress && (
          <li>
            <p>{physicalAddress}</p>
          </li>
        )}
        {nationality && (
          <li>
            <p>{nationality}</p>
          </li>
        )}
        {age && (
          <li>
            <p>{age}</p>
          </li>
        )}
        {gender && (
          <li>
            <p>{gender}</p>
          </li>
        )}
        {personalInfo &&
          Object.keys(personalInfo)
            .filter((key) => key.startsWith("optionalField"))
            .map((key) => (
              <li key={key}>
                <p>{personalInfo[key]}</p>
              </li>
            ))}
      </div>
    </>
  );
};

const Education = ({ education }) => {
  return (
    <div>
      <h4>education</h4>
      {education.map((edu, index) => (
        <div key={index} style={{ padding: "10px 0" }}>
          <p>{edu.degree}</p>
          <p>{edu.institution}</p>
          <p>{edu.period}</p>
        </div>
      ))}
    </div>
  );
};
