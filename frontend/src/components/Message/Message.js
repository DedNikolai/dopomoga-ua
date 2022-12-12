import React from "react";
import {connect} from "react-redux";
import Grid from '@mui/material/Grid';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import CustomAvatar from "../../components/CustomAvatar/CustomAvatar";


const currentUserClass = {
    display: 'flex', 
    justifyContent: 'right'
};

function Message({message, currentUser}) {
    const isUserMessage = message.user.id === currentUser.id;

    return (
        <ListItem>
            <Grid container>
                <Grid item xs={12} sx={isUserMessage ? currentUserClass : null}>
                    <CustomAvatar
                        image={message.user.photo?.location}
                        name={currentUser.firstName + ' ' + currentUser.lastName}
                    />
                </Grid>
                <Grid item xs={12}>
                    <ListItemText align={isUserMessage ? "right" : "left"} primary={message.text}></ListItemText>
                </Grid>
                <Grid item xs={12}>
                    <ListItemText align={isUserMessage ? "right" : "left"} secondary={message.time}></ListItemText>
                </Grid>
            </Grid>
        </ListItem>
    )
}

const mapStateToProps = ({user}) => {
    return {
        currentUser: user.currentUser
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        
    }

}

export default connect(mapStateToProps, mapDispatchToProps)(Message);