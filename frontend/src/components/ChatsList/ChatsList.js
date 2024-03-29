import React from "react";
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import {Link} from "react-router-dom";
import {connect} from 'react-redux';
import CustomAvatar from "../../components/CustomAvatar/CustomAvatar";
import Badge from '@mui/material/Badge';

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
                                    <Badge badgeContent={chat.messages.length} color="error">
                                        <CustomAvatar
                                            image={user.photo?.location}
                                            name={user.firstName + ' ' + user.lastName}
                                        />
                                    </Badge>
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

const mapStateToProps = ({user}) => {
    return {
        currentUser: user.currentUser
    }
};

const mapDispatchToProps = dispatch => {
    return {
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ChatList);
