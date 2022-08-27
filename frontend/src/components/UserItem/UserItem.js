import React from "react";
import TableCell from '@mui/material/TableCell';
import TableRow from '@mui/material/TableRow';
import Avatar from '@mui/material/Avatar';

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
        </TableRow>
    )
};

export default UserItem;

