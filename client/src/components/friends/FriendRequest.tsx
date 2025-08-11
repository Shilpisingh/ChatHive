import React from "react";
import {
  Avatar,
  Button,
  Card,
  CardActions,
  CardContent,
  Typography,
  Stack,
  Box,
} from "@mui/material";

interface FriendRequest {
  _id: string;
  username: string;
  email: string;
  avatar?: string;
}

interface Props {
  requests: FriendRequest[];
  onAccept: (userId: string) => void;
  onReject: (userId: string) => void;
}

const FriendRequestSection: React.FC<Props> = ({
  requests,
  onAccept,
  onReject,
}) => {
  return (
    <Box>
      <Typography variant="h5" gutterBottom>
        Friend Requests
      </Typography>

      {requests.length === 0 ? (
        <Typography>No friend requests</Typography>
      ) : (
        <Stack spacing={2}>
          {requests.map((user) => (
            <Card key={user._id} variant="outlined">
              <CardContent
                sx={{ display: "flex", alignItems: "center", gap: 2 }}
              >
                <Avatar src={user.avatar || "/default-avatar.png"} />
                <Box>
                  <Typography variant="subtitle1">{user.username}</Typography>
                  <Typography variant="body2" color="text.secondary">
                    {user.email}
                  </Typography>
                </Box>
              </CardContent>
              <CardActions>
                <Button
                  size="small"
                  onClick={() => onAccept(user._id)}
                  color="primary"
                >
                  Accept
                </Button>
                <Button
                  size="small"
                  onClick={() => onReject(user._id)}
                  color="error"
                >
                  Reject
                </Button>
              </CardActions>
            </Card>
          ))}
        </Stack>
      )}
    </Box>
  );
};

export default FriendRequestSection;
