import React, { useState } from "react";
import { Tabs, Tab, AppBar, TabP } from "@material-ui/core";
import FollowGrid from "./FollowGrid";

const ProfileTabs = props => {
  const [tab, setTab] = useState(0);

  const handleChange = (event, value) => {
    setTab(value);
  };

  return (
    <div>
      <AppBar position="static">
        <Tabs
          value={tab}
          variant="fullWidth"
          onChange={handleChange}
          indicatorColor="secondary"
          full
        >
          <Tab label="Posts" />
          <Tab label="Following" />
          <Tab label="Follower" />
        </Tabs>
      </AppBar>
      {tab == 1 && <FollowGrid people={props.user.following} />}
      {tab == 2 && <FollowGrid people={props.user.followers} />}
    </div>
  );
};

export default ProfileTabs;
