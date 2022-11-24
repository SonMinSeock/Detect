const BASE_URL = `http://54.180.163.7:8080`; // http://localhost:4000?/detect

export function fetchDetect() {
  return fetch(`${BASE_URL}/v1/member`).then((response) => response.json());
}

export function fetchDetectImage() {
  return fetch(`${BASE_URL}/v2/root`).then((response) => response.json());
}

export function exampleFetchDetect() {
  return [
    {
      num: 1,
      id: 1,
      date: "2022-10-28 13:10 11:00000",
      statu: "in",
    },
    {
      num: 2,
      id: 1,
      date: "2022-10-28 13:22 11:00000",
      statu: "in",
    },
    {
      num: 3,
      id: 1,
      date: "2022-10-28 13:26 11:00000",
      statu: "in",
    },
    {
      num: 4,
      id: 1,
      date: "2022-10-28 13:33 11:00000",
      statu: "in",
    },
    {
      num: 5,
      id: 1,
      date: "2022-10-28 13:43 11:00000",
      statu: "in",
    },
    {
      num: 6,
      id: 1,
      date: "2022-10-28 13:43 11:00000",
      statu: "in",
    },
    {
      num: 7,
      id: 1,
      date: "2022-10-28 14:33 11:00000",
      statu: "in",
    },
  ];
}
