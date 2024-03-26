import { Route, Routes } from "react-router-dom";

import Home from "./routes/Home";
import StudentView from "./routes/StudentView";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/student-profile" element={<StudentView />} />
    </Routes>
  );
}

export default App;
