import { Route, Routes } from "react-router-dom";
import Navbar from "./components/Navbar";
import SignUp from "./pages/SignUp";
import Login from "./pages/Login";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import { blue, blueGrey } from "@mui/material/colors";
import ResetPassword from "./pages/ResetPassword";
import Home from "./pages/Home";

const theme = createTheme({
  palette: {
    primary: {
      main: blueGrey[600],
    },
    secondary: {
      main: blue[500],
    },
  },

  typography: {
    fontFamily: "sans-serif",
  },
});

function App() {
  return (
    <ThemeProvider theme={theme}>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/login" element={<Login />} />
        <Route path="/reset-password" element={<ResetPassword />} />
      </Routes>
    </ThemeProvider>
  )
}

export default App
