import * as React from 'react';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Typography from '@mui/material/Typography';
import { connect } from 'react-redux';
import CheckCircleOutlineRoundedIcon from '@mui/icons-material/CheckCircleOutlineRounded';
import HighlightOffRoundedIcon from '@mui/icons-material/HighlightOffRounded';
import Grid from '@mui/material/Grid';
import { useTheme } from '@mui/material/styles';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import {openAdminDeleteModal} from '../../store/actions/propositions';

function UserHelpAdminItem({help, deleteHelp, size}) {
    const theme = useTheme();

    return (
        <Card>
            <CardHeader
                avatar={<DeleteOutlineIcon onClick={() => deleteHelp(help.id, help.user.id, size)} />}
                action={
                    <Typography paragraph>
                        {help.region.regionName}
                    </Typography>
                }
                title={help.title}
                subheader={help.createdDate.slice(0, 10)}
            />
            <CardContent sx={{height: '170px'}}>
                <Typography variant="body2" color="text.secondary">
                    {help.description}
                </Typography>
            </CardContent>
            <CardActions disableSpacing sx={{display: 'flex', justifyContent: 'space-between', alignItems: 'center'}}>
                <Typography variant="body2" color="text.secondary">
                    {help.categories.map(item => item.categoryName).join(', ')}
                </Typography>
                {
                    help.isActive ?
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

const mapStateToProps = ({}) => {
    return {
    
    }
};

const mapDispatchToProps = dispatch => {
    return {
        deleteHelp: (id, userId, size) => dispatch(openAdminDeleteModal(id, userId, size))
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(UserHelpAdminItem);
