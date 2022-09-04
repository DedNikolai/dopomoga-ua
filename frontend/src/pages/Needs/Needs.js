import React, {useState, useEffect, useMemo} from 'react';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import NeedsLis from '../../components/NeedsList/NeedsList';
import BasicPagination from '../../components/Pagination/BasicPagination';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import ListItemText from '@mui/material/ListItemText';
import Select from '@mui/material/Select';
import Checkbox from '@mui/material/Checkbox';
import Button from '@mui/material/Button';
import {getAllNeeds} from "../../store/actions/need";
import {getAllCategories} from "../../store/actions/category";
import {getAllRegions} from "../../store/actions/region";
import {connect} from 'react-redux';
import Preloader from '../../components/Preloader/Preloader';
import FilterAltIcon from '@mui/icons-material/FilterAlt';
import FilterAltOffIcon from '@mui/icons-material/FilterAltOff';

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

function Needs(props) {
    const {needs, needsLoading, getNeeds, categoriesFromDb, categoriesLoading,
        getCategories, getRegions, regionsFromDb, regionsLoading} = props;
    const [regions, setRegion] = useState([]);
    const [categories, setCategories] = useState([]);
    const {content = [], number, totalPages, totalElements, size} = needs;
    const allCategories = categoriesFromDb.content;
    const allRegions = regionsFromDb.content;

    const allNeeds = useMemo(() => content, [needs]);

    const handleChangePage = (event, page) => {
        getNeeds(regions, categories, page-1, 1);
    }

    const handleChangeRegion = (event) => {
        const {
            target: { value },
        } = event;
        setRegion(value);
    };

    const handleChangeCategory = (event) => {
        const {
            target: { value },
        } = event;
        setCategories(value);
    };

    const filterData = () => {
       getNeeds(regions, categories,)
    };

    const clearData = () => {
        setCategories([]);
        setRegion([]);
        getNeeds([], [], 0);
    }

    useEffect(() => {
        getNeeds(regions, categories, 0);
        getCategories(0, 100);
        getRegions(0, 100);
    }, []);

    if (needsLoading  || categoriesLoading  || regionsLoading) {
        return <Preloader/>
    }

    return (
        <Box sx={{ flexGrow: 1, marginTop: '20px'}}>
            <h1>Знайти потребу</h1>
            <Box sx={{ marginTop: '20px'}}>
                <Grid container spacing={2}>
                    <Grid item xs={12} sm={4} md={4}>
                        <FormControl sx={{ m: 1, width: '100%', margin: 0 }} size="small">
                            <InputLabel id="demo-multiple-checkbox-label">Region</InputLabel>
                            <Select
                                labelId="demo-multiple-checkbox-label"
                                id="demo-multiple-checkbox"
                                multiple
                                value={regions}
                                onChange={handleChangeRegion}
                                input={<OutlinedInput label="Region" />}
                                renderValue={(selected) => selected.map(item => item.regionName).join(', ')}
                                MenuProps={MenuProps}
                            >
                                {allRegions.map((region) => (
                                    <MenuItem key={region.id} value={region}>
                                        <Checkbox checked={regions.some(item => item.id === region.id)} />
                                        <ListItemText primary={region.regionName} />
                                    </MenuItem>
                                ))}
                            </Select>
                        </FormControl>
                    </Grid>
                    <Grid item xs={12} sm={4} md={4}>
                        <FormControl sx={{ m: 1, width: '100%', margin: 0 }} size="small">
                            <InputLabel id="demo-multiple-checkbox-label">Category</InputLabel>
                            <Select
                                labelId="demo-multiple-checkbox-label"
                                id="demo-multiple-checkbox"
                                multiple
                                value={categories}
                                onChange={handleChangeCategory}
                                input={<OutlinedInput label="Categories" />}
                                renderValue={(selected) => selected.map(item => item.categoryName).join(', ')}
                                MenuProps={MenuProps}
                            >
                                {allCategories.map((category) => (
                                    <MenuItem key={category.id} value={category}>
                                        <Checkbox checked={categories.some(item => item.id === category.id)} />
                                        <ListItemText primary={category.categoryName} />
                                    </MenuItem>
                                ))}
                            </Select>
                        </FormControl>
                    </Grid>
                    <Grid item xs={12} sm={4} md={4} container spacing={2}>
                        <Grid item xs={6} sm={6} md={6}>
                                <Button
                                    variant="contained" 
                                    disableElevation
                                    size="large"
                                    color="secondary"
                                    onClick={filterData}
                                    sx={{width: '100%'}}
                                    endIcon={<FilterAltIcon />}
                                >
                                    Filter
                                </Button>
                        </Grid>
                        <Grid item xs={6} sm={6} md={6}>
                                <Button
                                    variant="contained" 
                                    disableElevation
                                    size="large"
                                    color="secondary"
                                    onClick={clearData}
                                    sx={{width: '100%'}}
                                    endIcon={<FilterAltOffIcon />}
                                >
                                    Clear
                                </Button>
                        </Grid>
                    </Grid>
                </Grid>
            </Box>
            <Box sx={{ marginTop: '30px'}}>
                <NeedsLis needs={allNeeds}/>
            </Box>
            {
                totalElements > size ?
                <Box sx={{ margin: '30px auto', textAlign: 'center'}}>
                <BasicPagination
                    count={totalPages}
                    page={number+1} 
                    onChane={handleChangePage}
                />
            </Box>
            :
            <></>
            }
            
        </Box>
    );
};

const mapStateToProps = ({need, categories, region}) => {
    return {
        needs: need.needs,
        needsLoading: need.needsLoading,
        categoriesFromDb: categories.categories,
        categoriesLoading: categories.categoriesLoading,
        regionsFromDb: region.regions,
        regionsLoading: region.regionsLoading
    }
};

const mapDispatchToProps = dispatch => {
    return {
        getNeeds: (categories, regions, page, size) => dispatch(getAllNeeds(categories, regions, page, size)),
        getCategories: (page, size) => dispatch(getAllCategories(page, size)),
        getRegions: (page, size) => dispatch(getAllRegions(page, size))
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(Needs);
