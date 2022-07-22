import * as React from "react";
import Title from "../components/title/Title";
import globeIcon from "../assets/globe.svg";

const App: React.FC = () => (
  <>
    <Title homeButton icon={globeIcon} />
    <div>hello</div>
  </>
);

export default App;
