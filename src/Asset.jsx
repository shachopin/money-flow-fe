import { useState, useEffect } from "react";
import { db } from "./firebase_config";
import firebase from "firebase";
import FlowChart from "./FlowChart";
import EditableTable from "./EditableTable";
import Form from "./Form";

function Asset() {
  const [assets, setAssets] = useState([]);
  const [source, setSource] = useState("");
  const [destination, setDestination] = useState("");
  const [amount, setAmount] = useState("");
  const [totalAsset, setTotalAsset] = useState(0);
  const [totalDebt, setTotalDebt] = useState(0);

  useEffect(() => {
    getAssets();
  }, []); // blank to run only on first launch

  function getAssets() {
    db.collection("assets").onSnapshot(function (querySnapshot) {
      setAssets(
        querySnapshot.docs.map((doc) => ({
          id: doc.id,
          source: doc.data().source,
          destination: doc.data().destination,
          amount: doc.data().amount,
        }))
      );
      
      setTotalAsset(querySnapshot.docs.reduce((acc, k) => {
        if (k.data().destination === 'Me') {
          acc += k.data().amount;
        }
        return acc;
      },0));
      setTotalDebt(querySnapshot.docs.reduce((acc, k) => {
        if (k.data().source === 'Me') {
          acc += k.data().amount;
        }
        return acc;
      },0));
    });
  }

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
          titleEnabled titleText={`Total Asset: ${totalAsset}, Total Debt: ${totalDebt}`} data={assets.map((item) => [
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
