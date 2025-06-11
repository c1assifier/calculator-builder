import Constructor from "@/pages/Constructor/Constructor";
import RunTime from "@/pages/RunTime/RunTime";
import { HashRouter as Router, Route, Routes } from "react-router-dom";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Constructor />} />
        <Route path="/runtime" element={<RunTime />} />
      </Routes>
    </Router>
  );
}

export default App;

//* HashRouter - используется за место Browser для правильного деплоя на gh-pages.
