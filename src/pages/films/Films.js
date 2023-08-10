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


export default function Films() {
  const classes = useStyles();
  const [filmsListPopular, setFilmListsPopular] = useState([]);
  const [filmsCountPopular, setFilmsCountPopular] = useState(0);
  const [filmsListTopRated, setFilmListsTopRated] = useState([]);
  const [filmsCountTopRated, setFilmsCountTopRated] = useState(0);
  const [controllerPopular, setControllerPopular] = useState({
    page: 1,
    rowsPerPage: 10
  });
  const [controllerTopRated, setControllerTopRated] = useState({
    page: 1,
    rowsPerPage: 10
  });
  const ref = useRef(null);



  const [videoFilm, setVideoFilm] = useState([])
  const [idFilm, setIdFilm] = useState(667538);
  const [open, setOpen] = React.useState(false);
  const handleOpen = (datas) => {
    setOpen(true);
    setIdFilm(datas);
    ref.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleClose = () => {
    setOpen(false);
  };

  const [filmDetail, setFilmDetail] = useState({
    name: "",
    link: "",
    budget: "",
    overview: "",
    popularity: "",
    vote_average: "",
    vote_count: ""
  })

  // const [link, setLink] = useState("3fzFvZToh8o");


  const body = (
    <div className={classes.paper}>
      <h2 id="simple-modal-title" className={classes.modal_title}>Film Detail</h2>
      <p>Film name: {filmDetail.name}</p>
      <p>Film video</p>
      <div className={classes.videoFilm}>
        <Carousel>
          {videoFilm.map((link)=><ReactPlayer url={`https://www.youtube.com/embed/${link.key}?controls=0`} playing={true} controls={true} width="100%" height="auto"/>)}
        </Carousel>
       
      </div>
      <p>Budget : {filmDetail.budget}</p>
      <p>Popularity: {filmDetail.popularity}</p>
      <p>Vote Average: {filmDetail.vote_average}</p>
      <p>Vote Account: {filmDetail.vote_count}</p>
      <div className={classes.btn}>
        <Button variant="contained" size="medium" color="secondary" onClick={() => setOpen(false)}>Close</Button>
      </div>
    </div>
  );

  useEffect(() => {
    const getDataPopular = async () => {
      const url = `https://moonflix-api.vercel.app/api/v1/movie/popular?page=${controllerPopular.page}`
      try{
        const response = await fetch(url);
        if(response.status === 200){
          const data = await response.json();
          setFilmListsPopular(data.results);
          setFilmsCountPopular(data.total_results);
        }else{
          throw new Error ('Request failed')
        }
      }
      catch(error){
        console.log(error)
      }
    };
    const getDataTopRate = async () => {
      const url = `https://moonflix-api.vercel.app/api/v1/movie/top_rated?page=${controllerTopRated.page}`
      try{
        const response = await fetch(url);
        if(response.status === 200){
          const data = await response.json();
          setFilmListsTopRated(data.results);
          setFilmsCountTopRated(data.total_results);
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
  
  if( filmsListPopular !== datatablesPopular ){
    datatablesPopular = filmsListPopular.map((result) => [result.id,"https://image.tmdb.org/t/p/original"+result.poster_path,result.title,result.overview,result.id])
  }
  if( filmsListTopRated !== datatablesTopRated ){
    datatablesTopRated = filmsListTopRated.map((result) => [result.id,"https://image.tmdb.org/t/p/original"+result.poster_path,result.title,result.overview,result.id])
  }

  useEffect( () => {
    axios.get(`https://moonflix-api.vercel.app/api/v1/movie/detail/`+idFilm )
    .then((res) => setFilmDetail(pre => {
      return {...pre,
        name: res.data.title,
        budget: res.data.budget,
        overview: res.data.overview,
        popularity: res.data.popularity,
        vote_average: res.data.vote_average,
        vote_count: res.data.vote_count
      }
    }));
    axios.get(`https://moonflix-api.vercel.app/api/v1/movie/detail/`+idFilm)
    .then((res) => setVideoFilm(res.data.videos.results))
  },[idFilm])


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
    count : filmsCountPopular,
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
    count : filmsCountTopRated,
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
          <Modal ref={ref} open={open} onClose={() => handleClose} aria-labelledby="simple-modal-title" aria-describedby="simple-modal-description">
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
          <Modal ref={ref} open={open} onClose={() => handleClose} aria-labelledby="simple-modal-title" aria-describedby="simple-modal-description">
            {body}
          </Modal>
        </Grid>
      </Grid>
    </>
  );
}
