const BASE_URL = `URL 경로`;

export function fetchDetect() {
    return fetch(`${BASE_URL}/coins`).then((response) => response.json());
}

export function exampleFetchDetect() {
    return {
        adult: [1, 2, 3, 4, 5, 10, 5, 25, 18, 16, 15, 18, 15, 28, 66, 25, 38, 5, 18, 26, 35, 18, 15, 18],
        child: [15, 18, 15, 78, 56, 15, 18, 15, 78, 56, 15, 18, 15, 18, 15, 78, 56, 15, 18, 15, 78, 56, 15, 18],
        stroller: [10, 5, 25, 18, 16, 22, 33, 45, 22, 33, 12, 34, 44, 22, 34, 45, 12, 11, 20, 30, 21, 23, 10, 25],
    }
}