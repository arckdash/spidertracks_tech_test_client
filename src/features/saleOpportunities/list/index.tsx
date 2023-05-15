import { FC, ReactElement, ReactNode } from 'react';
import { Box, Typography } from '@mui/material';
import { useGetSaleOpportunitiesQuery } from '../saleOpportunitiesSlice';

type Props = {
    children?: ReactNode;
};

const SaleOpportunitiesList: FC<Props> = (): ReactElement => {
    const { data: saleOpportunities, isLoading, isSuccess, isError, error } = useGetSaleOpportunitiesQuery();

    let content = null;
    if (isLoading) {
        content = <p>Loading ...</p>;
    } else if (isSuccess) {
        content = JSON.stringify(saleOpportunities);
    } else if (isError) {
        console.log('error: ', error);
        content = <p>error</p>;
    }

    return (
        <Box>
            <Typography component="h1" variant="h5">Sale Opportunities List</Typography>
            {JSON.stringify(saleOpportunities)}
        </Box>
    );
};

export default SaleOpportunitiesList;
