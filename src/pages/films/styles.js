import { makeStyles } from "@material-ui/styles";


export default makeStyles(theme => ({
    tableOverflow: {
        overflow: 'auto'
    },
    root: {
        background: 'linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)',
        border: 0,
        borderRadius: 3,
        boxShadow: '0 3px 5px 2px rgba(255, 105, 135, .3)',
        color: 'white',
        height: 48,
        padding: '0 20px',
    },
    paper: {
        width: 400,
        height: 600,
        backgroundColor: theme.palette.background.paper,
        border: '2px solid #000',
        boxShadow: theme.shadows[5],
        padding: '10px',
        margin: '80px 600px',
    },
    btn: {
        float: "right"
    },
    modal_title: {
        fontSize: "20px",
        textAlign: "center",
        color: "violet"
    },
    prenium: {
        color: "red"
    },
    free: {
        color: "blue"
    }
}))