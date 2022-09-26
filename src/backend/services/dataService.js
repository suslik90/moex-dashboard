import AppApi from "@/backend/api";

let uri = "/selt/boards/CETS/securities";

class DataService {
    async getData(_params) {
        let query_params = `${_params.lot}.jsonp?iss.meta=off&iss.only=marketdata&lang=ru&_=${_params.timestamp}`;
        return new Promise((resp, rej) => {
            AppApi.getData(uri + "/" + query_params)
                .then((data) => {
                    resp(data);
                })
                .catch((error) => {
                    rej(error)
                });
        });
    }
}

export default new DataService;