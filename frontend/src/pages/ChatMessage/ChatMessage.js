import React, {useRef, useState, useEffect, useLayoutEffect} from 'react';
import {makeStyles} from '@mui/styles';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import Divider from '@mui/material/Divider';
import TextField from '@mui/material/TextField';
import List from '@mui/material/List';
import Fab from '@mui/material/Fab';
import SendIcon from '@mui/icons-material/Send';
import Message from '../../components/Message/Message';
import ArrowCircleDownIcon from '@mui/icons-material/ArrowCircleDown';
import {useParams} from "react-router";
import { connect } from 'react-redux';
import {getChat} from '../../store/actions/chat';
import Preloader from '../../components/Preloader/Preloader';
import { sendMessage } from '../../store/actions/chat';

const scrollStyles = {
    "&::-webkit-scrollbar": {
        width: 10
      },
      
      "&::-webkit-scrollbar-thumb": {
        backgroundColor: "#01579b",
      }
};

const scrollCursorStyles = {
   fontSize: '50px',
   position: 'fixed',
   bottom: '25vh',
   right: '100px',
   opacity: '0.5'
};

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

const Chat = (props) => {
    const classes = useStyles();
    const messagesEndRef = useRef(null);
    const [scrollIcon, toggleScrollIcon] = useState(false);
    const [stompClient, setStompClient] = useState(null);
    const [messages, setMessages] = useState([]);
    const {id} = useParams();
    const {currentChat = {}, chatLoading, getChatById, currentUser} = props;
    const textRef = useRef('');
    const effectCalled = useRef(false);

    const send = () => {
        const message = {user: currentUser, chat: currentChat, text: textRef.current.value}
        textRef.current.value = '';
        sendMessage(message);
    }

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "auto" });
        toggleScrollIcon(false);
      };
    
      useLayoutEffect(() => {
        scrollToBottom()
      }, [messages]);
      
      useEffect(() => {
        if (!effectCalled.current) {
            const scroller = document.querySelector('.MuiList-root');
            scroller.addEventListener('scroll', () => {
                if (scroller.scrollHeight > scroller.scrollTop + scroller.clientHeight + 100) {
                    toggleScrollIcon(true);
                }
            });
            getChatById(id, setMessages, currentUser, stompClient, setStompClient);
            effectCalled.current = true;
        }

         return () => {
             console.log('disconnect');
             console.log(stompClient);
              if (stompClient) {

                  stompClient.disconnect();
              }
          }
        
      }, [stompClient]);

    if (chatLoading) return <Preloader />;

    const opositeUser = currentChat.users.filter(user => user.id !== currentUser.id)[0];

    return (
        <div>
            <h2>Чат з {opositeUser.firstName + ' ' + opositeUser.lastName}</h2>
            <Grid container component={Paper} className={classes.chatSection}>
                <Grid item xs={12}>
                    <List
                        className={classes.messageArea}
                        sx={scrollStyles}
                        // onScroll={() => toggleScrollIcon(true)}
                    >
                        {messages.map(item => <Message message={item} key={item.id} />)}
                        <div ref={messagesEndRef} />
                        {scrollIcon &&
                            <ArrowCircleDownIcon
                                onClick={scrollToBottom}
                                color="primary"
                                sx={scrollCursorStyles}
                            />
                        }
                    </List>
                    <Divider />
                    <Grid container style={{padding: '20px 10px 0'}}>
                        <Grid item xs={10} sx={{paddingRight: '10px'}}>
                            <TextField 
                                id="outlined-basic-email" 
                                label="Повідомлення" 
                                fullWidth
                                inputRef={textRef} 
                            />
                        </Grid>
                        <Grid item xs={2} align="right">
                            <Fab color="primary" aria-label="add">
                                <SendIcon
                                    onClick={send} 
                                />
                            </Fab>
                        </Grid>
                    </Grid>
                </Grid>
            </Grid>
        </div>
    );
};

const mapStateToProps = ({chat, user}) => {
    return {
        currentChat: chat.chat,
        chatLoading: chat.chatLoading,
        currentUser: user.currentUser,
    }
};

const mapDispatchToProps = dispatch => {
    return {
        getChatById: (id, setMessages, currentUser, stomp, setStomp) => dispatch(getChat(id, setMessages, currentUser, stomp, setStomp))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Chat);