import React, { useState } from "react";
import AutoResizingTextarea from "../../Hero/AutoResizingTextarea";
import CVPreview from "./CVPreview";
import "./CV.css";

export default function CV() {
  const [state, setState] = useState({
    previewCvbtn: false,
    toggleCvParts: true,
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

  const cvparts = () => {
    setState((prevState) => {
      return { ...prevState, toggleCvParts: !prevState.toggleCvParts };
    });
  };

  // const { previewCvbtn, ...cvData } = state;

  return (
    <>
      <div className="cv">
        {!state.previewCvbtn && (
          <div className="cv-document">
            {state.toggleCvParts ? (
              <>
                <Cv1
                  name={state.name}
                  handleChange={handleChange}
                  handleLanguagesChange={handleLanguagesChange}
                  studyProgram={state.studyProgram}
                  references={state.references}
                  languages={state.languages}
                  briefIntro={state.briefIntro}
                  qualities={state.qualities}
                />
                <div className="cv-continue-btn">
                  <button onClick={cvparts}>continue</button>
                </div>
              </>
            ) : (
              <>
                <div>
                  <label>objective</label>
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
                <div className="cv-continue-btn">
                  <button onClick={cvparts}>back</button>
                </div>
              </>
            )}
          </div>
        )}
        <button onClick={previewCv} className="cv-preview">
          {state.previewCvbtn ? "edit cv" : "cv preview"}
        </button>
        {state.previewCvbtn && <CVPreview />}
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
      <div className="personal-info">
        <h4>personal Information</h4>
        <div>
          <label>email</label>
          <input
            placeholder="john@doe.com"
            type="email"
            value={emailAddress}
            onChange={(event) =>
              handlePersonalInfoChange(event, "emailAddress")
            }
          />
        </div>
        <label>phone number</label>
        <input
          placeholder="+123 123456789"
          type="number"
          value={phoneNumber}
          onChange={(event) => handlePersonalInfoChange(event, "phoneNumber")}
        />

        <label>address</label>
        <input
          placeholder="2817 Downie Alex park"
          value={physicalAddress}
          onChange={(event) =>
            handlePersonalInfoChange(event, "physicalAddress")
          }
        />

        <label>nationality</label>
        <input
          placeholder="zimbabwean"
          value={nationality}
          onChange={(event) => handlePersonalInfoChange(event, "nationality")}
        />
        <div>
          <label>age</label>
          <input
            placeholder="22"
            value={age}
            onChange={(event) => handlePersonalInfoChange(event, "age")}
          />
        </div>

        <label>gender</label>
        <input
          placeholder="male/female"
          value={gender}
          onChange={(event) => handlePersonalInfoChange(event, "gender")}
        />

        {Object.keys(personalInfo)
          .filter((key) => key.startsWith("optionalField"))
          .map((key) => (
            <>
              <label>optional field</label>
              <input
                name={key}
                value={personalInfo[key]}
                onChange={(event) => handlePersonalInfoChange(event, key)}
                placeholder="Optional field"
              />
            </>
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
          <label>degree</label>
          <input
            name={`degree${index}`}
            value={edu.degree}
            onChange={(event) => handleEducationChange(event, index, "degree")}
            placeholder="Software engineering"
          />
          <label>institution</label>
          <input
            name={`institution${index}`}
            value={edu.institution}
            onChange={(event) =>
              handleEducationChange(event, index, "institution")
            }
            placeholder="univesity of zimbabwe"
          />
          <label>period</label>
          <input
            name={`period${index}`}
            value={edu.period}
            onChange={(event) => handleEducationChange(event, index, "period")}
            placeholder="2021 - current"
          />
        </div>
      ))}
    </div>
  );
};

const Cv1 = ({
  name,
  handleChange,
  studyProgram,
  briefIntro,
  qualities,
  references,
  languages,
  handleQualityChange,
  handleLanguagesChange,
  handleReferenceChange,
}) => {
  return (
    <>
      <div style={{ display: "flex", flexDirection: "column" }}>
        <label>name</label>
        <input
          name="name"
          type="text"
          value={name}
          onChange={(event) => handleChange(event, "name")}
          placeholder="joe doe"
        />
        <label>study program</label>
        <input
          name="studyProgram"
          value={studyProgram}
          onChange={(event) => handleChange(event, "studyProgram")}
          placeholder="Software engineering"
        />
        <label>brief self Introduction</label>
        <AutoResizingTextarea
          name="briefIntro"
          value={briefIntro}
          onChange={(event) => handleChange(event, "briefIntro")}
        />
      </div>
      <div>
        <h4>qualities</h4>
        {qualities.map((quality, index) => (
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
        {languages.map((language, index) => (
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

        {references.map((reference, index) => (
          <div key={index} style={{ padding: "10px 0" }}>
            <input
              name={`name${index}`}
              value={reference.name}
              onChange={(event) => handleReferenceChange(event, index, "name")}
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
    </>
  );
};
