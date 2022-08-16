import React, {useState} from "react";
import TableCell from '@mui/material/TableCell';
import TableRow from '@mui/material/TableRow';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import ModeEditIcon from '@mui/icons-material/ModeEdit';
import SaveIcon from '@mui/icons-material/Save';
import {useForm, Controller, useFormState} from 'react-hook-form';
import Box from '@mui/material/Box';

function CategoryItem({category}) {
    const [edit, setEdit] = useState(false);
    const {handleSubmit, control, reset} = useForm();
    const { errors } = useFormState({ 
        control
    })

    const onSubmit = () => {}

    return (
            <TableRow
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell component="th" scope="row">
                <Box component="form" onSubmit={handleSubmit(onSubmit)} sx={{ mt: 3 }}>
                   {category.categoryName}
                 </Box>  
              </TableCell>
              <TableCell align="center"><ModeEditIcon /></TableCell>
              <TableCell align="center"><SaveIcon /></TableCell>
              <TableCell align="center"><DeleteOutlineIcon /></TableCell>
            </TableRow>    
    )
};

export default CategoryItem;