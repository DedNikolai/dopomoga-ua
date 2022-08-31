import React, {useEffect} from 'react';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import UserNeedAdminItem from '../../../components/UserNeedAminItem/UserNeedAdminItem';
import BasicPagination from '../../../components/Pagination/BasicPagination';
import {getNeedsByUserId} from "../../../store/actions/need";
import {getUserById} from "../../../store/actions/user";
import {connect} from 'react-redux';
import Preloader from '../../../components/Preloader/Preloader';
import {useParams} from "react-router";

function UserNeeds(props) {
    const {needs, needsLoading, getNeeds, user, userByIdLoading, getUser} = props;
    const {content = [], number, totalPages, totalElements, size} = needs
    const pageSsize = 10;
    const {id} = useParams();

    const handleChangePage = (event, page) => {
        getNeeds(page-1, pageSsize);
    };

    useEffect(() => {
        getNeeds(id, 0, pageSsize);
        getUser(id)
    }, []);

    if (needsLoading || userByIdLoading) {
        return <Preloader/>
    }

    return (
        <Box sx={{ flexGrow: 1, marginTop: '30px', padding: '0 20px'}}>
            <Box>
                <Grid container spacing={2}>
                    <Grid item xs={12} sm={12} md={12}>
                        <h1>Потреби: {user.firstName + ' ' + user.lastName}</h1>
                    </Grid>
                </Grid>
            </Box>
            <Box sx={{ marginTop: '30px'}}>
                    <Grid container spacing={{ xs: 2, md: 3 }} columns={{ xs: 4, sm: 8, md: 12 }}>
                        {content.map((need, index) => (
                            <Grid item xs={12} sm={4} md={4} key={index}>
                                <UserNeedAdminItem need={need}/>
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
        user: user.userById,
        userByIdLoading: user.userByIdLoading
    }
};

const mapDispatchToProps = dispatch => {
    return {
        getNeeds: (id, page, size) => dispatch(getNeedsByUserId(id, page, size)),
        getUser: id => dispatch(getUserById(id))
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(UserNeeds);
