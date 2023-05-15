import { makeStyles } from 'tss-react/mui';

export const useStyles = makeStyles({ name: 'Customers' })((theme) => {
    return {
        container: {
            backgroundColor: 'red',
        },
    };
});