import axios from 'axios';
const BaseURL = process.env.REACT_APP_BASE_URL;
function getHeaders(isSecure) {
    let headerOptions = {
        "Content-Type": 'application/json'
    }
    if (isSecure) {
        headerOptions['Authorization'] = localStorage.getItem('token');
    }
    return headerOptions;

}


const http = axios.create({
    baseURL: BaseURL,
    responseType: 'json'
});

function get(url, params = {}, isSecure = false) {
    return http.get(
        url,
        {
            headers: getHeaders(isSecure),
            params
        }
    );
}

function post(url, data, params = {}, isSecure = false) {
    return http.post(
        url,
        data,
        {
            headers: getHeaders(isSecure),
            params
        }
    )
}

function put(url, data, params = {}, isSecure = false) {
    return http.put(
        url,
        data,
        {
            headers: getHeaders(isSecure),
            params
        }
    )
}

function remove(url, isSecure) {
    return http.delete(
        url,
        {
            headers: getHeaders(isSecure),
        }
    )
}

function upload(method, url, data, files) {
    return new Promise((resolve, reject) => {
        const xhr = new XMLHttpRequest();
        const formData = new FormData();

        if (files && files.length) {
            // files.forEach(file => {
            //     formData.append('img', file, files.name)
            // })
            formData.append('img', files[0], files[0].name)
        }
        // append textual data in form data
        for (let key in data) {
            formData.append(key, data[key]);
        }

        xhr.onreadystatechange = () => {
            if (xhr.readyState === 4) {
                if (xhr.status === 200) {
                    resolve(xhr.response);
                } else {
                    reject(xhr.response);
                }
            }
        }


        xhr.open(method, url, true)
        xhr.send(formData);
    })

}

export const httpClient = {
    get, post, remove, put, upload
}