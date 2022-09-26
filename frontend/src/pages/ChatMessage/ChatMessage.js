import React from 'react';
import {makeStyles} from '@mui/styles';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import Divider from '@mui/material/Divider';
import TextField from '@mui/material/TextField';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import Avatar from '@mui/material/Avatar';
import Fab from '@mui/material/Fab';
import SendIcon from '@mui/icons-material/Send';

const useStyles = makeStyles({
    table: {
        minWidth: 650,
    },
    chatSection: {
        width: '100%',
        height: '80vh'
    },
    headBG: {
        backgroundColor: '#e0e0e0'
    },
    borderRight500: {
        borderRight: '1px solid #e0e0e0'
    },
    messageArea: {
        height: '65vh',
        overflowY: 'auto'
    }
});

const Chat = () => {
    const classes = useStyles();

    return (
        <div>
            <h1>Чат</h1>
            <Grid container component={Paper} className={classes.chatSection}>
                <Grid item xs={12}>
                    <List className={classes.messageArea}>
                        <ListItem key="1">
                            <Grid container>
                                <Grid item xs={12} sx={{display: 'flex', justifyContent: 'right'}}>
                                    <Avatar alt="Cindy Baker" src="https://material-ui.com/static/images/avatar/2.jpg" />
                                </Grid>
                                <Grid item xs={12}>
                                    <ListItemText align="right" primary="Hey man, What's up ?"></ListItemText>
                                </Grid>
                                <Grid item xs={12}>
                                    <ListItemText align="right" secondary="09:30"></ListItemText>
                                </Grid>
                            </Grid>
                        </ListItem>
                        <ListItem key="2">
                            <Grid container>
                                <Grid item xs={12}>
                                    <Avatar alt="Alice" src="https://material-ui.com/static/images/avatar/3.jpg" />
                                </Grid>
                                <Grid item xs={12}>
                                    <ListItemText align="left" primary="Hey, Iam Good! What about you ?"></ListItemText>
                                </Grid>
                                <Grid item xs={12}>
                                    <ListItemText align="left" secondary="09:31"></ListItemText>
                                </Grid>
                            </Grid>
                        </ListItem>
                    </List>
                    <Divider />
                    <Grid container style={{padding: '20px 10px 0'}}>
                        <Grid item xs={10}>
                            <TextField id="outlined-basic-email" label="Type Something" fullWidth />
                        </Grid>
                        <Grid xs={2} align="right">
                            <Fab color="primary" aria-label="add"><SendIcon /></Fab>
                        </Grid>
                    </Grid>
                </Grid>
            </Grid>
        </div>
    );
}

export default Chat;