import React, {useLayoutEffect} from 'react';
import {Link, Navigate} from "react-router-dom";
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import Copyright from '../../components/Copyright/Copyright';
import {connect} from 'react-redux';
import {resetSignUp, userSignUp} from "../../store/actions/user";
import {useForm} from 'react-hook-form';
import {yupResolver} from '@hookform/resolvers/yup';
import * as yup from 'yup';
import Preloader from '../../components/Preloader/Preloader';

const schema = yup.object({
    email: yup.string().email('Invalid Email').required('Please input email'),
    password: yup.string().required('Please input password').min(6, 'To short').max(20, 'To long'),
    firstName: yup.string().required('Please input firstName').min(2, 'To short').max(20, 'To long'),
    lastName: yup.string().required('Please input lastName').min(2, 'To short').max(20, 'To long')
}).required();

function Registration({currentUser, signUp, resetComponent, userSigningUp, newUserCreated}) {
    const {register, handleSubmit, formState: {errors}, reset} = useForm({
        resolver: yupResolver(schema),
        mode: 'onBlur'
    });

    useLayoutEffect(() => {
        resetComponent();
    }, []);

    const onSubmit = (data) => {
        signUp(data);
        reset();
    };

    if (currentUser) {
        return <Navigate to="/" />
    }

    if (userSigningUp) {
        return <Preloader />
    }

    if (newUserCreated) {
        return <RegistrSuccessful/>
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
                <Typography component="h1" variant="h5">
                    Sign up
                </Typography>
                <Box component="form" onSubmit={handleSubmit(onSubmit)} sx={{ mt: 3 }}>
                    <Grid container spacing={2}>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                {...register("firstName")}
                                autoComplete="given-name"
                                required
                                fullWidth
                                id="firstName"
                                autoFocus
                                label={errors.firstName?.message ||"First Name"}
                                error={errors.hasOwnProperty('firstName')}
                            />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                {...register("lastName")}
                                required
                                fullWidth
                                id="lastName"
                                autoComplete="family-name"
                                label={errors.lastName?.message ||"Last Name"}
                                error={errors.hasOwnProperty('lastName')}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                {...register("email")}
                                required
                                fullWidth
                                id="email"
                                autoComplete="email"
                                label={errors.email?.message ||"Email Address"}
                                error={errors.hasOwnProperty('email')}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                {...register("password")}
                                required
                                fullWidth
                                label="Password"
                                type="password"
                                id="password"
                                autoComplete="new-password"
                                error={errors.hasOwnProperty('password')}
                                label={errors.password?.message ||"Password"}
                            />
                        </Grid>
                    </Grid>
                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        sx={{ mt: 3, mb: 2 }}
                    >
                        Sign Up
                    </Button>
                    <Grid container justifyContent="flex-end">
                        <Grid item>
                            <Link to="/login" variant="body2">
                                Already have an account? Sign in
                            </Link>
                        </Grid>
                    </Grid>
                </Box>
            </Box>
            <Copyright sx={{ mt: 5 }} />
        </Container>
    );
};

const RegistrSuccessful = () => {
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
                    New user was created successfully, we send the latter to your email. Please check it and confirm registration
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
    )
};

const mapStateToProps = ({user}) => {
    return {
        currentUser: user.currentUser,
        userSigningUp: user.signingUpOfNewUser,
        newUserCreated: user.newUserRegistered
    }
};

const mapDispatchToProps = (dispatch) => {
    return {
        signUp: data => dispatch(userSignUp(data)),
        resetComponent: () => dispatch(resetSignUp()),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Registration);