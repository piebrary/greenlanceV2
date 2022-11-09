import { useContext, useState, useEffect } from 'react'

import moment from 'moment'

import { LanguageContext } from '../../../default/contexts/LanguageContext'
import { UserContext } from '../../../default/contexts/UserContext'
import { FreelancerContext } from '../../../custom/contexts/FreelancerContext'

import { getShift, getShifts, postShift, putShift, delShift, applyForShift, withdrawFromShift, acceptForShift, declineForShift } from '../../../custom/services/ShiftService'
import { getFreelancersById } from '../../../custom/services/FreelancerService'

import { ShiftSchema } from '../../schemas/Shift'

import Grid from '../../../default/components/grid/Grid'
import Button from '../../../default/components/button/Button'
import List from '../../../default/components/list/List'
import Layout from '../../../default/components/layouts/basic/Layout'
import Card from '../../../default/components/card/Card'
import Controls from '../../../default/components/controls/Controls'
import Form from '../../../default/components/form/Form'
import Radio from '../../../default/components/formElements/radio/Radio'
import Checkbox from '../../../default/components/formElements/checkbox/Checkbox'
import Input from '../../../default/components/formElements/input/Input'
import Textarea from '../../../default/components/formElements/textarea/Textarea'
import Select from '../../../default/components/formElements/select/Select'
import AddressInput from '../../../default/components/formElements/addressInput/AddressInput'

import Logo from '../../../custom/components/logo/Logo'

import { menuitems } from '../../../custom/assets/js/menu/items'

import { applyStyles } from '../../../default/utils/applyStyles'
import { notificationManager } from '../../../default/utils/notifications'
import { toLocalDateTime } from '../../../default/utils/toLocalDateTime'

import { AiOutlineFileAdd } from 'react-icons/ai'

import styles from './Shifts.module.css'

export default function Shifts(){

    const { applyTranslation } = useContext(LanguageContext)
    const { userData, _id, hasRole } = useContext(UserContext)
    const { freelancerData } = useContext(FreelancerContext)

    const [shifts, setShifts] = useState([])
    const [filteredShifts, setFilteredShifts] = useState([])
    const [viewMode, setViewMode] = useState('view shifts')
    const [timeframe, setTimeframe] = useState('future')
    const [shiftTypes, setShiftTypes] = useState(['available', 'applied', 'enrolled'])
    const [shiftStates, setShiftStates] = useState(['fullfilled', 'unfullfilled'])
    const [searchInput, setSearchInput] = useState('')
    const [selectedShift, setSelectedShift] = useState()
    const [shiftDetails, setShiftDetails] = useState()

    const notifications = notificationManager()

    const defaultValues = {
        name:selectedShift?.name,
        spots:selectedShift?.spots,
        price:selectedShift?.price,
        label:selectedShift?.label,
        datetime:{
            start:toLocalDateTime(selectedShift?.datetime?.start),
            end:toLocalDateTime(selectedShift?.datetime?.end)
        },
        description:selectedShift?.description,
        location:{
            start:selectedShift?.location?.start,
            end:selectedShift?.location?.end
        }
    }

    useEffect(() => {

        fetchShifts()

    }, [])

    useEffect(() => {

        filterShifts(shifts)

    }, [shifts, timeframe, shiftTypes, shiftStates, searchInput])

    useEffect(() => {

        ;(async () => {

            if(hasRole('business') && selectedShift){

                try {

                    const freelancers = [...selectedShift.applied, ...selectedShift.enrolled]

                    const response = await getFreelancersById(freelancers)

                    setShiftDetails([
                        ...selectedShift.applied.map(a => {
                            const freelancer = response.data.find(f => f._id === a)
                            freelancer.status = 'applied'
                            return freelancer
                        }),
                        ...selectedShift.enrolled.map(a => {
                            const freelancer = response.data.find(f => f._id === a)
                            freelancer.status = 'enrolled'
                            return freelancer
                        })
                    ])

                } catch (error) {

                    notifications.create({
                        title: "Could not load shift details",
                        type: 'danger',
                        container:'center'
                    })

                }

            }

        })()

    }, [selectedShift])

    async function fetchShifts(){

        try {

            const response = await getShifts()

            setShifts(response.data)

        } catch (error) {

            notifications.create({
                title: "Could not load shifts",
                type: 'danger',
                container:'center'
            })

        }

    }

    function toggleShiftTypeOrState(previous, value){

        const newState = [...previous]

        newState.includes(value)
        ? newState.splice(newState.indexOf(value), 1)
        : newState.push(value)

        return newState

    }

    function openShiftDetails(shift){

        setSelectedShift(shift)
        setViewMode('view shift')

    }

    function filterShifts(){

        const filtered = shifts
            .filter(shift => {
                if(timeframe === 'future' && shift.datetime.end > (new Date()).toISOString()) return shift
                if(timeframe === 'past' && shift.datetime.end < (new Date()).toISOString()) return shift
            })
            .filter(shift => {
                if(hasRole('business')) return shift
                if(hasRole('freelancer') && shiftTypes.includes('available') && shift.applied.length < shift.spots) return shift
                if(hasRole('freelancer') && shiftTypes.includes('applied') && shift.applied.includes(freelancerData._id)) return shift
                if(hasRole('freelancer') && shiftTypes.includes('enrolled') && shift.enrolled.includes(freelancerData._id)) return shift
            })
            .filter(shift => {
                if(hasRole('freelancer')) return shift
                if(hasRole('business') && shiftStates.includes('fullfilled') && shift.enrolled?.length === shift.spots) return shift
                if(hasRole('business') && shiftStates.includes('unfullfilled') && shift.enrolled?.length < shift.spots) return shift
            })
            .filter(shift => {
                if(JSON.stringify(shift).includes(searchInput)) return shift
            })
            .sort((a, b) => a.datetime.start > b.datetime.start)

        setFilteredShifts(filtered)

    }

    function onSubmit(data){

        if(viewMode === 'update shift') updateShift(data)
        if(viewMode === 'create shift') createShift(data)

    }

    async function createShift(data){

        try {

            const response = await postShift(data)

            setShifts(previous => {

                return [...previous, response.data]

            })

            setViewMode('view shifts')
            setSelectedShift()

            notifications.create({
                title: "Shift successfully created",
                type: 'success',
                container:'center'
            })

        } catch (error) {

            notifications.create({
                title: "Could not create shifts",
                type: 'danger',
                container:'center'
            })

        }

    }

    async function updateShift(data){

        try {

            data._id = selectedShift._id

            const response = await putShift(data)

            setShifts(previous => {

                const newShifts = [...previous]
                    .map(shift => {
                        if(shift._id !== response.data._id) return shift
                        return response.data
                    })

                return newShifts

            })

            setViewMode('view shifts')
            setSelectedShift()

            notifications.create({
                title: "Shift successfully updated",
                type: 'success',
                container:'center'
            })

        } catch (error) {

            notifications.create({
                title: "Could not update shift",
                type: 'danger',
                container:'center'
            })

        }

    }

    async function deleteShift(){

        try {

            const response = await delShift(selectedShift._id)

            setShifts(previous => {

                const newShifts = [...previous]
                    .filter(shift => shift._id !== selectedShift._id)

                return newShifts

            })

            setViewMode('view shifts')
            setSelectedShift()

            notifications.create({
                title: "Shift successfully deleted",
                type: 'success',
                container:'center'
            })

        } catch (error) {

            notifications.create({
                title: "Could not delete shift",
                type: 'danger',
                container:'center'
            })

        }

    }

    async function apply(_id){

        try {

            const response = await applyForShift(_id)

            setShifts(previous => {

                const newShifts = [...previous]
                    .map(shift => {
                        if(shift._id !== response.data._id) return shift
                        return response.data
                    })

                return newShifts

            })

            setSelectedShift(response.data)

            notifications.create({
                title: "Successfully applied for shift",
                type: 'Success',
                container:'center'
            })

        } catch (error) {

            notifications.create({
                title: "Could not apply for shift",
                type: 'danger',
                container:'center'
            })

        }

    }

    async function withdraw(_id){

        try {

            const response = await withdrawFromShift(_id)

            setShifts(previous => {

                const newShifts = [...previous]
                    .map(shift => {
                        if(shift._id !== response.data._id) return shift
                        return response.data
                    })

                return newShifts

            })

            setSelectedShift(response.data)

            notifications.create({
                title: "Successfully withdrawn from shift",
                type: 'Success',
                container:'center'
            })

        } catch (error) {

            notifications.create({
                title: "Could not withdraw from shift",
                type: 'danger',
                container:'center'
            })

        }

    }

    async function accept(freelancerId){

        try {

            const response = await acceptForShift(selectedShift._id, freelancerId)

            setShifts(previous => {

                const newShifts = [...previous]
                    .map(shift => {
                        if(shift._id !== response.data._id) return shift
                        return response.data
                    })

                return newShifts

            })

            setSelectedShift(response.data)

            notifications.create({
                title: "Successfully accepted freelancer for shift",
                type: 'Success',
                container:'center'
            })

        } catch (error) {

            notifications.create({
                title: "Could not accept freelancer for shift",
                type: 'danger',
                container:'center'
            })

        }

    }

    async function decline(freelancerId){

        try {

            const response = await declineForShift(selectedShift._id, freelancerId)

            setShifts(previous => {

                const newShifts = [...previous]
                    .map(shift => {
                        if(shift._id !== response.data._id) return shift
                        return response.data
                    })

                return newShifts

            })

            setSelectedShift(response.data)

            notifications.create({
                title: "Successfully declined freelancer for shift",
                type: 'Success',
                container:'center'
            })

        } catch (error) {

            notifications.create({
                title: "Could not decline freelancer for shift",
                type: 'danger',
                container:'center'
            })

        }

    }

    return (
        <Layout
            className={styles.container}
            items={menuitems({ userData, hasRole, applyTranslation })}
            title={applyTranslation('SHIFTS')}
            logo={<Logo />}
            controls={<Controls />}
            >
            {
                viewMode === 'view shifts' && (
                    <>
                        <Card
                            customStyles={applyStyles([styles], 'shiftsHeaderContainer')}
                            >
                            <Form
                                customStyles={applyStyles([styles], 'shiftsHeaderForm')}
                                >
                                <Radio
                                    name={'timeframe'}
                                    customStyles={applyStyles([styles], 'shiftsHeaderElement')}
                                    shouldRegister
                                    onClick={event => setTimeframe(event.target.defaultValue)}
                                    options={[
                                        {
                                            name:'future',
                                            label:'Future',
                                            checked:timeframe === 'future'
                                        },{
                                            name:'past',
                                            label:'Past',
                                            checked:timeframe === 'past'
                                        },
                                    ]}
                                    />
                                <Input
                                    name={'searchInput'}
                                    onChange={event => setSearchInput(event.target.value)}
                                    customStyles={applyStyles([styles], 'shiftsHeaderSearchInput')}
                                    placeholder={'Search shifts'}
                                    shouldRegister
                                    />
                                {
                                    hasRole('freelancer') && (
                                        <Checkbox
                                            name={'shiftTypes'}
                                            customStyles={applyStyles([styles], ['shiftsHeaderElement', 'shiftsHeaderCheckboxes'])}
                                            shouldRegister
                                            onClick={event => {
                                                setShiftTypes(previous => toggleShiftTypeOrState(previous, event.target.defaultValue))
                                            }}
                                            options={[
                                                {
                                                    name:'available',
                                                    label:'Available',
                                                    checked:shiftTypes.includes('available'),
                                                },{
                                                    name:'applied',
                                                    label:'Applied',
                                                    checked:shiftTypes.includes('applied'),
                                                },{
                                                    name:'enrolled',
                                                    label:'Enrolled',
                                                    checked:shiftTypes.includes('enrolled'),
                                                }
                                            ]}
                                            />
                                    )
                                }
                                {
                                    hasRole('business') && (
                                        <Checkbox
                                            name={'shiftTypes'}
                                            customStyles={applyStyles([styles], 'shiftsHeaderElement')}
                                            shouldRegister
                                            onClick={event => {
                                                setShiftStates(previous => toggleShiftTypeOrState(previous, event.target.defaultValue))
                                            }}
                                            options={[
                                                {
                                                    name:'fullfilled',
                                                    label:'Fullfilled',
                                                    checked:shiftStates.includes('fullfilled'),
                                                },{
                                                    name:'unfullfilled',
                                                    label:'Unfullfilled',
                                                    checked:shiftStates.includes('unfullfilled'),
                                                },
                                            ]}
                                            />
                                    )
                                }
                            </Form>
                        </Card>
                        <div
                            className={styles.shiftsUnderHeader}
                            >
                            {`Displaying ${filteredShifts.length} of ${shifts.length} shifts`}
                            {
                                hasRole('business') && (
                                    <Button
                                        label={'Create Shift'}
                                        customStyles={applyStyles([styles], 'createShiftButton')}
                                        onClick={() => {
                                            setViewMode('create shift')
                                        }}
                                        />
                                )
                            }
                        </div>
                        <Grid customStyles={applyStyles([styles], 'shiftsGrid')}>
                            {
                                filteredShifts.map((shift, index) => {

                                    return (
                                        <Card
                                            title={shift.name}
                                            customStyles={applyStyles([styles], 'shiftCard')}
                                            key={shift._id}
                                            >
                                            <p>Price per hour: {shift.price}</p>
                                            <p>Start time: {moment(shift.datetime.start).format('DD-MM hh:mm')}</p>
                                            <p>End time: {moment(shift.datetime.end).format('DD-MM hh:mm')}</p>
                                            <p>Start location: {shift.location.start.city}</p>
                                            <p>End location: {shift.location.end.city}</p>
                                            <Button label={'Open'} onClick={() => openShiftDetails(shift)} />
                                            {hasRole('freelancer') && !shift.applied.includes(freelancerData._id) && !shift.enrolled.includes(freelancerData._id) && <Button label={'Apply'} onClick={() => apply(shift._id)} />}
                                            {hasRole('freelancer') && (shift.applied.includes(freelancerData._id) || shift.enrolled.includes(freelancerData._id)) && <Button label={'Withdraw'} onClick={() => withdraw(shift._id)} />}
                                        </Card>
                                    )

                                })
                            }
                        </Grid>
                    </>
                )
            }
            {
                viewMode === 'update shift' && (
                    <>
                        <Button
                            customStyles={applyStyles([styles], 'cancelShiftButton')}
                            label={'Delete'}
                            onClick={event => {
                                deleteShift()
                            }}
                            />
                        <Button
                            customStyles={applyStyles([styles], 'cancelShiftButton')}
                            label={'Cancel'}
                            onClick={event => {
                                setViewMode('view shift')
                            }}
                            />
                    </>
                )
            }
            {
                viewMode === 'create shift' && (
                    <>
                        <Button
                            customStyles={applyStyles([styles], 'cancelShiftButton')}
                            label={'Cancel'}
                            onClick={event => {
                                setViewMode('view shifts')
                            }}
                            />
                    </>
                )
            }
            {
                viewMode === 'view shift' && hasRole('business') && (
                    <Button
                        label={applyTranslation('EDIT')}
                        onClick={evt => {
                            setViewMode('update shift')
                            setSelectedShift(selectedShift)
                        }}
                            customStyles={applyStyles([styles], 'cancelShiftButton')}
                        />
                )
            }
            {
                viewMode === 'view shift' && (
                    <Button
                        customStyles={applyStyles([styles], 'cancelShiftButton')}
                        label={'Close'}
                        onClick={event => {
                            setSelectedShift()
                            setViewMode('view shifts')
                        }}
                        />
                )
            }
            {
                (
                    viewMode === 'create shift'
                    || viewMode === 'update shift'
                    || viewMode === 'view shift'
                ) && (
                    <>
                        <Card
                            title={
                                viewMode === 'create shift'
                                ? 'Create new shift'
                                : viewMode === 'update shift'
                                ? 'Update shift'
                                : 'View shift'
                            }
                            >
                            <Form
                                onSubmit={onSubmit}
                                defaultValues={defaultValues}
                                validationSchema={ShiftSchema}
                                >
                                <Input
                                    name={'name'}
                                    label={applyTranslation('NAME')}
                                    shouldRegister
                                    required={true}
                                    readOnly={viewMode === 'view shift' ? true : false}
                                    />
                                <Textarea
                                    name={'description'}
                                    label={applyTranslation('DESCRIPTION')}
                                    shouldRegister
                                    readOnly={viewMode === 'view shift' ? true : false}
                                    />
                                <Input
                                    name={'price'}
                                    label={applyTranslation('PRICE')}
                                    shouldRegister
                                    required={true}
                                    readOnly={viewMode === 'view shift' ? true : false}
                                    />
                                <Select
                                    name={'label'}
                                    label={applyTranslation('LABEL')}
                                    shouldRegister
                                    readOnly={viewMode === 'view shift' ? true : false}
                                    options={[
                                        {
                                            name:applyTranslation('LABEL 1'),
                                            value:'label1',
                                        }, {
                                            name:applyTranslation('LABEL 2'),
                                            value:'label2',
                                        }, {
                                            name:applyTranslation('LABEL 3'),
                                            value:'label3'
                                        },
                                    ]}
                                    />
                                <Input
                                    name={'spots'}
                                    label={applyTranslation('SPOTS')}
                                    type={'number'}
                                    shouldRegister
                                    required={true}
                                    readOnly={viewMode === 'view shift' ? true : false}
                                    />
                                <Input
                                    label={applyTranslation('START TIME')}
                                    name={'datetime.start'}
                                    type={'datetime-local'}
                                    required={true}
                                    shouldRegister
                                    readOnly={viewMode === 'view shift' ? true : false}
                                    />
                                <Input
                                    label={applyTranslation('END TIME')}
                                    name={'datetime.end'}
                                    type={'datetime-local'}
                                    required={true}
                                    shouldRegister
                                    readOnly={viewMode === 'view shift' ? true : false}
                                    />
                                <AddressInput
                                    label={applyTranslation('START LOCATION')}
                                    name={'location.start'}
                                    required={true}
                                    shouldRegister
                                    readOnly={viewMode === 'view shift' ? true : false}
                                    />
                                <AddressInput
                                    label={applyTranslation('END LOCATION')}
                                    name={'location.end'}
                                    required={true}
                                    shouldRegister
                                    readOnly={viewMode === 'view shift' ? true : false}
                                    />
                                RECURRING
                            </Form>
                        </Card>
                        {
                            hasRole('business') && shiftDetails && (
                                <>
                                    Freelancer applications:
                                    {
                                        shiftDetails.map(sd => {

                                            const key = sd._id

                                            return (
                                                <Card
                                                    key={key}
                                                    >
                                                    Business: {sd.name}
                                                    Rating: {sd.rating || 'Not yet rated'}
                                                    Status: {sd.status}
                                                    {sd.status === 'applied' && <Button label={'Accept'} onClick={() => accept(sd._id)} />}
                                                    {sd.status === 'applied' && <Button label={'Decline'} onClick={() => decline(sd._id)} />}
                                                    {sd.status === 'enrolled' && <Button label={'Cancel hiring'} onClick={() => decline(sd._id)} />}
                                                </Card>
                                            )

                                        })
                                    }
                                </>
                            )
                        }
                    </>
                )
            }
        </Layout>
    )
}
