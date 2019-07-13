module.exports.BASE_URL = 'https://www.pornhub.com'

module.exports.Events = {
    DEBUG: 'DEBUG',
    REQUEST: 'REQUEST',
    LOGIN: 'loggedIn',
    LOGOUT: 'logout'
}

class HttpStatusError extends Error {

}

module.exports.HttpStatusError = HttpStatusError
