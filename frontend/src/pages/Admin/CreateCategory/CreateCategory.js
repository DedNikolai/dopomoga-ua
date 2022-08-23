import React, {useState} from 'react';
import {Navigate} from "react-router-dom";
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import {connect} from 'react-redux';
import {createCategory} from "../../../store/actions/category";
import {Controller, useForm, useFormState} from 'react-hook-form';
import Preloader from '../../../components/Preloader/Preloader';
import {useTheme} from '@mui/material/styles';

function CreateCategory(props) {
    const {create} = props;
    const [createed, setCreated] = useState(false);
    const [creating, setCreating] = useState(false);
    const {handleSubmit, reset, control} = useForm({
        defaultValues: {
            categoryName: '',
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
        return <Navigate to={`/admin/categories`} />
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
                    Створити Категорію
                </Typography>
                <Box component="form" onSubmit={handleSubmit(onSubmit)} sx={{ mt: 3 }}>
                    <Grid container spacing={2}>
                        <Grid item xs={12} sm={12}>
                            <Controller
                                control={control}
                                name="categoryName"
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
                                        label={errors.title?.categoryName ||"Назва"}
                                        error={!!errors.title?.categoryName}
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
        create: (data, setCreated) => dispatch(createCategory(data, setCreated))
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(CreateCategory);