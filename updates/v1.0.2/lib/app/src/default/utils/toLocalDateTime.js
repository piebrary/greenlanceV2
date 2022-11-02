export function toLocalDateTime(stringDate){

    if(stringDate === undefined){

        return

    }

    const date = new Date(stringDate)

    function addLeadingZero(i){

        return (i < 10 ? '0' : '') + i

    }

    const
        YYYY = date.getFullYear(),
        MM = addLeadingZero(date.getMonth() + 1),
        DD = addLeadingZero(date.getDate()),
        HH = addLeadingZero(date.getHours()),
        II = addLeadingZero(date.getMinutes()),
        SS = addLeadingZero(date.getSeconds())

    return `${YYYY}-${MM}-${DD}T${HH}:${II}:${SS}`

}
