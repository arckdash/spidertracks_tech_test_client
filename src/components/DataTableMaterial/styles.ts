import { makeStyles } from 'tss-react/mui';

export const useStyles = makeStyles({ name: 'DataTableMui' })((theme) => {
    return {
        tableHederColumnCell: {
            backgroundColor: `${theme.palette.customBackground.main} !important`,
            '& .Mui-TableHeadCell-Content': {
                justifyContent: 'space-between',
            },
        },
    };
});
