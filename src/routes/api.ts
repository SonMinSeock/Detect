const BASE_URL = `URL 경로`; // http://localhost:4000?/detect

export function fetchDetect() {
    return fetch(`${BASE_URL}/detect`).then((response) => response.json());
}

export function exampleFetchDetect() {
    return [{
        num: 1,
        id: 1,
        date: "2022-10-28 13:10 11:00000",
        statu: "in"
    }, {
        num: 2,
        id: 1,
        date: "2022-10-28 13:22 11:00000",
        statu: "in"
    }, {
        num: 3,
        id: 1,
        date: "2022-10-28 13:26 11:00000",
        statu: "in"
    }, {
        num: 4,
        id: 1,
        date: "2022-10-28 13:33 11:00000",
        statu: "in"
    }, {
        num: 5,
        id: 1,
        date: "2022-10-28 13:43 11:00000",
        statu: "in"
    }, {
        num: 6,
        id: 1,
        date: "2022-10-28 13:43 11:00000",
        statu: "in"
    }, {
        num: 7,
        id: 1,
        date: "2022-10-28 14:33 11:00000",
        statu: "in"
    }]
}