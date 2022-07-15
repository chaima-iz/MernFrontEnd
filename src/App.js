import "./App.css";
import { useState } from "react";
import Axios from "axios";
import BasicTable from "./compenents/TheTable";
import Button from '@mui/material/Button';
import SendIcon from '@mui/icons-material/Send';

function App() {
  const [name, setName] = useState("");
  const [age, setAge] = useState(0);

  const addFriend = () => {
    Axios.post("http://localhost:3001/addFriend", {
      name: name,
      age: age,
    }).then(()=>{alert("Friend added : refresh")});
  };

  return (
    <div className="App">
      <div className="inputs">
        <input
          type="text"
          placeholder="Friend name ..."
          onChange={(e) => {
            setName(e.target.value);
          }}
        ></input>
        <input
          type="number"
          placeholder="Friend age ..."
          onChange={(e) => {
            setAge(e.target.value);
          }}
        ></input>
        {/* <button onClick={addFriend}>Add Friend</button> */}
        <Button size="small" variant="contained" endIcon={<SendIcon />} onClick={addFriend}>
          Add friend
        </Button>
      </div>
      <div className="friendTable">
        <BasicTable />
      </div>
    </div>
  );
}

export default App;
