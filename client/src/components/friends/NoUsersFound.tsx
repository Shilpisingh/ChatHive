import React from "react";
import { Box, Typography, Button } from "@mui/material";
import PersonAddIcon from "@mui/icons-material/PersonAdd";
import { useNavigate } from "react-router-dom";

interface NoUsersFoundProps {
  title?: string;
  message?: string;
  showAddFriend?: boolean;
}

const NoUsersFound = ({ title, message, showAddFriend }: NoUsersFoundProps) => {
  const navigate = useNavigate();
  return (
    <Box
      display="flex"
      flexDirection="column"
      alignItems="center"
      justifyContent="center"
      height="300px"
      textAlign="center"
      gap={2}
    >
      <PersonAddIcon sx={{ fontSize: 60, color: "gray" }} />
      <Typography variant="h6" color="textSecondary">
        {title || "No Users Found"}
      </Typography>
      <Typography variant="body2" color="textSecondary">
        {message || "No users available at the moment."}
      </Typography>
      {showAddFriend && (
        <Button
          variant="contained"
          color="primary"
          startIcon={<PersonAddIcon />}
          onClick={() => navigate("friends/users")}
        >
          Add Friends
        </Button>
      )}
    </Box>
  );
};

export default NoUsersFound;
