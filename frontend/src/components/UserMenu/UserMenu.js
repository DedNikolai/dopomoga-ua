import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';
import {Link} from "react-router-dom";
import {userSignOut} from '../../store/actions/user';
import {connect} from 'react-redux';
import AuthMenu from '../AuthMenu/AuthMenu';


const settings = [
    {
        name: 'Профіль',
        link: '/profile'
    },

    {
        name: 'Вийти',
        link: ''
    }
];

function UserMenu({signOut}) {
    const [anchorElUser, setAnchorElUser] = React.useState(null);

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
                    <Avatar alt="Remy Sharp" src="#" />
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

const mapStatetoProps = ({}) => {
    return {}
};

const mapDispatchToProps = dispatch => {
    return {
        signOut: () => dispatch(userSignOut())
    }
};

export default connect(mapStatetoProps, mapDispatchToProps)(UserMenu);

