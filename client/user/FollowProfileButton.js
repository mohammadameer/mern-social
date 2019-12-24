import React from "react";
import { follow, unfollow } from "./api-user";
import { Button } from "@material-ui/core";

const FollowProfileButton = props => {
  const followClick = () => {
    props.onButtonClick(follow);
  };

  const unfollowClick = () => {
    props.onButtonClick(unfollow);
  };
  return (
    <div>
      {props.following ? (
        <Button variant="raised" color="secondary" onClick={unfollowClick}>
          Unfollow
        </Button>
      ) : (
        <Button variant="raised" color="primary" onClick={followClick}>
          Follow
        </Button>
      )}
    </div>
  );
};

export default FollowProfileButton;
