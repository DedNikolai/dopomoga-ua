import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
import Button from '@mui/material/Button';
import MenuItem from '@mui/material/MenuItem';
import {Link} from "react-router-dom";
import {connect} from 'react-redux';
import AuthMenu from '../AuthMenu/AuthMenu';
import UserMenu from '../UserMenu/UserMenu';
import AdminMenu from '../AdminMenu/AdminMenu';

const pages = [
    {
        name: 'Проект',
        link: '/project'
    },

    {
        name: 'Допомога',
        link: '/propose'
    },

    {
        name: 'Потреба',
        link: '/needs'
    },

    {
        name: 'Конфіденційність',
        link: '/privace-policy'
    }
];

const Header = ({currentUser}) => {
    const [anchorElNav, setAnchorElNav] = React.useState(null);
    
    const handleOpenNavMenu = (event) => {
        setAnchorElNav(event.currentTarget);
    };

    const handleCloseNavMenu = () => {
        setAnchorElNav(null);
    };

    return (
        <AppBar position="static">
            <Container maxWidth="xl">
                <Toolbar disableGutters>
                    <Link to="/" variant="body2">
                        <Typography
                            variant="h6"
                            noWrap
                            component="div"
                            sx={{ mr: 2, display: { xs: 'none', md: 'flex' }, color: '#fff' }}
                        >
                            DOPOMOGA-UA
                        </Typography>
                    </Link>
                    <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
                        <IconButton
                            size="large"
                            aria-label="account of current user"
                            aria-controls="menu-appbar"
                            aria-haspopup="true"
                            onClick={handleOpenNavMenu}
                            color="inherit"
                        >
                            <MenuIcon />
                        </IconButton>
                        <Menu
                            id="menu-appbar"
                            anchorEl={anchorElNav}
                            anchorOrigin={{
                                vertical: 'bottom',
                                horizontal: 'left',
                            }}
                            keepMounted
                            transformOrigin={{
                                vertical: 'top',
                                horizontal: 'left',
                            }}
                            open={Boolean(anchorElNav)}
                            onClose={handleCloseNavMenu}
                            sx={{
                                display: { xs: 'block', md: 'none' },
                            }}
                        >
                            {pages.map((page) => (
                                <Link to={page.link} key={page.link} variant="body2">
                                    <MenuItem onClick={handleCloseNavMenu}>
                                        <Typography textAlign="center">{page.name}</Typography>
                                    </MenuItem>
                                </Link>
                            ))}
                        </Menu>
                    </Box>
                    <Link to="/" variant="body2">
                        <Typography
                            variant="h6"
                            noWrap
                            component="div"
                            sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' }, color: '#fff' }}
                        >
                            DOPOMOGA-UA
                        </Typography>
                    </Link>
                    <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex'}, justifyContent: 'center' }}>
                        {pages.map((page) => (
                            <Link to={page.link} variant="body2" key={page.name}>
                                <Button
                                    onClick={handleCloseNavMenu}
                                    sx={{ my: 1, color: 'white', display: 'block', mx: '10px' }}
                                >
                                    {page.name}
                                </Button>
                            </Link>
                        ))}
                    </Box>
                    {!!currentUser ? hasAuthority(currentUser, 'USER') ? <UserMenu/> : <AdminMenu /> : <AuthMenu/>}
                </Toolbar>
            </Container>
        </AppBar>
    );
};

const mapStatetoProps = ({user}) => {
    return {
        currentUser: user.currentUser
    }
};

export default connect(mapStatetoProps)(Header);

const hasAuthority = (user, authirity) => {
    const set = new Set(user?.roles);
    return set.has(authirity);
};
