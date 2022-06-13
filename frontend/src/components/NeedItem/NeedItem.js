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

const mockNeed = {
    id: 1,
    createdDate: '2020-01-29',
    title: 'Need 1',
    description: ' This impressive paella is a perfect party dish and a fun meal to cook\n' +
    '                    together with your guests. Add 1 cup of frozen peas along with the mussels,\n' +
    '                    if you like. This impressive paella is a perfect party dish and a fun meal to cook\n' +
    '                    together with your guests. Add 1 cup of frozen peas along with the mussels,\n' +
    '                    if you like.',
    categories: [
        {
            id: 1,
            categoryName: 'Category 1',
        },
        {
            id: 2,
            categoryName: 'Category 2',
        }
    ],
    isActive: true,
    region: 'Kyiv',
    user: {
        id: 1,
        firstName: 'Nick',
        lastName: 'Blashchuk',
        image: null,
        email: 'nixk@ukr.net',
        phone: '093-824-98-74',
    }

};

export default function NeedItem() {
    const [expanded, setExpanded] = React.useState(false);

    const handleExpandClick = () => {
        setExpanded(!expanded);
    };

    return (
        <Card>
            <CardHeader
                avatar={
                    <CustomAvatar
                        image={mockNeed.user.image}
                        name={mockNeed.user.firstName + ' ' + mockNeed.user.lastName}
                    />
                }
                action={
                    <Typography paragraph>
                        {mockNeed.region}
                    </Typography>
                }
                title={mockNeed.title}
                subheader={mockNeed.createdDate}
            />
            <CardContent>
                <Typography variant="body2" color="text.secondary">
                    {mockNeed.description}
                </Typography>
            </CardContent>
            <CardActions disableSpacing>
                <Typography variant="body2" color="text.secondary">
                    {mockNeed.categories.map(item => item.categoryName).join(', ')}
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
                        {`Name: ${mockNeed.user.firstName + ' ' + mockNeed.user.lastName}`}
                    </Typography>
                    <Typography paragraph>
                        {`Email: ${mockNeed.user.email}`}
                    </Typography>
                    <Typography paragraph>
                        {`Phone: ${mockNeed.user.phone}`}
                    </Typography>
                </CardContent>
            </Collapse>
        </Card>
    );
}
