import * as React from 'react';
import {styled} from '@mui/material/styles';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Collapse from '@mui/material/Collapse';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import CustomAvatar from '../CustomAvatar/CustomAvatar'

const ExpandMore = styled((props) => {
    const { ...other } = props;
    return (
        <IconButton {...other} />
    )
})(({ theme }) => ({
    marginLeft: 'auto',
    fontSize: '14px',
    transition: theme.transitions.create('transform', {
        duration: theme.transitions.duration.shortest,
    }),
}));

export default function NeedItem({need}) {
    const [expanded, setExpanded] = React.useState(false);

    const handleExpandClick = () => {
        setExpanded(!expanded);
    };

    return (
        <Card>
            <CardHeader
                avatar={
                    <CustomAvatar
                        image={need.user.photo.location}
                        name={need.user.firstName + ' ' + need.user.lastName}
                    />
                }
                action={
                    <Typography paragraph>
                        {need.region.regionName}
                    </Typography>
                }
                title={need.title}
                subheader={need.createdDate.slice(0, 10)}
            />
            <CardContent style={{height: '120px'}}>
                <Typography variant="body2" color="text.secondary">
                    {need.description}
                </Typography>
            </CardContent>
            <CardActions disableSpacing>
                <Typography variant="body2" color="text.secondary">
                    {need.categories.map(item => item.categoryName).join(', ')}
                </Typography>
                <ExpandMore
                    onClick={handleExpandClick}
                    aria-expanded={expanded}
                    aria-label="show more"
                >

                    <ExpandMoreIcon />
                </ExpandMore>
            </CardActions>
            <Collapse in={expanded} timeout="auto" unmountOnExit>
                <CardContent>
                    <Typography paragraph>
                        {`Name: ${need.user.firstName + ' ' + need.user.lastName}`}
                    </Typography>
                    <Typography paragraph>
                        {`Email: ${need.user.email}`}
                    </Typography>
                    <Typography paragraph>
                        {`Phone: ${need.user.phone}`}
                    </Typography>
                </CardContent>
            </Collapse>
        </Card>
    );
}
