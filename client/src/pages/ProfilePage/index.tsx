import React from "react";
import {
  Avatar,
  Box,
  Button,
  Card,
  CardContent,
  Container,
  Typography,
  Divider,
} from "@mui/material";

const ProfilePage: React.FC = () => {
  const user = {
    name: "John Doe",
    email: "johndoe@example.com",
    avatar: "/uploads/avatar.jpg", // replace with dynamic path
    bio: "Full Stack Developer | React • Node • MongoDB",
  };

  return (
    <Container maxWidth="sm" sx={{ mt: 6 }}>
      <Card elevation={3} sx={{ borderRadius: 4, overflow: "hidden" }}>
        <Box
          display="flex"
          flexDirection="column"
          alignItems="center"
          justifyContent="center"
          p={4}
        >
          <Avatar
            alt={user.name}
            src={user.avatar}
            sx={{ width: 100, height: 100, mb: 2 }}
          />
          <Typography variant="h5" fontWeight={600}>
            {user.name}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {user.email}
          </Typography>
          <Typography
            variant="body1"
            sx={{ mt: 2, color: "text.secondary", textAlign: "center" }}
          >
            {user.bio}
          </Typography>

          <Button
            variant="contained"
            color="primary"
            size="medium"
            sx={{ mt: 3, px: 4, borderRadius: 2 }}
          >
            Edit Profile
          </Button>
        </Box>

        <Divider />

        <CardContent>
          {/* Extend this section for stats, settings, or more */}
          <Typography variant="subtitle2" color="text.secondary">
            Member since: Jan 2024
          </Typography>
        </CardContent>
      </Card>
    </Container>
  );
};

export default ProfilePage;
