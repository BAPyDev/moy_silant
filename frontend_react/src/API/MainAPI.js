import axios from "axios";

export default class MainAPI {
    static async get_data(token, source, param=null) {
        let axios_headers = {}
        let axios_url = `http://127.0.0.1:8000/${source}`
        if (param) {
            axios_url += `${param}`
        }
        if (token !== '') {
             axios_headers = {
                headers: {
                    'Authorization': `Token ${token}`
                }
            }
        }
        try {
            const
                response = await axios.get(axios_url,
                    {
                        ...axios_headers
                    }
                )
            return response.data
        } catch
            (e) {
            console.log(e)
        }


    }

    static async post_data(token, source, data) {
        let axios_headers = {}
        let axios_url = `http://127.0.0.1:8000/${source}`
        if (token !== '') {
             axios_headers = {
                headers: {
                    'Authorization': `Token ${token}`
                }
            }
        }
        try {
            const
                response = await axios.post(axios_url, data,
                    {
                        ...axios_headers
                    }
                )
            return response.data
        } catch
            (e) {
            console.log(e)
        }


    }

    static
    async login(username, password) {
        try {
            const response = await axios.post(`http://127.0.0.1:8000/users/api-token/`,
                {
                    'username': username,
                    'password': password
                }
            )
            return response.data
        } catch (e) {
            console.log(e)
        }
    }
}