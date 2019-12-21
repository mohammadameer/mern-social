import React, { useState, useEffect } from "react";
import auth from "../auth/auth-helper";
import { update, read } from "./api-user";
import { SentimentSatisfied } from "@material-ui/icons";
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
    password: "",
    error: "",
    redirectToProfile: false,
    userId: ""
  });

  const { userId } = useParams();

  const handleChange = name => event => {
    setState({ ...state, [name]: event.target.value });
  };

  const jwt = auth.isAuthenticated();
  useEffect(() => {
    read(
      {
        userId
      },
      { t: jwt.token }
    ).then(user => {
      console.log(user);
      setState({ ...state, name: user.name, email: user.email });
    });
  }, []);

  const submit = () => {
    const user = {
      name: state.name || undefined,
      email: state.email || undefined,
      password: state.password || undefined
    };

    update(
      {
        userId
      },
      { t: jwt.token },
      user
    ).then(data => {
      if (data.error) SentimentSatisfied({ ...state, error: error });
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
        <TextField
          id="name"
          label="name"
          className={classes.textField}
          value={state.name}
          onChange={handleChange("name")}
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
  }
});

export default withStyles(styles)(EditProfile);
