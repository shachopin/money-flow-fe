import FlowChart from "./FlowChart";
import EditableTable from "./EditableTable";
import Form from "./Form";
import { useFirebase } from "./customHooks";

function Asset() {
  const [assets, totalAsset, totalDebt] = useFirebase("assets");

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

      <Form collectionName="assets" />

      {assets.length > 0 && (
        <EditableTable data={assets} collectionName="assets" />
      )}
    </>
  );
}

export default Asset;
