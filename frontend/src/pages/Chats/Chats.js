import React, {useEffect, useMemo} from 'react';
import {makeStyles} from '@mui/styles';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import Divider from '@mui/material/Divider';
import TextField from '@mui/material/TextField';
import { connect } from 'react-redux';
import { getChats } from '../../store/actions/chat';
import Preloader from '../../components/Preloader/Preloader';
import ChatList from '../../components/ChatsList/ChatsList';

const useStyles = makeStyles({
    table: {
        minWidth: 650,
    },
    chatSection: {
        width: '100%',
        height: '80vh',
        overflow: 'hidden'
    },
    headBG: {
        backgroundColor: '#e0e0e0'
    },
    borderRight500: {
        borderRight: '1px solid #e0e0e0'
    },
});


const Chats = (props) => {
    const classes = useStyles();
    const {userChats = [], chatsLoading, getUserChats, currentUser} = props;
    const chats = useMemo(() => userChats, [userChats])

    useEffect(() => {
        getUserChats();
    }, []);

    if (chatsLoading) return <Preloader />
    console.log(chats)
    return (
        <div>
            <h1>Чати</h1>
            <Grid container component={Paper} className={classes.chatSection}>
                <Grid item xs={12} className={classes.borderRight500}>
                    <Grid item xs={12} style={{padding: '10px'}}>
                        <TextField id="outlined-basic-email" label="Search" variant="outlined" fullWidth />
                    </Grid>
                    <Divider />
                    <ChatList chats={chats} currentUser={currentUser} />
                </Grid>
            </Grid>
        </div>
    );
}

const mapStateToProps = ({chat, user}) => {
    return {
        userChats: chat.userChats,
        chatsLoading: chat.chatsLoading,
        currentUser: user.currentUser
    }
};

const mapDispatchToProps = dispatch => {
    return {
        getUserChats: () => dispatch(getChats())
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Chats);
