import * as React from 'react';
import {Navigate, useLocation, Link} from "react-router-dom";
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
import {userSignIn} from "../../store/actions/user";
import {useForm} from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';

const schema = yup.object({
    email: yup.string().email('Invalid Email').required('Please input email'),
    password: yup.string().required(),
}).required();


function Login({signIn, currentUser}) {
    const location = useLocation();
    const fromPage = location.state?.from?.pathname || '/';
    const {register, handleSubmit, formState: {errors}, reset} = useForm({
        resolver: yupResolver(schema),
        mode: 'onBlur'
    });

    const onSubmit = (data) => {
        signIn(data);
        reset();
    };

    if (currentUser) {
        return <Navigate to={fromPage}  />
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
                    Sign in
                </Typography>
                <Box component="form" onSubmit={handleSubmit(onSubmit)} sx={{ mt: 1 }}>
                    <TextField
                        {...register("email")}
                        margin="normal"
                        required
                        fullWidth
                        id="email"
                        label={errors.email?.message ||"Email Address"}
                        autoComplete="email"
                        error={errors.hasOwnProperty('email')}
                    />
                    <TextField
                        {...register("password")}
                        margin="normal"
                        required
                        fullWidth
                        label={errors.password?.message ||"Password"}
                        type="password"
                        id="password"
                        autoComplete="current-password"
                        error={errors.hasOwnProperty('password')}
                    />
                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        sx={{ mt: 3, mb: 2 }}
                    >
                        Sign In
                    </Button>
                    <Grid container>
                        <Grid item xs>
                            <Link to="/forgot-password" variant="body2">
                                Forgot password?
                            </Link>
                        </Grid>
                        <Grid item>
                            <Link to="/registration" variant="body2">
                                {"Don't have an account? Sign Up"}
                            </Link>
                        </Grid>
                    </Grid>
                </Box>
            </Box>
            <Copyright sx={{ mt: 8, mb: 4 }} />
        </Container>
    );
};

const mapStateToProps = ({user}) => {
    return {
        currentUser: user.currentUser,
    }
};

const mapDispatchToProps = dispatch => {
    return {
        signIn: data => dispatch(userSignIn(data))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Login);
