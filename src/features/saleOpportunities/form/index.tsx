import { FC, ReactElement, ReactNode } from 'react';
import { Box, Button, FormControl, FormHelperText, FormLabel, Grid, MenuItem, Select, TextField, Typography } from '@mui/material';
import { useForm } from 'react-hook-form';
import { showAsError } from '../../../utils';
import { SaleOpportunity } from '../../../models/saleOpportunity.model';
import { toast } from 'react-toastify';
import { useCreateSaleOpportunityMutation } from '../saleOpportunitiesSlice';
import { useGetCustomersQuery } from '../../customers/customersSlice';
import MyModal from '../../../components/MyModal';

type Props = {
    children?: ReactNode;
    showModalForm: boolean;
    handleClose: () => void;
};

type TSaleOpportunity = Omit<SaleOpportunity, 'uuid'>;

const SaleOpportunityForm: FC<Props> = ({ showModalForm, handleClose }): ReactElement => {
    const saleOpportunityStatus = ['NEW', 'CLOSED_WON', 'CLOSED_LOST'];
    const [createSaleOpportunity, { isSuccess, isError, error }] = useCreateSaleOpportunityMutation();
    const { data: customers } = useGetCustomersQuery();

    const {
        register,
        handleSubmit,
        formState: { errors },
        setValue,
        watch,
    } = useForm<TSaleOpportunity>({
        defaultValues: {
            name: ' ',
            status: 'NEW',
            customer: {
                uuid: ' ',
                firstName: ' ',
                lastName: ' ',
            },
        },
    });

    if (isSuccess) {
        toast.success('Sale Opportunity created successfully!');
        handleClose();
    }

    if (isError) {
        console.error('Error: ', error);
        toast.error('Sale Opportunity could not be created');
        handleClose();
    }

    const onSubmit = handleSubmit((data) => {
        createSaleOpportunity({
            name: data.name,
            status: data.status,
            customerUUID: data.customer.uuid,
        });
    });

    return (
        <MyModal display={showModalForm} closeHandler={handleClose} title='Record Sale Opportunity' showCloseIcon={true}>
            <form>
                <Grid container>
                    <Grid item xs={12} sm={6}>
                        {/* name */}
                        <TextField
                            size="small"
                            margin="normal"
                            error={showAsError('name', errors)}
                            required
                            inputProps={{ maxLength: 50 }}
                            fullWidth
                            id="name"
                            label="Name"
                            autoComplete="name"
                            autoFocus
                            {...register('name', {
                                required: 'This field is required',
                                maxLength: {
                                    message: 'This field should not be longer than 50 characters.',
                                    value: 50,
                                },
                            })}
                        />
                        {errors?.name && (
                            <Typography component="span" variant="body1" color="error.main">
                                {errors?.name.message}
                            </Typography>
                        )}

                        {/* Customer */}
                        <FormControl error={showAsError('status', errors)}>
                            <FormLabel id="saleOpportunity-customer">Customer *</FormLabel>
                            <Select labelId="saleOpportunity-customer" {...register('customer.uuid')}>
                                {customers?.data.map((customer) => (
                                    <MenuItem key={customer.uuid} value={customer.uuid}>
                                        {`${customer.lastName}, ${customer.firstName}`}
                                    </MenuItem>
                                ))}
                            </Select>
                            {/* Display validation error messages */}
                            {errors.status && <FormHelperText>{errors.status.message}</FormHelperText>}
                        </FormControl>
                    </Grid>

                    <Grid item xs={12} sm={6}>
                        <FormControl error={showAsError('status', errors)}>
                            <FormLabel id="saleOpportunity-status">Status *</FormLabel>
                            <Select labelId="saleOpportunity-status" {...register('status')}>
                                {saleOpportunityStatus.map((status) => (
                                    <MenuItem key={status} value={status}>
                                        {status}
                                    </MenuItem>
                                ))}
                            </Select>
                            {/* Display validation error messages */}
                            {errors.status && <FormHelperText>{errors.status.message}</FormHelperText>}
                        </FormControl>
                    </Grid>

                    <Button onClick={onSubmit}>Submit</Button>
                </Grid>
            </form>
        </MyModal>
    );
};

export default SaleOpportunityForm;
