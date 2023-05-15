import { makeStyles } from 'tss-react/mui';

export const useStyles = makeStyles({ name: 'Header' })((theme) => {
    return {
        container: {
            zIndex: theme.zIndex.drawer + 1,
        },
        link: {
            color: '#fff',
        }
    };
});