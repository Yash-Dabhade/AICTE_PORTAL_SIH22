import React from "react";
import { Bar } from "react-chartjs-2";
import { PieChart, Pie, Cell, Tooltip, Legend } from "recharts";

class TrendingGraph extends React.Component {
  COLORS = ["#8884d8", "#82ca9d", "#FFBB28", "#FF8042", "#AF19FF"];
  pieData = [
    {
      name: "React JS",
      value: 54.85,
    },
    {
      name: "Node JS",
      value: 47.91,
    },
    {
      name: "Angulr JS",
      value: 16.85,
    },
    {
      name: "Express JS",
      value: 16.14,
    },
    {
      name: "Vanila JS",
      value: 10.25,
    },
  ];
  CustomTooltip = ({ active, payload, label }) => {
    if (active) {
      return (
        <div
          className="custom-tooltip"
          style={{
            backgroundColor: "#ffff",
            padding: "5px",
            border: "1px solid #cccc",
          }}
        >
          <label>{`${payload[0].name} : ${payload[0].value}%`}</label>
        </div>
      );
    }
    return null;
  };

  render() {
    return (
      <div className=" mt-11 ">
        <div className="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6 shadow-2xl rounded-2xl border-solid border-2 border-slate-700 text-center">
          <dt className="text-sm font-medium text-gray-500 ">
            <b> Market Capture</b>
          </dt>
          <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2 -ml-64">
            <PieChart width={730} height={300}>
              <Pie
                data={this.pieData}
                color="#000000"
                dataKey="value"
                nameKey="name"
                cx="50%"
                cy="50%"
                outerRadius={120}
                fill="#8884d8"
              >
                {this.pieData.map((entry, index) => (
                  <Cell
                    key={`cell-${index}`}
                    fill={this.COLORS[index % this.COLORS.length]}
                  />
                ))}
              </Pie>
              <Tooltip content={<this.CustomTooltip />} />
              <Legend />
            </PieChart>
          </dd>
        </div>
      </div>
    );
  }
}
export default TrendingGraph;
