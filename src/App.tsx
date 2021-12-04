import { Fragment, useEffect, useState } from "react";
import axios from "axios";
import {
  VictoryAxis,
  VictoryBar,
  VictoryChart,
  VictoryLabel,
  VictoryPie,
} from "victory";
import { Container, Typography } from "@mui/material";

interface Chart {
  type: "Bar" | "Pie";
  elements: number[];
}

function getRandomColor(length: number) {
  const letters = "0123456789ABCDEF";

  let arrayColor = [];

  for (let i = 0; i <= length; i++) {
    let color = "#";
    for (let i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    arrayColor.push(color);
  }

  console.log(arrayColor);
  return arrayColor;
}

function App() {
  const [chartData, setChartData] = useState<[] | Chart[]>([]);

  async function fetchChartData() {
    const chartData = await axios.get<Chart[]>(
      "https://s3-ap-southeast-1.amazonaws.com/he-public-data/chart2986176.json"
    );

    return chartData.data;
  }

  useEffect(() => {
    fetchChartData().then((chartData) => setChartData(chartData));
  }, []);

  return (
    <Container maxWidth="sm">
      {chartData.length > 0 ? (
        <Fragment>
          {chartData.map((chartObj, index) => {
            if (chartObj.type === "Bar") {
              return (
                <VictoryChart domainPadding={100} width={400} height={200}>
                  <VictoryAxis
                    // tickValues specifies both the number of ticks and where
                    // they are placed on the axis
                    tickValues={[0, 1, 2, 3, 4, 5]}
                    tickFormat={chartObj.elements}
                  />
                  <VictoryAxis
                    dependentAxis
                    // tickFormat specifies how ticks should be displayed
                    tickFormat={(x) => x}
                  />

                  <VictoryBar
                    data={chartObj.elements}
                    style={{
                      data: { width: 24 },
                    }}
                    colorScale={getRandomColor(chartObj.elements.length)}
                    events={[
                      {
                        target: "data",
                        eventHandlers: {
                          onClick: () => {
                            return [
                              {
                                target: "labels",
                                mutation: (props) => {
                                  return props.text === "clicked"
                                    ? null
                                    : { text: "clicked" };
                                },
                              },
                            ];
                          },
                        },
                      },
                    ]}
                  />
                </VictoryChart>
              );
            } else {
              return (
                <VictoryPie
                  width={200}
                  height={200}
                  data={chartObj.elements}
                  labelComponent={<Typography>hYe</Typography>}
                />
              );
            }
          })}
        </Fragment>
      ) : (
        <Typography>Loading...</Typography>
      )}
    </Container>
  );
}

export default App;
