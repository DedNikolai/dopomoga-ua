import React, {Fragment} from "react";
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Container from '@mui/material/Container';
import AccountProfile from "../../components/AccountProfile/AccountProfile";
import AccountProfileDetails from "../../components/AccountProfileDetails/AccountProfileDetails";


function Profile() {
    
    return (
        <Fragment>
            <Box
                sx={{
                    minHeight: '100%',
                    py: 3
                }}
                >
                <Container maxWidth="lg">
                    <Grid
                    container
                    spacing={3}
                    >
                    <Grid
                        item
                        lg={4}
                        md={4}
                        xs={12}
                    >
                        <AccountProfile />
                    </Grid>
                    <Grid
                        item
                        lg={8}
                        md={8}
                        xs={12}
                    >
                        <AccountProfileDetails />
                    </Grid>
                    </Grid>
                </Container>
            </Box>
        </Fragment>
    )
}

export default Profile;