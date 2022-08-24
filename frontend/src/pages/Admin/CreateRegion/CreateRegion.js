import React, {useState} from 'react';
import {Navigate} from "react-router-dom";
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import {connect} from 'react-redux';
import {createRegion} from "../../../store/actions/region";
import {Controller, useForm, useFormState} from 'react-hook-form';
import Preloader from '../../../components/Preloader/Preloader';
import {useTheme} from '@mui/material/styles';

function CreateRegion(props) {
    const {create} = props;
    const [createed, setCreated] = useState(false);
    const [creating, setCreating] = useState(false);
    const {handleSubmit, reset, control} = useForm({
        defaultValues: {
            regionName: '',
        }
    });
    const theme = useTheme();

    const { errors } = useFormState({
        control
    });

    const onSubmit = (data) => {
        setCreating(true);
        create(data, setCreated);
        reset();
    };

    if (createed) {
        return <Navigate to={`/admin/regions`} />
    }

    if (creating) {
        return <Preloader />
    }

    return (
        <Container component="main" maxWidth="xs">
            <Box
                sx={{
                    marginTop: 8,
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    background: '#fff',
                    padding: '20px',
                    boxShadow: theme.boxShadow
                }}
            >
                <Typography component="h1" variant="h5">
                    Створити Регіон
                </Typography>
                <Box component="form" onSubmit={handleSubmit(onSubmit)} sx={{ mt: 3 }}>
                    <Grid container spacing={2}>
                        <Grid item xs={12} sm={12}>
                            <Controller
                                control={control}
                                name="regionName"
                                rules={{
                                    required: 'Ведить назву'
                                }}
                                render={({
                                             field: { onChange, value},
                                         }) => (
                                    <TextField
                                        value={value}
                                        autoComplete="given-name"
                                        onChange={onChange}
                                        fullWidth
                                        id="title"
                                        autoFocus
                                        label={errors.title?.regionName ||"Назва"}
                                        error={!!errors.title?.regionName}
                                    />
                                )}
                            />
                        </Grid>
                    </Grid>
                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        sx={{ mt: 3, mb: 2 }}
                    >
                        Створити
                    </Button>
                </Box>
            </Box>
        </Container>
    );
};

const mapStateToProps = ({}) => {
    return {

    }
};

const mapDispatchToProps = (dispatch) => {
    return {
        create: (data, setCreated, page, size) => dispatch(createRegion(data, setCreated, page, size))
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(CreateRegion);