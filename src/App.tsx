import { Fragment, useEffect } from "react";
import { VictoryAxis, VictoryBar, VictoryChart, VictoryPie } from "victory";
import { Container, Typography } from "@mui/material";
import { useActions } from "./hooks/use-actions";
import { useTypedSelector } from "./hooks/use-typed-selector";

export interface Chart {
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
  const { fetchChart } = useActions();
  const chartData = useTypedSelector((state) => state);
  console.log("Chart Data", chartData);

  useEffect(() => {
    fetchChart();
  }, [fetchChart]);

  // return (
  //   <div>
  //     {!chartData.charts?.loading && chartData.charts!.data.length > 0 ? (
  //       <div>{chartData.charts?.data.toString()}</div>
  //     ) : null}
  //   </div>
  // );

  return (
    <Container maxWidth="sm">
      {!chartData.charts?.loading && chartData.charts!.data.length > 0 ? (
        <Fragment>
          {chartData.charts!.data.map((chartObj, index) => {
            if (chartObj.type === "Bar") {
              return (
                <VictoryChart
                  domainPadding={100}
                  width={400}
                  height={200}
                  key={index}
                >
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
                <VictoryPie width={200} height={200} data={chartObj.elements} />
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
