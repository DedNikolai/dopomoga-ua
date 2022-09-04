import React from "react";
import TableCell from '@mui/material/TableCell';
import TableRow from '@mui/material/TableRow';
import Avatar from '@mui/material/Avatar';
import SearchIcon from '@mui/icons-material/Search';
import {Link} from "react-router-dom";

function UserItem({user}) {
    const {id, email, firstName, lastName, phone, photo} = user;

    return (
        <TableRow
            sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
        >
            <TableCell align="left" component="th" scope="row">
                <Avatar alt="Remy Sharp" src={photo.location} />
            </TableCell>
            <TableCell align="center">{id}</TableCell>
            <TableCell align="center">{email}</TableCell>
            <TableCell align="center">{firstName}</TableCell>
            <TableCell align="center">{lastName}</TableCell>
            <TableCell align="center">{phone}</TableCell>
            <TableCell align="center"><Link to={`/admin/users/${id}/needs`}><SearchIcon/></Link></TableCell>
            <TableCell align="center"><Link to={`/admin/users/${id}/helps`}><SearchIcon/></Link></TableCell>
        </TableRow>
    )
};

export default UserItem;

