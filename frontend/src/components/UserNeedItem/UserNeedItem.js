import * as React from 'react';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Typography from '@mui/material/Typography';
import EditIcon from '@mui/icons-material/Edit';
import {Link} from "react-router-dom";
import { connect } from 'react-redux';
import CheckCircleOutlineRoundedIcon from '@mui/icons-material/CheckCircleOutlineRounded';
import HighlightOffRoundedIcon from '@mui/icons-material/HighlightOffRounded';
import Grid from '@mui/material/Grid';
import { useTheme } from '@mui/material/styles';

function UserNeedItem({need, user}) {
    const theme = useTheme();

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
            <CardActions disableSpacing sx={{display: 'flex', justifyContent: 'space-between', alignItems: 'center'}}>
                <Typography variant="body2" color="text.secondary">
                    {need.categories.map(item => item.categoryName).join(', ')}
                </Typography>
                {
                    need.isActive ?
                        <Grid variant="body2" color={theme.palette.primary.green} sx={{display: 'flex', alignItems: 'center'}}>
                            <Typography sx={{marginRight: '10px'}}>Активна</Typography>
                            <Typography><CheckCircleOutlineRoundedIcon/></Typography>
                        </Grid>
                        :
                        <Grid variant="body2" color={theme.palette.primary.red} sx={{display: 'flex', alignItems: 'center'}}>
                            <Typography sx={{marginRight: '10px'}}>Зупинено</Typography>
                            <Typography><HighlightOffRoundedIcon/></Typography>
                        </Grid>
                }
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
