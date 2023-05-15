import { FC, ReactElement, ReactNode, useState } from 'react';
import { Box, Button, Typography } from '@mui/material';
import SaleOpportunityForm from './form';
import SaleOpportunitiesList from './list';

type Props = {
    children?: ReactNode;
};

const SaleOpportunityPage: FC<Props> = (): ReactElement => {
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
                    <SaleOpportunityForm showModalForm={showModalForm} handleClose={handleClose} />
                ) : null
            }

            <Button onClick={handleClick}>Record Sale Opportunity</Button>
            <SaleOpportunitiesList />
        </>
    );
};

export default SaleOpportunityPage;
