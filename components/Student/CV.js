import React, { useState } from "react";
import AutoResizingTextarea from "./AutoResizingTextarea";
import CVPreview from "./CVPreview";

export default function CV() {
  const [state, setState] = useState({
    previewCvbtn: false,
    languages: [""],
    qualities: [""],
    skills: [""],
    objective: "",
    name: "",
    studyProgram: "",
    briefIntro: "",
    references: [
      {
        name: "",
        relation: "",
        contact: "",
      },
    ],
    personalInfo: {
      emailAddress: "",
      phoneNumber: "",
      physicalAddress: "",
      nationality: "",
      age: "",
      gender: "",
    },

    education: [
      {
        degree: "",
        institution: "",
        period: "",
      },
    ],
  });

  const handleQualityChange = (event, index) => {
    const newQualities = [...state.qualities];
    newQualities[index] = event.target.value;
    setState((prevState) => {
      return { ...prevState, qualities: newQualities };
    });

    if (index === state.qualities.length - 1 && event.target.value !== "") {
      setState((prevState) => ({
        ...prevState,
        qualities: [...prevState.qualities, ""],
      }));
    } else if (
      index === state.qualities.length - 2 &&
      event.target.value === ""
    ) {
      setState((prevState) => ({
        ...prevState,
        qualities: prevState.qualities.slice(0, -1),
      }));
    }
  };
  const handleChange = (event, field) => {
    setState((prevState) => ({
      ...prevState,
      [field]: event.target.value,
    }));
  };

  const handleSkillsChange = (event, index) => {
    const newSkill = [...state.skills];
    newSkill[index] = event.target.value;
    setState((prevState) => {
      return { ...prevState, skills: newSkill };
    });

    if (index === state.skills.length - 1 && event.target.value !== "") {
      setState((prevState) => ({
        ...prevState,
        skills: [...prevState.skills, ""],
      }));
    } else if (index === state.skills.length - 2 && event.target.value === "") {
      setState((prevState) => ({
        ...prevState,
        skills: prevState.skills.slice(0, -1),
      }));
    }
  };
  const handleLanguagesChange = (event, index) => {
    const newLanguage = [...state.languages];
    newLanguage[index] = event.target.value;
    setState((prevState) => {
      return { ...prevState, languages: newLanguage };
    });

    if (index === state.languages.length - 1 && event.target.value !== "") {
      setState((prevState) => ({
        ...prevState,
        languages: [...prevState.languages, ""],
      }));
    } else if (
      index === state.languages.length - 2 &&
      event.target.value === ""
    ) {
      setState((prevState) => ({
        ...prevState,
        languages: prevState.languages.slice(0, -1),
      }));
    }
  };
  const handleReferenceChange = (event, index, field) => {
    const newReferences = [...state.references];
    newReferences[index][field] = event.target.value;
    setState((prevState) => {
      return { ...prevState, references: newReferences };
    });

    const currentReference = newReferences[index];
    if (
      index === state.references.length - 1 &&
      currentReference.name !== "" &&
      currentReference.relation !== "" &&
      currentReference.contact !== ""
    ) {
      setState((prevState) => ({
        ...prevState,
        references: [
          ...prevState.references,
          { name: "", relation: "", contact: "" },
        ],
      }));
    } else if (
      index === state.references.length - 2 &&
      currentReference.contact === ""
    ) {
      setState((prevState) => ({
        ...prevState,
        references: prevState.references.slice(0, -1),
      }));
    }
  };

  const handlePersonalInfoChange = (event, field) => {
    setState((prevState) => ({
      ...prevState,
      personalInfo: {
        ...prevState.personalInfo,
        [field]: event.target.value,
      },
    }));

    const allFieldsFilled = Object.values(state.personalInfo).every(
      (value) => value !== ""
    );
    if (allFieldsFilled && !state.personalInfo.optionalField) {
      setState((prevState) => ({
        ...prevState,
        personalInfo: {
          ...prevState.personalInfo,
          optionalField: "",
        },
      }));
    } else if (field.startsWith("optionalField") && event.target.value === "") {
      setState((prevState) => {
        const newPersonalInfo = { ...prevState.personalInfo };
        delete newPersonalInfo[field];
        return { ...prevState, personalInfo: newPersonalInfo };
      });
    } else if (
      field.startsWith("optionalField") &&
      event.target.value !== "" &&
      !state.personalInfo[
        `optionalField${parseInt(field.replace("optionalField", "")) + 1}`
      ]
    ) {
      setState((prevState) => ({
        ...prevState,
        personalInfo: {
          ...prevState.personalInfo,
          [`optionalField${parseInt(field.replace("optionalField", "")) + 1}`]:
            "",
        },
      }));
    }
  };

  const handleEducationChange = (event, index, field) => {
    const newEducation = [...state.education];
    newEducation[index][field] = event.target.value;
    setState((prevState) => {
      return { ...prevState, education: newEducation };
    });

    const currentEducation = newEducation[index];
    if (
      index === state.education.length - 1 &&
      currentEducation.degree !== "" &&
      currentEducation.institution !== "" &&
      currentEducation.period !== ""
    ) {
      setState((prevState) => ({
        ...prevState,
        education: [
          ...prevState.education,
          { degree: "", institution: "", period: "" },
        ],
      }));
    } else if (
      index === state.education.length - 2 &&
      currentEducation.period === ""
    ) {
      setState((prevState) => ({
        ...prevState,
        education: prevState.education.slice(0, -1),
      }));
    }
  };

  const previewCv = () => {
    setState((prevState) => {
      return { ...prevState, previewCvbtn: !prevState.previewCvbtn };
    });
  };

  const { previewCvbtn, ...cvData } = state;
  return (
    <>
      <div className="cv">
        <h3>my cv</h3>
        {!state.previewCvbtn && (
          <div className="cv-document">
            <div className="left-temp">
              <div>
                <h4>objective</h4>
                <AutoResizingTextarea
                  name="objective"
                  value={state.objective}
                  onChange={(event) => handleChange(event, "objective")}
                  placeholder="Objective"
                />
              </div>
              <PersonalInfomation
                emailAddress={state.personalInfo.emailAddress}
                phoneNumber={state.personalInfo.phoneNumber}
                physicalAddress={state.personalInfo.physicalAddress}
                nationality={state.personalInfo.nationality}
                age={state.personalInfo.age}
                gender={state.personalInfo.gender}
                personalInfo={state.personalInfo}
                handlePersonalInfoChange={handlePersonalInfoChange}
              />
              <Education
                handleEducationChange={handleEducationChange}
                education={state.education}
              />
              <div>
                <h4>skills</h4>

                {state.skills.map((skill, index) => (
                  <li key={index}>
                    <input
                      name={`skill${index}`}
                      value={skill}
                      onChange={(event) => handleSkillsChange(event, index)}
                      placeholder="skill"
                    />
                  </li>
                ))}
              </div>
            </div>
            <div className="right-temp">
              <div style={{ display: "flex", flexDirection: "column" }}>
                <textarea
                  name="name"
                  value={state.name}
                  onChange={(event) => handleChange(event, "name")}
                  placeholder="Name"
                  style={{
                    fontSize: "2rem",
                    width: "100%",
                    overflow: "hidden",
                  }}
                />

                <input
                  name="studyProgram"
                  value={state.studyProgram}
                  onChange={(event) => handleChange(event, "studyProgram")}
                  placeholder="Study Program"
                />
                <AutoResizingTextarea
                  name="briefIntro"
                  value={state.briefIntro}
                  onChange={(event) => handleChange(event, "briefIntro")}
                  placeholder="Brief Introduction"
                />
              </div>
              <div>
                <h4>qualities</h4>
                {state.qualities.map((quality, index) => (
                  <li key={index}>
                    <input
                      name={`quality${index}`}
                      value={quality}
                      onChange={(event) => handleQualityChange(event, index)}
                      placeholder="Quality"
                    />
                  </li>
                ))}
              </div>
              <div>
                <h4>Languages</h4>

                {state.languages.map((language, index) => (
                  <li>
                    <input
                      key={index}
                      name={`language${index}`}
                      value={language}
                      onChange={(event) => handleLanguagesChange(event, index)}
                      placeholder="language"
                    />
                  </li>
                ))}
              </div>
              <div>
                <h4>references</h4>

                {state.references.map((reference, index) => (
                  <div key={index} style={{ padding: "10px 0" }}>
                    <input
                      name={`name${index}`}
                      value={reference.name}
                      onChange={(event) =>
                        handleReferenceChange(event, index, "name")
                      }
                      placeholder="Name"
                    />
                    <input
                      name={`relation${index}`}
                      value={reference.relation}
                      onChange={(event) =>
                        handleReferenceChange(event, index, "relation")
                      }
                      placeholder="Relation"
                    />
                    <input
                      name={`contact${index}`}
                      value={reference.contact}
                      onChange={(event) =>
                        handleReferenceChange(event, index, "contact")
                      }
                      placeholder="Contact"
                    />
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
        <button onClick={previewCv}>
          {state.previewCvbtn ? "edit cv" : "cv preview"}
        </button>
        {state.previewCvbtn && <CVPreview data={cvData} />}
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
  handlePersonalInfoChange,
}) => {
  return (
    <>
      <div>
        <h4>personal Information</h4>
        <li>
          <input
            placeholder="email address"
            value={emailAddress}
            onChange={(event) =>
              handlePersonalInfoChange(event, "emailAddress")
            }
          />
        </li>
        <li>
          <input
            placeholder="phone number"
            value={phoneNumber}
            onChange={(event) => handlePersonalInfoChange(event, "phoneNumber")}
          />
        </li>
        <li>
          <input
            placeholder="physical address"
            value={physicalAddress}
            onChange={(event) =>
              handlePersonalInfoChange(event, "physicalAddress")
            }
          />
        </li>
        <li>
          <input
            placeholder="nationality"
            value={nationality}
            onChange={(event) => handlePersonalInfoChange(event, "nationality")}
          />
        </li>
        <li>
          <input
            placeholder="age"
            value={age}
            onChange={(event) => handlePersonalInfoChange(event, "age")}
          />
        </li>
        <li>
          <input
            placeholder="gender"
            value={gender}
            onChange={(event) => handlePersonalInfoChange(event, "gender")}
          />
        </li>
        {Object.keys(personalInfo)
          .filter((key) => key.startsWith("optionalField"))
          .map((key) => (
            <li key={key}>
              <input
                name={key}
                value={personalInfo[key]}
                onChange={(event) => handlePersonalInfoChange(event, key)}
                placeholder="Optional field"
              />
            </li>
          ))}
      </div>
    </>
  );
};

const Education = ({ handleEducationChange, education }) => {
  return (
    <div>
      <h4>education</h4>
      {education.map((edu, index) => (
        <div key={index} style={{ padding: "10px 0" }}>
          <input
            name={`degree${index}`}
            value={edu.degree}
            onChange={(event) => handleEducationChange(event, index, "degree")}
            placeholder="degree program"
          />
          <input
            name={`institution${index}`}
            value={edu.institution}
            onChange={(event) =>
              handleEducationChange(event, index, "institution")
            }
            placeholder="Institution"
          />
          <input
            name={`period${index}`}
            value={edu.period}
            onChange={(event) => handleEducationChange(event, index, "period")}
            placeholder="period"
          />
        </div>
      ))}
    </div>
  );
};
