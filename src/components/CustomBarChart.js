import React from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

const CustomBarChart = (props) => {
  return (
      <ResponsiveContainer width="50%" height="100%">
        <BarChart
          barCategoryGap={"20%"}
          width={500}
          height={300}
          data={props.fileData.slice(0, 5)}
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
          <Legend />
          <Bar dataKey="ListPrice" fill="#8884d8" />
          <Bar dataKey="UnitPrice" fill="#82ca9d" />
        </BarChart>
      </ResponsiveContainer>
  );
};

export default CustomBarChart;
