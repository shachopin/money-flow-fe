import TextField from "@material-ui/core/TextField";
import { Button } from "@material-ui/core";

const Form = ({source, destination, amount, setSource, setDestination, setAmount, addItem}) => (
  <form style={{ display: "flex", flexDirection: "row", width: "80vw" }}>
    <TextField
      id="source"
      label="Source"
      value={source}
      style={{ width: "30vw" }}
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
);

export default Form;