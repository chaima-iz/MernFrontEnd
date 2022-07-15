import * as React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { useEffect, useState } from "react";
import Axios from "axios";
import AutorenewIcon from "@mui/icons-material/Autorenew";
import DeleteIcon from "@mui/icons-material/Delete";
import "./table.css";

export default function BasicTable() {
  const [listOfFriends, setListOfFriends] = useState([]);

  function createData(name, age, id) {
    return { name, age, id };
  }
  useEffect(() => {
    Axios.get("http://localhost:3001/Friends")
      .then((docs) => {
        setListOfFriends(docs.data);
      })
      .catch((err) => console.log(err));
  }, []);
  const rows = listOfFriends.map((friend) =>
    createData(friend.name, friend.age, friend._id)
  );

  const updateFriend = (id) => {
    const newAge = prompt("New age please ?");
    Axios.put("http://localhost:3001/update", { age: newAge, id: id }).then(
      () => {
        setListOfFriends(
          listOfFriends.map((val) => {
            return val._id === id
              ? { _id: id, name: val.name, age: newAge }
              : val;
          })
        );
      }
    );
  };
  const deleteFriend = (id) => {
    Axios.delete(`http://localhost:3001/delete/${id}`).then(() => {

      setListOfFriends(
        listOfFriends.filter((val) => {
           return val._id !== id;
        })
      );
    });
  };
  return (
    <TableContainer component={Paper}>
      <Table aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell align="center">ID</TableCell>

            <TableCell align="center">Name</TableCell>
            <TableCell align="center">Age</TableCell>
            <TableCell align="center">Update</TableCell>
            <TableCell align="center">Delete</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <TableRow
              key={row.name}
              sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
            >
              <TableCell align="center">{row.id}</TableCell>
              <TableCell align="center">{row.name}</TableCell>
              <TableCell align="center">{row.age}</TableCell>
              <TableCell align="center">
                <button className="btn" onClick={() => updateFriend(row.id)}>
                  <AutorenewIcon style={{ fill: "rgb(252, 34, 70)" }} />
                </button>
              </TableCell>
              <TableCell align="center">
                <button className="btn" onClick={() => deleteFriend(row.id)}>
                  <DeleteIcon style={{ color: "rgb(80, 95, 255) " }} />
                </button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
