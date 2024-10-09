import * as Yup from 'yup';
import { LoginFormData } from '@/app/types/auth';

export const loginValidationSchema: Yup.ObjectSchema<LoginFormData> = Yup.object().shape({
    email: Yup.string().email('Invalid email address').required('Email is required'),
    password: Yup.string().min(6, 'Password must be at least 6 characters').required('Password is required'),
});
