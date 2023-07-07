import React, { useEffect } from "react";
import { Grid, Modal, Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/styles";
import MUIDataTable from "mui-datatables";

// components
import PageTitle from "../../components/PageTitle/PageTitle";
import Widget from "../../components/Widget/Widget";
import Table from "../dashboard/components/Table/Table";
import ReactHlsPlayer from 'react-hls-player';

// data
import mock from "../dashboard/mock";
import axios from "axios";
import { useState } from "react";
import useStyles from "./styles";
import Button from '@material-ui/core/Button'


export default function Videos() {
  const classes = useStyles();
  const [data1, setData1] = useState([])
  const [data2, setData2] = useState([])
  const [data3, setData3] = useState([])
  const [data4, setData4] = useState([])
  const [data5, setData5] = useState([])
  const [data6, setData6] = useState([])
  const [idVideo, setIdVideo] = useState(null)

  const [open, setOpen] = React.useState(false);
  const handleOpen = (datas) => {
    setOpen(true);
    setIdVideo(datas)
  };

  const handleClose = () => {
    setOpen(false);
  };

  const [videoDetail, setVideoDetail] = useState({
    videoTitle: "",
    videoImage: "",
    videoDesc: "",
    videoTime: "",
    publishTime: "",
    totalViews: "",
    totalLikes: "",
    totalShare: 0,
    totalComments: "",
  })
  
  const datatables = []

  data1.map( (result) =>
   datatables.push([result.id,result.videoMedia,result.videoTitle,new Date(result.publishTime).toLocaleString(),result.videoDesc,result.id])
  )
  data2.map( (result) =>
   datatables.push([result.id,result.videoMedia,result.videoTitle,new Date(result.publishTime).toLocaleString(),result.videoDesc,result.id])
  )
  data3.map( (result) =>
   datatables.push([result.id,result.videoMedia,result.videoTitle,new Date(result.publishTime).toLocaleString(),result.videoDesc,result.id])
  )
  data4.map( (result) =>
   datatables.push([result.id,result.videoMedia,result.videoTitle,new Date(result.publishTime).toLocaleString(),result.videoDesc,result.id])
  )
  data5.map( (result) =>
   datatables.push([result.id,result.videoMedia,result.videoTitle,new Date(result.publishTime).toLocaleString(),result.videoDesc])
  )
  data6.map( (result) =>
   datatables.push([result.id,result.videoMedia,result.videoTitle,new Date(result.publishTime).toLocaleString(),result.videoDesc])
  )

  const [gender, setGender] = React.useState('');
  const [fullName, setFullName] = useState('')
  const [userName, setUserName] = useState('')
  const [phone, setPhone] = useState('')
  const [address, setAddress] = useState('')
  const body = (
    <div className={classes.paper}>
      <h2 id="simple-modal-title" className={classes.modal_title}>Video Detail</h2>
      <p>Video Title: {videoDetail.videoTitle} </p>
      <p>Video Image:</p>
      <img src={videoDetail.videoImage} alt={videoDetail.videoTitle} width="150px" height="150px" />
      <p>Video Description: {videoDetail.videoDesc} </p>
      <p>Video Time: {videoDetail.videoTime}</p>
      <p>Created At: {new Date(videoDetail.publishTime).toLocaleString()} </p>
      <p>Total View: {videoDetail.totalViews} </p>
      <p>Total Likes: {videoDetail.totalLikes}</p>
      <p>Total Share: {videoDetail.totalShare}</p>
      <p>Total Comments: {videoDetail.totalComments}</p>
      <div className={classes.btn}>
        <Button variant="contained" size="medium" color="secondary" onClick={() => setOpen(false)}>Close</Button>
      </div>
    </div>
  );
   useEffect( () => {
    const headers = {
      'Accept-Language': "text",
    }
    axios.get('http://freeapi.kakoak.tls.tl/video-service/v1/video/hot?msisdn=0969633777&timestamp=123&security=123&page=0&size=20&lastHashId=13asd',{headers} )
    .then((res) => setData1(res.data.data))
    axios.get('http://freeapi.kakoak.tls.tl/video-service/v1/video/hot?msisdn=0969633777&timestamp=123&security=123&page=1&size=20&lastHashId=13asd',{headers} )
    .then((res) => setData2(res.data.data))
    axios.get('http://freeapi.kakoak.tls.tl/video-service/v1/video/hot?msisdn=0969633777&timestamp=123&security=123&page=2&size=20&lastHashId=13asd',{headers} )
    .then((res) => setData3(res.data.data))
    axios.get('http://freeapi.kakoak.tls.tl/video-service/v1/video/hot?msisdn=0969633777&timestamp=123&security=123&page=3&size=20&lastHashId=13asd',{headers} )
    .then((res) => setData4(res.data.data))
    axios.get('http://freeapi.kakoak.tls.tl/video-service/v1/video/hot?msisdn=0969633777&timestamp=123&security=123&page=4&size=20&lastHashId=13asd',{headers} )
    .then((res) => setData5(res.data.data))
    axios.get('http://freeapi.kakoak.tls.tl/video-service/v1/video/hot?msisdn=0969633777&timestamp=123&security=123&page=4&size=20&lastHashId=13asd',{headers} )
    .then((res) => setData6(res.data.data))
    axios.get('http://freeapi.kakoak.tls.tl/video-service/v1/video/'+idVideo+'/info?msisdn=0966409095&timestamp=123&security=123')
    .then((res) => setVideoDetail(previousState => {
      return {...previousState, 
        videoTitle: res.data.data.videoTitle,
        videoImage: res.data.data.videoImage,
        videoDesc: res.data.data.videoDesc,
        videoTime: res.data.data.videoTime,
        publishTime: res.data.data.publishTime,
        totalViews: res.data.data.totalViews,
        totalLikes: res.data.data.totalLikes,
        totalShare: res.data.data.totalShares,
        totalComments: res.data.data.totalComments,
      }
    }))
  },[idVideo])
  const columns = [
    {name: 'ID', options: {filter: false,sort: true}},
    {name: 'Video', options: {filter: false, customBodyRender: (datas) => {
      return(
        <ReactHlsPlayer src={datas}
    autoPlay={false}
    controls={true}
    width="100%"
    height="auto"
  />
      )
    }}},
    {name: 'Name', options: {filter: true,sort: true, filterType: "textField"}},
    {name: 'Created At', options: {filter: true, sort: false, filterType: "multiselect"}},
    {name: 'Description', options: {filter: false, sort: true}},
    {name: 'Actions', options: {filter: false, customBodyRender: (datas) => {
      return(
        <>
          <Button className={classes.root} onClick={() => handleOpen(datas)}>Detail</Button>
        </>
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
            title="List Videos"
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