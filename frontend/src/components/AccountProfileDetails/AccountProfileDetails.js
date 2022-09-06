import React from 'react';
import {
  CardContent,
  CardHeader,
  Divider,
  TextField
} from '@material-ui/core';
import Card from '@mui/material/Card';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import { connect } from 'react-redux';
import {updateUser} from "../../store/actions/user";
import {useParams} from "react-router";
import {useForm, Controller, useFormState} from 'react-hook-form';

const AccountProfileDetails = ({profile, editProfile}) => {
  const params = useParams();

  const {handleSubmit, control, reset} = useForm({
    defaultValues: {...profile}
  });
    const { errors } = useFormState({ 
        control
    })

    const onSubmit = (data) => {
        editProfile(data);
    };

    return (
        <form
            autoComplete="off"
            noValidate
            onSubmit={handleSubmit(onSubmit)}
        >
        <Card>
            <CardHeader
                subheader="The information can be edited"
                title={profile.firstName + ' ' + profile.lastName}
                />
            <Divider />
            <CardContent>
            <Grid
                container
                spacing={3}
            >
                <Grid
                item
                md={6}
                xs={12}
                >
                    <Controller 
                        control={control}
                        name="firstName"
                        rules={{ 
                                required: 'Введіть імя'
                                }}
                                render={({
                                field: { onChange, value},
                                }) => (
                                    <TextField
                                        value={value}
                                        onChange={onChange}
                                        fullWidth
                                        id="firstName"
                                        autoFocus
                                        label={errors.firstName?.message ||"Імя"}
                                        error={!!errors.firstName?.message}
                                    /> 
                                )}
                     />
                </Grid>
                <Grid
                item
                md={6}
                xs={12}
                >
                    <Controller 
                        control={control}
                        name="lastName"
                        rules={{ 
                                required: 'Введіть прізвище'
                                }}
                                render={({
                                field: { onChange, value},
                                }) => (
                                    <TextField
                                        value={value}
                                        onChange={onChange}
                                        fullWidth
                                        id="lastName"
                                        autoFocus
                                        label={errors.lastName?.message ||"Прізвище"}
                                        error={!!errors.lastName?.message}
                                    /> 
                                )}
                     />
                </Grid>
                <Grid
                item
                md={6}
                xs={12}
                >
                    <Controller 
                        control={control}
                        name="email"
                        rules={{ 
                                required: 'Введіть enail'
                                }}
                                render={({
                                field: { onChange, value},
                                }) => (
                                    <TextField
                                        value={value}
                                        onChange={onChange}
                                        fullWidth
                                        id="email"
                                        autoFocus
                                        label={errors.email?.message ||"Імя"}
                                        error={!!errors.email?.message}
                                    /> 
                                )}
                     />
                </Grid>
                <Grid
                item
                md={6}
                xs={12}
                >
                    <Controller 
                        control={control}
                        name="phone"
                        rules={{ 
                                required: 'Введіть телефон'
                                }}
                                render={({
                                field: { onChange, value},
                                }) => (
                                    <TextField
                                        value={value}
                                        onChange={onChange}
                                        fullWidth
                                        id="phone"
                                        autoFocus
                                        label={errors.phone?.message ||"Імя"}
                                        error={!!errors.phone?.message}
                                    /> 
                                )}
                     />
                </Grid>
            </Grid>
            </CardContent>
            <Divider />
            <Box
            sx={{
                display: 'flex',
                justifyContent: 'flex-end',
                p: 2
            }}
            >
            <Button
                color="primary"
                variant="contained"
                type='submit'
            >
                Save
            </Button>
            </Box>
        </Card>
        </form>
    );
};

const mapStateToProps = ({user}) => ({
    profile: user.currentUser
});

const mapDispatchToProps = (dispatch) => {
  return {
    editProfile: (data) => dispatch(updateUser(data)),
  }  
};

export default connect(mapStateToProps, mapDispatchToProps)(AccountProfileDetails);
