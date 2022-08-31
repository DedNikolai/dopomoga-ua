import React, {useEffect, useMemo, useRef} from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import TableFooter from '@mui/material/TableFooter';
import TablePagination from '@mui/material/TablePagination';
import {connect} from 'react-redux';
import {getAllUsers} from "../../../store/actions/user";
import Preloader from '../../../components/Preloader/Preloader';
import Search from '../../../components/Search/Search';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import UsersList from '../../../components/UsersList/UsresList'

function Users(props) {
    const {users = {}, usersLoading, getUsers} = props;
    const {content = [], number, totalElements} = useMemo(() => users, [users]);
    const size = 10;
    const searchRef = useRef('');

    const changePage = (event, page) => {
        getUsers(searchRef.current.value, page, size);
    };

    useEffect(() => {
        getUsers('' , 0, size);
    }, []);

    if (usersLoading) return <Preloader/>;

    return (
        <Box sx={{ flexGrow: 1, marginTop: '30px', padding: '0 20px'}}>
            <Box>
                <Grid container spacing={2}>
                    <Grid item xs={6} sm={6} md={6}>
                        <h1>Користувачі</h1>
                    </Grid>
                    <Grid item xs={6} sm={6} md={6} sx={{display: 'flex', justifyContent: 'end'}}>
                        <Search
                            searchParam={searchRef}
                            setSearchParam={() => {}}
                            search={() => getUsers(searchRef.current.value , 0, size)}
                            searchRef={searchRef}
                        />
                    </Grid>
                </Grid>
            </Box>
            <Box sx={{ marginTop: '30px'}}>
                <TableContainer component={Paper}>
                    <Table sx={{ minWidth: 800 }} aria-label="simple table">
                        <TableHead>
                            <TableRow>
                                <TableCell align="left">Фото</TableCell>
                                <TableCell align="center">ID</TableCell>
                                <TableCell align="center">E-mail</TableCell>
                                <TableCell align="center">Ім'я</TableCell>
                                <TableCell align="center">Прізвище</TableCell>
                                <TableCell align="center">Телефон</TableCell>
                                <TableCell align="center">Потреби</TableCell>
                                <TableCell align="center">Допомоги</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            <UsersList users={content}/>
                        </TableBody>
                        <TableFooter>
                            <TableRow>
                                <TablePagination
                                    rowsPerPageOptions={[-1]}
                                    colSpan={6}
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

const mapStateToProps = ({user}) => {
    return {
        users: user.allUsers,
        usersLoading: user.allUsersLoading,
    }
};

const mapDispatchToProps = (dispatch) => {
    return {
        getUsers: (params, page, size) => dispatch(getAllUsers(params, page, size)),
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(Users);
