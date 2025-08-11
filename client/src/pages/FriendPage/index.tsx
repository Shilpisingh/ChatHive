// components/FriendList.tsx
import React, { useEffect, useState } from "react";
import { List, Typography, Box, Tabs, Tab } from "@mui/material";
import NoFriends from "../../components/friends/NoFriends";
import {
  Link,
  Navigate,
  NavLink,
  useNavigate,
  useParams,
} from "react-router-dom";
import {
  acceptFriendRequest,
  getAllFriends,
  getFriendRequest,
} from "../../api/friendService";
import FriendRequestSection from "../../components/friends/FriendRequest";
import Friends from "../../components/friends";
import "./styles.scss";
import Users from "../../components/friends/Users";
import NoUsersFound from "../../components/friends/NoUsersFound";

export type Friend = {
  _id: string;
  username: string;
  email: string;
  avatar?: string;
};

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

const FriendPage = () => {
  const [friends, setFriends] = useState<Friend[] | null>(null);
  const [friendRequests, setFriendRequests] = useState<Friend[] | null>(null);
  const navigate = useNavigate();
  const { tab } = useParams<{ tab: string }>();
  const pageType = tab || "friends";

  useEffect(() => {
    const fetchFriends = async () => {
      const data = await getAllFriends();
      setFriends(data);
    };
    const fetchFriendRequest = async () => {
      const data = await getFriendRequest();
      setFriendRequests(data);
    };
    fetchFriends();
    fetchFriendRequest();
  }, []);

  const handleStartChat = (friendId: string) => {
    console.log("Start chat with", friendId);
    navigate(`/chat/${friendId}`);
    // You can redirect to chat or trigger socket here
  };

  const handleAcceptRequest = async (id: string) => {
    console.log("handle friend request");
    try {
      await acceptFriendRequest(id);
    } catch (error) {
      console.log("error while accepting request", error);
    }
  };

  console.log("pageType", pageType);
  return (
    <Box>
      <Box sx={{ width: "100%" }}>
        <Box sx={{ borderBottom: 1, borderColor: "divider", pb: "20px" }}>
          <Box component="span" className="friend-tab">
            <NavLink to="/friends/me">Friends</NavLink>
          </Box>
          <Box component="span" className="friend-tab">
            <NavLink to="/friends/request">Request</NavLink>
          </Box>
          <Box component="span" className="friend-tab">
            <NavLink to="/friends/users">All Users</NavLink>
          </Box>
        </Box>

        {pageType === "me" &&
          (friends && friends.length > 0 ? (
            <Friends friends={friends} onStartChat={handleStartChat} />
          ) : (
            <NoFriends />
          ))}

        {/* Friend Requests UI */}
        {pageType === "request" &&
          (friendRequests && friendRequests.length ? (
            <FriendRequestSection
              requests={friendRequests}
              onAccept={(id) => handleAcceptRequest(id)}
              onReject={(id) => console.log("Reject", id)}
            />
          ) : (
            <NoUsersFound
              title="No users request found"
              message="Try inviting new users or check back later."
              showAddFriend={true}
            />
          ))}

        {pageType === "users" && <Users />}
      </Box>
    </Box>
  );
};

export default FriendPage;
