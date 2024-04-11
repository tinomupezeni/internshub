import { Route, Routes } from "react-router-dom";
import Home from "./routes/Home";
import StudentView from "./routes/StudentView";
import GetStarted from "./routes/GetStarted";
import JustLogin from "./routes/JustLogin";
import CompDept from "./routes/CompDept";
import CompInterns from "./routes/CompInterns";
import StudentCvPage from "./routes/StudentCvPage";
import MotivationalView from "./routes/MotivationalView";
import StudentWelcome from "./routes/StudentWelcome";
import StudentProject from "./routes/StudentProject";
import StudUploadProj from "./routes/StudUploadProj";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/get-started" element={<GetStarted />} />
      <Route path="/log-in" element={<JustLogin />} />
      <Route path="/student-home" element={<StudentWelcome />} />
      <Route path="/student-profile" element={<StudentView />} />
      <Route path="/student-profile/projects" element={<StudentProject />} />
      <Route path="/student-profile/cv-builder" element={<StudentCvPage />} />
      <Route
        path="/student-profile/upload-project"
        element={<StudUploadProj />}
      />
      <Route path="/company-departments" element={<CompDept />} />
      <Route path="/company-potential-interns" element={<CompInterns />} />
    </Routes>
  );
}

export default App;
