import React from "react";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Header from "../components/Header";
import Sidebar from "../components/Sidebar";

const MainLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <>
      <Header />
      <Box
        component="main"
        sx={{
          mt: 8,
          flexGrow: 1,
          p: 3,
        }}
      >
        {children}
      </Box>
    </>
  );
};

export default MainLayout;
