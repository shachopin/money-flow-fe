import { useState, useEffect } from "react";
import { db } from "./firebase_config";

export const useFirebase = (collectionName) => {
  const [items, setItems] = useState([]);
  const [totalIn, setTotalIn] = useState(0);
  const [totalOut, setTotalOut] = useState(0);

  useEffect(() => {
    getItems();
  }, []); // blank to run only on first launch

  function getItems() {
    db.collection(collectionName).onSnapshot(function (querySnapshot) {
      setItems(
        querySnapshot.docs.map((doc) => ({
          id: doc.id,
          source: doc.data().source,
          destination: doc.data().destination,
          amount: doc.data().amount,
        }))
      );
      setTotalIn(querySnapshot.docs.reduce((acc, k) => {
        if (k.data().destination === 'Me') {
          acc += k.data().amount;
        }
        return acc;
      },0));
      setTotalOut(querySnapshot.docs.reduce((acc, k) => {
        if (k.data().source === 'Me') {
          acc += k.data().amount;
        }
        return acc;
      },0));
    });
  }

  return [items, totalIn, totalOut];
  
}
