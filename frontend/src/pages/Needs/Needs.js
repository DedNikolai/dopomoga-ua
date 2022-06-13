import React, {useState, useEffect} from 'react';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import NeedItem from '../../components/NeedItem/NeedItem';
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
import {connect} from 'react-redux';
import Preloader from '../../components/Preloader/Preloader';

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

const names = [
    'Oliver Hansen',
    'Van Henry',
    'April Tucker',
    'Ralph Hubbard',
    'Omar Alexander',
    'Carlos Abbott',
    'Miriam Wagner',
    'Bradley Wilkerson',
    'Virginia Andrews',
    'Kelly Snyder',
];


function Needs(props) {
    const {needs, needsLoading, getNeeds} = props;
    const [regions, setRegion] = useState([]);
    const [categories, setCategories] = useState([]);

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
        console.log(regions, categories)
    };

    useEffect(() => {
        getNeeds();
    }, []);

    if (needsLoading) {
        return <Preloader/>
    }

    console.log(needs);

    return (
        <Box sx={{ flexGrow: 1, marginTop: '30px', padding: '0 20px'}}>
            <Box>
                <Grid container spacing={2}>
                    <Grid item xs={12} sm={4} md={5}>
                        <FormControl sx={{ m: 1, width: '100%', margin: 0 }} size="small">
                            <InputLabel id="demo-multiple-checkbox-label">Region</InputLabel>
                            <Select
                                labelId="demo-multiple-checkbox-label"
                                id="demo-multiple-checkbox"
                                multiple
                                value={regions}
                                onChange={handleChangeRegion}
                                input={<OutlinedInput label="Region" />}
                                renderValue={(selected) => selected.join(', ')}
                                MenuProps={MenuProps}
                            >
                                {names.map((name) => (
                                    <MenuItem key={name} value={name}>
                                        <Checkbox checked={regions.indexOf(name) > -1} />
                                        <ListItemText primary={name} />
                                    </MenuItem>
                                ))}
                            </Select>
                        </FormControl>
                    </Grid>
                    <Grid item xs={12} sm={4} md={5}>
                        <FormControl sx={{ m: 1, width: '100%', margin: 0 }} size="small">
                            <InputLabel id="demo-multiple-checkbox-label">Category</InputLabel>
                            <Select
                                labelId="demo-multiple-checkbox-label"
                                id="demo-multiple-checkbox"
                                multiple
                                value={categories}
                                onChange={handleChangeCategory}
                                input={<OutlinedInput label="Categories" />}
                                renderValue={(selected) => selected.join(', ')}
                                MenuProps={MenuProps}
                            >
                                {names.map((name) => (
                                    <MenuItem key={name} value={name}>
                                        <Checkbox checked={categories.indexOf(name) > -1} />
                                        <ListItemText primary={name} />
                                    </MenuItem>
                                ))}
                            </Select>
                        </FormControl>
                    </Grid>
                    <Grid item xs={12} sm={4} md={2}>
                        <FormControl sx={{ m: 1, width: '100%', margin: 0 }} size="small">
                            <Button
                                variant="contained"
                                size="large"
                                color="secondary"
                                onClick={filterData}
                            >
                                Filter
                            </Button>
                        </FormControl>
                    </Grid>
                </Grid>
            </Box>
            <Box sx={{ marginTop: '30px'}}>
                <Grid container spacing={{ xs: 2, md: 3 }} columns={{ xs: 4, sm: 8, md: 12 }}>
                    {Array.from(Array(6)).map((_, index) => (
                        <Grid item xs={12} sm={4} md={4} key={index}>
                            <NeedItem/>
                        </Grid>
                    ))}
                </Grid>
            </Box>
            <Box sx={{ margin: '30px auto', textAlign: 'center'}}>
                <BasicPagination />
            </Box>
        </Box>
    );
};

const mapStateToProps = ({need}) => {
    return {
        needs: need.needs,
        needsLoading: need.needsLoading
    }
};

const mapDispatchToProps = dispatch => {
    return {
        getNeeds: (categories, regions) => dispatch(getAllNeeds(categories, regions))
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(Needs);
