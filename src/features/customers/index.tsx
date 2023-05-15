import { FC, ReactElement, ReactNode, useState } from 'react';
import { Box, Button, Typography } from '@mui/material';
import CustomersList from './list';
import CustomersForm from './form';
import MyModal from '../../components/MyModal';

type Props = {
    children?: ReactNode;
};

const CustomersPage: FC<Props> = (): ReactElement => {
    const [showModalForm, setShowModalForm] = useState(false);

    const handleClick = () => {
        setShowModalForm(true);
    };

    const handleClose = () => {
        setShowModalForm(false);
    };

    return (
        <>
            {
                showModalForm ? (
                    <CustomersForm showModalForm={showModalForm} handleClose={handleClose} />
                ) : null
            }

            <Button onClick={handleClick}>Add new customer</Button>
            <CustomersList />
        </>
    );
};

export default CustomersPage;
