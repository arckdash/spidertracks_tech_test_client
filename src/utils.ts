import { DeepRequired, FieldErrorsImpl } from 'react-hook-form';

/**
 * Determine whether a form should display a field error or not.
 */
export const showAsError = <T>(fieldName: string, errors: FieldErrorsImpl<DeepRequired<T>>): boolean => {
    return fieldName in errors;
};