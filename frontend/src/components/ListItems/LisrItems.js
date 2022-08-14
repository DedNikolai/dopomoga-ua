import * as React from 'react';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import ListSubheader from '@mui/material/ListSubheader';
import {Link} from "react-router-dom";
import HomeIcon from '@mui/icons-material/Home';
import SupervisedUserCircleIcon from '@mui/icons-material/SupervisedUserCircle';
import MapIcon from '@mui/icons-material/Map';
import CategoryIcon from '@mui/icons-material/Category';
import HelpIcon from '@mui/icons-material/Help';
import AccessibilityNewIcon from '@mui/icons-material/AccessibilityNew';
import BarChartIcon from '@mui/icons-material/BarChart';
import EqualizerIcon from '@mui/icons-material/Equalizer';

export const mainListItems = (
  <React.Fragment>
    <Link to='/admin' style={{color: 'inherit'}} variant="body1">
        <ListItemButton>
            <ListItemIcon>
                <HomeIcon />
            </ListItemIcon>
            <ListItemText primary="Головна" />
        </ListItemButton>
    </Link>
    <Link to='/admin/users' style={{color: 'inherit'}} variant="body2">
        <ListItemButton>
            <ListItemIcon>
                <SupervisedUserCircleIcon />
            </ListItemIcon>
            <ListItemText primary="Користувачі" />
        </ListItemButton>
    </Link>
    <Link to='/admin/regions' style={{color: 'inherit'}} variant="body2">
        <ListItemButton>
            <ListItemIcon>
                <MapIcon />
            </ListItemIcon>
            <ListItemText primary="Регіони" />
        </ListItemButton>
    </Link>
    <Link to='/admin/categories' style={{color: 'inherit'}} variant="body2">
        <ListItemButton>
            <ListItemIcon>
                <CategoryIcon />
            </ListItemIcon>
            <ListItemText primary="Категорії" />
        </ListItemButton>
    </Link>
    <Link to='/admin/needs' style={{color: 'inherit'}} variant="body2">
        <ListItemButton>
            <ListItemIcon>
                <HelpIcon />
            </ListItemIcon>
            <ListItemText primary="Потребы" />
        </ListItemButton>
    </Link>
    <Link to='/admin/helps' style={{color: 'inherit'}} variant="body2">
        <ListItemButton>
            <ListItemIcon>
                <AccessibilityNewIcon />
            </ListItemIcon>
            <ListItemText primary="Допомога" />
        </ListItemButton>
    </Link>
  </React.Fragment>
);

export const secondaryListItems = (
  <React.Fragment>
    <ListSubheader component="div" inset>
      Статистика
    </ListSubheader>
    <Link to='/admin/need-stats' style={{color: 'inherit'}} variant="body2">
        <ListItemButton>
            <ListItemIcon>
                <BarChartIcon />
            </ListItemIcon>
            <ListItemText primary="Статистика Потреб" />
        </ListItemButton>
    </Link>
    <Link to='/admin/helps-stats' style={{color: 'inherit'}} variant="body2">
        <ListItemButton>
            <ListItemIcon>
                <EqualizerIcon />
            </ListItemIcon>
            <ListItemText primary="Статистика допомог" />
        </ListItemButton>
    </Link>
  </React.Fragment>
);