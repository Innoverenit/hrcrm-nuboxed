import React, { Component } from "react";

import { Empty, Icon } from "antd";
import {
  BarChart,
  PieChart,
  Pie,
  Bar,
  Brush,
  Cell,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  Label
} from "recharts";
const colors = [
  { color: "rgba(160, 200, 241, 1)" },
  { color: "rgba(188, 197, 167, 1)" },
  { color: "rgba(220, 188, 85, 1)" },
  { color: "rgba(205, 156, 54, 1)" },
  { color: "rgba(143, 98, 32, 1)" },
  { color: "rgba(92, 51, 15, 1)" }
];

class BarChart_ extends Component {
  render() {
    const {
      width,
      height,
      data,
      chartName,
      stacked,
      noLegend,
      extraBar1,
      noDataText,
      bar1,
      bar2
    } = this.props;
    data && data.map((o, i) => Object.assign(o, colors[i]));
    if (!data || !data.length) {
      return (
        <Empty
          description={noDataText || ` We couldn't find relevant data`}
        // style={{ marginTop: "5em" }}
        />
      );
    }
    if (stacked) {
      return (
        <div style={{ margin: "0.3rem", marginLeft: "-0.3125em" }}>
          <BarChart
            width={width}
            height={height}
            data={data}
            ref={chart => (this.currentChart = chart)}
          >
            {/* <CartesianGrid strokeDasharray="3 3" /> */}
            {/* <XAxis
                            dataKey="name"
                            tickFormatter={( tick ) => 'hello' + tick}

                        >
                            <div value={chartName || ''} position="insideBottom" />
                        </XAxis> */}
            <XAxis dataKey="name" tickFormatter={this.displayXTick}>
              <div value={chartName || ""} position="insideBottom" />
            </XAxis>
            <YAxis />
            <Tooltip />
            <Legend align="right" layout="vertical" verticalAlign="middle" />
            <Bar
              dataKey={bar1 || "value"}
              stackId="1"
              fill="#5d9dfc"
              barSize={20}
            />
            <Bar
              dataKey={bar2 || "value1"}
              stackId="1"
              fill="rgba(160, 200, 241, 1)"
              barSize={20}
            />
          </BarChart>
        </div>
      );
    }
    return (
      <div style={{ margin: "0.3rem" }}>
        <BarChart
          width={width}
          height={height}
          data={data}
          ref={chart => (this.currentChart = chart)}
        >
          {/* <CartesianGrid strokeDasharray="3 3" /> */}
          <XAxis dataKey="name" tick={{ fontSize: 12 }}>
            <div value={chartName || ""} position="insideBottom" />
          </XAxis>
          <YAxis tick={{ fontSize: 12 }} />
          <Tooltip />
          {!noLegend && (
            <Legend
              align="center"
              layout="vertical"
              verticalAlign="bottom"
              formatter={this.props.legendFormatter || null}
            />
          )}
          <Bar
            dataKey={bar1 || "value"}
            fill="rgba(160, 200, 241, 1)"
            barSize={20}
          />
          {extraBar1 && (
            <Bar dataKey={bar2 || "value1"} fill="#5d9dfc" barSize={20} />
          )}
        </BarChart>
      </div>
    );
  }
}

export default BarChart_;
