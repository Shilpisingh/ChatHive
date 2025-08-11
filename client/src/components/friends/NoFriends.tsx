// components/NoFriends.tsx
import React from "react";
import { Box, Typography, Button, Stack } from "@mui/material";
import PersonAddIcon from "@mui/icons-material/PersonAdd";
import { useNavigate } from "react-router-dom";

const NoFriends = () => {
  const navigate = useNavigate();

  const handleAddFriend = () => {
    navigate("friends/users");
  };

  return (
    <Box
      height="100%"
      display="flex"
      justifyContent="center"
      alignItems="center"
      flexDirection="column"
      textAlign="center"
      p={3}
    >
      {/*<Stack spacing={2} alignItems="center">
        {/*<span color="text.secondary">You have no friends yet</span> */}
      <Button
        variant="contained"
        color="primary"
        startIcon={<PersonAddIcon />}
        onClick={handleAddFriend}
      >
        Add Friends
      </Button>
    </Box>
  );
};

export default NoFriends;
