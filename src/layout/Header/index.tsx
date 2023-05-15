import { FC, ReactElement, ReactNode } from 'react';
import { AppBar, Toolbar, Typography, Link } from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';
import { useStyles } from './styles';

type Props = {
    children?: ReactNode;
};

const Header: FC<Props> = (): ReactElement => {
    const { classes } = useStyles();

    return (
        <AppBar className={classes.container}>
            <Toolbar>
                <Link className={classes.link} component={RouterLink} to="/">
                    <Typography
                        component="h1"
                        variant="h6"
                        color="inherit"
                        noWrap
                        sx={{ flexGrow: 1 }}
                    >
                        Spidertracks Tech test
                    </Typography>
                </Link>
            </Toolbar>
        </AppBar>
    );
};

export default Header;
