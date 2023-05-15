import { makeStyles } from 'tss-react/mui';

export const useStyles = makeStyles({ name: 'Sidebar' })((theme) => {
    return {
        menuContainer: {
            marginTop: '5rem',
        },
    };
});