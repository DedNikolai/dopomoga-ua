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
import CustomAvatar from '../../components/CustomAvatar/CustomAvatar';
import Badge from '@mui/material/Badge';

const settings = [
    {
        name: 'Профіль',
        link: '/profile'
    },

    {
        name: 'Moї потреби',
        link: '/needs'
    },

    {
        name: 'Moя допомога',
        link: '/proposal'
    },

    {
        name: 'Mої чати',
        link: '/profile/chats'
    },

    {
        name: 'Вийти',
        link: ''
    }
];

function UserMenu({signOut, currentUser}) {
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
        <Box sx={{ flexGrow: 0, marginLeft: '20px' }}>
            <Tooltip title="Open settings">
                <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                    <Badge badgeContent={currentUser.messageNotes} color="error">
                        <CustomAvatar
                            image={currentUser.photo?.location}
                            name={currentUser.firstName + ' ' + currentUser.lastName}
                        />
                    </Badge>
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

                    if (setting.link === '/profile') {
                        return (
                            <Link to={setting.link + '/' + currentUser.id} key={setting.link} variant="body2">
                                <MenuItem onClick={handleCloseUserMenu}>
                                    <Typography textAlign="center">{setting.name}</Typography>
                                </MenuItem>
                            </Link>
                        )
                    }

                    if (setting.link === '/needs' || setting.link === '/proposal') {
                        return (
                            <Link to={'/profile/' + currentUser.id + setting.link} key={setting.link} variant="body2">
                                <MenuItem onClick={handleCloseUserMenu}>
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

export default connect(mapStatetoProps, mapDispatchToProps)(UserMenu);

