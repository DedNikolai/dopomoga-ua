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
import CategoryItem from '../../../components/CategoryItem/CategoryItem';
import {connect} from 'react-redux';
import {getAllCategories} from "../../../store/actions/category";
import Preloader from '../../../components/Preloader/Preloader';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';
import {Link} from "react-router-dom";

function Categories(props) {
  const {allCategories = {}, categoriesLoading, getCategories} = props;
  const {content = [], number, totalPages, totalElements} = allCategories

  useEffect(() => {
      getCategories();
  }, []);

  if (categoriesLoading) return <Preloader/>

  return (
      <Box sx={{ flexGrow: 1, marginTop: '30px', padding: '0 20px'}}>
          <Box>
              <Grid container spacing={2}>
                  <Grid item xs={6} sm={6} md={6}>
                      <h1>Категоії</h1>
                  </Grid>
                  <Grid item xs={6} sm={6} md={6} sx={{textAlign: 'end'}}>
                      <Link to={`/admin/category/create`} variant="body2">
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
                              <CategoryItem category={row} key={row.id} />
                          ))}
                      </TableBody>
                      <TableFooter>
                          <TableRow>
                              <TablePagination
                                  rowsPerPageOptions={[5, 10, 25, { label: 'All', value: -1 }]}
                                  colSpan={3}
                                  count={totalElements}
                                  rowsPerPage={10}
                                  page={0}
                                  SelectProps={{
                                      inputProps: {
                                          'aria-label': 'rows per page',
                                      },
                                      native: true,
                                  }}
                                  onPageChange={() => {}}
                              />
                          </TableRow>
                      </TableFooter>
                  </Table>
              </TableContainer>
          </Box>
      </Box>

  );
}

const mapStateToProps = ({categories}) => {
    return {
        allCategories: categories.categories,
        categoriesLoading: categories.categoriesLoading,
    }
};

const mapDispatchToProps = (dispatch) => {
    return {
        getCategories: () => dispatch(getAllCategories()),
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(Categories);
