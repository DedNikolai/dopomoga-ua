import React, {useEffect} from 'react';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import UserHelpAdminItem from '../../../components/UseHelpAminItem/UserHelpAdminItem';
import BasicPagination from '../../../components/Pagination/BasicPagination';
import {getHelpsByUserId} from "../../../store/actions/propositions";
import {getUserById} from "../../../store/actions/user";
import {connect} from 'react-redux';
import Preloader from '../../../components/Preloader/Preloader';
import {useParams} from "react-router";

function UserHelps(props) {
    const {helps, helpsLoading, getHelps, user, userByIdLoading, getUser} = props;
    const {content = [], number, totalPages, totalElements, size} = helps;
    const pageSsize = 10;
    const {id} = useParams();

    const handleChangePage = (event, page) => {
        getHelps(page-1, pageSsize);
    };

    useEffect(() => {
        getHelps(id, 0, pageSsize);
        getUser(id)
    }, []);

    if (helpsLoading || userByIdLoading) {
        return <Preloader/>
    }

    return (
        <Box sx={{ flexGrow: 1, marginTop: '30px', padding: '0 20px'}}>
            <Box>
                <Grid container spacing={2}>
                    <Grid item xs={12} sm={12} md={12}>
                        <h1>Допоиога від: {user.firstName + ' ' + user.lastName}</h1>
                    </Grid>
                </Grid>
            </Box>
            <Box sx={{ marginTop: '30px'}}>
                <Grid container spacing={{ xs: 2, md: 3 }} columns={{ xs: 4, sm: 8, md: 12 }}>
                    {content.map((help, index) => (
                        <Grid item xs={12} sm={4} md={4} key={index}>
                            <UserHelpAdminItem help={help}/>
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

const mapStateToProps = ({propositions, user}) => {
    return {
        helps: propositions.userProposals,
        helpsLoading: propositions.userProposalsLoading,
        user: user.userById,
        userByIdLoading: user.userByIdLoading
    }
};

const mapDispatchToProps = dispatch => {
    return {
        getHelps: (id, page, size) => dispatch(getHelpsByUserId(id, page, size)),
        getUser: id => dispatch(getUserById(id))
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(UserHelps);
