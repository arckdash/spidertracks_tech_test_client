import { FC, ReactElement, ReactNode, useState } from 'react';
import { Box, Button, Typography } from '@mui/material';
import { useGetCustomersQuery } from '../customersSlice';
import CustomersForm from '../form';
import { useStyles } from './styles';
import MyModal from '../../../components/MyModal';

type Props = {
    children?: ReactNode;
};

const CustomersList: FC<Props> = (): ReactElement => {
    const { classes } = useStyles();
    const { data: customers, isLoading, isSuccess, isError, error } = useGetCustomersQuery();

    let content = null;
    if (isLoading) {
        content = <p>Loading ...</p>;
    } else if (isSuccess) {
        content = JSON.stringify(customers);
    } else if (isError) {
        console.log('error: ', error);
        content = <p>error</p>;
    }

    return (
        <Box>
            <Typography component="h1" variant="h5">Customers List</Typography>
            {JSON.stringify(customers)}
        </Box >
    );
};

export default CustomersList;
