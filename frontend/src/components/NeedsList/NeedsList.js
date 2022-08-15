import React, {memo} from 'react';
import NeedItem from '../../components/NeedItem/NeedItem';
import Grid from '@mui/material/Grid';

function NeedsList({needs}) {
    console.log('render')
    return (
        <Grid container spacing={{ xs: 2, md: 3 }} columns={{ xs: 4, sm: 8, md: 12 }}>
            {
                needs.map((need, index) => (
                    <Grid item xs={12} sm={4} md={4} key={index}>
                        <NeedItem need={need}/>
                    </Grid>
                ))
            }
        </Grid>
    )
}

export default memo(NeedsList);