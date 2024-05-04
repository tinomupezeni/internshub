import { Route, Routes } from "react-router-dom";
import Home from "./routes/Home";
import StudentView from "./routes/StudentView";
import GetStarted from "./routes/GetStarted";
import JustLogin from "./routes/JustLogin";
import CompDept from "./routes/CompDept";
import CompInterns from "./routes/CompInterns";
import StudentCvPage from "./routes/StudentCvPage";
import StudentWelcome from "./routes/StudentWelcome";
import StudUploadProj from "./routes/StudUploadProj";
import StudentSettings from "./routes/StudentSettings";
import { UserProvider } from "./components/Hero/UserProvider";
import RecruitComp from "./routes/RecruitComp";
import CompViewInternPotf from "./routes/CompViewInternPotf";

function App() {
  return (
    <UserProvider>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/get-started" element={<GetStarted />} />
        <Route path="/log-in" element={<JustLogin />} />
        <Route path="/student-home" element={<StudentWelcome />} />
        <Route path="/student-profile" element={<StudentView />} />
        <Route path="/student-profile/recruiting-companies" element={<RecruitComp />} />
        <Route path="/student-profile/cv-builder" element={<StudentCvPage />} />
        <Route
          path="/student-profile/upload-project"
          element={<StudUploadProj />}
        />
        <Route
          path="/student-profile/profile-settings"
          element={<StudentSettings />}
        />
        <Route path="/company-departments" element={<CompDept />} />
        <Route path="/company-potential-interns" element={<CompInterns />} />
        <Route path="/company/intern/potfolio" element={<CompViewInternPotf />} />
      </Routes>
    </UserProvider>
  );
}

export default App;
