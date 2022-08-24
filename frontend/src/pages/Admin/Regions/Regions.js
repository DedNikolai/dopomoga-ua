import React, {useEffect} from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import TableFooter from '@mui/material/TableFooter';
import TablePagination from '@mui/material/TablePagination';
import RegionItem from '../../../components/RegionItem/RegionItem';
import {connect} from 'react-redux';
import {getAllRegions} from "../../../store/actions/region";
import Preloader from '../../../components/Preloader/Preloader';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';
import {Link} from "react-router-dom";

function Regions(props) {
    const {allRegions = {}, regionsLoading, getRegions} = props;
    const {content = [], number, totalElements} = allRegions;
    const size = 10;

    const changePage = (event, page) => {
        getRegions(page, size);
    };

    useEffect(() => {
        getRegions(0, size);
    }, []);

    if (regionsLoading) return <Preloader/>;

    return (
        <Box sx={{ flexGrow: 1, marginTop: '30px', padding: '0 20px'}}>
            <Box>
                <Grid container spacing={2}>
                    <Grid item xs={6} sm={6} md={6}>
                        <h1>Регіони</h1>
                    </Grid>
                    <Grid item xs={6} sm={6} md={6} sx={{textAlign: 'end'}}>
                        <Link to={`/admin/region/create`} variant="body2">
                            <Button
                                variant="contained"
                                disableElevation
                                size="large"
                                color="secondary"
                                onClick={() => {}}
                            >
                                Створити
                            </Button>
                        </Link>
                    </Grid>
                </Grid>
            </Box>
            <Box sx={{ marginTop: '30px'}}>
                <TableContainer component={Paper}>
                    <Table sx={{ minWidth: 800 }} aria-label="simple table">
                        <TableHead>
                            <TableRow>
                                <TableCell align="left">Категорія</TableCell>
                                <TableCell align="center">Змінити</TableCell>
                                <TableCell align="center">Зберегти</TableCell>
                                <TableCell align="center">Видалити</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {content.map((row) => (
                                <RegionItem region={row} key={row.id} />
                            ))}
                        </TableBody>
                        <TableFooter>
                            <TableRow>
                                <TablePagination
                                    rowsPerPageOptions={[-1]}
                                    colSpan={4}
                                    count={totalElements}
                                    rowsPerPage={size}
                                    page={number}
                                    onPageChange={changePage}
                                />
                            </TableRow>
                        </TableFooter>
                    </Table>
                </TableContainer>
            </Box>
        </Box>

    );
}

const mapStateToProps = ({region}) => {
    return {
        allRegions: region.regions,
        regionsLoading: region.regionsLoading,
    }
};

const mapDispatchToProps = (dispatch) => {
    return {
        getRegions: (page, size) => dispatch(getAllRegions(page, size)),
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(Regions);
