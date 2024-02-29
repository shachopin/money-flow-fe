import { useState, useEffect } from "react";
import { db } from "./firebase_config";
import firebase from "firebase";
import FlowChart from "./FlowChart";
import EditableTable from "./EditableTable";
import Form from './Form';

function Income() {
  const [items, setItems] = useState([]);
  const [source, setSource] = useState("");
  const [destination, setDestination] = useState("");
  const [amount, setAmount] = useState("");
  const [totalInFlow, setTotalInFlow] = useState(0);
  const [totalOutFlow, setTotalOutFlow] = useState(0);

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
      setTotalInFlow(querySnapshot.docs.reduce((acc, k) => {
        if (k.data().destination === 'Me') {
          acc += k.data().amount;
        }
        return acc;
      },0));
      setTotalOutFlow(querySnapshot.docs.reduce((acc, k) => {
        if (k.data().source === 'Me') {
          acc += k.data().amount;
        }
        return acc;
      },0));
    });
  }

  function addItem(e) {
    e.preventDefault();

    db.collection("items").add({
      timestamp: firebase.firestore.FieldValue.serverTimestamp(),
      source,
      destination,
      amount: parseFloat(amount),
    });

    setSource("");
    setDestination("");
    setAmount("");
  }

  return (
    <>
      {items.length > 0 && (
        <FlowChart
          titleEnabled titleText={`Total Inflow: ${totalInFlow}, Total Outflow: ${totalOutFlow}`} data={items.map((item) => [
            item.source,
            item.destination,
            item.amount,
          ])}
        />
      )}

      <Form
        source={source}
        setSource={setSource}
        destination={destination}
        setDestination={setDestination}
        amount={amount}
        setAmount={setAmount}
        addItem={addItem} />

      {items.length > 0 && <EditableTable data={items} collectionName='items' />}
    </>
  );
}

export default Income;
