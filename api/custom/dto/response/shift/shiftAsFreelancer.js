module.exports = (documents, userId) => {

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

        const {
            _id,
            name,
            description,
            label,
            price,
            positions,
            business,
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
            business,
            datetime:datetime && datetimeResponseDto(datetime),
            location:location && locationResponseDto(location),
            recurring:recurring && recurringResponseDto(recurring),
            active,
            applied:applied?.filter(_id => _id.equals(userId)),
            enrolled:enrolled?.filter(_id => _id.equals(userId)),
            withdrawn:withdrawn?.filter(_id => _id.equals(userId)),
            timesheets:timesheets?.filter(timesheet => timesheet?.freelancer?.equals(userId)).map(timesheet => timesheetAsAll(timesheet)),
        }
    }

}
