import axios, {AxiosResponse} from "axios";

export interface RestError {
    message: string,
    status: number,
}

class Rest {
    post = async (url: string, data: object = {}) => {
        const res = await axios.post(url, data);
        return this._handleResponse(res);
    }

    _handleResponse = async (res: AxiosResponse) => {
        if (res.status === 200) {
            return res.data
        } else if (res.status >= 400 && res.status != 404) {
            const err: RestError = {status: 0, message: "Connection Failure"}
            err.status = res.status;
            err.message = res.message;
            throw err;
        }
    }
}