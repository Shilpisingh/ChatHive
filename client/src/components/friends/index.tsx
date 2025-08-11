import React from "react";
import {
  ListItem,
  ListItemAvatar,
  Avatar,
  ListItemText,
  IconButton,
  Tooltip,
  List,
  Typography,
} from "@mui/material";
import ChatIcon from "@mui/icons-material/Chat";
import NoFriends from "./NoFriends";

type Props = {
  friends: {
    _id: string;
    username: string;
    email: string;
    avatar?: string;
  }[];
  onStartChat: (friendId: string) => void;
};

const Friends: React.FC<Props> = ({ friends, onStartChat }) => {
  return (
    <>
      <List>
        {friends.map((friend) => (
          <ListItem
            secondaryAction={
              <Tooltip title="Start Chat">
                <IconButton edge="end" onClick={() => onStartChat(friend._id)}>
                  <ChatIcon />
                </IconButton>
              </Tooltip>
            }
          >
            <ListItemAvatar>
              <Avatar src={friend.avatar}>
                {!friend.avatar && friend.username.charAt(0).toUpperCase()}
              </Avatar>
            </ListItemAvatar>
            <ListItemText primary={friend.username} secondary={friend.email} />
          </ListItem>
        ))}
      </List>
    </>
  );
};

export default Friends;
