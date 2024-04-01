import { Route, Routes } from "react-router-dom";
import Home from "./routes/Home";
import StudentView from "./routes/StudentView";
import GetStarted from "./routes/GetStarted";
import JustLogin from "./routes/JustLogin";
import CompDept from "./routes/CompDept";
import CompInterns from "./routes/CompInterns";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/get-started" element={<GetStarted />} />
      <Route path="/log-in" element={<JustLogin />} />
      <Route path="/student-profile" element={<StudentView />} />
      <Route path="/company-departments" element={<CompDept />} />
      <Route path="/company-potential-interns" element={<CompInterns />} />
    </Routes>
  );
}

export default App;
