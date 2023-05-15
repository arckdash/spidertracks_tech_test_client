import { FC, ReactElement, ReactNode } from 'react';
import { Box, Button, FormControl, FormHelperText, FormLabel, Grid, MenuItem, Select, TextField, Typography } from '@mui/material';
import { useForm } from 'react-hook-form';
import { showAsError } from '../../../utils';
import { Customer } from '../../../models/customer.model';
import { useCreateCustomerMutation } from '../customersSlice';
import { toast } from 'react-toastify';
import MyModal from '../../../components/MyModal';

type Props = {
    children?: ReactNode;
    showModalForm: boolean;
    handleClose: () => void;
};

type TCustomer = Omit<Customer, 'uuid'>;

const CustomersForm: FC<Props> = ({ showModalForm, handleClose }): ReactElement => {
    const customerStatus = ['ACTIVE', 'NON_ACTIVE', 'LEAD'];
    const [createCustomer, { isSuccess, isError, error }] = useCreateCustomerMutation();

    const {
        register,
        handleSubmit,
        formState: { errors },
        setValue,
        watch,
    } = useForm<TCustomer>({
        defaultValues: {
            firstName: ' ',
            lastName: ' ',
            email: ' ',
            status: 'ACTIVE',
        },
    });

    if (isSuccess) {
        toast.success('Customer created successfully!');
        handleClose();
    }

    if (isError) {
        console.error('Error: ', error);
        toast.error('Customer could not be created');
        handleClose();
    }

    const onSubmit = handleSubmit((data) => {
        createCustomer({
            firstName: data.firstName,
            lastName: data.lastName ?? '',
            email: data.email,
            status: data.status,
        });
    });

    return (
        <MyModal display={showModalForm} closeHandler={handleClose} title='Add new Customer' showCloseIcon={true}>
            <form>
                <Grid container>
                    <Grid item xs={12} sm={6}>
                        {/* First name */}
                        <TextField
                            size="small"
                            margin="normal"
                            error={showAsError('firstName', errors)}
                            required
                            inputProps={{ maxLength: 50 }}
                            fullWidth
                            id="firstName"
                            label="First Name"
                            autoComplete="firstName"
                            autoFocus
                            {...register('firstName', {
                                required: 'This field is required',
                                maxLength: {
                                    message: 'This field should not be longer than 50 characters.',
                                    value: 50,
                                },
                            })}
                        />
                        {errors?.firstName && (
                            <Typography component="span" variant="body1" color="error.main">
                                {errors?.firstName.message}
                            </Typography>
                        )}
                        {/* Last name */}
                        <TextField
                            size="small"
                            margin="normal"
                            error={showAsError('lastName', errors)}
                            required
                            inputProps={{ maxLength: 50 }}
                            fullWidth
                            id="lastName"
                            label="Last Name"
                            autoComplete="lastName"
                            autoFocus
                            {...register('lastName', {
                                required: 'This field is required',
                                maxLength: {
                                    message: 'This field should not be longer than 50 characters.',
                                    value: 50,
                                },
                            })}
                        />
                        {errors?.lastName && (
                            <Typography component="span" variant="body1" color="error.main">
                                {errors?.lastName.message}
                            </Typography>
                        )}
                    </Grid>

                    <Grid item xs={12} sm={6}>
                        {/* Email */}
                        <TextField
                            size="small"
                            margin="normal"
                            error={showAsError('email', errors)}
                            required
                            inputProps={{ maxLength: 50 }}
                            fullWidth
                            id="email"
                            label="Email"
                            autoComplete="email"
                            autoFocus
                            {...register('email', {
                                required: 'This field is required',
                                maxLength: {
                                    message: 'This field should not be longer than 50 characters.',
                                    value: 50,
                                },
                            })}
                        />
                        {errors?.email && (
                            <Typography component="span" variant="body1" color="error.main">
                                {errors?.email.message}
                            </Typography>
                        )}

                        <FormControl error={showAsError('status', errors)}>
                            <FormLabel id="customer-status">Status *</FormLabel>
                            <Select labelId="customer-status" {...register('status')}>
                                {customerStatus.map((status) => (
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

export default CustomersForm;
