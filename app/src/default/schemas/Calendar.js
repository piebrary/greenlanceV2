import * as yup from 'yup'

export const CalendarSchema = yup
    .object()
    .shape({
        title:yup
            .string()
            .required('* An event title is required')
            .min(4, 'min 4 chars'),
        until:yup
            .string()
            .required('* An end date and time is required'),
        from:yup
            .string()
            .required('* A starting date and time is required')
    })
