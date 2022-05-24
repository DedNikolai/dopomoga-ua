import * as React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import {Link} from "react-router-dom";

const authMenu = [
    {
        name: 'Увійти',
        link: '/login'
    },

    {
        name: '|',
        link: '#'
    },

    {
        name: 'Реестрація',
        link: '/registration'
    }

];

function AuthMenu() {
    return (
        <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'flex' }, justifyContent: 'flex-end' }}>
            {authMenu.map((item) => (
                <Link to={item.link} key={item.name} variant="body2">
                    <Typography
                        variant="h6"
                        noWrap
                        component="div"
                        sx={{ mr: 2, display: { xs: 'flex', md: 'flex' }, color: '#fff', fontSize: '16px' }}
                    >
                        {item.name}
                    </Typography>
                </Link>
            ))}
        </Box>
    )
};

export default AuthMenu;