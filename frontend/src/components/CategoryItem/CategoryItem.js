import React, {useState, useEffect} from "react";
import TableCell from '@mui/material/TableCell';
import TableRow from '@mui/material/TableRow';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import ModeEditIcon from '@mui/icons-material/ModeEdit';
import SaveIcon from '@mui/icons-material/Save';
import CloseIcon from '@mui/icons-material/Close';
import {useForm, Controller, useFormState} from 'react-hook-form';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import {connect} from 'react-redux';
import {updateCategory, deleteCategory} from "../../store/actions/category";

function CategoryItem({category, update, deleteItem}) {
    const [edit, setEdit] = useState(false);
    const {handleSubmit, control, reset, getValues} = useForm();
    const { errors } = useFormState({ 
        control
    });

    useEffect(() => {
        reset(category);
    }, [category]);

    const onSubmit = (data) => {
        setEdit(false);
        update(category.id, data);
    };

    return (
            <TableRow
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell component="th" scope="row">
                  {!edit ? getValues().categoryName :
                      <Box component="form" >
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
                                  variant="standard"
                                  value={value}
                                  onChange={onChange}
                                  fullWidth
                                  id="categoryName"
                                  autoFocus
                                  label={errors.title?.categoryName ||"Назва"}
                                  error={!!errors.title?.categoryName}
                              />
                      )}
                          />
                      </Box>

                  }
              </TableCell>
                {!edit ? <TableCell align="center"><ModeEditIcon onClick={() => setEdit(true)} /></TableCell> :
                    <TableCell align="center"><CloseIcon onClick={() => setEdit(false)} /></TableCell>

                }
              <TableCell align="center"><SaveIcon onClick={handleSubmit(onSubmit)} /></TableCell>
              <TableCell align="center"><DeleteOutlineIcon onClick={() => deleteItem(category.id)}/></TableCell>
            </TableRow>    
    )
};

const mapStateToProps = () => {
    return {

    }
};

const mapDispatchToProps = (dispatch) => {
    return {
        update: (id, data) => dispatch(updateCategory(id, data)),
        deleteItem: id => dispatch(deleteCategory(id))
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(CategoryItem);

