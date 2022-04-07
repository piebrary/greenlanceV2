module.exports = (document, user_id) => {

    const {
        _id,
        title,
        body,
        time,
        users,
        creator,
        active,
    } = document

    if(creator === user_id){

        return {
            _id,
            title,
            body,
            time,
            users,
            creator,
            active,
        }

    }

    return {
        _id,
        title,
        body,
        time,
        creator,
    }

}
