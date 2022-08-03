import React, {useState, useEffect} from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import {connect} from 'react-redux';
import {getProposalById, updateProposal} from "../../store/actions/propositions";
import {useForm, Controller, useFormState} from 'react-hook-form';
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
import { useTheme } from '@mui/material/styles';
import {useParams} from "react-router";
import FormControlLabel from '@mui/material/FormControlLabel';

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

function EditProposal(props) {
    const {allCategories, categoriesLoading, submitForm,
        getCategories, getRegions, allRegions, regionsLoading} = props;
    const theme = useTheme();
    const [proposalLoading, setProposalLoading] = useState(true);
    const {handleSubmit, control, reset} = useForm();
    const { errors } = useFormState({ 
        control
    })
    const {proposalId} = useParams();

    const categories = allCategories.map(category => category.categoryName);

    useEffect(() => {
        getCategories();
        getRegions();
        getProposalById(proposalId, setProposalLoading, reset);
    }, []);

    const onSubmit = (data) => {
        const {categories} = data;
        const set = new Set(categories);
        data.categories = allCategories.filter(category => set.has(category.categoryName));
        updateProposal(data, proposalId, setProposalLoading, reset);
    };

    if (proposalLoading || regionsLoading || categoriesLoading) {
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
                    Змінити Допомогу
                </Typography>
                <Box component="form" onSubmit={handleSubmit(onSubmit)} sx={{ mt: 3 }}>
                    <Grid container spacing={2}>
                        <Grid item xs={12} sm={12}>
                            <Controller 
                                control={control}
                                name="title"
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
                                        label={errors.title?.message ||"Назва"}
                                        error={!!errors.title?.message}
                                    /> 
                                )}
                            />
                        </Grid>
                        <Grid item xs={12} sm={12}>
                            <Controller 
                                control={control}
                                name="description"
                                rules={{ 
                                    required: 'Ведить опис',
                                    validate: value => {
                                        if(value.length < 20) return 'Занаддо коротко'
                                        if(value.length > 250) return 'Занаддо довго'
                                    }
                                }}
                                render={({
                                field: { onChange, value},
                                }) => (
                                    <TextField
                                        value={value}
                                        onChange={onChange}
                                        fullWidth
                                        id="description"
                                        label={errors.description?.message ||"Опис"}
                                        error={!!errors.description?.message}
                                        multiline
                                        rows={6}
                                    />
                                )}
                            />
                        </Grid>
                        <Grid item xs={12}>
                                 <Controller
                                    control={control}
                                    name="categories"
                                    rules={{ 
                                        required: 'Select Category',
                                    }}
                                    render={({
                                    field: { onChange, value },
                                    }) => (
                                        <FormControl sx={{ m: 1, width: '100%', margin: 0 }} size="small">
                                            <InputLabel error={!!errors.categories?.message}>Категорія</InputLabel>
                                            <Select
                                                name="categories"
                                                value={value || []}
                                                id="categories"
                                                label={errors?.categories?.message || "Категорія"}
                                                error={!!errors.categories?.message}
                                                multiple
                                                input={<OutlinedInput error={!!errors.categories?.message} label="Категорія" />}
                                                renderValue={(selected) => selected.join(', ')}
                                                MenuProps={MenuProps}
                                                onChange={onChange}

                                            >
                                                {categories.map((category) => (
                                                    <MenuItem key={category} value={category}>
                                                        <Checkbox checked={value.some(item => item === category)} />
                                                        <ListItemText primary={category} />
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
                                        rules={{
                                            required: 'Регіон'
                                        }}
                                        render={({
                                        field: { onChange, value },
                                        }) => (
                                            <FormControl sx={{ m: 1, width: '100%', margin: 0 }} size="small">
                                                <InputLabel error={!!errors.region?.message}>Регіон</InputLabel>
                                                <Select
                                                    value={value}
                                                    id="region"
                                                    label={errors.region?.message || "Регіон"}
                                                    error={!!errors.region?.message}
                                                    input={<OutlinedInput error={!!errors.region?.message} label="Регіон" />}
                                                    renderValue={(selected) => selected?.regionName}
                                                    MenuProps={MenuProps}
                                                    onChange={onChange}
                                                >
                                                    {allRegions.map((region) => (
                                                        <MenuItem key={region.id} value={region}>
                                                            <Checkbox checked={value?.id === region.id} />
                                                            <ListItemText primary={region.regionName} />
                                                        </MenuItem>
                                                    ))}
                                                </Select>
                                            </FormControl>   
                                        )}
                                    />          
                               
                        </Grid>
                    </Grid>
                    <Grid item xs={12} sm={12}>
                        <Controller
                            control={control}
                            name="isActive"
                            render={({
                                         field: { onChange, value},
                                     }) => (
                                <FormControlLabel
                                    control={
                                        <Checkbox
                                            checked={value}
                                            onChange={onChange}
                                            color="success"
                                        />
                                    }
                                    label="Активна"
                                />
                            )}
                        />
                    </Grid>
                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        sx={{ mt: 3, mb: 2 }}
                    >
                        Зберегти
                    </Button>
                </Box>
            </Box>
        </Container>
    );
};

const mapStateToProps = ({categories, region}) => {
    return {
        allCategories: categories.categories,
        categoriesLoading: categories.categoriesLoading,
        allRegions: region.regions,
        regionsLoading: region.regionsLoading,
    }
};

const mapDispatchToProps = (dispatch) => {
    return {
        getCategories: () => dispatch(getAllCategories()),
        getRegions: () => dispatch(getAllRegions()),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(EditProposal);