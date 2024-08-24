function set_sessionJSON(title, object) {
    sessionStorage.setItem(title, JSON.stringify(object))
}

function get_sessionJSON(title) {
    return sessionStorage.getItem(JSON.parse(title))
}

function set_session(title, value) {
    sessionStorage.setItem(title, value)
}

function get_session(title) {
    return sessionStorage.getItem(title)
}

function check_session(title) {
    return Object.keys(sessionStorage).includes(title)
}

function set_localJSON(title, object) {
    localStorage.setItem(title, JSON.stringify(object))
}

function get_localJSON(title) {
    return JSON.parse(localStorage.getItem(title))
}

function set_local(title, value) {
    localStorage.setItem(title, value)
}

function get_local(title) {
    return localStorage.getItem(title)
}

function check_local(title) {
    return Object.keys(localStorage).includes(title)
}

function get_localJson_if_exists_else_insert(title, error_value) {
    if (check_local(title)) {

        try {
            return get_localJSON(title)
        } 
        
        catch (err) {
            console.log(err, "ошибка чтения Json", get_local(title))
            set_localJSON(title, error_value)
            return error_value
        }

    } else {
        set_localJSON(title, error_value)
        return error_value
    }
}

function get_local_if_exists_else_insert(title, error_value) {
    if (check_local(title)) {

        try {
            return get_local(title)
        } 
        
        catch (err) {
            console.log(err, "ошибка чтения")
            set_local(title, error_value)
            return error_value
        }

    } else {
        set_local(title, error_value)
        return error_value
    }
}
