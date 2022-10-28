import * as yup from 'yup'

export const PasswordResetRequestSchema = yup
    .object()
    .shape({
        email:yup
            .string()
            .required('* Email is required')
            .email('* Please enter a valid email address')
    })
