import * as React from "react";
import {
  AppBar,
  Box,
  Toolbar,
  IconButton,
  Typography,
  Menu,
  Container,
  Avatar,
  Tooltip,
  MenuItem,
  Badge,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import NotificationsIcon from "@mui/icons-material/Notifications";
import ChatIcon from "@mui/icons-material/Chat";
import { Link, NavLink, useLocation } from "react-router-dom";

const Header = ({ user }) => {
  const [anchorElNav, setAnchorElNav] = React.useState(null);
  const [anchorElUser, setAnchorElUser] = React.useState(null);

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  const { pathname } = useLocation();
  if (user && pathname !== "/sign-in" && pathname !== "/sign-up") {
    return (
      <AppBar position="static" sx={{ zIndex: '1' }} color="">
        <Container maxWidth="xl">
          <Toolbar disableGutters>
            <Link to="/">
              <Typography
                variant="h6"
                noWrap
                component="div"
                sx={{ mr: 2, display: { xs: "none", md: "flex" } }}
                color="#2E4763"
              >
                <span style={{ fontWeight: "200", color: "#5a7291" }}>
                  BALUSHAI
                </span>
                <span style={{ fontWeight: "700" }}>VENDOR</span>
              </Typography>
            </Link>

            <Box sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}>
              <IconButton
                size="large"
                aria-label="account of current user"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                onClick={handleOpenNavMenu}
                color="inherit"
              >
                <MenuIcon />
              </IconButton>
              <Menu
                id="menu-appbar"
                anchorEl={anchorElNav}
                anchorOrigin={{
                  vertical: "bottom",
                  horizontal: "left",
                }}
                keepMounted
                transformOrigin={{
                  vertical: "top",
                  horizontal: "left",
                }}
                open={Boolean(anchorElNav)}
                onClose={handleCloseNavMenu}
                sx={{
                  display: { xs: "block", md: "none" },
                }}
              >
                <IconButton color="primary">
                  <Badge badgeContent={4} color="error">
                    <NotificationsIcon />
                  </Badge>
                </IconButton>
                <IconButton color="primary">
                  <Badge badgeContent={4} color="error">
                    <ChatIcon />
                  </Badge>
                </IconButton>
              </Menu>
            </Box>
            <Typography
              variant="h6"
              noWrap
              component="div"
              sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}
            >
              BALU
            </Typography>

            <Box sx={{ marginLeft: "auto" }}>
              <IconButton
                color="primary"
                sx={{ mr: 2, display: { xs: "none", md: "inline-block" } }}
              >
                <Badge badgeContent={0} color="primary">
                  <ChatIcon />
                </Badge>
              </IconButton>
              <IconButton
                color="primary"
                sx={{ mr: 5, display: { xs: "none", md: "inline-block" } }}
              >
                <Badge badgeContent={4} color="primary">
                  <NotificationsIcon />
                </Badge>
              </IconButton>
              <Tooltip title="PROFILE">
                <IconButton
                  onClick={handleOpenUserMenu}
                  sx={{ p: 0, border: 2, borderColor: "primary.light" }}
                >
                  <Avatar alt="Balushai" src="images/balushai.jpg" />
                </IconButton>
              </Tooltip>
              <Menu
                sx={{ mt: "45px" }}
                id="menu-appbar"
                anchorEl={anchorElUser}
                anchorOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
                keepMounted
                transformOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
                open={Boolean(anchorElUser)}
                onClose={handleCloseUserMenu}
              >
                <MenuItem onClick={handleCloseUserMenu}>
                  <Typography textAlign="center">
                    <NavLink
                      className={({ isActive }) => (isActive ? "text-warning" : "")}
                      to="/account/profile"
                    >
                      Profile
                    </NavLink>
                  </Typography>
                </MenuItem>
                <MenuItem onClick={handleCloseUserMenu}>
                  <Typography textAlign="center">
                  <NavLink
                      className={({ isActive }) => (isActive ? "text-warning" : "")}
                      to="/shop/profile"
                    >
                      Account
                    </NavLink>
                  </Typography>
                </MenuItem>
                <MenuItem onClick={handleCloseUserMenu}>
                  <Typography textAlign="center">
                  <NavLink
                      className={({ isActive }) => (isActive ? "text-warning" : "")}
                      to="/"
                    >
                      Dashboard
                    </NavLink>
                  </Typography>
                </MenuItem>
                <MenuItem onClick={handleCloseUserMenu}>
                  <Typography textAlign="center">
                  <NavLink
                      className={({ isActive }) => (isActive ? "text-warning" : "")}
                      to="/log-out"
                    >
                      Logout
                    </NavLink>
                  </Typography>
                </MenuItem>
              </Menu>
            </Box>
          </Toolbar>
        </Container>
      </AppBar>
    );
  } else if (pathname === "/sign-in" && pathname === "/sign-up") {
    return (
      <Box sx={{ flexGrow: 1 }}>
        <AppBar position="static" color="">
          <Container maxWidth="xl">
            <Toolbar>
              <Link to="/sign-in">
                <Typography
                  variant="h6"
                  noWrap
                  component="div"
                  sx={{ mr: 2, display: { xs: "none", md: "flex" } }}
                  color="#2E4763"
                >
                  <span style={{ fontWeight: "200", color: "#5a7291" }}>
                    BALUSHAI
                  </span>
                  <span style={{ fontWeight: "700" }}>VENDOR</span>
                </Typography>
              </Link>
              <Typography
                variant="h6"
                component="div"
                sx={{ flexGrow: 1 }}
              ></Typography>
              <Link to="/sign-in">
                <Typography
                  variant="h6"
                  noWrap
                  component="div"
                  sx={{ mr: 2, display: { xs: "none", md: "flex" } }}
                  color="#2E4763"
                >
                  <span style={{ fontWeight: "200", color: "#000000" }}>
                    SIGNIN
                  </span>
                </Typography>
              </Link>
              <Link to="/sign-up">
                <Typography
                  variant="h6"
                  noWrap
                  component="div"
                  sx={{ mr: 2, display: { xs: "none", md: "flex" } }}
                  color="#2E4763"
                >
                  <span style={{ fontWeight: "200", color: "#000000" }}>
                    SIGNUP
                  </span>
                </Typography>
              </Link>
            </Toolbar>
          </Container>
        </AppBar>
      </Box>
    );
  } else {
    return null;
  }
};
export default Header;