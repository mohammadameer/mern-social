import React, { useState } from "react";
import authApi from "./api-auth";
import auth from "./auth-helper";
import { withStyles } from "@material-ui/core/styles";
import { Redirect } from "react-router";
import {
  Card,
  CardContent,
  Typography,
  Icon,
  CardActions,
  Button,
  TextField
} from "@material-ui/core";

const Signin = props => {
  const [state, setState] = useState({
    email: "",
    password: "",
    error: "",
    redirectToReferrer: false
  });

  const submit = () => {
    const user = {
      email: state.email,
      password: state.password
    };
    authApi.signin(user).then(data => {
      if (data.error) setState({ error: data.error });
      else
        auth.authenticate(data, () => {
          setState({ ...state, redirectToReferrer: true });
        });
    });
  };

  const handleChange = name => event => {
    setState({ ...state, [name]: event.target.value });
  };

  const { classes } = props;
  const { redirectToReferrer } = state;
  const { from } = (props.location && props.location.state) || {
    from: { pathname: "/" }
  };
  if (redirectToReferrer) return <Redirect to={from} />;
  return (
    <Card className={classes.card}>
      <CardContent>
        <Typography type="headline" component="h2" className={classes.title}>
          Sign In
        </Typography>
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
          Submit
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
  error: {
    verticalAlign: "middle"
  },
  title: {
    marginTop: theme.spacing.unit * 2,
    color: theme.palette.openTitle
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

export default withStyles(styles)(Signin);
