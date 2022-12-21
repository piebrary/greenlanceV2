import * as yup from 'yup'

export const SettingsSchema = yup
    .object()
    .shape({
        email:
            yup
            .string()
            .when('email', {
                is: value => value && value.length > 0,
                then: yup
                    .string()
                    .required('* Email is required')
            }),
        newPassword:yup
            .string()
            .matches(/.{8,}/, {
                excludeEmptyString: true,
                message: '* Password must be 8 characters',
            })
            .matches(/[a-zA-Z]+[^a-zA-Z\s]+/, {
                excludeEmptyString: true,
                message: '* Password needs to contain at least 1 number or special character (@,!,#, etc).'
            }),
        newPasswordRepeat:yup
            .string()
            .oneOf([yup.ref('newPassword'), null], '* Passwords must match'),
        password:yup
            .string()
            .required('* Password is required')
            // .when('newPassword', {
            //     is: value => value && value.length > 0,
            //     then: yup
            //         .string()
            //         .required('* Current password is required')
            //     })
            // .when('email', {
            //     is: value => value && value.length > 0,
            //     then: yup
            //         .string()
            //         .required('* Current password is required')
            //     }),
    }, [['email', 'email']])
