import React from "react";
import { useAuth } from "../../context/AuthProvider";

const HomePage = () => {
  const { user } = useAuth();
  return (
    <div>
      <h1>HOME PAGE{user?._id}</h1>
    </div>
  );
};

export default HomePage;
