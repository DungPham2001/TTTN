import React, { useState } from "react";
import useStyles from "./styles";
import axios from "axios";
import { useEffect } from "react";
import { Button, Grid, Typography, Paper, Modal, TextField, Radio, FormControlLabel, FormControl,FormLabel,RadioGroup } from "@material-ui/core";
import { useUserDispatch, handleEditProfile } from "../../context/UserContext";


  

export default function Profile(props) {
  var userDispatch = useUserDispatch();
  const image = localStorage.getItem("image");
  const name_facebook = localStorage.getItem("name_facebook");
  var classes = useStyles();
  const [data, setData] = useState([]);
  const [open, setOpen] = React.useState(false);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  
  const [gender, setGender] = React.useState('');
  const [fullName, setFullName] = useState('')
  const [userName, setUserName] = useState('')
  const [phone, setPhone] = useState('')
  const [address, setAddress] = useState('')
  const id_admin = localStorage.getItem("id_token")

  

  const body = (
    <div className={classes.paper}>
      <h2 id="simple-modal-title" className={classes.modal_title}>EDIT PROFILE</h2>
      <form className={classes.root}>
        <TextField id="username"
          InputProps={{
            classes: {
              underline: classes.textFieldUnderline,
              input: classes.textField,
            },
          }}
          label="User Name"
          value={userName}
          onChange={e => setUserName(e.target.value)}
          margin="normal"
          placeholder="User Name"
          type="text"
          fullWidth
        />
        <TextField id="fullName"
          InputProps={{
            classes: {
              underline: classes.textFieldUnderline,
              input: classes.textField,
            },
          }}
          label="Full Name"
          value={fullName}
          onChange={e => setFullName(e.target.value)}
          margin="normal"
          placeholder="Full Name"
          type="text"
          fullWidth
        />
        <TextField id="Address"
          InputProps={{
            classes: {
              underline: classes.textFieldUnderline,
              input: classes.textField,
            },
          }}
          label="Address"
          value={address}
          onChange={e => setAddress(e.target.value)}
          margin="normal"
          placeholder="Address"
          type="text"
          fullWidth
        />
        <TextField id="Phone"
          InputProps={{
            classes: {
              underline: classes.textFieldUnderline,
              input: classes.textField,
            },
          }}
          label="Phone"
          value={phone}
          onChange={e => setPhone(e.target.value)}
          margin="normal"
          placeholder="Phone"
          type="text"
          fullWidth
        />
        <FormLabel component="legend" className={classes.gender_title}>Gender*</FormLabel>
        <RadioGroup aria-label="gender" name="gender1" value={gender} onChange={e => setGender(e.target.value)} className={classes.input_gender}>
            <FormControlLabel value="nam" control={<Radio />} label="male" />
            <FormControlLabel value="nữ" control={<Radio />} label="female" />
        </RadioGroup>
      </form>
      <div className={classes.btn}>
        <Button variant="contained" size="medium" color="secondary" className={classes.btn_submit} onClick={() => handleEditProfile(userDispatch, props.history,id_admin, fullName, address, phone, gender)}>Submit</Button>
        <Button variant="contained" size="medium" color="secondary" onClick={() => setOpen(false)}>Close</Button>
      </div>
    </div>
  );

  useEffect(() => {
    axios
      .get(`http://giangndt428.pythonanywhere.com/api/user/userinfo/`+id_admin)
      .then((res) => {
        setFullName(res.data.data.full_name);
        setUserName(res.data.data.username);
        setAddress(res.data.data.address);
        setPhone(res.data.data.phone);
        setGender(res.data.data.gender)

      })
      .catch((err) => console.log("aaa"));
  }, []);

  return (
    <>
      
        <div className={classes.profile}>
          <img
            src="https://pixinvent.com/demo/vuexy-bootstrap-laravel-admin-template-old/demo-6/images/profile/user-uploads/timeline.jpg"
            width="100%"
            height="300px"
          />
          <div className={classes.profile_detail}>
            <div className={classes.image}>
              <img
                src={image}
                width="150px"
                height="150px"
                className={classes.image_admin}
              />
            </div>
            <div className={classes.detail}>
              <h2 className={classes.name_admin}>{name_facebook}</h2>
              <h4 className={classes.role}>ADMIN</h4>
              <div className={classes.button_edit_profile}>
                <Button
                  variant="contained"
                  size="medium"
                  color="secondary"
                  onClick={handleOpen}
                >
                  Edit Profile
                </Button>
                <Modal
                    open={open}
                    onClose={handleClose}
                    aria-labelledby="simple-modal-title"
                    aria-describedby="simple-modal-description"
                >
                    {body}
                </Modal>
              </div>
            </div>
          </div>
        </div>
        <Grid container spacing={2}>
          <Grid item xs={2}>
            <Paper elevation={0}>
              <Typography
                variant="h5"
                color="textSecondary"
                className={classes.title}
              >
                Full Name:
              </Typography>
              <Typography
                variant="p"
                color="textSecondary"
                className={classes.text}
              >
                {name_facebook}
              </Typography>
              <Typography
                variant="h5"
                color="textSecondary"
                className={classes.title}
              >
                Username:
              </Typography>
              <Typography
                variant="p"
                color="textSecondary"
                className={classes.text}
              >
                {userName}
              </Typography>
              <Typography
                variant="h5"
                color="textSecondary"
                className={classes.title}
              >
                Address:
              </Typography>
              <Typography
                variant="p"
                color="textSecondary"
                className={classes.text}
              >
                {address}
              </Typography>
              <Typography
                variant="h5"
                color="textSecondary"
                className={classes.title}
              >
                Phone:
              </Typography>
              <Typography
                variant="p"
                color="textSecondary"
                className={classes.text}
              >
                {phone}
              </Typography>
              <Typography
                variant="h5"
                color="textSecondary"
                className={classes.title}
              >
                Gender:
              </Typography>
              <Typography
                variant="p"
                color="textSecondary"
                className={classes.text}
              >
                {gender}
              </Typography>
            </Paper>
          </Grid>
          <Grid item xs={10}>
            <Paper elevation={0}>
              <Typography
                variant="h5"
                color="textSecondary"
                className={classes.title}
              >
                Last Photos
              </Typography>
              <Grid container spacing={4}>
                <Grid item>
                  <img
                    src="https://pixinvent.com/demo/vuexy-bootstrap-laravel-admin-template-old/demo-6/images/profile/user-uploads/user-13.jpg"
                    width="300px"
                    height="300px"
                    className={classes.last_image}
                  />
                </Grid>
                <Grid item>
                  <img
                    src="https://pixinvent.com/demo/vuexy-bootstrap-laravel-admin-template-old/demo-6/images/profile/user-uploads/user-02.jpg"
                    width="300px"
                    height="300px"
                    className={classes.last_image}
                  />
                </Grid>
                <Grid item>
                  <img
                    src={image}
                    width="300px"
                    height="300px"
                    className={classes.last_image}
                  />
                </Grid>
                <Grid item>
                  <img
                    src="https://pixinvent.com/demo/vuexy-bootstrap-laravel-admin-template-old/demo-6/images/profile/user-uploads/user-04.jpg"
                    width="300px"
                    height="300px"
                    className={classes.last_image}
                  />
                </Grid>
                <Grid item>
                  <img
                    src="https://pixinvent.com/demo/vuexy-bootstrap-laravel-admin-template-old/demo-6/images/profile/user-uploads/user-05.jpg"
                    width="300px"
                    height="300px"
                    className={classes.last_image}
                  />
                </Grid>
                <Grid item>
                  <img
                    src="https://pixinvent.com/demo/vuexy-bootstrap-laravel-admin-template-old/demo-6/images/profile/user-uploads/user-06.jpg"
                    width="300px"
                    height="300px"
                    className={classes.last_image}
                  />
                </Grid>
              </Grid>
            </Paper>
          </Grid>
        </Grid>
      
    </>
  );
}
