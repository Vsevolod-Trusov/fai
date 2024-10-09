import * as Yup from 'yup';

export const abstractFormValidationSchema = Yup.object().shape({
    email: Yup.string()
        .email('Invalid email format')
        .required('Email is required'),
    password: Yup.string()
        .min(8, 'Password must be at least 8 characters')
        .matches(/[A-Z]/, 'Password must contain at least one uppercase letter')
        .matches(/[a-z]/, 'Password must contain at least one lowercase letter')
        .matches(/[0-9]/, 'Password must contain at least one number')
        .required('Password is required'),
    phoneNumber: Yup.string()
        .matches(/^\+?[1-9]\d{1,14}$/, 'Invalid phone number format')
        .required('Phone number is required'),
    role: Yup.string()
        .oneOf(['user', 'merchant'], 'Invalid role')
        .required('Role is required'),
});
