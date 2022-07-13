import React, {useState} from 'react';
import {
  CardContent,
  CardHeader,
  Divider,
  TextField
} from '@material-ui/core';
import Card from '@mui/material/Card';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import { connect } from 'react-redux';
import {updateUser} from "../../store/actions/user";
import {useParams} from "react-router";
import { Navigate } from 'react-router-dom';
import {useForm} from 'react-hook-form';
import {yupResolver} from '@hookform/resolvers/yup';
import * as yup from 'yup';

const schema = yup.object({
    email: yup.string().email('Invalid Email').required('Please input email'),
    firstName: yup.string().required('Please input firstName').min(2, 'To short').max(20, 'To long'),
    lastName: yup.string().required('Please input lastName').min(2, 'To short').max(20, 'To long'),
    phone: yup.string().required('Please input phone')
}).required();

const AccountProfileDetails = ({profile, editProfile}) => {
  const {firstName, lastName, phone, email} = profile;
  const params = useParams();
  const id = +params.id;
  const [created, setCreated] = useState(false);

  const {register, handleSubmit, formState: {errors}, reset} = useForm({
    resolver: yupResolver(schema),
    mode: 'onBlur'
    });

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
            title={firstName + ' ' + lastName}
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
                <TextField
                    {...register("firstName")}
                    required
                    fullWidth
                    id="firstName"
                    label={errors.firstName?.message ||"FirstName"}
                    error={errors.hasOwnProperty('firstName')}
                    variant='outlined'
                    defaultValue={firstName}
                />
                </Grid>
                <Grid
                item
                md={6}
                xs={12}
                >
                <TextField
                {...register("lastName")}
                required
                fullWidth
                id="lastName"
                autoComplete="family-name"
                label={errors.lastName?.message ||"Last Name"}
                error={errors.hasOwnProperty('lastName')}
                variant='outlined'
                defaultValue={lastName}
                />
                </Grid>
                <Grid
                item
                md={6}
                xs={12}
                >
                <TextField
                    {...register("email")}
                    required
                    fullWidth
                    id="email"
                    autoComplete="email"
                    label={errors.email?.message ||"Email Address"}
                    error={errors.hasOwnProperty('email')}
                    variant='outlined'
                    defaultValue={email}
                />
                </Grid>
                <Grid
                item
                md={6}
                xs={12}
                >
                <TextField
                    {...register("phone")}
                    required
                    fullWidth
                    id="pnone"
                    autoComplete="phone"
                    label={errors.phone?.message ||"Phone"}
                    error={errors.hasOwnProperty('phone')}
                    variant='outlined'
                    defaultValue={phone}
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
