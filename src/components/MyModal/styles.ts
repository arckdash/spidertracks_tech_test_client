import { makeStyles } from 'tss-react/mui';

export const useStyles = makeStyles({ name: 'MyModal' })((theme) => {
    return {
        container: {
            display: 'flex',
            flexDirection: 'column',
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            padding: '10px',
            // width: '40%',
            // height: '60%',
        },
        header: {
            display: 'flex',
            justifyContent: 'space-between',
            paddingBottom: '10px',
            borderBottom: '1px solid lightgray',
        },
        closeIcon: {
            cursor: 'pointer',
            textDecoration: 'none',
        },
    };
});
