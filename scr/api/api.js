export const settings = {
    host: ''
};

async function request(link, options) {
    try {
        const response = await fetch(link, options);
        if (response.ok == false) {
            const responseData = await response.json();
            throw new Error(responseData.message);
        }
        //---
        try {
            //logout check  for this specific service /!return empty object!/
            const responseData = await response.json();
            return responseData;
        } catch (error) {
            return response;
        }
        //---
    } catch (error) {
        alert(error.message);
        throw error;
    }
}

//option's creator and set tokens
function getOptions(method = 'get', body) {
    const options = {
        method,
        headers: {}
    };

    const token = sessionStorage.getItem('authToken');

    if (token != null) {
        options.headers['X-Authorization'] = token;
    }

    if (body) {
        options.headers['Content-Type'] = 'application/json';
        options.body = JSON.stringify(body);

    }


    return options;
}

//crud operations
async function get(url) {
    return await request(url, getOptions());
}

async function post(url, data) {
    return await request(url, getOptions('post', data));

}

async function put(url, data) {
    return await request(url, getOptions('put', data));
}

async function del(url) {
    return await request(url, getOptions('delete'));
}

//login, register, logout user's
async function login(username, password) {
    const result = await post(settings.host + '/users/login', { username, password });

    sessionStorage.setItem('authToken', result.accessToken);
    sessionStorage.setItem('userId', result._id);
    sessionStorage.setItem('userName', result.username);


    return result;
}

async function register(username, password) {
    const result = await post(settings.host + '/users/register', { username, password });

    sessionStorage.setItem('authToken', result.accessToken);
    sessionStorage.setItem('userId', result._id);
    sessionStorage.setItem('userName', result.username);

    return result;
}

async function logout() {
    const result = await get(settings.host + '/users/logout');

    sessionStorage.removeItem('authToken');
    sessionStorage.removeItem('userId');
    sessionStorage.removeItem('userName');

    return result;
}



export {
    get,
    put,
    del,
    post,
    login,
    logout,
    register
};