import * as yup from 'yup'

export const EmailSchema = yup
    .object()
    .shape({
        to:yup
            .string()
            .required('* Email is required')
            .email('* Please provide a valid emailaddess'),
        from:yup
            .string()
            .required('* Email is required')
            .email('* Please provide a valid emailaddess'),
        subject:yup
            .string(),
        message:yup
            .string(),
    })
