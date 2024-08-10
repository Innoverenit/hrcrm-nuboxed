import React, { Component } from "react";
import { Empty } from "antd";
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

class HorizontalBarChart_ extends Component {
  render() {
    const { width, height, data, noDataText, chartName } = this.props;
    data && data.map((o, i) => Object.assign(o, colors[i]));
    if (!data || !data.length) {
      return (
        <Empty
          description={noDataText || ` We couldn't find relevant data`}
          style={{ marginTop: "5em" }}
        />
      );
    }
    return (
      <div style={{ margin: "0.3rem" }}>
        <BarChart
          width={width}
          height={height}
          data={data}
          layout="vertical"
          margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
        >
          <div value={chartName || "dgdsg"} position="insideBottom" />
          <XAxis type="number" />
          {/* <XAxis
                        dataKey="name"
                        tickFormatter={this.displayXTick}
                    >
                        <div value={chartName || ''} position="insideBottom" />
                    </XAxis> */}
          <YAxis type="category" dataKey="name" />
          <CartesianGrid strokeDasharray="3 3" />
          <Tooltip />
          <Legend />
          <Bar dataKey="value" fill="#8884d8" barSize={10} fontSize="14" />
          {/* <Bar dataKey="uv" fill="#82ca9d" /> */}
        </BarChart>
      </div>
    );
  }
}

export default HorizontalBarChart_;
