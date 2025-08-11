// components/AllUsersList.tsx
import React, { useEffect, useState } from "react";
import {
  Avatar,
  Box,
  Button,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Typography,
  Tooltip,
  Snackbar,
  Fade,
} from "@mui/material";
import {
  PersonAdd,
  CheckCircle,
  Cancel,
  Clear,
  RemoveCircle,
} from "@mui/icons-material";
import { getAllUsers } from "../../api/userService";
import {
  acceptFriendRequest,
  cancelFriendRequest,
  rejectFriendRequest,
  sendFriendRequest,
} from "../../api/friendService";
import NoFriends from "./NoFriends";
import NoUsersFound from "./NoUsersFound";
import { createChatConnection } from "../../api/chatService";

type User = {
  _id: string;
  username: string;
  email: string;
  avatar?: string;
  isFriend?: boolean; // optional: to check if already friend
  isRequestSent?: boolean; // optional: to check if request is sent
  isRequestReceived?: boolean; // optional: to check if request is received
};

const Users = () => {
  const [users, setUsers] = useState<User[] | null>(null);
  const [loading, setLoading] = useState(false);
  const [sucessMessage, setSucessMessage] = useState("");

  useEffect(() => {
    const allUsers = async () => {
      try {
        setLoading(true);
        const users = await getAllUsers();
        setUsers(users);
        setLoading(false);
      } catch (error) {
        console.log("USER PAGE: error while fetching users", error);
        setLoading(false);
      }
    };
    allUsers();
  }, []);

  const handleSendFriendRequest = async (userId: string) => {
    console.log("Add friend request to", userId);
    try {
      await sendFriendRequest(userId);
      const updatedUsers = users?.map((user) => {
        if (user._id === userId) {
          return { ...user, isRequestReceived: true };
        }
        return user;
      });
      setUsers(updatedUsers || []);
      setSucessMessage("Friend request sent successfully!");
    } catch (error) {
      console.log("ERROR: friend request send", error);
    }
  };

  const handleCancelFriendRequest = async (userId: string) => {
    console.log("cancel friend request to", userId);
    try {
      await cancelFriendRequest(userId);
      const updatedUsers = users?.map((user) => {
        if (user._id === userId) {
          return { ...user, isRequestReceived: false };
        }
        return user;
      });
      setUsers(updatedUsers || []);
      setSucessMessage("Friend request cancelled successfully!");
    } catch (error) {
      console.log("ERROR: friend request send", error);
    }
  };

  const handleAcceptFriendRequest = async (userId: string) => {
    console.log("Add friend request to", userId);
    try {
      await acceptFriendRequest(userId);
      const updatedUsers = users?.map((user) => {
        if (user._id === userId) {
          return {
            ...user,
            isRequestReceived: false,
            isFriend: true,
            isRequestSent: false,
          };
        }
        return user;
      });
      createChatConnection(userId); // Create chat connection after accepting friend request
      setUsers(updatedUsers || []);
      setSucessMessage("Friend request accepted successfully!");
    } catch (error) {
      console.log("ERROR: friend request send", error);
    }
  };

  const handleRejectFriendRequest = async (userId: string) => {
    console.log("Reject friend request from", userId);
    try {
      await rejectFriendRequest(userId);
      const updatedUsers = users?.map((user) => {
        if (user._id === userId) {
          return { ...user, isRequestReceived: false, isRequestSent: false };
        }
        return user;
      });
      setUsers(updatedUsers || []);
      setSucessMessage("Friend request rejected successfully!");
    } catch (error) {
      console.log("ERROR: friend request reject", error);
    }
  };

  const handleRemoveFriend = async (userId: string) => {
    console.log("Remove friend", userId);
    try {
      // Call API to remove friend
      // Assuming you have an API endpoint for this
      const updatedUsers = users?.map((user) => {
        if (user._id === userId) {
          return { ...user, isFriend: false };
        }
        return user;
      });
      setUsers(updatedUsers || []);
      setSucessMessage("Friend removed successfully!");
    } catch (error) {
      console.log("ERROR: remove friend", error);
    }
  };

  const handleClose = () => {
    setSucessMessage("");
  };

  if (users && users.length === 0) {
    return (
      <Box p={3} textAlign="center">
        <Typography>No users found.</Typography>
      </Box>
    );
  }

  return (
    <>
      {users && users.length ? (
        <Box p={2}>
          <Snackbar
            open={sucessMessage !== ""}
            autoHideDuration={5000}
            onClose={handleClose}
            message={sucessMessage}
            slots={{ transition: Fade }}
            anchorOrigin={{ vertical: "top", horizontal: "center" }}
          />
          <List>
            {users.map((user) => (
              <ListItem key={user._id} divider>
                <ListItemAvatar>
                  <Avatar src={user.avatar}>
                    {!user.avatar && user.username.charAt(0).toUpperCase()}
                  </Avatar>
                </ListItemAvatar>
                <ListItemText primary={user.username} secondary={user.email} />
                {user.isFriend ? (
                  <Tooltip title="remove Friend">
                    <Button
                      variant="outlined"
                      color="error"
                      startIcon={<Cancel />}
                      onClick={() => handleRemoveFriend(user._id)}
                    >
                      Remove Friend
                    </Button>
                  </Tooltip>
                ) : user.isRequestReceived ? (
                  <Tooltip title="Add Friend">
                    <Button
                      variant="outlined"
                      color="error"
                      startIcon={<Cancel />}
                      onClick={() => handleCancelFriendRequest(user._id)}
                    >
                      Cancel Request
                    </Button>
                  </Tooltip>
                ) : user.isRequestSent ? (
                  <>
                    <Tooltip title="Accept Friend Request">
                      <Button
                        variant="outlined"
                        startIcon={<CheckCircle />}
                        onClick={() => handleAcceptFriendRequest(user._id)}
                      >
                        Accept Request
                      </Button>
                    </Tooltip>
                    <Tooltip title="Reject Friend Request" sx={{ ml: 1 }}>
                      <Button
                        variant="outlined"
                        color="error"
                        startIcon={<Cancel />}
                        onClick={() => handleRejectFriendRequest(user._id)}
                      >
                        Reject Request
                      </Button>
                    </Tooltip>
                  </>
                ) : (
                  <Tooltip title="Add Friend">
                    <Button
                      variant="outlined"
                      startIcon={<PersonAdd />}
                      onClick={() => handleSendFriendRequest(user._id)}
                    >
                      Add Friend
                    </Button>
                  </Tooltip>
                )}
              </ListItem>
            ))}
          </List>
        </Box>
      ) : (
        <NoUsersFound />
      )}
    </>
  );
};

export default Users;
