import React, { useState, useEffect } from "react";
import auth from "../auth/auth-helper";
import { update, read } from "./api-user";
import { SentimentSatisfied, CloudUpload } from "@material-ui/icons";
import { Redirect, useParams } from "react-router";
import {
  Card,
  CardContent,
  Typography,
  TextField,
  Icon,
  CardActions,
  Button,
  withStyles
} from "@material-ui/core";

const EditProfile = props => {
  const [state, setState] = useState({
    name: "",
    email: "",
    about: "",
    photo: "",
    password: "",
    error: "",
    redirectToProfile: false,
    userId: ""
  });

  const { userId } = useParams();

  let userData = new FormData();
  const handleChange = name => event => {
    const value = name === "photo" ? event.target.files[0] : event.target.value;
    setState({ ...state, [name]: value });
  };

  const jwt = auth.isAuthenticated();
  useEffect(() => {
    read(
      {
        userId
      },
      { t: jwt.token }
    ).then(user => {
      setState({
        ...state,
        name: user.name,
        email: user.email,
        about: user.about
      });
    });
  }, []);

  const submit = () => {
    const user = {
      name: state.name || undefined,
      about: state.about || undefined,
      email: state.email || undefined,
      photo: state.photo || undefined
    };
    var userData = new FormData();
    for (let name in user) {
      userData.append(name, user[name]);
    }
    console.log(...userData);
    update(
      {
        userId
      },
      { t: jwt.token },
      userData
    ).then(data => {
      if (data.error) setState({ ...state, error: data.error });
      else setState({ ...state, userId: data._id, redirectToProfile: true });
    });
  };

  if (state.redirectToProfile) return <Redirect to={"/user/" + state.userId} />;

  const { classes } = props;
  return (
    <Card className={classes.card}>
      <CardContent>
        <Typography type="headline" component="h2" className={classes.title}>
          Update Profile
        </Typography>
        <div>
          <input
            accept="image/*"
            type="file"
            className={classes.input}
            onChange={handleChange("photo")}
            style={{ display: "none" }}
            id="icon-button-file"
          />
          <label htmlFor="icon-button-file">
            <Button variant="raised" color="default" component="span">
              Upload <CloudUpload />
            </Button>
          </label>
          <span className={classes.filename}>
            {state.photo ? state.photo.name : ""}
          </span>
        </div>
        <TextField
          id="name"
          label="name"
          className={classes.textField}
          value={state.name}
          onChange={handleChange("name")}
          margin="normal"
        />
        <TextField
          id="about"
          label="About"
          multiline
          rows="2"
          className={classes.textField}
          value={state.about}
          onChange={handleChange("about")}
          margin="normal"
        />
        <TextField
          id="email"
          type="email"
          label="Email"
          className={classes.textField}
          value={state.email}
          onChange={handleChange("email")}
          margin="normal"
        />
        <TextField
          id="password"
          label="Password"
          className={classes.textField}
          value={state.password}
          onChange={handleChange("password")}
          margin="normal"
        />
        {state.error && (
          <Typography component="p" color="error">
            <Icon color="error" className={classes.error}>
              error
            </Icon>
            {state.error}
          </Typography>
        )}
      </CardContent>
      <CardActions>
        <Button
          color="primary"
          raised="raised"
          onClick={submit}
          className={classes.submit}
        >
          Update
        </Button>
      </CardActions>
    </Card>
  );
};

const styles = theme => ({
  card: {
    maxWidth: 600,
    margin: "auto",
    textAlign: "center",
    marginTop: theme.spacing.unit * 5,
    paddingBottom: theme.spacing.unit * 2
  },
  title: {
    margin: theme.spacing.unit * 2,
    color: theme.palette.protectedTitle
  },
  error: {
    verticalAlign: "middle"
  },
  textField: {
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit,
    width: 300
  },
  submit: {
    margin: "auto",
    marginBottom: theme.spacing.unit * 2
  },
  bigAvatar: {
    width: 60,
    height: 60,
    margin: "auto"
  },
  input: {
    display: "none"
  },
  filename: {
    marginLeft: "10px"
  }
});
export default withStyles(styles)(EditProfile);
