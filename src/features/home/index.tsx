import { FC, ReactElement, ReactNode } from 'react';
import { Box, Typography } from '@mui/material';

type Props = {
    children?: ReactNode;
};

const Home: FC<Props> = (): ReactElement => {
    return (
        <Box>
            <Typography textAlign="center" component="h1" variant="h5">Welcome to SpiderTracks Customer's manager platform!</Typography>
        </Box>
    );
};

export default Home;
