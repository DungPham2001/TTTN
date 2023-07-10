import React, { useEffect } from "react";
import { Grid, Modal } from "@material-ui/core";
import { makeStyles } from "@material-ui/styles";
import MUIDataTable from "mui-datatables";

// components
import PageTitle from "../../components/PageTitle/PageTitle";
import Widget from "../../components/Widget/Widget";
import Table from "../dashboard/components/Table/Table";

// data
import mock from "../dashboard/mock";
import axios from "axios";
import { useState } from "react";
import useStyles from "./styles";
import Button from '@material-ui/core/Button'


export default function Users() {
  const classes = useStyles();
  const [data, setData] = useState([])
  const [idUser, setIdUser] = useState(1)
  const [open, setOpen] = React.useState(false);
  const handleOpen = (datas) => {
    setOpen(true);
    setIdUser(datas)
  };
  const handleClose = () => {
    setOpen(false);
  };
  const datatables = []

  data.map( (result) => 
   datatables.push([result.id_user, result.username,result.full_name,result.address,result.phone,result.gender,result.role,result.is_vip == 1 ? <img src="https://cdn-icons-png.flaticon.com/512/6701/6701712.png" width="50px" height="50px" /> : "",result.id_user]))

  const [userDetail, setUserDetail] = useState({
    userName: "",
    fullName: "",
    address: "",
    phone: "",
    gender: "",
    role: "",
    isVip: ""
  })

  useEffect( () =>{
    axios.get(`http://giangndt428.pythonanywhere.com/api/user/get_users/`)
    .then((res) =>setData(res.data))
    .catch((err) => console.log("aaa"));
    axios.get(`http://giangndt428.pythonanywhere.com/api/user/userinfo/`+idUser)
    .then((res) => setUserDetail(pre => {
      return{
        ...res,
        userName: res.data.data.username,
        fullName: res.data.data.full_name,
        address: res.data.data.address,
        phone: res.data.data.phone,
        gender: res.data.data.gender,
        role: res.data.data.role,
        isVip: res.data.data.is_vip
      }
    }))
  }, [idUser])

  const body = (
    <div className={classes.paper}>
      <h2 id="simple-modal-title" className={classes.modal_title}>User Detail</h2>
      <p>Username: {userDetail.userName}</p>
      <p>Full Name: {userDetail.fullName}</p>
      <p>Address: {userDetail.address}</p>
      <p>Phone: {userDetail.phone}</p>
      <p>Gender: {userDetail.gender}</p>
      <p>Role: {userDetail.role}</p>
      <p>Is Vip: {userDetail.isVip == 1 ? "vip" : "not vip"}</p>
      <div className={classes.btn}>
        <Button variant="contained" size="medium" color="secondary" onClick={() => setOpen(false)}>Close</Button>
      </div>
    </div>
  );

  console.log(data)
  const columns = [
    {name: 'ID', options: {filter: false}},
    {name: 'Username', options: {filter: true}},
    {name: 'Full Name', options: {filter: true}},
    {name: 'Address', options: {filter: true}},
    {name: 'Phone', options: {filter: true}},
    {name: 'Gender', options: {filter: true}},
    {name: 'Role', options: {filter: true}},
    {name: 'Is Vip', options: {filter: true}},
    {name: 'Actions', options: {filter: false, customBodyRender: (datas) => {
      return(
        <Button className={classes.root} onClick={() => handleOpen(datas)} >Detail</Button>
      )
    }}}
  ]
  const options = {
    filter: true,
    filterType: "dropdown",
    responsive: ""
  }
  return (
    <>
      <Grid container spacing={4}>
        <Grid item xs={12}>
          <MUIDataTable
            title="List User"
            data={datatables}
            columns={columns}
            options={options}
          />
          <Modal open={open} onClose={handleClose} aria-labelledby="simple-modal-title" aria-describedby="simple-modal-description">
            {body}
          </Modal>
        </Grid>
      </Grid>
    </>
  );
}
