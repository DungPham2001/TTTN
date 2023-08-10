import React, { useEffect, useRef } from "react";
import { Grid, Modal } from "@material-ui/core";
import { makeStyles } from "@material-ui/styles";
import MUIDataTable from "mui-datatables";
import ReactPlayer from 'react-player';
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from 'react-responsive-carousel';

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


export default function Videos() {
  const classes = useStyles();
  const [videosListPopular, setVideosListsPopular] = useState([]);
  const [videosCountPopular, setVideosCountPopular] = useState(0);
  const [videosListTopRated, setVideosListsTopRated] = useState([]);
  const [videosCountTopRated, setVideosCountTopRated] = useState(0);
  const [controllerPopular, setControllerPopular] = useState({
    page: 1,
    rowsPerPage: 10
  });
  const [controllerTopRated, setControllerTopRated] = useState({
    page: 1,
    rowsPerPage: 10
  });
  const [videoTV, setVideoTV] = useState([])
  const [idTV, setIdTV] = useState(667538);
  const [open, setOpen] = React.useState(false);
  const handleOpen = (datas) => {
    setOpen(true);
    setIdTV(datas);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const [videoDetail, setVideoDetail] = useState({
    name: "",
    number_of_episodes: "",
    number_of_seasons: "",
    overview: "",
    popularity: "",
    vote_average: "",
    vote_count: ""
  })

  // const [link, setLink] = useState("3fzFvZToh8o");


  const body = (
    <div className={classes.paper}>
      <h2 id="simple-modal-title" className={classes.modal_title}>TV Series Detail</h2>
      <p>Video name: {videoDetail.name}</p>
      <p>Number Of Episodes : {videoDetail.number_of_episodes}</p>
      <p>Number Of Seasons : {videoDetail.number_of_seasons}</p>
      <p>Popularity: {videoDetail.popularity}</p>
      <p>Vote Average: {videoDetail.vote_average}</p>
      <p>Vote Account: {videoDetail.vote_count}</p>
      <div className={classes.btn}>
        <Button variant="contained" size="medium" color="secondary" onClick={() => setOpen(false)}>Close</Button>
      </div>
    </div>
  );

  useEffect(() => {
    const getDataPopular = async () => {
      const url = `https://moonflix-api.vercel.app/api/v1/tv/popular?page=${controllerPopular.page}`
      try{
        const response = await fetch(url);
        if(response.status === 200){
          const data = await response.json();
          setVideosListsPopular(data.results);
          setVideosCountPopular(data.total_results);
        }else{
          throw new Error ('Request failed')
        }
      }
      catch(error){
        console.log(error)
      }
    };
    const getDataTopRate = async () => {
      const url = `https://moonflix-api.vercel.app/api/v1/tv/top_rated?page=${controllerTopRated.page}`
      try{
        const response = await fetch(url);
        if(response.status === 200){
          const data = await response.json();
          setVideosListsTopRated(data.results);
          setVideosCountTopRated(data.total_results);
        }else{
          throw new Error ('Request failed')
        }
      }
      catch(error){
        console.log(error)
      }
    };
    getDataPopular();
    getDataTopRate();

  },[controllerTopRated.page, controllerPopular.page]);
  var datatablesPopular = [];
  var datatablesTopRated = [];
  
  if( videosListPopular !== datatablesPopular ){
    datatablesPopular = videosListPopular.map((result) => [result.id,"https://image.tmdb.org/t/p/original"+result.poster_path,result.title,result.overview,result.id])
  }
  if( videosListTopRated !== datatablesTopRated ){
    datatablesTopRated = videosListTopRated.map((result) => [result.id,"https://image.tmdb.org/t/p/original"+result.poster_path,result.title,result.overview,result.id])
  }

  useEffect( () => {
    axios.get(`https://moonflix-api.vercel.app/api/v1/tv/detail/`+idTV)
    .then((res) => setVideoDetail(pre => {
      return {...pre,
        name: res.data.name,
        number_of_episodes: res.data.number_of_episodes,
        number_of_seasons : res.data.number_of_seasons,
        overview: res.data.overview,
        popularity: res.data.popularity,
        vote_average: res.data.vote_average,
        vote_count: res.data.vote_count
      }
    }));
  },[idTV])


  const columns = [
    {name: 'ID', options: {filter: false,sort: true}},
    {name: 'Avatar', options: {filter: false, customBodyRender: (datas) => {
      return(
        <img src={datas} width="200px" height="200px" style={{borderRadius: "10px"}} />
      )
    }}},
    {name: 'Name', options: {filter: true,sort: true, filterType: "textField"}},
    {name: 'Description', options: {filter: false, sort: true}},
    {name: 'Actions', options: {filter: false, customBodyRender: (datas) => {
      return(
        <Button className={classes.root} onClick={() => handleOpen(datas)}>Detail</Button>
      )
    }}}
  ]
  const optionsPopular = {
    filterType: "checkbox",        
    rowsPerPage: controllerPopular.rowsPerPage,
    page : controllerPopular.page,
    count : videosCountPopular,
    onChangePage: (newPage) => {
      setControllerPopular({...controllerPopular, page: newPage});
      
    },
    onChangeRowsPerPage: (numberOfRows) => {
      setControllerPopular({
        ...controllerPopular,
        rowsPerPage: numberOfRows,
        page: 0
      })
    }
  };
  const optionsTopRated = {
    filterType: "checkbox",        
    rowsPerPage: controllerTopRated.rowsPerPage,
    page : controllerTopRated.page,
    count : videosCountTopRated,
    onChangePage: (newPage) => {
      setControllerTopRated({...controllerTopRated, page: newPage});
      
    },
    onChangeRowsPerPage: (numberOfRows) => {
      setControllerTopRated({
        ...controllerTopRated,
        rowsPerPage: numberOfRows,
        page: 0
      })
    }
  };
  return (
    <>
      <Grid container spacing={4}>
        <Grid item xs={12}>
          <MUIDataTable
            title="Popular"
            data={datatablesPopular}
            columns={columns}
            options={optionsPopular}
            
          />
          <Modal open={open} onClose={() => handleClose} aria-labelledby="simple-modal-title" aria-describedby="simple-modal-description">
            {body}
          </Modal>
        </Grid>
        <Grid item xs={12}>
          <MUIDataTable
            title="Top Rate"
            data={datatablesTopRated}
            columns={columns}
            options={optionsTopRated}
            
          />
          <Modal open={open} onClose={() => handleClose} aria-labelledby="simple-modal-title" aria-describedby="simple-modal-description">
            {body}
          </Modal>
        </Grid>
      </Grid>
    </>
  );
}
