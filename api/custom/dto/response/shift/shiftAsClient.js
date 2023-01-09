module.exports = documents => {

    if(Array.isArray(documents)){

        return documents.map(d => getDto(d))

    }

    return getDto(documents)

    function getDto(document){

        let datetimeResponseDto, locationResponseDto, recurringResponseDto

        try {
            datetimeResponseDto = require('../../../../custom/dto/response/datetime')
        } catch {
            datetimeResponseDto = require('../../../../default/dto/response/datetime')
        }

        try {
            locationResponseDto = require('../../../../custom/dto/response/location')
        } catch {
            locationResponseDto = require('../../../../default/dto/response/location')
        }

        try {
            recurringResponseDto = require('../../../../custom/dto/response/recurring')
        } catch {
            recurringResponseDto = require('../../../../default/dto/response/recurring')
        }

        const timesheetAsAll = require('../../../../custom/dto/response/timesheet/timesheetAsAll')
        const userAsClient = require('../../../../custom/dto/response/user/userAsClient')
        const freelancerAsClient = require('../../../../custom/dto/response/freelancer/freelancerAsClient')

        const {
            _id,
            name,
            description,
            label,
            price,
            positions,
            client,
            datetime,
            location,
            recurring,
            active,
            applied,
            enrolled,
            withdrawn,
            timesheets
        } = document

        return {
            _id,
            name,
            description,
            label,
            price,
            positions,
            client,
            datetime:datetime && datetimeResponseDto(datetime),
            location:location && locationResponseDto(location),
            recurring:recurring && recurringResponseDto(recurring),
            active,
            applied,
            enrolled,
            withdrawn,
            timesheets:timesheets?.map(
                timesheet => timesheetAsAll(timesheet)
            )
        }
    }

}
