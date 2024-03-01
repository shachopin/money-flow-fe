import { useState } from "react";
import { db } from "./firebase_config";
import FlowChart from "./FlowChart";
import EditableTable from "./EditableTable";
import Form from "./Form";
import { useFirebase } from "./customHooks";

function Income() {
  const [source, setSource] = useState("");
  const [destination, setDestination] = useState("");
  const [amount, setAmount] = useState("");
  const [items, totalInFlow, totalOutFlow] = useFirebase("items");

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
          titleEnabled
          titleText={`Total Inflow: ${totalInFlow}, Total Outflow: ${totalOutFlow}`}
          data={items.map((item) => [
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
        addItem={addItem}
      />

      {items.length > 0 && (
        <EditableTable data={items} collectionName="items" />
      )}
    </>
  );
}

export default Income;
