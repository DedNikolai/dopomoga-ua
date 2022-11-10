import React, {memo} from "react";
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Avatar from '@mui/material/Avatar';
import {Link} from "react-router-dom";

const listStyles = {
    "&::-webkit-scrollbar": {
        width: 10
      },
      
      "&::-webkit-scrollbar-thumb": {
        backgroundColor: "#01579b",
      },
     overflow: 'scroll',
     height: '80%' 
}

function ChatList({chats, currentUser}) {
    return (
        <List sx={listStyles}>
            {
                chats.map(chat => {
                    const user = chat.users[0].id === currentUser.id ? chat.users[1] : chat.users[0];
                    return (
                        <Link 
                            to={`/profile/chat/user/${user.id}`} 
                            key={chat.id}
                            style={{color: 'inherit'}}
                        >
                            <ListItem button>
                                <ListItemIcon>
                                    <Avatar src={user.photo.location} />
                                </ListItemIcon>
                                <ListItemText>{user.firstName + ' ' + user.lastName}</ListItemText>
                            </ListItem>
                        </Link>
                    
                    )
                })
            }
    
        </List>
    )
}

export default memo(ChatList);