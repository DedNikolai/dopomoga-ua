import React, {useEffect} from 'react';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import UserNeedItem from '../../components/UserNeedItem/UserNeedItem';
import BasicPagination from '../../components/Pagination/BasicPagination';
import {getUserNeeds} from "../../store/actions/need";
import {connect} from 'react-redux';
import Preloader from '../../components/Preloader/Preloader';

function CurentUserNeeds(props) {
    const {needs, needsLoading, getNeeds} = props;
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

    return (
        <Box sx={{ flexGrow: 1, marginTop: '30px', padding: '0 20px'}}>
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
                    <></>
            }

        </Box>
    );
};

const mapStateToProps = ({need}) => {
    return {
        needs: need.userNeeds,
        needsLoading: need.userNeedsLoading,
    }
};

const mapDispatchToProps = dispatch => {
    return {
        getNeeds: (page, size) => dispatch(getUserNeeds(page, size)),
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(CurentUserNeeds);
