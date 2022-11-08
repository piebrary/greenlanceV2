import * as yup from 'yup'

export const ShiftSchema = yup
    .object()
    .shape({
        name:yup
            .string()
            .required('* A shift title is required')
            .min(4, '* A shift title must contain a minimum of 4 characters'),
        price:yup
            .string()
            .matches(/^[1-9]\d*(\,\d+)?$/gi, '* Price must be a number greater than 0')
            .required('* A price is required'),
        spots:yup
            .string()
            .matches(/^[1-9]+$/gi, '* Spots must be a number greater than 0')
            .required('* The number of available spots is required'),
        datetime:yup
            .object()
            .shape({
                start:yup
                    .string()
                    .required('* A starting date and time is required'),
                end:yup
                    .string()
                    .required('* An end date and time is required'),
            }),
        location:yup
            .object()
            .shape({
                start:yup
                    .object()
                    .shape({
                        label:yup
                            .string()
                            .required('* A label is required'),
                        street:yup
                            .string()
                            .required('* A street is required'),
                        number:yup
                            .string()
                            .required('* A number is required'),
                        zipCode:yup
                            .string()
                            .required('* A zip code is required'),
                        city:yup
                            .string()
                            .required('* A city is required'),
                        province:yup
                            .string()
                            .required('* A province is required'),
                        country:yup
                            .string()
                            .required('* A country is required'),
                    }),
                end:yup
                    .object()
                    .shape({
                        label:yup
                            .string()
                            .required('* A label is required'),
                        street:yup
                            .string()
                            .required('* A street is required'),
                        number:yup
                            .string()
                            .required('* A number is required'),
                        zipCode:yup
                            .string()
                            .required('* A zip code is required'),
                        city:yup
                            .string()
                            .required('* A city is required'),
                        province:yup
                            .string()
                            .required('* A province is required'),
                        country:yup
                            .string()
                            .required('* A country is required'),
                    }),
            })
    })
