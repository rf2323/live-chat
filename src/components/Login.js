import { Box, Button, Container, Grid } from '@mui/material';
import React, { useContext } from 'react';
import { Context } from '..';
import { GoogleAuthProvider, signInWithPopup } from 'firebase/auth';

const Login = () => {
    const { auth } = useContext(Context);

    const login = async () => {
        const provider = new GoogleAuthProvider();
        signInWithPopup(auth, provider).then((result) => {
            const user = result.user;
            console.log(user);
        }).catch((error) => {
            console.error("Error during login:", error);
        });
    };

    return (
        <Container>
            <Grid container style={{ height: window.innerHeight - 50 }} alignItems={"center"} justifyContent={"center"}>
                <Grid>
                    <Box p={5} onClick={login}>
                        <Button variant='outlined'>
                            Log in with Google Account
                        </Button>
                    </Box>
                </Grid>
            </Grid>
        </Container>
    );
};

export default Login;
