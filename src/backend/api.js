import axios from "axios";

export const StatusResponse = {
    OK: 20000,
    BAD_REQUEST: 40000,
    NOT_FOUND: 40400,
    FORBIDDEN: 40300,
    INTERNAL_ERROR: 50000
}

class AppApi {
    http;
    requestTimeout = 30000;
    CLIENT_NETWORK_ERROR = 499;

    constructor(_baseUrl) {
        this.http = axios.create({
            baseURL: _baseUrl,
            timeout: this.requestTimeout,
            withCredentials: false,
        });       
    }

    onReject(reason) {
        let code = reason.response.status;
        const message = reason.message;
        const data = reason.response.data;

        if (message === "Network Error")
            code = 499;

        return { code: code, message: message, data: data };
    }

     async handleAxiosResponse(request) {
        try {
            return await request.data;
        } catch (reason) {
            return Promise.reject(this.onReject(reason));
        }
    }
    async getData(_params) {
        try {
            return this.handleAxiosResponse(await this.http.get(`${_params}`));
        } catch (reason) {
            return Promise.reject(this.onReject(reason));
        }
    }
}

export const baseUrl = (process.env && process.env.VUE_APP_API_URL) || "";
const appApi = new AppApi(baseUrl);

export default appApi;