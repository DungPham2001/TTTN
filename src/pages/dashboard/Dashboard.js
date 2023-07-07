import React, { useState } from "react";
import {
  Grid,
  LinearProgress,
  Select,
  OutlinedInput,
  MenuItem,
  Button
} from "@material-ui/core";
import { useTheme } from "@material-ui/styles";
// styles
import useStyles from "./styles";
import MUIDataTable from "mui-datatables";


// components
import mock from "./mock";
import Widget from "../../components/Widget";
import PageTitle from "../../components/PageTitle";
import { Typography } from "../../components/Wrappers";
import Dot from "../../components/Sidebar/components/Dot";
import Table from "./components/Table/Table";
import BigStat from "./components/BigStat/BigStat";

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useEffect } from "react";
import { green } from "@material-ui/core/colors";
import axios from "axios";
//image
import total from '../../images/total.png';
import dislike from '../../images/dislike.png'
import view from '../../images/view.png'

//statistic

import { Chart as ChartJS, BarElement, CategoryScale, LinearScale, ArcElement, Tooltip, Legend, LineElement, PointElement } from 'chart.js'
import { Pie, Line } from 'react-chartjs-2'



export default function Dashboard(props) {
  var classes = useStyles();
  var theme = useTheme();

  const get = async () => {
    toast.success('Login Success!', {
      position: toast.POSITION.TOP_RIGHT
    });
  }
  const[dataApp, setDataApp] = useState({
    view: 0,
    dislike: 0,
    like: 0,
    favorite: 0
  })
  const[numberUser, setNumberUser] = useState(0)
  const[numberAdmin, setNumberAdmin] = useState(3)
  const[numberVip, setNumberVip] = useState(0)
  const[data, setData] = useState([])

  const data_free = []

  data.map((result) => {
    if (result.id % 2 == 0) {
      data_free.push(result.id)
    }
  })

  const [data2019, setData2019] = useState(0)
  const [data2020, setData2020] = useState(0)
  const [data2021, setData2021] = useState(0)
  const [data2022, setData2022] = useState(0)
  const [data2023, setData2023] = useState(0)
  const [dataMonth2019, setDataMonth2019] = useState({
    january: 0,
    february: 0,
    march: 0,
    april: 0,
    may: 0,
    june: 0,
    july: 0,
    august: 0,
    september: 0,
    october: 0,
    november: 0,
    december: 0
  })
  const [dataMonth2020, setDataMonth2020] = useState({
    january: 0,
    february: 0,
    march: 0,
    april: 0,
    may: 0,
    june: 0,
    july: 0,
    august: 0,
    september: 0,
    october: 0,
    november: 0,
    december: 0
  })
  const [dataMonth2021, setDataMonth2021] = useState({
    january: 0,
    february: 0,
    march: 0,
    april: 0,
    may: 0,
    june: 0,
    july: 0,
    august: 0,
    september: 0,
    october: 0,
    november: 0,
    december: 0
  })
  const [dataMonth2022, setDataMonth2022] = useState({
    january: 0,
    february: 0,
    march: 0,
    april: 0,
    may: 0,
    june: 0,
    july: 0,
    august: 0,
    september: 0,
    october: 0,
    november: 0,
    december: 0
  })
  const [dataMonth2023, setDataMonth2023] = useState({
    january: 0,
    february: 0,
    march: 0,
    april: 0,
    may: 0,
    june: 0,
    july: 0,
    august: 0,
    september: 0,
    october: 0,
    november: 0,
    december: 0
  })
  useEffect(() => {
    get();
    axios.get("http://giangndt428.pythonanywhere.com/api/mediareaction/thongkeapp")
    .then((res) => setDataApp((pre) => {
      return {
        ...pre,
        view: res.data.data.countViewApp,
        dislike: res.data.data.countDisLikeApp,
        like: res.data.data.countLikeApp,
        favorite: res.data.data.countFavoriteApp
      }
    }))
    axios.get("http://giangndt428.pythonanywhere.com/api/user/get_users/")
    .then((res) => setNumberUser(res.data.length))
    axios.get("http://giangndt428.pythonanywhere.com/api/user/thongkeacountvip/")
    .then((res) => setNumberVip(res.data.countVip))
    const headers = {
      'wsToken' : '7da353b8a3246f851e0ee436d898a26d'
    }
    axios.get('http://cinema.tl/api/v1/get-home-films?msisdn=094555566&page=0&size=100',{headers} )
    .then((res) => setData(res.data.data))

    axios.get("http://giangndt428.pythonanywhere.com/api/history/stat?period=2019")
    .then((res) => setData2019(res.data.statistic.profit)  )
    axios.get("http://giangndt428.pythonanywhere.com/api/history/stat?period=2020")
    .then((res) => setData2020(res.data.statistic.profit)  )
    axios.get("http://giangndt428.pythonanywhere.com/api/history/stat?period=2021")
    .then((res) => setData2021(res.data.statistic.profit)  )
    axios.get("http://giangndt428.pythonanywhere.com/api/history/stat?period=2022")
    .then((res) => setData2022(res.data.statistic.profit)  )
    axios.get("http://giangndt428.pythonanywhere.com/api/history/stat?period=2023")
    .then((res) => setData2023(res.data.statistic.profit)  )

    //data month 2019
    axios.get("http://giangndt428.pythonanywhere.com/api/history/stat?period=2019-01")
    .then((res) => setDataMonth2019((pre) => {
      return{
        ...pre,
        january: res.data.statistic.profit
      }
    }))
    axios.get("http://giangndt428.pythonanywhere.com/api/history/stat?period=2019-02")
    .then((res) => setDataMonth2019((pre) => {
      return{
        ...pre,
        february: res.data.statistic.profit
      }
    }))
    axios.get("http://giangndt428.pythonanywhere.com/api/history/stat?period=2019-03")
    .then((res) => setDataMonth2019((pre) => {
      return{
        ...pre,
        march: res.data.statistic.profit
      }
    }))
    axios.get("http://giangndt428.pythonanywhere.com/api/history/stat?period=2019-04")
    .then((res) => setDataMonth2019((pre) => {
      return{
        ...pre,
        april: res.data.statistic.profit
      }
    }))
    axios.get("http://giangndt428.pythonanywhere.com/api/history/stat?period=2019-05")
    .then((res) => setDataMonth2019((pre) => {
      return{
        ...pre,
        may: res.data.statistic.profit
      }
    }))
    axios.get("http://giangndt428.pythonanywhere.com/api/history/stat?period=2019-06")
    .then((res) => setDataMonth2019((pre) => {
      return{
        ...pre,
        june: res.data.statistic.profit
      }
    }))
    axios.get("http://giangndt428.pythonanywhere.com/api/history/stat?period=2019-07")
    .then((res) => setDataMonth2019((pre) => {
      return{
        ...pre,
        july: res.data.statistic.profit
      }
    }))
    axios.get("http://giangndt428.pythonanywhere.com/api/history/stat?period=2019-08")
    .then((res) => setDataMonth2019((pre) => {
      return{
        ...pre,
        august: res.data.statistic.profit
      }
    }))
    axios.get("http://giangndt428.pythonanywhere.com/api/history/stat?period=2019-09")
    .then((res) => setDataMonth2019((pre) => {
      return{
        ...pre,
        september: res.data.statistic.profit
      }
    }))
    axios.get("http://giangndt428.pythonanywhere.com/api/history/stat?period=2019-10")
    .then((res) => setDataMonth2019((pre) => {
      return{
        ...pre,
        october: res.data.statistic.profit
      }
    }))
    axios.get("http://giangndt428.pythonanywhere.com/api/history/stat?period=2019-11")
    .then((res) => setDataMonth2019((pre) => {
      return{
        ...pre,
        november: res.data.statistic.profit
      }
    }))
    axios.get("http://giangndt428.pythonanywhere.com/api/history/stat?period=2019-12")
    .then((res) => setDataMonth2019((pre) => {
      return{
        ...pre,
        december: res.data.statistic.profit
      }
    }))

    //data month 2020

    axios.get("http://giangndt428.pythonanywhere.com/api/history/stat?period=2020-01")
    .then((res) => setDataMonth2020((pre) => {
      return{
        ...pre,
        january: res.data.statistic.profit
      }
    }))
    axios.get("http://giangndt428.pythonanywhere.com/api/history/stat?period=2020-02")
    .then((res) => setDataMonth2020((pre) => {
      return{
        ...pre,
        february: res.data.statistic.profit
      }
    }))
    axios.get("http://giangndt428.pythonanywhere.com/api/history/stat?period=2020-03")
    .then((res) => setDataMonth2020((pre) => {
      return{
        ...pre,
        march: res.data.statistic.profit
      }
    }))
    axios.get("http://giangndt428.pythonanywhere.com/api/history/stat?period=2020-04")
    .then((res) => setDataMonth2020((pre) => {
      return{
        ...pre,
        april: res.data.statistic.profit
      }
    }))
    axios.get("http://giangndt428.pythonanywhere.com/api/history/stat?period=2020-05")
    .then((res) => setDataMonth2020((pre) => {
      return{
        ...pre,
        may: res.data.statistic.profit
      }
    }))
    axios.get("http://giangndt428.pythonanywhere.com/api/history/stat?period=2020-06")
    .then((res) => setDataMonth2020((pre) => {
      return{
        ...pre,
        june: res.data.statistic.profit
      }
    }))
    axios.get("http://giangndt428.pythonanywhere.com/api/history/stat?period=2020-07")
    .then((res) => setDataMonth2020((pre) => {
      return{
        ...pre,
        july: res.data.statistic.profit
      }
    }))
    axios.get("http://giangndt428.pythonanywhere.com/api/history/stat?period=2020-08")
    .then((res) => setDataMonth2020((pre) => {
      return{
        ...pre,
        august: res.data.statistic.profit
      }
    }))
    axios.get("http://giangndt428.pythonanywhere.com/api/history/stat?period=2020-09")
    .then((res) => setDataMonth2020((pre) => {
      return{
        ...pre,
        september: res.data.statistic.profit
      }
    }))
    axios.get("http://giangndt428.pythonanywhere.com/api/history/stat?period=2020-10")
    .then((res) => setDataMonth2020((pre) => {
      return{
        ...pre,
        october: res.data.statistic.profit
      }
    }))
    axios.get("http://giangndt428.pythonanywhere.com/api/history/stat?period=2020-11")
    .then((res) => setDataMonth2020((pre) => {
      return{
        ...pre,
        november: res.data.statistic.profit
      }
    }))
    axios.get("http://giangndt428.pythonanywhere.com/api/history/stat?period=2020-12")
    .then((res) => setDataMonth2020((pre) => {
      return{
        ...pre,
        december: res.data.statistic.profit
      }
    }))

    //data month 2021

    axios.get("http://giangndt428.pythonanywhere.com/api/history/stat?period=2021-01")
    .then((res) => setDataMonth2021((pre) => {
      return{
        ...pre,
        january: res.data.statistic.profit
      }
    }))
    axios.get("http://giangndt428.pythonanywhere.com/api/history/stat?period=2021-02")
    .then((res) => setDataMonth2021((pre) => {
      return{
        ...pre,
        february: res.data.statistic.profit
      }
    }))
    axios.get("http://giangndt428.pythonanywhere.com/api/history/stat?period=2021-03")
    .then((res) => setDataMonth2021((pre) => {
      return{
        ...pre,
        march: res.data.statistic.profit
      }
    }))
    axios.get("http://giangndt428.pythonanywhere.com/api/history/stat?period=2021-04")
    .then((res) => setDataMonth2021((pre) => {
      return{
        ...pre,
        april: res.data.statistic.profit
      }
    }))
    axios.get("http://giangndt428.pythonanywhere.com/api/history/stat?period=2021-05")
    .then((res) => setDataMonth2021((pre) => {
      return{
        ...pre,
        may: res.data.statistic.profit
      }
    }))
    axios.get("http://giangndt428.pythonanywhere.com/api/history/stat?period=2021-06")
    .then((res) => setDataMonth2021((pre) => {
      return{
        ...pre,
        june: res.data.statistic.profit
      }
    }))
    axios.get("http://giangndt428.pythonanywhere.com/api/history/stat?period=2021-07")
    .then((res) => setDataMonth2021((pre) => {
      return{
        ...pre,
        july: res.data.statistic.profit
      }
    }))
    axios.get("http://giangndt428.pythonanywhere.com/api/history/stat?period=2021-08")
    .then((res) => setDataMonth2021((pre) => {
      return{
        ...pre,
        august: res.data.statistic.profit
      }
    }))
    axios.get("http://giangndt428.pythonanywhere.com/api/history/stat?period=2021-09")
    .then((res) => setDataMonth2021((pre) => {
      return{
        ...pre,
        september: res.data.statistic.profit
      }
    }))
    axios.get("http://giangndt428.pythonanywhere.com/api/history/stat?period=2021-10")
    .then((res) => setDataMonth2021((pre) => {
      return{
        ...pre,
        october: res.data.statistic.profit
      }
    }))
    axios.get("http://giangndt428.pythonanywhere.com/api/history/stat?period=2021-11")
    .then((res) => setDataMonth2021((pre) => {
      return{
        ...pre,
        november: res.data.statistic.profit
      }
    }))
    axios.get("http://giangndt428.pythonanywhere.com/api/history/stat?period=2021-12")
    .then((res) => setDataMonth2021((pre) => {
      return{
        ...pre,
        december: res.data.statistic.profit
      }
    }))

    //data month 2022

    axios.get("http://giangndt428.pythonanywhere.com/api/history/stat?period=2022-01")
    .then((res) => setDataMonth2022((pre) => {
      return{
        ...pre,
        january: res.data.statistic.profit
      }
    }))
    axios.get("http://giangndt428.pythonanywhere.com/api/history/stat?period=2022-02")
    .then((res) => setDataMonth2022((pre) => {
      return{
        ...pre,
        february: res.data.statistic.profit
      }
    }))
    axios.get("http://giangndt428.pythonanywhere.com/api/history/stat?period=2022-03")
    .then((res) => setDataMonth2022((pre) => {
      return{
        ...pre,
        march: res.data.statistic.profit
      }
    }))
    axios.get("http://giangndt428.pythonanywhere.com/api/history/stat?period=2022-04")
    .then((res) => setDataMonth2022((pre) => {
      return{
        ...pre,
        april: res.data.statistic.profit
      }
    }))
    axios.get("http://giangndt428.pythonanywhere.com/api/history/stat?period=2022-05")
    .then((res) => setDataMonth2022((pre) => {
      return{
        ...pre,
        may: res.data.statistic.profit
      }
    }))
    axios.get("http://giangndt428.pythonanywhere.com/api/history/stat?period=2022-06")
    .then((res) => setDataMonth2022((pre) => {
      return{
        ...pre,
        june: res.data.statistic.profit
      }
    }))
    axios.get("http://giangndt428.pythonanywhere.com/api/history/stat?period=2022-07")
    .then((res) => setDataMonth2022((pre) => {
      return{
        ...pre,
        july: res.data.statistic.profit
      }
    }))
    axios.get("http://giangndt428.pythonanywhere.com/api/history/stat?period=2022-08")
    .then((res) => setDataMonth2022((pre) => {
      return{
        ...pre,
        august: res.data.statistic.profit
      }
    }))
    axios.get("http://giangndt428.pythonanywhere.com/api/history/stat?period=2022-09")
    .then((res) => setDataMonth2022((pre) => {
      return{
        ...pre,
        september: res.data.statistic.profit
      }
    }))
    axios.get("http://giangndt428.pythonanywhere.com/api/history/stat?period=2022-10")
    .then((res) => setDataMonth2022((pre) => {
      return{
        ...pre,
        october: res.data.statistic.profit
      }
    }))
    axios.get("http://giangndt428.pythonanywhere.com/api/history/stat?period=2022-11")
    .then((res) => setDataMonth2022((pre) => {
      return{
        ...pre,
        november: res.data.statistic.profit
      }
    }))
    axios.get("http://giangndt428.pythonanywhere.com/api/history/stat?period=2022-12")
    .then((res) => setDataMonth2022((pre) => {
      return{
        ...pre,
        december: res.data.statistic.profit
      }
    }))

    //data month 2023
    axios.get("http://giangndt428.pythonanywhere.com/api/history/stat?period=2023-01")
    .then((res) => setDataMonth2023((pre) => {
      return{
        ...pre,
        january: res.data.statistic.profit
      }
    }))
    axios.get("http://giangndt428.pythonanywhere.com/api/history/stat?period=2023-02")
    .then((res) => setDataMonth2023((pre) => {
      return{
        ...pre,
        february: res.data.statistic.profit
      }
    }))
    axios.get("http://giangndt428.pythonanywhere.com/api/history/stat?period=2023-03")
    .then((res) => setDataMonth2023((pre) => {
      return{
        ...pre,
        march: res.data.statistic.profit
      }
    }))
    axios.get("http://giangndt428.pythonanywhere.com/api/history/stat?period=2023-04")
    .then((res) => setDataMonth2023((pre) => {
      return{
        ...pre,
        april: res.data.statistic.profit
      }
    }))
    axios.get("http://giangndt428.pythonanywhere.com/api/history/stat?period=2023-05")
    .then((res) => setDataMonth2023((pre) => {
      return{
        ...pre,
        may: res.data.statistic.profit
      }
    }))
    axios.get("http://giangndt428.pythonanywhere.com/api/history/stat?period=2023-06")
    .then((res) => setDataMonth2023((pre) => {
      return{
        ...pre,
        june: res.data.statistic.profit
      }
    }))
    axios.get("http://giangndt428.pythonanywhere.com/api/history/stat?period=2023-07")
    .then((res) => setDataMonth2023((pre) => {
      return{
        ...pre,
        july: res.data.statistic.profit
      }
    }))
    axios.get("http://giangndt428.pythonanywhere.com/api/history/stat?period=2023-08")
    .then((res) => setDataMonth2023((pre) => {
      return{
        ...pre,
        august: res.data.statistic.profit
      }
    }))
    axios.get("http://giangndt428.pythonanywhere.com/api/history/stat?period=2023-09")
    .then((res) => setDataMonth2023((pre) => {
      return{
        ...pre,
        september: res.data.statistic.profit
      }
    }))
    axios.get("http://giangndt428.pythonanywhere.com/api/history/stat?period=2023-10")
    .then((res) => setDataMonth2023((pre) => {
      return{
        ...pre,
        october: res.data.statistic.profit
      }
    }))
    axios.get("http://giangndt428.pythonanywhere.com/api/history/stat?period=2023-11")
    .then((res) => setDataMonth2023((pre) => {
      return{
        ...pre,
        november: res.data.statistic.profit
      }
    }))
    axios.get("http://giangndt428.pythonanywhere.com/api/history/stat?period=2023-12")
    .then((res) => setDataMonth2023((pre) => {
      return{
        ...pre,
        december: res.data.statistic.profit
      }
    }))
  },[])
  const googleTranslateElementInit = () => {
    new window.google.translate.TranslateElement(
      {
        pageLanguage: "en",
        autoDisplay: false
      },
      "google_translate_element"
    );
  };
  useEffect(() => {
    var addScript = document.createElement("script");
    addScript.setAttribute(
      "src",
      "//translate.google.com/translate_a/element.js?cb=googleTranslateElementInit"
    );
    document.body.appendChild(addScript);
    window.googleTranslateElementInit = googleTranslateElementInit;
  }, []);

  //statistic

  ChartJS.register(
    Tooltip, Legend,
    ArcElement,
    CategoryScale,
    LinearScale,
    LineElement,
    PointElement
  )
  const labelsPie = ['2019','2020','2021','2022','2023']
    const dataPie = {
        labels: labelsPie,
        datasets: [{
          label: 'My First Dataset',
          data: [data2019, data2020, data2021, data2022, data2023],
          backgroundColor: [
            'rgba(255, 205, 86, 0.2)',
            'rgba(75, 192, 192, 0.2)',
            'rgba(54, 162, 235, 0.2)',
            'rgba(153, 102, 255, 0.2)',
            'rgba(201, 203, 207, 0.2)'
          ],
          borderColor: [
            'rgb(255, 205, 86)',
            'rgb(75, 192, 192)',
            'rgb(54, 162, 235)',
            'rgb(153, 102, 255)',
            'rgb(201, 203, 207)'
          ],
          borderWidth: 1
        }]
    };

    const configPie = {
        type: 'bar',
        data: dataPie,
        options: {
          scales: {
            y: {
              beginAtZero: true
            }
          }
        },
    };

    const labelsLine = ['January','February','March','April','May','June','July','August','September','October','November','December']
    const dataLine = {
        labels: labelsLine,
        datasets: [
          {
            label: '2019',
            data:[dataMonth2019.january,dataMonth2019.february,dataMonth2019.march,dataMonth2019.april,dataMonth2019.may,dataMonth2019.june,dataMonth2019.july,dataMonth2019.august,dataMonth2019.september,dataMonth2019.october,dataMonth2019.november,dataMonth2019.december],
            borderColor: 'rgb(255, 99, 132)',
            backgroundColor: 'rgba(255, 99, 132, 0.2)'
          },
          {
            label: '2020',
            data:[dataMonth2020.january,dataMonth2020.february,dataMonth2020.march,dataMonth2020.april,dataMonth2020.may,dataMonth2020.june,dataMonth2020.july,dataMonth2020.august,dataMonth2020.september,dataMonth2020.october,dataMonth2020.november,dataMonth2020.december],
            borderColor: 'rgb(255, 159, 64)',
            backgroundColor: 'rgba(255, 159, 64, 0.2)'
          },
          {
            label: '2021',
            data:[dataMonth2021.january,dataMonth2021.february,dataMonth2021.march,dataMonth2021.april,dataMonth2021.may,dataMonth2021.june,dataMonth2021.july,dataMonth2021.august,dataMonth2021.september,dataMonth2021.october,dataMonth2021.november,dataMonth2021.december],
            borderColor: 'rgb(255, 205, 86)',
            backgroundColor: 'rgba(255, 205, 86, 0.2)'
          },
          {
            label: '2022',
            data:[dataMonth2022.january,dataMonth2022.february,dataMonth2022.march,dataMonth2022.april,dataMonth2022.may,dataMonth2022.june,dataMonth2022.july,dataMonth2022.august,dataMonth2022.september,dataMonth2022.october,dataMonth2022.november,dataMonth2022.december],
            borderColor: 'rgb(75, 192, 192)',
            backgroundColor: 'rgba(75, 192, 192, 0.2)'
          },
          {
            label: '2023',
            data:[dataMonth2023.january,dataMonth2023.february,dataMonth2023.march,dataMonth2023.april,dataMonth2023.may,dataMonth2023.june,dataMonth2023.july,dataMonth2023.august,dataMonth2023.september,dataMonth2023.october,dataMonth2023.november,dataMonth2023.december],
            borderColor: 'rgb(54, 162, 235)',
            backgroundColor: 'rgba(54, 162, 235, 0.2)'
          }
        ]
      }
    const configLine = {
        type: 'bar',
        data: dataLine,
        options: {
          scales: {
            y: {
              beginAtZero: true
            }
          }
        },
    };

    //payment history
    // const [dataPayment, setDataPayment] = useState([])

    const columns = [
      {name: 'Name', options: {filter: true}},
      {name: 'Purchase Date', options: {filter: true}},
      {name: 'Type Vip', options: {filter: true}},
      {name: 'Total Money', options: {filter: false}}
    ]
    const options = {
      filter: true,
      filterType: "dropdown",
      responsive: ""
    }

    const [dataPayment, setDataPayment] = useState([])

    useEffect(() => {
      axios.get("http://giangndt428.pythonanywhere.com/api/history/statall")
      .then((res) => setDataPayment(res.data.data))
    },[])
    const datasetPayment = []
    dataPayment.map((result) => datasetPayment.push([result.name, result.purchase_date, result.type_vip == '1' ? 'One month' : "One year", result.type_vip == '1' ? '47000' : '439000' ]))

    const [dataUser, setDataUser] = useState([])
    useEffect( () => {
      axios.get("http://giangndt428.pythonanywhere.com/api/user/get_users/")
      .then((res) => setDataUser(res.data))
    })

  return (
    <>
      <ToastContainer />
      <div id="google_translate_element" className={classes.google_translate}>Select Language</div>
      <Grid container spacing={4}>
        <Grid item xs={12}>
          <Widget title="App" upperTitle bodyClass={classes.fullHeightBodyApp} className={classes.card}>
            <div style={{display: "flex", justifyContent:"space-between"}}>
              <div style={{display: "flex"}}>
                <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/2/23/Facebook_Like_button.svg/1200px-Facebook_Like_button.svg.png" width="30px" height="25px" className={classes.image} />
                <Typography variant="h6" color="text" colorBrightness="primary" className={classes.serverOverviewElementTitle} noWoap>
                  Like App            
                </Typography>
                <Typography variant="h6" color="text" colorBrightness="secondary" className={classes.serverOverviewElementText} noWoap>
                  {dataApp.like}           
                </Typography>
              </div>

              <div style={{display: "flex"}}>
                <img src={dislike} width="30px" height="25px" className={classes.image} />
                <Typography variant="h6" color="text" colorBrightness="primary" className={classes.serverOverviewElementTitle} noWoap>
                  Dislike App           
                </Typography>
                <Typography variant="h6" color="text" colorBrightness="secondary" className={classes.serverOverviewElementText} noWoap>
                  {dataApp.dislike}           
                </Typography>
              </div>
              <div style={{display: "flex"}}>
                <img src={view} width="45px" height="25px" className={classes.image} />
                <Typography variant="h6" color="text" colorBrightness="primary" className={classes.serverOverviewElementTitle} noWoap>
                  View App            
                </Typography>
                <Typography variant="h6" color="text" colorBrightness="secondary" className={classes.serverOverviewElementText} noWoap>
                  {dataApp.view}           
                </Typography>
              </div>
              <div style={{display: "flex"}}>
                <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/f/f1/Heart_coraz%C3%B3n.svg/1200px-Heart_coraz%C3%B3n.svg.png" width="30px" height="25px" className={classes.image} />
                <Typography variant="h6" color="text" colorBrightness="primary" className={classes.serverOverviewElementTitle} noWoap>
                  Favorite App           
                </Typography>
                <Typography variant="h6" color="text" colorBrightness="secondary" className={classes.serverOverviewElementText} noWoap>
                  {dataApp.favorite}           
                </Typography>
              </div>
            </div>
            
          </Widget>
        </Grid>
        <Grid item lg={3} md={4} sm={6} xs={12}>
          <Widget title="User" upperTitle bodyClass={classes.fullHeightBody} className={classes.card}>
            <div style={{display: "flex"}}>
              <img src={total} width="30px" height="25px" className={classes.image} />
              <Typography variant="h6" color="text" colorBrightness="primary" className={classes.serverOverviewElementTitle} noWoap>
                Total users        
              </Typography>
              <Typography variant="h6" color="text" colorBrightness="secondary" className={classes.serverOverviewElementText} noWoap>
                {numberUser}           
              </Typography>
            </div>
            <div style={{display: "flex"}}>
              <img src="https://cdn-icons-png.flaticon.com/512/2304/2304226.png" width="30px" height="25px" className={classes.image} />
              <Typography variant="h6" color="text" colorBrightness="primary" className={classes.serverOverviewElementTitle} noWrap>
                Admin
              </Typography>
              <Typography variant="h6" color="text" colorBrightness="secondary" className={classes.serverOverviewElementText} nWoap>
                {numberAdmin}       
              </Typography>
            </div>
            <div style={{display: "flex"}}>
              <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcToK_-LT9HmxfBNTsC0A8wfvjtfxKh3GjexbQ&usqp=CAU" width="30px" height="25px" className={classes.image} />
              <Typography variant="h6" color="text" colorBrightness="primary" className={classes.serverOverviewElementTitle} noWrap>
                Member
              </Typography>
              <Typography variant="h6" color="text" colorBrightness="secondary" className={classes.serverOverviewElementText} nWoap>
                {numberUser - numberAdmin}          
              </Typography>
            </div>
            <div style={{display: "flex"}}>
              <img src="https://cdn-icons-png.flaticon.com/512/6701/6701712.png" width="30px" height="25px" className={classes.image} />
              <Typography variant="h6" color="text" colorBrightness="primary" className={classes.serverOverviewElementTitle} noWrap>
                Vip
              </Typography>
              <Typography variant="h6" color="text" colorBrightness="secondary" className={classes.serverOverviewElementText} noWoap>
                {numberVip}           
              </Typography>
            </div>
            
          </Widget>
        </Grid>
        <Grid item lg={3} md={8} sm={6} xs={12}>
          <Widget title="Videos" upperTitle className={classes.card} bodyClass={classes.fullHeightBody}>
            <div style={{display: "flex"}}>
              <img src={total} width="30px" height="25px" className={classes.image} />
              <Typography variant="h6" color="text" colorBrightness="primary" className={classes.serverOverviewElementTitle} noWoap>
                Total videos           
              </Typography>
              <Typography variant="h6" color="text" colorBrightness="secondary" className={classes.serverOverviewElementText} noWoap>
                110         
              </Typography>
            </div>
            <div style={{display: "flex"}}>
              <img src={view} width="30px" height="25px" className={classes.image} />
              <Typography variant="h6" color="text" colorBrightness="primary" className={classes.serverOverviewElementTitle} noWoap>
                Total view          
              </Typography>
              <Typography variant="h6" color="text" colorBrightness="secondary" className={classes.serverOverviewElementText} noWoap>
                110         
              </Typography>
            </div>
            <div style={{display: "flex"}}>
              <img src="https://cdn-icons-png.flaticon.com/512/25/25419.png" width="30px" height="25px" className={classes.image} />
              <Typography variant="h6" color="text" colorBrightness="primary" className={classes.serverOverviewElementTitle} noWoap>
                Total share        
              </Typography>
              <Typography variant="h6" color="text" colorBrightness="secondary" className={classes.serverOverviewElementText} noWoap>
                10        
              </Typography>
            </div>
            <div style={{display: "flex"}}>
              <img src="https://cdn-icons-png.flaticon.com/512/5338/5338282.png" width="30px" height="25px" className={classes.image} />
              <Typography variant="h6" color="text" colorBrightness="primary" className={classes.serverOverviewElementTitle} noWoap>
                Total comment
              </Typography>
              <Typography variant="h6" color="text" colorBrightness="secondary" className={classes.serverOverviewElementText} noWoap>
                30         
              </Typography>
            </div>
          </Widget>
        </Grid>
        <Grid item lg={3} md={8} sm={6} xs={12}>
          <Widget title="Films" upperTitle className={classes.card} bodyClass={classes.fullHeightBody}>
          <div style={{display: "flex"}}>
              <img src={total} width="30px" height="25px" className={classes.image} />
              <Typography variant="h6" color="text" colorBrightness="primary" className={classes.serverOverviewElementTitle} noWoap>
                Total films           
              </Typography>
              <Typography variant="h6" color="text" colorBrightness="secondary" className={classes.serverOverviewElementText} noWoap>
                {data.length}           
              </Typography>
            </div>
            <div style={{display: "flex"}}>
              <img src="https://d28wu8o6itv89t.cloudfront.net/images/achatpremiumnomdedomainepointp-1539465350573.png" width="30px" height="25px" className={classes.image} />
              <Typography variant="h6" color="text" colorBrightness="primary" className={classes.serverOverviewElementTitle} noWrap>
                Prenium
              </Typography>
              <Typography variant="h6" color="text" colorBrightness="secondary" className={classes.serverOverviewElementText} nWoap>
                {data_free.length}           
              </Typography>
            </div>
            <div style={{display: "flex"}}>
              <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTiiLqXwyY5dr0Nxqa8dz0eu9qjXrTXOIUcEA&usqp=CAU" width="30px" height="25px" className={classes.image} />
              <Typography variant="h6" color="text" colorBrightness="primary" className={classes.serverOverviewElementTitle} noWrap>
                Free
              </Typography>
              <Typography variant="h6" color="text" colorBrightness="secondary" className={classes.serverOverviewElementText} nWoap>
                {data.length - data_free.length}           
              </Typography>
            </div>
            <div style={{display: "flex"}}>
              <img src={view} width="30px" height="25px" className={classes.image} />
              <Typography variant="h6" color="text" colorBrightness="primary" className={classes.serverOverviewElementTitle} noWrap>
                Total view
              </Typography>
              <Typography variant="h6" color="text" colorBrightness="secondary" className={classes.serverOverviewElementText} nWoap>
                {data.length - data_free.length}           
              </Typography>
            </div>
            
          </Widget>
        </Grid>
        <Grid item lg={3} md={4} sm={6} xs={12}>
          <Widget title="Channels" upperTitle  className={classes.card} bodyClass={classes.fullHeightBody}>
            <div style={{display: "flex"}}>
              <img src={total} width="30px" height="25px" className={classes.image} />
              <Typography variant="h6" color="text" colorBrightness="primary" className={classes.serverOverviewElementTitle} noWoap>
                Total channels  
              </Typography>
              <Typography variant="h6" color="text" colorBrightness="secondary" className={classes.serverOverviewElementText} noWoap>
                150     
              </Typography>
            </div>
            <div style={{display: "flex"}}>
              <img src={total} width="30px" height="25px" className={classes.image} />
              <Typography variant="h6" color="text" colorBrightness="primary" className={classes.serverOverviewElementTitle} noWoap>
                Follows number            
              </Typography>
              <Typography variant="h6" color="text" colorBrightness="secondary" className={classes.serverOverviewElementText} noWoap>
                150    
              </Typography>
            </div>
          </Widget>
        </Grid>
        <Grid item xs={12}>
          <Widget
            bodyClass={classes.mainChartBodyPie}
            header={
              <div className={classes.mainChartHeader}>
                <Typography
                  variant="h5"
                  color="text"
                  colorBrightness="secondary"
                >
                  Payment Statistic Yearly
                </Typography>
              </div>
            }
          >
            <Pie data={dataPie} options={configPie} />
          </Widget>
        </Grid>
        <Grid item xs={12}>
          <Widget
            bodyClass={classes.mainChartBody}
            header={
              <div className={classes.mainChartHeader}>
                <Typography
                  variant="h5"
                  color="text"
                  colorBrightness="secondary"
                >
                  Payment Statistic Monthly
                </Typography>
              </div>
            }
          >
            <Line data={dataLine} options={configLine} height={100} />
          </Widget>
        </Grid>
        <Grid item xs={12}>
          <Widget
            title="List User Vip"
            upperTitle
            noBodyPadding
            bodyClass={classes.tableWidget}
          >
            <Table data={mock.table} />
          </Widget>
        </Grid>
        <Grid item xs={12}>
            <MUIDataTable
              title="Payment History"
              data={datasetPayment}
              columns={columns}
              options={options}
          />
        </Grid>
      </Grid>
    </>
  );
}

