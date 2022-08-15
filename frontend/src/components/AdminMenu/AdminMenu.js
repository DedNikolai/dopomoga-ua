import * as React from 'react';
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import Avatar from '@mui/material/Avatar';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';
import {Link} from "react-router-dom";
import {userSignOut} from '../../store/actions/user';
import {connect} from 'react-redux';
import { useTheme } from '@mui/material/styles';


const settings = [
    {
        name: 'До додатку',
        link: '/'
    },

    {
        name: 'Адмін панель',
        link: '/admin'
    },

    {
        name: 'Вийти',
        link: ''
    }
];

function AdminMenu({signOut, currentUser}) {
    const [anchorElUser, setAnchorElUser] = React.useState(null);
    const theme = useTheme();
    const handleOpenUserMenu = (event) => {
        setAnchorElUser(event.currentTarget);
    };


    const handleCloseUserMenu = () => {
        setAnchorElUser(null);
    };

    const logOut = () => {
        handleCloseUserMenu();
        signOut()
    };

    return (
        <Box sx={{ flexGrow: 0 }}>
            <Tooltip title="Open settings">
                <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                    <Avatar alt="Remy Sharp"
                            sx={{backgroundColor: theme.palette.secondary.main}}
                            childre='ADMIN'
                    />
                </IconButton>
            </Tooltip>
            <Menu
                sx={{ mt: '45px' }}
                id="menu-appbar"
                anchorEl={anchorElUser}
                anchorOrigin={{
                    vertical: 'top',
                    horizontal: 'right',
                }}
                keepMounted
                transformOrigin={{
                    vertical: 'top',
                    horizontal: 'right',
                }}
                open={Boolean(anchorElUser)}
                onClose={handleCloseUserMenu}
            >
                {settings.map((setting) => {
                    if (!setting.link) {
                        return (
                            <Link to={setting.link} key={setting.link} variant="body2">
                                <MenuItem onClick={logOut}>
                                    <Typography textAlign="center">{setting.name}</Typography>
                                </MenuItem>
                            </Link>
                        )
                    }

                    return (
                        <Link to={setting.link} key={setting.link} variant="body2">
                            <MenuItem onClick={handleCloseUserMenu}>
                                <Typography textAlign="center">{setting.name}</Typography>
                            </MenuItem>
                        </Link>
                    )
                })}
            </Menu>
        </Box>
    )
}

const mapStatetoProps = ({user}) => {
    return {
        currentUser: user.currentUser
    }
};

const mapDispatchToProps = dispatch => {
    return {
        signOut: () => dispatch(userSignOut())
    }
};

export default connect(mapStatetoProps, mapDispatchToProps)(AdminMenu);

