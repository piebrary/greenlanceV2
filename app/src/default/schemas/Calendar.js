import * as yup from 'yup'

export const CalendarSchema = yup
    .object()
    .shape({
        name:yup
            .string()
            .required('* An event title is required')
            .min(4, '* An event title must have a minimum of 4 characters'),
        datetime:yup
            .object()
            .shape({
                start:yup
                    .string()
                    .required('* A starting date and time is required'),
                end:yup
                    .string()
                    .required('* An end date and time is required')
            })
    })
