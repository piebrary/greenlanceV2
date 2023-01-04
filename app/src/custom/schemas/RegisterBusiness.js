import * as yup from 'yup'

export const RegisterBusinessSchema = yup
    .object()
    .shape({
        businessType:yup
            .string()
            .required('* Business type is required')
            .nullable(),
        businessName:yup
            .string()
            .required('* Business name is required'),
    })
