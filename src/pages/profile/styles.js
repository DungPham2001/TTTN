import { makeStyles } from "@material-ui/styles";
import { Card } from "react-bootstrap";


export default makeStyles(theme => ({
    profile: {
        position: "relative",
        marginBottom: "100px"
    },
    profile_detail: {
        position: "absolute",
        top: "75%",
        left: "5%",
        display: "flex"
    },
    image: {
        backgroundColor: "white",
        borderRadius: "5px"
    },
    image_admin: {
        padding: "5px"
    },
    detail: {
        color: "white",
        marginLeft: "20px",
        textAlign: "left",
    },
    button_edit_profile: {
        marginLeft: "865px",
    },
    title: {
        padding: "10px"
    },
    text: {
        padding: "10px",
        color: " #da5290"

    },

    button_upload: {
        float: "right",
        margin: "0 5px 20px 0"
    },
    last_image: {
        borderRadius: "10px",
        cursor: "pointer",
        "&:hover": {
            transform: "translate(-5px,-5px)",
            verticalAlign: "middle",
            overflow : "hidden",
            boxShadow: "0px 5px 5px 0px rgba(0, 0, 0, 0.2)"
        }
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
    modal_title: {
        fontSize: "40px",
        textAlign: "center",
        color: "violet"
    },
    gender_title: {
        marginTop: "10px",
        fontSize: '15px',
        marginLeft: "10px"
    },
    root: {
        '& .MuiTextField-root': {
          margin: theme.spacing(1),
          width: 350,
        },
    },
    btn_submit: {
        marginRight: "100px",
        marginLeft: "40px",
        marginTop: "10px"
    }

}))