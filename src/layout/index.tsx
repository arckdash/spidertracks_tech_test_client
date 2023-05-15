import { FC, ReactElement, ReactNode, useState } from 'react';
import { Box } from '@mui/material';
import Header from './Header';
import Sidebar from './Sidebar';
import { useStyles } from './styles';

type Props = {
    children?: ReactNode;
};

const Layout: FC<Props> = ({ children }): ReactElement => {
    const { classes } = useStyles();

    return (
        <Box>
            <Header />
            <Sidebar />

            <Box className={classes.pageContainer}>
                {children}
            </Box>
        </Box>
    );
};

export default Layout;
