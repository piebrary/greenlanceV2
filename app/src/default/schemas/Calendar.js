import * as yup from 'yup'

export const CalendarSchema = yup
    .object()
    .shape({
        name:yup
            .string()
            .required('* An event title is required')
            .min(4, 'min 4 chars'),
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
