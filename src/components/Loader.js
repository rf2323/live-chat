import React from 'react';
import { Box, Button, Container, Grid } from '@mui/material';

const Loader = () => {
    return (
        <Container>
            <Grid container style={{ height: window.innerHeight - 50 }} alignItems={"center"} justifyContent={"center"}>
                <Grid>
                    <div class="lds-circle"><div></div></div>
                </Grid>
            </Grid>
        </Container>
    );
};

export default Loader;