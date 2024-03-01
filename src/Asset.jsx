import { useState } from "react";
import { db } from "./firebase_config";
import FlowChart from "./FlowChart";
import EditableTable from "./EditableTable";
import Form from "./Form";
import { useFirebase } from "./customHooks";

function Asset() {
  const [source, setSource] = useState("");
  const [destination, setDestination] = useState("");
  const [amount, setAmount] = useState("");
  const [assets, totalAsset, totalDebt] = useFirebase("assets");

  function addAsset(e) {
    e.preventDefault();

    db.collection("assets").add({
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
      {assets.length > 0 && (
        <FlowChart
          titleEnabled
          titleText={`Total Asset: ${totalAsset}, Total Debt: ${totalDebt}`}
          data={assets.map((item) => [
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
        addItem={addAsset}
      />

      {assets.length > 0 && (
        <EditableTable data={assets} collectionName="assets" />
      )}
    </>
  );
}

export default Asset;
