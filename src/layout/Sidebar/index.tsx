import { FC, ReactElement, ReactNode } from 'react';
import { Divider, Drawer, List, ListItemButton, ListItemIcon, ListItemText } from '@mui/material';
import { Link as RouterLink, useLocation } from 'react-router-dom';
import { Icon } from '@iconify/react';
import { useStyles } from './styles';

type Props = {
    children?: ReactNode;
};

const menuItems = [
    {
        id: 1,
        text: 'Customers',
        icon: <Icon icon="mdi:user" />,
        path: '/customers',
    },
    {
        id: 2,
        text: 'Sale Opportunities',
        icon: <Icon icon="mdi:sale-circle-outline" />,
        path: '/sale-opportunities',
    },
];

const Sidebar: FC<Props> = (): ReactElement => {
    const { classes } = useStyles();
    const location = useLocation();

    return (
        <Drawer variant="permanent">
            <List component="nav" className={classes.menuContainer}>
                {menuItems.map((mi) => (
                    <ListItemButton
                        key={mi.id}
                        selected={mi.path === location.pathname}
                        component={RouterLink}
                        to={mi.path}
                    >
                        <ListItemIcon>
                            {mi.icon}
                        </ListItemIcon>
                        <ListItemText primary={mi.text} />
                    </ListItemButton>
                ))}
                <Divider sx={{ my: 1 }} />
            </List>
        </Drawer>
    );
};

export default Sidebar;
