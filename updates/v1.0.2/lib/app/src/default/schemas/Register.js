import * as yup from 'yup'

export const RegisterSchema = yup
    .object()
    .shape({
        username:yup
            .string()
            .required('* Username is required'),
        email:yup
            .string()
            .required('* Email is required')
            .email('* Please enter a valid email address'),
        password:yup
            .string()
            .matches(/.{8,}/, {
                excludeEmptyString: true,
                message: '* Password must be 8 characters',
            })
            .matches(/[a-zA-Z]+[^a-zA-Z\s]+/, {
                excludeEmptyString: true,
                message: '* Password needs to contain at least 1 number or special character (@,!,#, etc).'
            }),
        repeatPassword:yup
            .string()
            .oneOf([yup.ref('password'), null], '* Passwords must match'),
    })
