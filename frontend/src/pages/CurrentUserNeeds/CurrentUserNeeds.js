import React, {useEffect} from 'react';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import UserNeedItem from '../../components/UserNeedItem/UserNeedItem';
import BasicPagination from '../../components/Pagination/BasicPagination';
import {getUserNeeds} from "../../store/actions/need";
import {connect} from 'react-redux';
import Preloader from '../../components/Preloader/Preloader';
import Button from '@mui/material/Button';
import {Link} from "react-router-dom";

function CurentUserNeeds(props) {
    const {needs, needsLoading, getNeeds, user} = props;
    const {content = [], number, totalPages, totalElements, size} = needs

    const handleChangePage = (event, page) => {
        getNeeds(page-1);
    };

    useEffect(() => {
        getNeeds(0);
    }, []);

    if (needsLoading) {
        return <Preloader/>
    }

    console.log(content)

    return (
        <Box sx={{ flexGrow: 1, marginTop: '30px', padding: '0 20px'}}>
        <Box>
            <Grid container spacing={2}>
                <Grid item xs={6} sm={6} md={6}>
                    <h1>My Needs</h1>
                </Grid>
                <Grid item xs={6} sm={6} md={6} sx={{textAlign: 'end'}}>
                    <Link to={`/profile/${user.id}/needs/create`} variant="body2">
                            <Button
                                variant="contained" 
                                disableElevation
                                size="large"
                                color="secondary"
                                onClick={() => {}}
                            >
                                Add new need
                            </Button>
                    </Link>
                </Grid>
            </Grid>
        </Box>
        <Box sx={{ marginTop: '30px'}}>
                <Grid container spacing={{ xs: 2, md: 3 }} columns={{ xs: 4, sm: 8, md: 12 }}>
                    {content.map((need, index) => (
                        <Grid item xs={12} sm={4} md={4} key={index}>
                            <UserNeedItem need={need}/>
                        </Grid>
                    ))}
                </Grid>
            </Box>
            {
                totalElements > size ?
                    <Box sx={{ margin: '30px auto', textAlign: 'center'}}>
                        <BasicPagination
                            count={totalPages}
                            page={number+1}
                            onChane={handleChangePage}
                        />
                    </Box>
                    :
                    null
            }
        
    </Box>
    );
};

const mapStateToProps = ({need, user}) => {
    return {
        needs: need.userNeeds,
        needsLoading: need.userNeedsLoading,
        user: user.currentUser
    }
};

const mapDispatchToProps = dispatch => {
    return {
        getNeeds: (page, size) => dispatch(getUserNeeds(page, size)),
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(CurentUserNeeds);
