import React from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

const CustomLineChart = (props) => {
  return (
      <ResponsiveContainer width="50%" height="100%">
        <LineChart
          width={500}
          height={530}
          data={props.fileData.slice(0, 10)}
          margin={{
            top: 5,
            right: 30,
            left: 20,
            bottom: 5,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="Name" />
          <YAxis />
          <Tooltip />
          <Legend  wrapperStyle={{bottom:'unset'}}/>
          <Line
            type="monotone"
            dataKey="ListPrice"
            stroke="#8884d8"
            activeDot={{ r: 8 }}
          />
          <Line type="monotone" dataKey="UnitPrice" stroke="#82ca9d" />
        </LineChart>
      </ResponsiveContainer>
  );
};

export default CustomLineChart;
