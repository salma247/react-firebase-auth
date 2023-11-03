import React, { useState } from "react";
import { Link } from "react-router-dom";
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  IconButton,
  Menu,
  MenuItem,
  Avatar,
  Skeleton,
} from "@mui/material";
import PersonIcon from "@mui/icons-material/Person";
import LogoutIcon from "@mui/icons-material/Logout";
import PhotoCameraIcon from '@mui/icons-material/PhotoCamera';

import { useAuthState } from "react-firebase-hooks/auth";
import { auth, logout } from "../utils/firebase/auth";

const Navbar = () => {
  const [user, loading, error] = useAuthState(auth);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  const handleMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  if (loading) {
    return (
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            <Skeleton variant="text" width={100} />
          </Typography>
          <Skeleton variant="circular" width={40} height={40} />
        </Toolbar>
      </AppBar>
    );
  }

  if (error) {
    return (
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Error
          </Typography>
          <Skeleton variant="circular" width={40} height={40} />
        </Toolbar>
      </AppBar>
    );
  }

  return (
    <AppBar position="static" variant="outlined">
      <Toolbar>
        <Typography variant="h6" component="div" sx={{ flexGrow: 1, display: "flex", alignItems: "center" }}>
            <PhotoCameraIcon sx={{ mr: 1, color: "black" }} />
          <Link to="/">App</Link>
        </Typography>
        {user ? (
          <>
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleMenu}
              color="inherit"
            >
              <Avatar
                alt={user.displayName ?? "User"}
                src={user.photoURL ?? ""}
              />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorEl}
              anchorOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              open={open}
              onClose={handleClose}
            >
              <MenuItem onClick={handleClose}>
                <PersonIcon sx={{ mr: 1 }} />
                Profile
              </MenuItem>
              <MenuItem onClick={logout} sx={{ color: "red" }}>
                <LogoutIcon sx={{ mr: 1 }} />
                Logout
              </MenuItem>
            </Menu>
          </>
        ) : (
          <>
            <Button color="inherit">
              <Link to="/signup">Sign Up</Link>
            </Button>
            <Button color="inherit">
              <Link to="/login">Login</Link>
            </Button>
          </>
        )}
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
