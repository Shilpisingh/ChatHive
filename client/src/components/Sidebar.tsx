import React from "react";
import Drawer from "@mui/material/Drawer";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import Divider from "@mui/material/Divider";
import Toolbar from "@mui/material/Toolbar";
import { Link } from "react-router-dom";
const drawerWidth = 240;

const Sidebar: React.FC = () => {
  return (
    <Drawer
      variant="permanent"
      sx={{
        width: drawerWidth,
        flexShrink: 0,
        [`& .MuiDrawer-paper`]: {
          width: drawerWidth,
          boxSizing: "border-box",
        },
      }}
    >
      <Toolbar />
      <Divider />
      <List>
        <ListItem>
          <Link to="/">Home</Link>
          <Link to="/profile">Profile</Link>
          <Link to="/chat">Chat</Link>
        </ListItem>
      </List>
    </Drawer>
  );
};

export default Sidebar;
