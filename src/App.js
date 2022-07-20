import "./App.css";
import { useState, createContext } from "react";
import Axios from "axios";
import BasicTable from "./compenents/TheTable";
import Button from "@mui/material/Button";
import SendIcon from "@mui/icons-material/Send";
import { FriendContext } from "./contextFile";

function App() {
  const [name, setName] = useState("");
  const [age, setAge] = useState(0);
  const [friend, setFriend] = useState();


  const addFriend = () => {
    Axios.post("https://mernbeg.herokuapp.com/addFriend", {
      name: name,
      age: age,
    }).then(() => {
      setFriend({ name: name, age: age });
    });
  };

  return (
    <FriendContext.Provider className="App" value={friend}>
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
        <Button
          size="small"
          variant="contained"
          endIcon={<SendIcon />}
          onClick={addFriend}
        >
          Add friend
        </Button>
      </div>
      <div className="friendTable">
        <BasicTable />
      </div>
    </FriendContext.Provider>
  );
}

export default App;
