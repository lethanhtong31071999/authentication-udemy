import { Box, IconButton, Menu, MenuItem } from "@material-ui/core";
import AppBar from "@material-ui/core/AppBar";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogContent from "@material-ui/core/DialogContent";
import { makeStyles } from "@material-ui/core/styles";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import { AccountCircle, Close } from "@material-ui/icons";
import CodeIcon from "@material-ui/icons/Code";
import Login from "features/Auth/components/Login";
import { logoutAction } from "features/Auth/userSlice";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, NavLink } from "react-router-dom";
import Register from "../../features/Auth/components/Register";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
  link: {
    color: "white",
    textDecoration: "none",
  },
  closeBtn: {
    color: theme.palette.grey[500],
    position: "absolute",
    top: theme.spacing(1),
    right: theme.spacing(1),
    cursor: "pointer",
    zIndex: 1,
  },
}));

export default function Header() {
  const MODE = {
    LOGIN: "login",
    REGISTER: "register",
  };
  const classes = useStyles();
  const dispatch = useDispatch();
  const currentUser = useSelector((state) => state.user.current);
  const isLoggedIn = Boolean(currentUser.id);
  const [open, setOpen] = useState(false);
  const [mode, setMode] = useState(MODE.LOGIN);
  const [anchorEl, setAnchorEl] = useState(null);

  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  const handleClickOpenMenu = (e) => {
    setAnchorEl(e.target);
  };
  const handleCloseMenu = () => {
    setAnchorEl(null);
  };
  console.log(typeof logoutAction);
  const handleLogOut = () => {
    const action = logoutAction();
    dispatch(action);
    handleCloseMenu();
  };

  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Toolbar>
          <CodeIcon className={classes.menuButton} />
          <Typography variant="h6" className={classes.title}>
            <Link to="/" className={classes.link}>
              Store
            </Link>
          </Typography>
          {isLoggedIn ? (
            <IconButton color="inherit" onClick={handleClickOpenMenu}>
              <AccountCircle />
            </IconButton>
          ) : (
            <NavLink to="/register" className={classes.link}>
              <Button color="inherit" onClick={handleClickOpen}>
                Login
              </Button>
            </NavLink>
          )}
        </Toolbar>
      </AppBar>

      {/* Menu Item */}
      <Menu
        id="simple-menu"
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleCloseMenu}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "right",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
        getContentAnchorEl={null}
      >
        <MenuItem onClick={handleCloseMenu}>My account</MenuItem>
        <MenuItem onClick={handleLogOut}>Logout</MenuItem>
      </Menu>

      {/* Dialog */}
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="form-dialog-title"
        disableEscapeKeyDown
        fullWidth
      >
        <IconButton
          className={classes.closeBtn}
          onClick={handleClose}
          color="primary"
        >
          <Close />
        </IconButton>
        <DialogContent>
          {mode === MODE.LOGIN && (
            <>
              <Login onCloseDialog={handleClose} />
              <Box textAlign="center">
                <Button color="primary" onClick={() => setMode(MODE.REGISTER)}>
                  Dont have an account? Register here.
                </Button>
              </Box>
            </>
          )}

          {mode === MODE.REGISTER && (
            <>
              <Register onCloseDialog={handleClose} />
              <Box textAlign="center">
                <Button color="primary" onClick={() => setMode(MODE.LOGIN)}>
                  Already have an account? Login here.
                </Button>
              </Box>
            </>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}
