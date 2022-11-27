import React, { useEffect, useRef, useState } from "react";
import { useQuery } from "react-query";
import { NumberLiteralType, textSpanIntersectsWithPosition } from "typescript";
import ApexChart from "react-apexcharts";
import { useRecoilValue } from "recoil";
import { isDarkAtom } from "../atoms";
import styled from "styled-components";
import { Link, useRouteMatch } from "react-router-dom";
import { fetchDetect } from "./api";

const ChartContainer = styled.div`
  height: 100vh;
`;

const Wrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;

`
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
  margin-top : 20px;
`;

const Tab = styled.div`
  border: 1px solid black;
  border-radius: 5px;
  padding: 5px;
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

  const { isLoading, data } = useQuery("detect", fetchDetect);

  const adultListRef = useRef<any[]>([]); // detect_id : 0
  const childListRef = useRef<any[]>([]); // detect_id : 1
  const strollerListRef = useRef<any[]>([]); // detect_id : 2

  const [ adultRitio, setAdultRitio ] = useState(0);
  const [ childRitio, setChildRitio ] = useState(0);
  const [ strollerRitio, setStrollerRitio ] = useState(0);

  const inRitioRef = useRef<any[]>([]);
  const outRitioRef = useRef<any[]>([]);

  const [ inRitio, setInRitio ] = useState(0);
  const [ outRitio, setOutRitio ] = useState(0);

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
    "55m~60m",
  ];

  useEffect(() => {
    splitDetectData();
    detectRatio();
    minuteSplit();
    adultDetectCounting();
    setLoading(false);
  }, [isLoading]);

  console.log(hourMatch);
  console.log(minuteMatch);

  //console.log("minute : ", data[0]?._date.split("T")[1].split(":")[1]);
  const isDark = useRecoilValue(isDarkAtom);

  const value = [
    -0.8, -1.05, -1.06, -1.18, -1.4, -2.2, -2.85, -3.7, -3.96, -4.22, -4.3,
    -4.4, -4.1, -4, -4.1, -3.4, -3.1, -2.8,
  ];

  const splitDetectData = () => {
    let copyInRitio:any[] = [];
    let copyOutRitio:any[] = [];

    data?.map((data: any) => {
      if (data.statu === "in") {
        copyInRitio = [...copyInRitio, data];        
      } else if (data.statu === "out") {
        copyOutRitio = [...copyOutRitio, data];
      }
    });

    inRitioRef.current = copyInRitio;
    outRitioRef.current = copyOutRitio;
  }

  const detectRatio = () => {
    const inValue = inRitioRef.current.length > 0 ? (inRitioRef.current.length / (inRitioRef.current.length + outRitioRef.current.length) * 100) : 0;
    const outValue = outRitioRef.current.length > 0 ? (outRitioRef.current.length / (inRitioRef.current.length + outRitioRef.current.length) * 100) : 0;

    console.log("IN Ratio : ",inRitioRef.current.length);
    setInRitio(inValue);
    setOutRitio(outValue);
  }

  const minuteSplit = () => {
    let list: string[] = [];
    data?.map((adult: any) => {      
      let tmp = adult._date.split(":")[1];
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
        } else if (5 < Number(minute) && Number(minute) <= 10) {
          // 6~10분 포함 ex) 10, 12분 ...,
          tempAdultCountList[1] = tempAdultCountList[1] + 1;
        } else if (10 < Number(minute) && Number(minute) <= 15) {
          // 11~15분 포함
          tempAdultCountList[2] = tempAdultCountList[2] + 1;
        } else if (15 < Number(minute) && Number(minute) <= 20) {
          // 16~20분 포함
          tempAdultCountList[3] = tempAdultCountList[3] + 1;
        } else if (20 < Number(minute) && Number(minute) <= 25) {
          // 21~25분 포함
          tempAdultCountList[4] = tempAdultCountList[4] + 1;
        } else if (25 < Number(minute) && Number(minute) <= 30) {
          // 26~30분 포함
          tempAdultCountList[5] = tempAdultCountList[5] + 1;
        } else if (30 < Number(minute) && Number(minute) <= 35) {
          // 31~35분 포함
          tempAdultCountList[6] = tempAdultCountList[6] + 1;
        } else if (35 < Number(minute) && Number(minute) <= 40) {
          // 36~40분 포함
          tempAdultCountList[7] = tempAdultCountList[7] + 1;
        } else if (40 < Number(minute) && Number(minute) <= 45) {
          // 41~45분 포함
          tempAdultCountList[8] = tempAdultCountList[8] + 1;
        } else if (45 < Number(minute) && Number(minute) <= 50) {
          // 46~50분 포함
          tempAdultCountList[9] = tempAdultCountList[9] + 1;
        } else if (50 < Number(minute) && Number(minute) <= 55) {
          // 51~55분 포함
          tempAdultCountList[10] = tempAdultCountList[10] + 1;
        } else if (55 < Number(minute) && Number(minute) <= 65) {
          // 51~55분 포함
          tempAdultCountList[11] = tempAdultCountList[11] + 1;
        }
      });
    }

    setAdultCountList(tempAdultCountList);
  };

  console.log("data1 : ", data);
  return (
    <>
      {isLoading ? (
        <h1>Loading</h1>
      ) : (
        <ChartContainer>
          <Wrapper>
            <ChartStyle>
              <ApexChart
                type="pie"
                series={[inRitio, outRitio]}
                width={500}
                height={500}
                options={{
                  chart: {
                    height: 500,
                    width: 500,
                  },
                  labels: ["IN", "OUT"],
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
                ]}
                options={{
                  chart: {
                    height: 500,
                    width: 500,
                  },
                  labels: ["adult"],
                  xaxis: {
                    categories: TEMPLATE_ADULT_DATE,
                  },
                  title: {
                    text: "Minutes Adult Detect Line Chart",
                    align: "center",
                  },
                }}
              />
            </ChartStyle>            
          </Wrapper>
          <TabContainer>
            <Tab>
              <Link to={`/detect`}>Show Image</Link>
            </Tab>
          </TabContainer>
        </ChartContainer>
      )}
    </>
  );
}
export default Chart;
