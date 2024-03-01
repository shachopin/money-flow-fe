import FlowChart from "./FlowChart";
import EditableTable from "./EditableTable";
import Form from "./Form";
import { useFirebase } from "./customHooks";

function Income() {
  const [items, totalInFlow, totalOutFlow] = useFirebase("items");

  return (
    <>
      {items.length > 0 && (
        <FlowChart
          titleEnabled
          titleText={`Total Monthly Inflow: ${totalInFlow}, Total Monthly Outflow: ${totalOutFlow}`}
          data={items.map((item) => [
            item.source,
            item.destination,
            item.amount,
          ])}
        />
      )}

      <Form collectionName="items" />

      {items.length > 0 && (
        <EditableTable data={items} collectionName="items" />
      )}
    </>
  );
}

export default Income;
