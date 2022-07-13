import React, {Component, useState} from 'react';
import {CardActions, CardContent, Divider} from '@material-ui/core';
import Card from '@mui/material/Card';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Avatar from '@mui/material/Avatar';
import { connect } from 'react-redux';
import {updateUserAvatar} from "../../store/actions/user";
import PropTypes from 'prop-types';


function AccountProfile ({profile, updateAvatar}) {
  const [avatarImg, setAavatarImg] = useState(null);
  const [newAvatar, setNewAvatar] = useState(null);
  
  const loadPhoto = () => {
    document.querySelector('#avatar_img').click();
  };

  const uploadFile = (event) => {
    const imageFile = event.target.files[0];
    setNewAvatar(imageFile);
    const imageUrl = URL.createObjectURL(imageFile);
    setAavatarImg(imageUrl);
  };

  const submitNewAvatar = () => {
    const formData = new FormData();
    formData.append('image', newAvatar)
    updateAvatar(formData);
    setAavatarImg(null);
  };

  return (
    <Card sx={{height: '100%', boxSizing: 'border-box'}}>
      <CardContent>
        <Box
          sx={{
            alignItems: 'center',
            display: 'flex',
            flexDirection: 'column'
          }}
        >
          <Avatar
            src={avatarImg || profile.photo.location || ''}
            sx={{
              height: 100,
              width: 100
            }}
          />
          <Typography
            color="textPrimary"
            gutterBottom
            variant="h3"
          >
            {profile.name}
          </Typography>
        </Box>
      </CardContent>
      <Divider/>
      <CardActions>
        <input
          type='file'
          id='avatar_img'
          hidden={true}
          onChange={uploadFile}
        />
          <Button
            color="primary"
            fullWidth
            variant="text"
            onClick={loadPhoto}
          >
            Upload picture
          </Button>
      </CardActions>
      <CardContent>
          <Divider />
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'center',
              p: 2,
              marginTop: '20px'
            }}
          >
            <Button
              color="primary"
              variant="contained"
              type='submit'
              onClick={submitNewAvatar}
              disabled={!avatarImg}
            >
              Save new Avatar
            </Button>
          </Box>
        </CardContent>
    </Card>
    )
};

AccountProfile.propTypes = {
  profile: PropTypes.object.isRequired,
  updateAvatar: PropTypes.func.isRequired
};

AccountProfile.defaultProps = {
  profile: {},
  updateAvatar: () => {}
};

const mapStateToProps = ({user}) => {
  return {
    profile: user.currentUser
  }
};

const mapDispatchToProps = dispatch => {
  return {
    updateAvatar: (file) => dispatch(updateUserAvatar(file))
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(AccountProfile);
