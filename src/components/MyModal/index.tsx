import { FC, ReactElement, ReactNode } from 'react';
import { Box, Modal, Paper, Typography } from '@mui/material';
import { useStyles } from './styles';
import { Icon } from '@iconify/react/dist/iconify.js';

type Props = {
    children?: ReactNode;
    display: boolean;
    closeHandler: () => void;
    title: string;
    showCloseIcon?: boolean;
};

const MyModal: FC<Props> = ({
    display,
    closeHandler,
    title,
    children,
    showCloseIcon = true, }): ReactElement => {
    const { classes } = useStyles();

    return (
        <Modal open={display} onClose={closeHandler}>
            <Paper elevation={6} className={classes.container}>
                <Box width="100%" className={classes.header}>
                    <Box>
                        <Typography component="h1" variant="h5">
                            {title}
                        </Typography>
                    </Box>
                    {showCloseIcon ? (
                        <Box>
                            <Icon className={classes.closeIcon} onClick={closeHandler} icon="ic:round-close" />
                        </Box>
                    ) : null}
                </Box>
                <Box>
                    {children}
                </Box>
            </Paper>
        </Modal>
    );
};

export default MyModal;
