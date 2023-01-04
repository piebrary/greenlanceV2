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
            applied:applied?.map(
                application => {
                    const { name, rating } = application
                    return { name, rating }
                }
            ),
            enrolled:enrolled?.map(
                enrolment => {
                    const { name, rating } = enrolment
                    return { name, rating }
                }
            ),
            withdrawn:withdrawn?.map(
                withdrawment => {
                    const { name, rating } = withdrawment
                    return { name, rating }
                }
            ),
            timesheets:timesheets?.map(
                timesheet => timesheetAsAll(timesheet)
            )
        }
    }

}
