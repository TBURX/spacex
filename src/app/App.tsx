import * as React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "../components/home";
import InfoPage from "../components/info-page";

const App: React.FC = () => (
  <Router>
    <Routes>
      <Route path="/">
        <Route index element={<Home />} />
        <Route path="info" element={<InfoPage />}>
          <Route path=":launchId" element={<InfoPage />} />
        </Route>
      </Route>
    </Routes>
  </Router>
);

export default App;
