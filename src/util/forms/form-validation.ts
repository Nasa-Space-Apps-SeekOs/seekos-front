import { InputFormState } from './form-types';

export const FormValidators = {
    isEmpty: <T>(input: InputFormState<T>) => {
        return input.touched && !String(input.value);
    }
};

export const formErrorMessage = (validations: {
    [message: string]: boolean | undefined;
}): string => {
    return Object.entries(validations)
        .filter((v) => v[1])
        .map((v) => v[0])
        .join('; ');
};
