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


const mockMessages = [
    {
        id: 1,
        text: "Hey man, What's up ?",
        time: "09:30",
        user: {
            id: 2,
            photo: {
                location: "https://material-ui.com/static/images/avatar/2.jpg"
            }
        }

    },

    {
        id: 2,
        text: "Hey, Iam Good! What about you ?",
        time: "09:31",
        user: {
            id: 1,
            photo: {
                location: "https://material-ui.com/static/images/avatar/3.jpg"
            }
        }

    },

    {
        id: 3,
        text: "Hey man, What's up ?",
        time: "09:30",
        user: {
            id: 2,
            photo: {
                location: "https://material-ui.com/static/images/avatar/2.jpg"
            }
        }

    },

    {
        id: 4,
        text: "Hey man, What's up ?",
        time: "09:30",
        user: {
            id: 2,
            photo: {
                location: "https://material-ui.com/static/images/avatar/2.jpg"
            }
        }

    },

    {
        id: 5,
        text: "Hey man, What's up ?",
        time: "09:30",
        user: {
            id: 2,
            photo: {
                location: "https://material-ui.com/static/images/avatar/2.jpg"
            }
        }

    },

    {
        id: 6,
        text: "Hey man, What's up ?",
        time: "09:30",
        user: {
            id: 2,
            photo: {
                location: "https://material-ui.com/static/images/avatar/2.jpg"
            }
        }

    },

    {
        id: 7,
        text: "Hey man, What's up ?",
        time: "09:30",
        user: {
            id: 2,
            photo: {
                location: "https://material-ui.com/static/images/avatar/2.jpg"
            }
        }

    },
];

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

const Chat = ({messages}) => {
    const classes = useStyles();
    const messagesEndRef = useRef(null);
    const [scrollIcon, toggleScrollIcon] = useState(false);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "auto" });
      };
    
      useLayoutEffect(() => {
        scrollToBottom()
      }, [messages]);

      useEffect(() => {
          const scroller = document.querySelector('.MuiList-root');
          scroller.addEventListener('scroll', () => {
              console.log(scroller.scrollHeight, scroller.scrollTop, scroller.clientHeight)
              if (scroller.scrollHeight > scroller.scrollTop + scroller.clientHeight + 100) {
                  toggleScrollIcon(true);
              }
          });
      }, []);
    

    return (
        <div>
            <h1>Чат</h1>
            <Grid container component={Paper} className={classes.chatSection}>
                <Grid item xs={12}>
                    <List
                        className={classes.messageArea}
                        sx={scrollStyles}
                        // onScroll={() => toggleScrollIcon(true)}
                    >
                        {mockMessages.map(item => <Message message={item} key={item.id} />)}
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
                        <Grid item xs={10}>
                            <TextField id="outlined-basic-email" label="Type Something" fullWidth />
                        </Grid>
                        <Grid item xs={2} align="right">
                            <Fab color="primary" aria-label="add"><SendIcon /></Fab>
                        </Grid>
                    </Grid>
                </Grid>
            </Grid>
        </div>
    );
}

export default Chat;