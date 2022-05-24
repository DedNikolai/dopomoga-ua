import React, {useLayoutEffect} from 'react';
import {Navigate, Link} from "react-router-dom";
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
import {forgotPassSendEmail, resetSuccessForgotPass} from "../../store/actions/user";
import {useForm} from 'react-hook-form';
import {yupResolver} from '@hookform/resolvers/yup';
import * as yup from 'yup';
import Preloader from '../../components/Preloader/Preloader';

const schema = yup.object({
    email: yup.string().email('Invalid Email').required('Please input email'),
}).required();

function ForgotPass({currentUser, resetComponent, forgotPassSuccess, emailSending, sendEmail}) {
    const {register, handleSubmit, formState: {errors}, reset} = useForm({
        resolver: yupResolver(schema),
        mode: 'onBlur'
    });

    useLayoutEffect(() => {
        resetComponent();
    }, []);

    const onSubmit = (data) => {
        sendEmail(data);
        reset();
    };

    if (currentUser) {
        return <Navigate to="/" />
    }

    if (emailSending) {
        return <Preloader/>
    }

    if (forgotPassSuccess) {
        return <ForgotPassSuccessful/>
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
                    Forgot Password
                </Typography>
                <Box component="form" onSubmit={handleSubmit(onSubmit)} sx={{ mt: 1 }}>
                    <TextField
                        {...register("email")}
                        margin="normal"
                        required
                        fullWidth
                        id="email"
                        autoComplete="email"
                        autoFocus
                        label={errors.email?.message ||"Email Address"}
                        error={errors.hasOwnProperty('email')}
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

const ForgotPassSuccessful = () => {
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
                    We send the latter to your email. Move through instruction ti change pass
                </Typography>
            </Box>
        </Container>
    )
}

const mapStateToProps = ({user}) => {
    return {
        currentUser: user.currentUser,
        forgotPassSuccess: user.forgotPassSendSuccess,
        emailSending: user.forgotPassSending
    }
};

const mapDispatchToProps = (dispatch) => {
    return {
        sendEmail: data => dispatch(forgotPassSendEmail(data)),
        resetComponent: () => dispatch(resetSuccessForgotPass()),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ForgotPass);
