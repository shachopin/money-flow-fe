import { useState } from "react";
// Import and apply CSS stylesheet
import "./styles/app.css";

import Income from "./Income";
import Asset from "./Asset";
import Toggle from "./Toggle";

function App() {
  const [showIncome, setShowIncome] = useState(true);
  return (
    <div className="App">
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          width: "100%",
        }}
      >
        <h1>Money Flow: <Toggle handleChange={() => setShowIncome(!showIncome)} showIncome={showIncome}/> 😃</h1>
        
        {showIncome ? <Income/> : <Asset/>}
      </div>
    </div>
  );
}

export default App;
