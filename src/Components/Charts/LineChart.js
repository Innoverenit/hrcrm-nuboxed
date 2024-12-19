import React, { Component } from "react";
import dayjs from "dayjs";
import { Empty } from "antd";
import {
  LineChart,
  Line,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip
} from "recharts";
import { CurrencySymbol } from "../Common";
const colors = [
  { color: "rgba(160, 200, 241, 1)" },
  { color: "rgba(188, 197, 167, 1)" },
  { color: "rgba(220, 188, 85, 1)" },
  { color: "rgba(205, 156, 54, 1)" },
  { color: "rgba(143, 98, 32, 1)" },
  { color: "rgba(92, 51, 15, 1)" }
];

class LineChart_ extends Component {
  render() {
    const {
      width,
      height,
      data,
      noDataText,
      chartName,
      stacked,
      noLegend,
      line1DataKey,
      line2DataKey,
      line1,
      line2
    } = this.props;
    data && data.map((o, i) => Object.assign(o, colors[i]));
    if (!data || !data.length) {
      return (
        <Empty description={noDataText || `  We couldn't find relevant data`} />
      );
    }
    return (
      <div style={{ margin: "0.3rem" }}>
        <LineChart
          width={width}
          height={height}
          data={data}
          ref={chart => (this.currentChart = chart)}
        >
          {line1 ? (
            <XAxis dataKey={line1} tick={{ fontSize: 14 }} />
          ) : (
            <XAxis
              dataKey={"date"}
              tick={{ fontSize: 14 }}
              tickFormatter={date => dayjs(date).format("l")}
            />
          )}
          {/* <XAxis dataKey={"date"} tickFormatter={(date) => dayjs(date).format('l')} /> */}
          <YAxis tick={{ fontSize: 14 }} />
          <Tooltip />
          {/* <CartesianGrid stroke="#eee" strokeDasharray="5 5" /> */}
          <Line
            type="monotone"
            dataKey={line1DataKey || "amount"}
            stroke="orange"
          />
          {/* <Line type="monotone" dataKey="pv" stroke="#82ca9d" /> */}
        </LineChart>
      </div>
    );
  }
}

export default LineChart_;

const CustomTooltip = ({ active, payload, label }) => {
  if (active) {
    return (
      <div>
       <div className=" text-xs font-poppins font-bold flex whitespace-nowrap w-wk">{`${dayjs(label).format("l")}`}</div>
       <div className=" text-xs font-poppins font-bold flex whitespace-nowrap w-wk">
          <CurrencySymbol currencyType={payload[0].payload.currency} />
          {`  ${payload[0].value}`}
        </div>
      </div>
    );
  }

  return null;
};
