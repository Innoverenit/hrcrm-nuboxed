import React, { Component } from "react";
import { Empty } from "antd";
import { PieChart, Area, Pie, Cell, Tooltip, Legend, Label } from "recharts";
import { elipsize } from "../../Helpers/Function/Functions";
import { renderTooltip } from "../../Helpers/Function/UIFunctions";

const colors = [
  { color: "#A0C8F1" },
  { color: "#BCC5A7" },
  { color: "#DCBC55" },
  { color: "#CD9C36" },
  { color: "#8F6220" },
  { color: "#5C330F" },
];
const RADIAN = Math.PI / 180;
const renderCustomizedLabel = ({
  cx,
  cy,
  midAngle,
  innerRadius,
  outerRadius,
  percent,
  index,
}) => {
  const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
  const x = cx + radius * Math.cos(-midAngle * RADIAN);
  const y = cy + radius * Math.sin(-midAngle * RADIAN);

  return (
    <text
      x={x}
      y={y}
      fill="white"
      textAnchor="middle"
      dominantBaseline="middle"
    >
      <tspan alignmentBaseline="middle" fontSize="12">
        {`${(percent * 100).toFixed(0)}%`}
      </tspan>
    </text>
  );
};

class PieChart_ extends Component {
  static jsfiddleUrl = "https://jsfiddle.net/alidingling/c9pL8k61/";

  render() {
    const {
      width,
      height,
      noDataText,
      chartName,
      data,
      innerRadius,
      outerRadius,
    } = this.props;
    if (!data || !data.length) {
      return (
        <Empty description={noDataText || ` We couldn't find relevant data`} />
      );
    }
    let total = 0;
    for (var i = 0; i < data.length; i++) {
      total += data[i].value;
    }
    data && data.map((o, i) => Object.assign(o, colors[i]));

    return (
      <div style={{ margin: "0.1rem" }}>
        <PieChart width={width || 500} height={height || 200}>
          <Pie
            data={data}
            dataKey="value"
            nameKey="name"
            // cx={200}
            // cy={200}
            labelLine={false}
            label={renderCustomizedLabel}
            innerRadius={innerRadius || 30}
            outerRadius={outerRadius || 60}
            onClick={(a, b, c) => console.log(a, b, c)}
          >
            {data.map((entry, index) => (
              <Cell key={index} fill={entry.color || "lightblue"} />
            ))}
            <div width={30} position="center" fontSize="14">
              {total}
            </div>
          </Pie>
          <Tooltip />
          <Legend
            formatter={(value, entry, index) =>
              value && value.length > 20 ? (
                renderTooltip(
                  value,
                  <span style={{ fontSize: 14 }}>{elipsize(value, 18)}</span>
                )
              ) : (
                  <span style={{ fontSize: 14 }}>{value}</span>
                )
            }
            layout="vertical"
            align="right"
            verticalAlign="middle"
            wrapperStyle={{ marginRight: "1.875em" }}
            margin={{ top: 50, left: 0, right: 0, bottom: 0 }}
          />
          <div value={chartName || "woeitj"} offset={0} position="top" />
        </PieChart>
      </div>
    );
  }
}

export default PieChart_;

function CustomLegend() {
  return <span>{ }</span>;
}
