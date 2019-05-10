const getSigninedUser = (json) => {
    return json === undefined ? undefined : JSON.parse(json)
}

module.exports = {
    getSigninedUser,
}