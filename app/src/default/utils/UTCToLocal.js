import moment from 'moment'

export function UTCToLocal(date){

    return moment(date).local().format('YYYY-MM-DDTHH:mm')

}
