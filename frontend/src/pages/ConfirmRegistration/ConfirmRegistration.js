import React, {useEffect} from 'react';
import {Link, Navigate, useSearchParams} from "react-router-dom";
import Avatar from '@mui/material/Avatar';
import CssBaseline from '@mui/material/CssBaseline';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import {connect} from 'react-redux';
import {confirmUser} from "../../store/actions/user";
import Preloader from '../../components/Preloader/Preloader';


function ConfirmRegistration({currentUser, userConfirming, confirmRegistration}) {
    const [searchParams] = useSearchParams();
    const token = searchParams.get('token');

    useEffect(() => {
        confirmRegistration(token);
    }, []);

    if (currentUser) {
        return <Navigate to="/" />
    }

    if (userConfirming) {
        return <Preloader />
    }

    return (
        <Container component="main" maxWidth="xs">
            <CssBaseline />
            <Box
                sx={{
                    marginTop: 8,
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                }}
            >
                <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
                    <LockOutlinedIcon />
                </Avatar>
                <Typography component="h3" variant="h5" sx={{textAlign: 'center'}}>
                    User was confirmed!
                </Typography>
                <Grid container justifyContent="center">
                    <Grid item>
                        <Link to="/login" variant="body2">
                            Sign in
                        </Link>
                    </Grid>
                </Grid>
            </Box>
        </Container>
    );
};

const mapStateToProps = ({user}) => {
    return {
        currentUser: user.currentUser,
        userConfirming: user.userConfirming,
    }
};

const mapDispatchToProps = (dispatch) => {
    return {
        confirmRegistration: data => dispatch(confirmUser(data)),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ConfirmRegistration);