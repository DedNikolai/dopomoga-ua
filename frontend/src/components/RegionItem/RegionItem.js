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
import {updateRegion, deleteRegion} from "../../store/actions/region";

function RegionItem({region, update, deleteItem}) {
    const [edit, setEdit] = useState(false);
    const {handleSubmit, control, reset, getValues} = useForm();
    const { errors } = useFormState({
        control
    });

    useEffect(() => {
        reset(region);
    }, [region]);

    const onSubmit = (data) => {
        setEdit(false);
        update(region.id, data, 0, 10);
    };

    return (
        <TableRow
            sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
        >
            <TableCell component="th" scope="row">
                {!edit ? getValues().regionName :
                    <Box component="form" >
                        <Controller
                            control={control}
                            name="regionName"
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
                                    id="regionName"
                                    autoFocus
                                    label={errors.title?.regionName ||"Назва"}
                                    error={!!errors.title?.regionName}
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
            <TableCell align="center"><DeleteOutlineIcon onClick={() => deleteItem(region.id, 0, 10)}/></TableCell>
        </TableRow>
    )
};

const mapStateToProps = () => {
    return {

    }
};

const mapDispatchToProps = (dispatch) => {
    return {
        update: (id, data, page, size) => dispatch(updateRegion(id, data, page, size)),
        deleteItem: (id, page, size) => dispatch(deleteRegion(id, page, size))
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(RegionItem);

