import { Fragment, useEffect } from "react";
import {
  VictoryAxis,
  VictoryBar,
  VictoryChart,
  VictoryGroup,
  VictoryPie,
} from "victory";
import { useActions } from "./hooks/use-actions";
import { useTypedSelector } from "./hooks/use-typed-selector";

function App() {
  const { fetchChart } = useActions();
  const chartData = useTypedSelector((state) => state);

  useEffect(() => {
    fetchChart();
  }, [fetchChart]);

  return (
    <div style={{ maxWidth: "800px", margin: "auto" }}>
      {!chartData.charts?.loading && chartData.charts!.data.length > 0 ? (
        <Fragment>
          {chartData.charts!.data.map((chartObj, index) => {
            if (chartObj.type === "Bar") {
              return (
                <Fragment key={index}>
                  <div style={{ fontSize: "2rem" }}>{`Bar Chart ${
                    index + 1
                  }`}</div>
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
                      style={{
                        axisLabel: { padding: 40 },
                      }}
                    />
                    <VictoryAxis
                      dependentAxis
                      // tickFormat specifies how ticks should be displayed
                      tickFormat={(x) => x}
                      style={{
                        axisLabel: { padding: 40 },
                      }}
                    />
                    <VictoryGroup offset={25} colorScale={["gold"]}>
                      <VictoryBar
                        data={chartObj.elements}
                        style={{
                          data: { width: 24 },
                        }}
                      />
                    </VictoryGroup>
                  </VictoryChart>
                </Fragment>
              );
            } else {
              return (
                <Fragment key={index}>
                  <div style={{ fontSize: "2rem" }}>{`Pie Chart ${
                    index + 1
                  }`}</div>
                  <VictoryPie
                    width={200}
                    height={200}
                    data={chartObj.elements}
                  />
                </Fragment>
              );
            }
          })}
        </Fragment>
      ) : (
        <text>Loading...</text>
      )}
    </div>
  );
}

export default App;
