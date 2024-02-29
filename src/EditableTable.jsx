import './styles/editabletable.css'
import { db } from "./firebase_config";

// const data = [
//   {
//     employeeId: '01',
//     name: 'John Doe',
//     email: 'johndoe@email.com',
//     position: 'Frontend Developer',
//   },
//   {
//     employeeId: '02',
//     name: 'Sara',
//     email: 'sara@email.com',
//     position: 'HR Executive',
//   },
//   {
//     employeeId: '03',
//     name: 'Mike',
//     email: 'mike@email.com',
//     position: 'Backend Developer',
//   },
// ]

const EditableTable = ({data, collectionName}) => {
  //const [employeeData, setEmployeeData] = useState(data)

//   const onChangeInput = (e, employeeId) => {
//     const { name, value } = e.target

//     const editData = employeeData.map((item) =>
//       item.employeeId === employeeId && name ? { ...item, [name]: value } : item
//     )

//     setEmployeeData(editData)
//   }
  const onChangeInput = (e, id) => {
    const {name, value} = e.target;
    db.collection(collectionName)
      .doc(id)
      .update({
        [name]: name === 'amount' && value && !value.endsWith(".") ? parseFloat(value) : value,
      });
  };
  
  const onDelete = (id) => {
     db.collection(collectionName).doc(id).delete();
  };

  return (
    <div className="container">
      {/*<h1 className="title">ReactJS Editable Table</h1>*/}
      <table>
        <thead>
          <tr>
            <th>Source</th>
            <th>Destination</th>
            <th>Amount</th>
            <th>Operation</th>
          </tr>
        </thead>
        <tbody>
          {data.map(({ id, source, destination, amount }) => (
            <tr key={id}>
              <td>
                <input
                  name="source"
                  value={source}
                  type="text"
                  onChange={(e) => onChangeInput(e, id)}
                  placeholder="Type Source"
                />
              </td>
              <td>
                <input
                  name="destination"
                  value={destination}
                  type="text"
                  onChange={(e) => onChangeInput(e, id)}
                  placeholder="Type Destination"
                />
              </td>
              <td>
                <input
                  name="amount"
                  type="text"
                  value={amount}
                  onChange={(e) => onChangeInput(e, id)}
                  placeholder="Type Amount"
                />
              </td>
              <td>
                <button style={{marginLeft: 20}} onClick={e => onDelete(id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default EditableTable