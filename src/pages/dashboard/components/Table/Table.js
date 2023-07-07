import React from "react";
import {
  Table,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
  Chip
} from "@material-ui/core";
import useStyles from "../../styles";

const states = {
  vip: "success",
  not_vip: "warning",
};

export default function TableComponent({ data }) {
  const classes = useStyles();
  var keys = Object.keys(data[0]).map(i => i.toUpperCase());
  keys.shift(); // delete "id" key

  return (
    <Table className="mb-0">
      <TableHead>
        <TableRow>
          {keys.map(key => (
            <TableCell key={key}>{key}</TableCell>
          ))}
        </TableRow>
      </TableHead>
      <TableBody>
        {data.map(({ id, name, username, address, phone, gender,status }) => (
          <TableRow key={id}>
            <TableCell className="pl-3 fw-normal">{name}</TableCell>
            <TableCell>{username}</TableCell>
            <TableCell>{address}</TableCell>
            <TableCell>{phone}</TableCell>
            <TableCell>{gender}</TableCell>
            <TableCell>
              {/* <Chip label={status} classes={{root: classes[states[status.toLowerCase()]]}}/> */}
              {status == "vip" ? <img src="https://cdn-icons-png.flaticon.com/512/6701/6701712.png" width="50px" height="50px" /> : ""}
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
