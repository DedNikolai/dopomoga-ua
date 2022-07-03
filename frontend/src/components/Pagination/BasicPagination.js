import * as React from 'react';
import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';

export default function BasicPagination(props) {
    const {count = 10, page, onChane = () => {}} = props;
    const [defPage, setPage] = React.useState(1);

    return (
        <Stack spacing={2}>
            <Pagination
                color="secondary"
                showFirstButton
                showLastButton
                count={count}
                page={page || defPage}
                onChange={onChane}
            />
        </Stack>
    );
}
