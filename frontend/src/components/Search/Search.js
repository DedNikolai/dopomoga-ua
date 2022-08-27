import React from 'react';
import {makeStyles} from '@mui/styles';
import Paper from '@mui/material/Paper';
import InputBase from '@mui/material/InputBase'
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import SearchIcon from '@mui/icons-material/Search';
import ClearIcon from '@mui/icons-material/Clear';

const useStyles = makeStyles(theme => ({
    root: {
        marginBottom: '20px',
        padding: '2px 4px',
        display: 'flex',
        alignItems: 'center',
        width: 400,
    },
    input: {
        marginLeft: theme.spacing(1),
        flex: 1,
    },
    iconButton: {
        padding: 10,
    },
    divider: {
        height: 28,
        margin: 4,
    },
}));

export default function Search(props) {
    const {search, searchRef} = props
    const classes = useStyles();

    const clearSearch = () => {
        document.body.querySelector('#search').value = '';
    }

    return (
        <Paper component="form" className={classes.root}>
            <InputBase
                id='search'
                inputRef={searchRef}
                className={classes.input}
                placeholder="Пошук"
                inputProps={{ 'aria-label': 'search google maps' }}
            />
            <IconButton className={classes.iconButton} aria-label="search" onClick={search}>
                <SearchIcon />
            </IconButton>
            <Divider className={classes.divider} orientation="vertical" />
            <IconButton color="primary" className={classes.iconButton} aria-label="directions" onClick={clearSearch}>
                <ClearIcon />
            </IconButton>
        </Paper>
    );
};