/* eslint-disable react-hooks/rules-of-hooks */

import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';

export const createForm = (yupObjectShapeSchema: any) => {
    const form = useForm({ resolver: yupResolver(yupObjectShapeSchema) });

    return {
        register: form.register,
        handleSubmit: form.handleSubmit,
        errors: form.formState.errors,
        reset: form.reset,
        setValue: form.setValue,
        form
    };
};

/* eslint-enable react-hooks/rules-of-hooks */
