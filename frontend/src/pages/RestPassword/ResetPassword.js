import React, {useLayoutEffect} from 'react';
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
import {saveNewPass, resetNewPassPage} from "../../store/actions/user";
import {useForm} from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import {useSearchParams} from "react-router-dom/index";
import Preloader from '../../components/Preloader/Preloader';

const schema = yup.object({
    password: yup.string().required(),
    confirmPassword: yup.string().oneOf([yup.ref('password'), null], 'Passwords must match'),
}).required();


function ResetPassword({currentUser, savePassword, updatePassLoading, passUpdatedSuccess, resetPage}) {
    const [searchParams] = useSearchParams();
    const token = searchParams.get('token');

    useLayoutEffect(() => {
        resetPage();
    }, []);

    const {register, handleSubmit, formState: {errors}, reset} = useForm({
        resolver: yupResolver(schema),
        mode: 'onBlur'
    });

    const onSubmit = (data) => {
        savePassword({...data, token});
        reset();
    };

    if (currentUser) {
        return <Navigate to='/'  />
    }

    if (updatePassLoading) {
        return <Preloader />
    }

    if (passUpdatedSuccess) {
        return <ResetPassSuccessful/>
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
                    Reset Password
                </Typography>
                <Box component="form" onSubmit={handleSubmit(onSubmit)} sx={{ mt: 1 }}>
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
                    <TextField
                        {...register("confirmPassword")}
                        margin="normal"
                        required
                        fullWidth
                        label={errors.confirmPassword?.message ||"Confirm Password"}
                        type="password"
                        id="reset-password"
                        autoComplete="confirm-password"
                        error={errors.hasOwnProperty('confirmPassword')}
                    />
                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        sx={{ mt: 3, mb: 2 }}
                    >
                        Send
                    </Button>
                    <Grid container>
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

const ResetPassSuccessful = () => {
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
                   Password was changed Successfully
                </Typography>
            </Box>
        </Container>
    )
}

const mapStateToProps = ({user}) => {
    return {
        currentUser: user.currentUser,
        updatePassLoading: user.resetPassLoading,
        passUpdatedSuccess: user.resetPassSuccess
    }
};

const mapDispatchToProps = dispatch => {
    return {
        savePassword: data => dispatch(saveNewPass(data)),
        resetPage: () => dispatch(resetNewPassPage())
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ResetPassword);
