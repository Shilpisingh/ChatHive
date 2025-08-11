import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import HomePage from "./pages/HomePage";
import LoginPage from "./pages/LoginPage";
import ChatPage from "./pages/ChatPage";
import SignupPage from "./pages/SignUpPage";
import ProtectedRoute from "./router/ProtectedRoute";
import AuthProvider from "./context/AuthProvider";
import PublicRoute from "./router/PublicRoute";
import NotFound from "./pages/NotFound";
import MainLayout from "./layout/MainLayout";
import FriendPage from "./pages/FriendPage";
import { createTheme, ThemeProvider } from "@mui/material";
import ProfilePage from "./pages/ProfilePage";
//[TODO] == error boundary

const theme = createTheme({
  palette: {
    primary: {
      main: "#3e3c61",
      contrastText: "#fff",
    },
  },
});
function App() {
  return (
    <ThemeProvider theme={theme}>
      <AuthProvider>
        <BrowserRouter>
          <Routes>
            <Route element={<PublicRoute />}>
              <Route path="/signup" element={<SignupPage />} />
              <Route path="/login" element={<LoginPage />} />
            </Route>
            <Route
              path="/"
              element={
                <ProtectedRoute>
                  <MainLayout>
                    <HomePage />
                  </MainLayout>
                </ProtectedRoute>
              }
            />
            <Route
              path="/home"
              element={
                <ProtectedRoute>
                  <MainLayout>
                    <HomePage />
                  </MainLayout>
                </ProtectedRoute>
              }
            />
            <Route
              path="/chat"
              element={
                <ProtectedRoute>
                  <MainLayout>
                    <ChatPage />
                  </MainLayout>
                </ProtectedRoute>
              }
            />
            <Route
              path="/chat/:id"
              element={
                <ProtectedRoute>
                  <MainLayout>
                    <ChatPage />
                  </MainLayout>
                </ProtectedRoute>
              }
            />
            <Route
              path="/friends"
              element={
                <ProtectedRoute>
                  <MainLayout>
                    <FriendPage />
                  </MainLayout>
                </ProtectedRoute>
              }
            />
            <Route
              path="/friends/:tab"
              element={
                <ProtectedRoute>
                  <MainLayout>
                    <FriendPage />
                  </MainLayout>
                </ProtectedRoute>
              }
            />
            <Route
              path="/profile"
              element={
                <ProtectedRoute>
                  <MainLayout>
                    <ProfilePage />
                  </MainLayout>
                </ProtectedRoute>
              }
            />
            <Route
              path="/profile/:id"
              element={
                <ProtectedRoute>
                  <MainLayout>
                    <ProfilePage />
                  </MainLayout>
                </ProtectedRoute>
              }
            />
            {/*<Route element={<ProtectedRoute />}>
            <MainLayout>
              <Route path="/" element={<HomePage />} />
              <Route path="/home" element={<HomePage />} />
              <Route path="/chat" element={<ChatPage />} />
            </MainLayout>
          </Route>*/}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </AuthProvider>
    </ThemeProvider>
  );
}

export default App;
