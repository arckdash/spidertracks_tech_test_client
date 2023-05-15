import { makeStyles } from 'tss-react/mui';

export const useStyles = makeStyles({ name: 'Page' })((theme) => {
    return {
        pageContainer: {
            backgroundColor: theme.palette.background.default,
            margin: '5rem 5rem 5rem 18rem',
        },
    };
});