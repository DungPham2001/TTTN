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


export default function Channels() {
  const classes = useStyles();
  const [data1, setData1] = useState([])
  const [data2, setData2] = useState([])
  const [data3, setData3] = useState([])
  const [data4, setData4] = useState([])
  const [data5, setData5] = useState([])
  const [data6, setData6] = useState([])
  
  const datatables = []
  
  data1.map( (result) => 
    datatables.push([result.id, result.channelAvatar,result.channelName, new Date(result.createdFrom).toLocaleString(), result.numFollows, result.numVideos, result.description]) 
  )
  data2.map( (result) => 
    datatables.push([result.id, result.channelAvatar,result.channelName, new Date(result.createdFrom).toLocaleString(), result.numFollows, result.numVideos, result.description]) 
  )
  data3.map( (result) => 
    datatables.push([result.id, result.channelAvatar,result.channelName, new Date(result.createdFrom).toLocaleString(), result.numFollows, result.numVideos, result.description]) 
  )
  data4.map( (result) => 
    datatables.push([result.id, result.channelAvatar,result.channelName, new Date(result.createdFrom).toLocaleString(), result.numFollows, result.numVideos, result.description]) 
  )
  data5.map( (result) => 
    datatables.push([result.id, result.channelAvatar,result.channelName, new Date(result.createdFrom).toLocaleString(), result.numFollows, result.numVideos, result.description]) 
  )
  data6.map( (result) => 
    datatables.push([result.id, result.channelAvatar,result.channelName, new Date(result.createdFrom).toLocaleString(), result.numFollows, result.numVideos, result.description]) 
  )
  
   useEffect( () => {
    const headers = {
      'Accept-Language': "text",
    }
    axios.get('http://freeapi.kakoak.tls.tl/video-service/v1/channel/1120/hot?msisdn=0969633777&clientType=Android&revision=123&timestamp=123&security=123',{headers} )
    .then((res) => setData1(res.data.data))
    axios.get('http://freeapi.kakoak.tls.tl/video-service/v1/channel/1121/hot?msisdn=0969633777&clientType=Android&revision=123&timestamp=123&security=123',{headers} )
    .then((res) => setData2(res.data.data))
    axios.get('http://freeapi.kakoak.tls.tl/video-service/v1/channel/1093/hot?msisdn=0969633777&clientType=Android&revision=123&timestamp=123&security=123',{headers} )
    .then((res) => setData3(res.data.data))
    axios.get('http://freeapi.kakoak.tls.tl/video-service/v1/channel/1072/hot?msisdn=0969633777&clientType=Android&revision=123&timestamp=123&security=123',{headers} )
    .then((res) => setData5(res.data.data))
    axios.get('http://freeapi.kakoak.tls.tl/video-service/v1/channel/1081/hot?msisdn=0969633777&clientType=Android&revision=123&timestamp=123&security=123',{headers} )
    .then((res) => setData5(res.data.data))
    axios.get('http://freeapi.kakoak.tls.tl/video-service/v1/channel/1090/hot?msisdn=0969633777&clientType=Android&revision=123&timestamp=123&security=123',{headers} )
    .then((res) => setData6(res.data.data))
    
  },[])
  const columns = [
    {name: 'ID', options: {filter: false,sort: true}},
    {name: 'Avatar', options: {filter: false, customBodyRender: (datas) => {
        return(
          <img src={datas} width="200px" height="200px" style={{borderRadius: "100px"}} alt="aaa" />
        )
      }}},
    {name: 'Name', options: {filter: true,sort: true, filterType: "textField"}},
    {name: 'Created At', options: {filter: true, sort: false, filterType: "multiselect"}},
    {name: 'Num Follows', options: {filter: true, sort: false, filterType: "textField"}},
    {name: 'Num Video', options: {filter: true, sort: false, filterType: "textField"}},
    {name: 'Description', options: {filter: false, sort: true}},
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
        </Grid>
      </Grid>
    </>
  );
}