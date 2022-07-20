import React, {useState, useEffect} from 'react';
import {Navigate} from "react-router-dom";
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import {connect} from 'react-redux';
import {createNeed} from "../../store/actions/need";
import {useForm, Controller} from 'react-hook-form';
import {yupResolver} from '@hookform/resolvers/yup';
import * as yup from 'yup';
import Preloader from '../../components/Preloader/Preloader';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import ListItemText from '@mui/material/ListItemText';
import Select from '@mui/material/Select';
import Checkbox from '@mui/material/Checkbox';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import {getAllCategories} from "../../store/actions/category";
import {getAllRegions} from "../../store/actions/region";

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
    PaperProps: {
        style: {
            maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
            width: 250,
        },
    },
};

const boxShadow = '0px 2px 1px -1px rgb(0 0 0 / 20%), 0px 1px 1px 0px rgb(0 0 0 / 14%), 0px 1px 3px 0px rgb(0 0 0 / 12%)'

const schema = yup.object({
    title: yup.string().required('Please input Title'),
    description: yup.string().required('Please input description').min(10, 'To short').max(200, 'To long'),
    categories: yup.array().required('Please select categories'),
    region: yup.string().required('Please select region')
}).required();

function CreateNeed(props) {
    const {allCategories, categoriesLoading, 
        getCategories, getRegions, allRegions, regionsLoading, user} = props;
    const [createed, setCreated] = useState(false);
    const [creating, setCreating] = useState(false);
    const {register, handleSubmit, formState: {errors}, reset, control} = useForm({
        resolver: yupResolver(schema),
        mode: 'onBlur'
    });

    useEffect(() => {
        getCategories();
        getRegions();
    }, []);

    const onSubmit = (data) => {
        setCreating(true);
        createNeed(data, setCreated);
        reset();
    };

    if (createed) {
        return <Navigate to={`/profile/${user.id}/needs`} />
    }

    if (creating || regionsLoading || categoriesLoading) {
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
                    boxShadow: boxShadow
                }}
            >
                <Typography component="h1" variant="h5">
                    Create new Need
                </Typography>
                <Box component="form" onSubmit={handleSubmit(onSubmit)} sx={{ mt: 3 }}>
                    <Grid container spacing={2}>
                        <Grid item xs={12} sm={12}>
                            <TextField
                                {...register("title")}
                                autoComplete="given-name"
                                required
                                fullWidth
                                id="title"
                                autoFocus
                                label={errors.title?.message ||"Title"}
                                error={errors.hasOwnProperty('title')}
                            />
                        </Grid>
                        <Grid item xs={12} sm={12}>
                            <TextField
                                {...register("description")}
                                required
                                fullWidth
                                id="description"
                                label={errors.description?.message ||"Description"}
                                error={errors.hasOwnProperty('description')}
                                multiline
                                rows={4}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <Controller 
                                control={control}
                                name="categories"
                                defaultValue={[]}
                                render={({
                                  field: { onChange, value, name },
                                  fieldState: {error },
                                }) => (
                                    <FormControl sx={{ m: 1, width: '100%', margin: 0 }} size="small">
                                        <InputLabel id="demo-multiple-checkbox-label">Category</InputLabel>
                                        <Select
                                            value={value}
                                            {...register("categories")}
                                            id="categories"
                                            label={errors.categories?.message || "Categories"}
                                            error={errors.hasOwnProperty('categories')}
                                            multiple
                                            input={<OutlinedInput label="Categories" />}
                                            renderValue={(selected) => selected.map(item => item.categoryName).join(', ')}
                                            MenuProps={MenuProps}
                                        >
                                            {allCategories.map((category) => (
                                                <MenuItem key={category.id} value={category}>
                                                    <Checkbox checked={value.some(item => item.id === category.id)} />
                                                    <ListItemText primary={category.categoryName} />
                                                </MenuItem>
                                            ))}
                                        </Select>
                                    </FormControl>
                                )}
                            />
                        </Grid>
                        <Grid item xs={12}>
                        <Controller 
                                control={control}
                                name="region"
                                defaultValue={{}}
                                render={({
                                  field: { onChange, value, name },
                                  fieldState: {error },
                                }) => (
                                    <FormControl sx={{ m: 1, width: '100%', margin: 0 }} size="small">
                                        <InputLabel id="Region">Region</InputLabel>
                                        <Select
                                            value={value}
                                            id="region"
                                            label={errors.regions?.message || "Region"}
                                            error={errors.hasOwnProperty('region')}
                                            input={<OutlinedInput label="Region" />}
                                            renderValue={(selected) => selected?.regionName}
                                            MenuProps={MenuProps}
                                            onChange={value => console.log(value)}
                                        >
                                            {allRegions.map((region) => (
                                                <MenuItem key={region.id} value={region}>
                                                    <Checkbox checked={value.id === region.id} />
                                                    <ListItemText primary={region.regionName} />
                                                </MenuItem>
                                            ))}
                                        </Select>
                                    </FormControl>
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
                        Create
                    </Button>
                </Box>
            </Box>
        </Container>
    );
};


const mapStateToProps = ({user, categories, region}) => {
    return {
        user: user.currentUser,
        allCategories: categories.categories,
        categoriesLoading: categories.categoriesLoading,
        allRegions: region.regions,
        regionsLoading: region.regionsLoading
    }
};

const mapDispatchToProps = (dispatch) => {
    return {
        getCategories: () => dispatch(getAllCategories()),
        getRegions: () => dispatch(getAllRegions())
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(CreateNeed);