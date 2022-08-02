import * as React from 'react';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Typography from '@mui/material/Typography';
import EditIcon from '@mui/icons-material/Edit';
import {Link} from "react-router-dom";
import { connect } from 'react-redux';

function UserNeedItem({need, user}) {

    return (
        <Card>
            <CardHeader
                avatar={
                    <Link to={`/profile/${user.id}/needs/${need.id}`} variant="body2" style={{color: 'inherit'}}>
                        <EditIcon
                            fontSize='large'
                            sx={{cursor: 'pointer'}}
                        />
                    </Link>
                }
                action={
                    <Typography paragraph>
                        {need.region.regionName}
                    </Typography>
                }
                title={need.title}
                subheader={need.createdDate.slice(0, 10)}
            />
            <CardContent>
                <Typography variant="body2" color="text.secondary">
                    {need.description}
                </Typography>
            </CardContent>
            <CardActions disableSpacing>
                <Typography variant="body2" color="text.secondary">
                    {need.categories.map(item => item.categoryName).join(', ')}
                </Typography>
            </CardActions>
        </Card>
    );
};

const mapStateToProps = ({user}) => {
    return {
       user: user.currentUser
    }
};

const mapDispatchToProps = dispatch => {
    return {
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(UserNeedItem);
