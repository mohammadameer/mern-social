import React, { useState, useEffect } from "react";
import auth from "../auth/auth-helper";
import { create } from "./api-post";
import {
  Card,
  Avatar,
  CardHeader,
  TextField,
  CardContent,
  withStyles,
  IconButton,
  Typography,
  Icon,
  CardActions,
  Button
} from "@material-ui/core";
import { PhotoCamera } from "@material-ui/icons";

const NewPost = props => {
  const [state, setState] = useState({
    text: "",
    photo: "",
    user: {},
    error: ""
  });

  const jwt = auth.isAuthenticated();

  useEffect(() => {
    setState({ ...state, user: auth.isAuthenticated().user });
  }, []);

  const handleChange = name => event => {
    const value = name == "photo" ? event.target.files[0] : event.target.value;
    setState({ ...state, [name]: value });
  };

  const clickPost = () => {
    const user = {
      text: state.text || undefined,
      photo: state.photo || undefined
    };
    var postData = new FormData();
    for (let name in user) {
      postData.append(name, user[name]);
    }
    console.log(...postData);
    create(
      {
        userId: jwt.user._id
      },
      {
        t: jwt.token
      },
      postData
    ).then(data => {
      if (data.error) return setState({ ...state, error: data.error });
      setState({ ...state, text: "", photo: "" });
      props.addUpdate(data);
    });
  };

  const { classes } = props;

  return (
    <div className={classes.root}>
      <Card className={classes.card}>
        <CardHeader
          avatar={<Avatar src={"/api/users/photo/" + state.user._id} />}
          title={state.user.name}
          className={classes.cardHeader}
        />
        <CardContent className={classes.cardContent}>
          <TextField
            placeholder="Share your thoughts ..."
            multiline
            rows={3}
            value={state.text}
            onChange={handleChange("text")}
            className={classes.textField}
            margin="normal"
          />
          <input
            accept="image/*"
            onChange={handleChange("photo")}
            className={classes.input}
            id="icon-button-file"
            type="file"
          />
          <label htmlFor="icon-button-file">
            <IconButton
              color="secondary"
              className={classes.photoButton}
              component="span"
            >
              <PhotoCamera />
            </IconButton>
          </label>
          <span className={classes.filename}>
            {state.photo ? state.photo.name : ""}
          </span>
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
            variant="raised"
            disabled={!state.text}
            onClick={clickPost}
            className={classes.submit}
          >
            POST
          </Button>
        </CardActions>
      </Card>
    </div>
  );
};

const styles = theme => ({
  root: {
    backgroundColor: "#efefef",
    padding: `${theme.spacing.unit * 3}px 0px 1px`
  },
  card: {
    maxWidth: 600,
    margin: "auto",
    marginBottom: theme.spacing.unit * 3,
    backgroundColor: "rgba(65, 150, 136, 0.09)",
    boxShadow: "none"
  },
  cardContent: {
    backgroundColor: "white",
    paddingTop: 0,
    paddingBottom: 0
  },
  cardHeader: {
    paddingTop: 8,
    paddingBottom: 8
  },
  photoButton: {
    height: 30,
    marginBottom: 5
  },
  input: {
    display: "none"
  },
  textField: {
    marginLeft: theme.spacing.unit * 2,
    marginRight: theme.spacing.unit * 2,
    width: "90%"
  },
  submit: {
    margin: theme.spacing.unit * 2
  },
  filename: {
    verticalAlign: "super"
  }
});

export default withStyles(styles)(NewPost);
