import { useState, useEffect } from "react";
// Import and apply CSS stylesheet
import "./styles/app.css";
import TextField from "@material-ui/core/TextField";
import { Button } from "@material-ui/core";
import { db } from "./firebase_config";
import firebase from "firebase";
import Chart from "./Chart";
import EditableTable from "./EditableTable";

function App() {
  const [items, setItems] = useState([]);
  const [source, setSource] = useState("");
  const [destination, setDestination] = useState("");
  const [amount, setAmount] = useState("");
  
  useEffect(() => {
    getItems();
  }, []); // blank to run only on first launch

  function getItems() {
    db.collection("items").onSnapshot(function (querySnapshot) {
      setItems(
        querySnapshot.docs.map((doc) => ({
          id: doc.id,
          source: doc.data().source,
          destination: doc.data().destination,
          amount: doc.data().amount,
        }))
      );
    });
  }

  function addItem(e) {
    e.preventDefault();

    db.collection("items").add({
      timestamp: firebase.firestore.FieldValue.serverTimestamp(),
      source,
      destination,
      amount: parseFloat(amount)
    });

    setSource("");
    setDestination("")
    setAmount("")
  }

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
        <h1>Money Flow 😃</h1>
        
        {items.length > 0 && <Chart data={items.map(item => [item.source, item.destination, item.amount])}/>}
        
        <form style={{display: 'flex', flexDirection: 'row', width: '80vw'}}>
          <TextField
            id="source"
            label="Source"
            value={source}
            style={{ width: "30vw"}}
            onChange={(e) => setSource(e.target.value)}
          />
          <TextField
            id="destination"
            label="destination"
            value={destination}
            style={{ width: "30vw" }}
            onChange={(e) => setDestination(e.target.value)}
          />
          <TextField
            id="amount"
            label="amount"
            value={amount}
            style={{ width: "30vw" }}
            onChange={(e) => setAmount(e.target.value)}
          />
          <Button
            type="submit"
            variant="contained"
            onClick={addItem}
            style={{ display: "none" }}
          >
            Default
          </Button>
        </form>
       
        {items.length > 0 && <EditableTable data={items}/>}
      </div>
    </div>
  );
}

export default App;
