import React, { useEffect, useRef, useState } from "react";
import { useQuery } from "react-query";
import { NumberLiteralType } from "typescript";
import ApexChart from "react-apexcharts";
import { useRecoilValue } from "recoil";
import { isDarkAtom } from "../atoms";
import styled from "styled-components";
import { Link, useRouteMatch } from "react-router-dom";
import { exampleFetchDetect } from "./api";

const ChartContainer = styled.div`
  display: flex;
  height: 100vh;
  justify-content: center;
  align-items: center;
  flex-wrap: wrap;
`;

const ChartStyle = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 600px;
  margin-right: 10px;
  border: 1px solid black;
  border-radius: 20px;
`;

const TabContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Tab = styled.div<{ isActive: boolean }>`
  color: ${(props) => (props.isActive ? "red" : "black")};
`;

interface ItestDetectData {
  num: number;
  id: number;
  date: string;
  statu: string;
}

function Chart() {
  const hourMatch = useRouteMatch(`/hour`);
  const minuteMatch = useRouteMatch(`/minute`);

  const [exampleDetectData, setExampleDetectData] = useState<ItestDetectData[]>();
  const [loading, setLoading] = useState(true);

  const adultDetectDate = useRef<string[]>([]);

  const [adultCountList, setAdultCountList] = useState<number[]>([]);

  const TEMPLATE_ADULT_DATE = [
    "0m~5m",
    "5m~10m",
    "10m~15m",
    "15m~20m",
    "20m~25m",
    "25m~30m",
    "30m~35m",
    "35m~40m",
    "40m~45m",
    "50m~55m",
    "55m~60m"
  ];

  useEffect(() => {
    setExampleDetectData(exampleFetchDetect());
    minuteSplit();
    adultDetectCounting();
    setLoading(false);
  }, [loading]);
  

  
  console.log(hourMatch);
  console.log(minuteMatch);

  const isDark = useRecoilValue(isDarkAtom);

  const value = [
    -0.8, -1.05, -1.06, -1.18, -1.4, -2.2, -2.85, -3.7, -3.96, -4.22, -4.3,
    -4.4, -4.1, -4, -4.1, -3.4, -3.1, -2.8,
  ];

  const minuteSplit = () => {
    let list: string[] = [];
    exampleDetectData?.map((adult) => {
      let tmp = adult.date.split(" ")[1].split(":")[1];
      console.log(`adult detect minute : ${tmp}`);
      list = [...list, tmp];
    });
    adultDetectDate.current = list;
  };

  const adultDetectCounting = () => {
    const tempAdultCountList = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
    if (adultDetectDate) {
      adultDetectDate.current.map((minute) => {
        console.log("s :", minute);
        if (0 < Number(minute) && Number(minute) <= 5) {
          // 0~5분 이내 포함
          tempAdultCountList[0] = tempAdultCountList[0] + 1;
        }
        else if (5 < Number(minute) && Number(minute) <= 10) {
          // 6~10분 포함 ex) 10, 12분 ...,
          tempAdultCountList[1] = tempAdultCountList[1] + 1;        
        } else if (10 < Number(minute) && Number(minute) <= 15) {
          // 11~15분 포함
          tempAdultCountList[2] = tempAdultCountList[2] + 1;
        } else if (20 < Number(minute) && Number(minute) <= 25) {
          // 21~25분 포함
          tempAdultCountList[3] = tempAdultCountList[3] + 1;
        } else if (25 < Number(minute) && Number(minute) <= 30) {
          // 26~30분 포함
          tempAdultCountList[4] = tempAdultCountList[4] + 1;
        }  else if (30 < Number(minute) && Number(minute) <= 35) {
          // 31~35분 포함
          tempAdultCountList[5] = tempAdultCountList[5] + 1;
        }  else if (35 < Number(minute) && Number(minute) <= 40) {
          // 36~40분 포함
          tempAdultCountList[6] = tempAdultCountList[6] + 1;
        } else if (40 < Number(minute) && Number(minute) <= 45) {
          // 41~45분 포함
          tempAdultCountList[7] = tempAdultCountList[7] + 1;
        } else if (45 < Number(minute) && Number(minute) <= 50) {
          // 46~50분 포함
          tempAdultCountList[8] = tempAdultCountList[8] + 1;
        } else if (50 < Number(minute) && Number(minute) <= 55) {
          // 51~55분 포함
          tempAdultCountList[9] = tempAdultCountList[9] + 1;
        } else if (55 < Number(minute) && Number(minute) <= 65) {
          // 51~55분 포함
          tempAdultCountList[10] = tempAdultCountList[10] + 1;
        } 
      });
    }

    setAdultCountList(tempAdultCountList);
  };

  
  console.log(adultCountList);
  return (
    <>
      {loading ? (
        <h1>Loading</h1>
      ) : (
        <ChartContainer>
          <ChartStyle>
            <ApexChart
              type="pie"
              series={[50, 30, 20]}
              width={500}
              height={500}
              options={{
                chart: {
                  height: 500,
                  width: 500,
                },
                labels: ["adult", "child", "stroller"],
                title: {
                  text: "Detect Pie Chart",
                  align: "center",
                },
              }}
            />
          </ChartStyle>
          <ChartStyle>
            <ApexChart
              type="line"
              width={500}
              height={500}
              series={[
                {
                  name: "adult",
                  data: adultCountList ?? [],
                },
                {
                  name: "child",
                  data: [],
                },
                {
                  name: "stroller",
                  data: [],
                },
              ]}
              options={{
                chart: {
                  height: 500,
                  width: 500,
                },
                labels: ["adult", "child", "stroller"],
                xaxis: {
                  categories: TEMPLATE_ADULT_DATE,
                },
                title: {
                  text: "Minutes Detect Line Chart",
                  align: "center",
                },
              }}
            />
          </ChartStyle>
          <ChartStyle>
            <ApexChart
              type="bar"
              width={500}
              height={500}
              series={[
                {
                  name: "In",
                  data: [
                    0.4, 0.65, 0.76, 0.88, 1.5, 2.1, 2.9, 3.8, 3.9, 4.2, 4, 4.3,
                    4.1, 4.2, 4.5, 3.9, 3.5, 3,
                  ],
                },
                {
                  name: "Out",
                  data: [
                    -0.8, -1.05, -1.06, -1.18, -1.4, -2.2, -2.85, -3.7, -3.96,
                    -4.22, -4.3, -4.4, -4.1, -4, -4.1, -3.4, -3.1, -2.8,
                  ],
                },
              ]}
              options={{
                chart: {
                  type: "bar",
                  height: 440,
                  stacked: true,
                },
                colors: ["#008FFB", "#FF4560"],
                plotOptions: {
                  bar: {
                    horizontal: true,
                    barHeight: "80%",
                  },
                },
                dataLabels: {
                  enabled: false,
                },
                stroke: {
                  width: 1,
                  colors: ["#fff"],
                },

                grid: {
                  xaxis: {
                    lines: {
                      show: false,
                    },
                  },
                },
                yaxis: {
                  min: -5,
                  max: 5,
                  title: {
                    // text: 'Age',
                  },
                },
                tooltip: {
                  shared: false,
                  x: {
                    formatter: function (val: any) {
                      return val;
                    },
                  },
                  y: {
                    formatter: function (val) {
                      return Math.abs(val) + "%";
                    },
                  },
                },
                title: {
                  text: "In/Out Bar Chart",
                  align: "center",
                },
                xaxis: {
                  categories: [
                    "85+",
                    "80-84",
                    "75-79",
                    "70-74",
                    "65-69",
                    "60-64",
                    "55-59",
                    "50-54",
                    "45-49",
                    "40-44",
                    "35-39",
                    "30-34",
                    "25-29",
                    "20-24",
                    "15-19",
                    "10-14",
                    "5-9",
                    "0-4",
                  ],
                  title: {
                    text: "Percent",
                  },
                  labels: {
                    formatter: function (val: any) {
                      return Math.abs(Math.round(val)) + "%";
                    },
                  },
                },
              }}
            />
          </ChartStyle>
          <TabContainer>
            <Tab isActive={hourMatch !== null}>
              <Link to={`/hour`}>Hour</Link>
            </Tab>
            <Tab isActive={minuteMatch !== null}>
              <Link to={`/minute`}>Minute</Link>
            </Tab>
          </TabContainer>
          <button onClick={adultDetectCounting}>click me</button>
        </ChartContainer>
      )}
    </>
  );
}
export default Chart;
