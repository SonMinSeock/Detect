import React, { useEffect, useState } from "react";
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
  adult: number[];
  child: number[];
  stroller: number[];
}

function Chart() {
  const hourMatch = useRouteMatch(`/hour`);
  const minuteMatch = useRouteMatch(`/minute`);

  const [exampleDetectData, setExampleDetectData] = useState<ItestDetectData>();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setExampleDetectData(exampleFetchDetect());
    setLoading(false);
  }, []);

  console.log(hourMatch);
  console.log(minuteMatch);

  const isDark = useRecoilValue(isDarkAtom);
  const value = [
    -0.8, -1.05, -1.06, -1.18, -1.4, -2.2, -2.85, -3.7, -3.96, -4.22, -4.3,
    -4.4, -4.1, -4, -4.1, -3.4, -3.1, -2.8,
  ];

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
                  data: exampleDetectData?.adult ?? [],
                },
                {
                  name: "child",
                  data: exampleDetectData?.child ?? [],
                },
                {
                  name: "stroller",
                  data: exampleDetectData?.stroller ?? [],
                },
              ]}
              options={{
                chart: {
                  height: 500,
                  width: 500,
                },
                labels: ["adult", "child", "stroller"],
                xaxis: {
                  categories: [
                    "1h",
                    "2h",
                    "3h",
                    "4h",
                    "5h",
                    "6h",
                    "7h",
                    "8h",
                    "9h",
                    "10h",
                    "11h",
                    "12h",
                    "13h",
                    "14h",
                    "15h",
                    "16h",
                    "17h",
                    "18h",
                    "19h",
                    "20h",
                    "21h",
                    "22h",
                    "23h",
                    "24h",
                  ],
                },
                title: {
                  text: "Hours Detect Line Chart",
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
        </ChartContainer>
      )}
    </>
  );
}
export default Chart;
