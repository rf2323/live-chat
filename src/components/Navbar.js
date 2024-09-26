import React, { useContext } from "react";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Grid from "@mui/material/Grid";
import Button from "@mui/material/Button";
import { NavLink } from "react-router-dom";
import { LOGIN_ROUTE } from "../utils/consts";
import { useAuthState } from 'react-firebase-hooks/auth';
import { Context } from '..';
import { signOut } from 'firebase/auth';

const Navbar = () => {
    const { auth } = useContext(Context);
    const [user] = useAuthState(auth);

    const handleLogout = () => {
        signOut(auth);
    };

    return (
        <AppBar position="static" color="secondary">
            <Toolbar>
                <Grid container justifyContent="flex-end">
                    {user
                        ? <Button variant="outlined" onClick={handleLogout}>Log Out</Button>
                        : <NavLink to={LOGIN_ROUTE}>
                            <Button variant="outlined">Login</Button>
                          </NavLink>}
                </Grid>
            </Toolbar>
        </AppBar>
    );
};

export default Navbar;
