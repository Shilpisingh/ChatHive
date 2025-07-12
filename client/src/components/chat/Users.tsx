import React, { useEffect } from "react";
import pic from "../../assets/images/pic.jpg";
import { useAuth } from "../../context/AuthProvider";
import { getAllUsers } from "../../api/userService";
import { createConnection } from "../../api/chatService";
import { Contact } from "./types";

const Users = ({
  updateContactList,
}: {
  updateContactList: (id: string, name: string) => void;
}) => {
  const { user } = useAuth();
  const [loading, setLoading] = React.useState(true);
  const [contacts, setContacts] = React.useState<Contact[]>([]);

  useEffect(() => {
    // Fetch users
    const fetchUsers = async () => {
      setLoading(true);
      try {
        const users = await getAllUsers();
        setContacts(users);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching users:", error);
      }
    };
    fetchUsers();
  }, [user]);

  const AddToFriends = async (contactId: string) => {
    // Handle adding contact as a friend
    console.log("Adding contact ID:", contactId);
    try {
      createConnection(contactId);
    } catch (error) {
      console.error("Error creating connection:", error);
    }
  };

  // Show loading state while fetching contacts
  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="sidebar">
      <div className="navbar">
        <span className="logo">Users</span>
      </div>
      <div className="search">
        <div className="searchForm">
          <input type="text" placeholder="Find a user" />
        </div>
      </div>
      <div className="chats">
        {contacts.map((contact) => (
          <div className="userChat" key={contact?._id}>
            <img src={contact.avatar || pic} alt={contact.username} />
            <div className="userChatInfo">
              <span>{contact.username}</span>
              <button
                onClick={() => updateContactList(contact._id, contact.username)}
              >
                Add Friend
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Users;
