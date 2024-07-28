import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import HomePage from "./pages/HomePage";
import QuestionPage from "./pages/QuestionPage";
import StudyPage from "./pages/StudyPage";

const App: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/questions/:folder/:file" element={<QuestionPage />} />
        <Route path="/questions/:file" element={<QuestionPage />} />
        <Route path="/study/:file" element={<StudyPage />} />
      </Routes>
    </Router>
  );
};

export default App;
