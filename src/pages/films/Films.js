import React, { useEffect } from "react";
import { Grid, Modal } from "@material-ui/core";
import { makeStyles } from "@material-ui/styles";
import MUIDataTable from "mui-datatables";
import ReactHlsPlayer from 'react-hls-player';

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


export default function Films() {
  const classes = useStyles();
  const [data, setData] = useState([])
  
  const datatables = []
  const imageURL = []
  const [idFilm, setIdFilm] = useState(11506)
  const [open, setOpen] = React.useState(false);
  const handleOpen = (datas) => {
    setOpen(true);
    setIdFilm(datas)
  };

  const handleClose = () => {
    setOpen(false);
  };

  const [filmDetail, setFilmDetail] = useState({
    name: "",
    avatar: "",
    link: "",
    quality: "",
    isSeri: "",
    isFree: "",
    viewNumber: "",
    caption: ""
  })


  data.map( (result) => {
    datatables.push([result.id,result.avatar,result.name,result.id % 2 == 0 ? "Prenium" : "Free",new Date(result.created).toLocaleString('en-GB'),result.description, result.id])
  })
  datatables.map( (image) => imageURL.push(image[4]))

  const body = (
    <div className={classes.paper}>
      <h2 id="simple-modal-title" className={classes.modal_title}>Film Detail</h2>
      <p>Film name: {filmDetail.name}</p>
      <p>Film video</p>
      <ReactHlsPlayer src={filmDetail.link} autoPlay={false} controls={true} width="100%" height="auto"/>
      <p>Quantity : {filmDetail.quality}</p>
      <p>Is Seri: {filmDetail.isSeri}</p>
      <p>Is Free: {filmDetail.isFree}</p>
      <p>View Number: {filmDetail.viewNumber}</p>
      <p>Caption: {filmDetail.caption}</p>
      <div className={classes.btn}>
        <Button variant="contained" size="medium" color="secondary" onClick={() => setOpen(false)}>Close</Button>
      </div>
    </div>
  );

  useEffect( () => {
    const headers = {
      'wsToken' : '7da353b8a3246f851e0ee436d898a26d'
    }
    axios.get('http://cinema.tl/api/v1/get-home-films?msisdn=094555566&page=0&size=100',{headers} )
    .then((res) => setData(res.data.data))
    axios.get('http://cinema.tl/api/v1/get-film-detail?filmId='+idFilm,{headers} )
    .then((res) => setFilmDetail(pre => {
      return {...pre,
        name: res.data.data.name,
        avatar: res.data.data.avatar,
        link: res.data.data.link,
        quality: res.data.data.quality,
        isSeri: res.data.data.isSeri,
        isFree: res.data.data.isFree,
        viewNumber: res.data.data.viewNumber,
        caption: res.data.data.caption
      }
    }))
  },[idFilm])

  const columns = [
    {name: 'ID', options: {filter: false,sort: true}},
    {name: 'Avatar', options: {filter: false, customBodyRender: (datas) => {
      return(
        <img src={datas} width="200px" height="200px" style={{borderRadius: "10px"}} />
      )
    }}},
    {name: 'Name', options: {filter: true,sort: true, filterType: "textField"}},
    {name: 'Is Prenium', options: {filter: true, filterType: "dropdown"}},
    {name: 'Created At', options: {filter: true, sort: false, filterType: "multiselect"}},
    {name: 'Description', options: {filter: false, sort: true}},
    {name: 'Actions', options: {filter: false, customBodyRender: (datas) => {
      return(
        <Button className={classes.root} onClick={() => handleOpen(datas)}>Detail</Button>
      )
    }}}
  ]
  const options = {
    filter: true,
    responsive: ""
  }
  return (
    <>
      <Grid container spacing={4}>
        <Grid item xs={12}>
          <MUIDataTable
            title="List Films"
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