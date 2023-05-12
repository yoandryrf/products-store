import React from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Bar } from "react-chartjs-2";
import { faker } from "@faker-js/faker";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const getSalesByMonth = (arr) => {
  return arr.reduce((acc, product) => {
    const { sales } = product;

    sales.forEach((sale) => {
      const { month, revenue } = sale;
      const monthRevenue = acc[month] || 0;
      acc[month] = monthRevenue + Number(revenue);
    });

    return acc;
  }, {});
};

const getColors = (labels) => {
  const colors = [];
  for (let i = 0; i < labels.length; i++) {
    const color = "#" + Math.floor(Math.random() * 16777215).toString(16);
    colors.push(color);
  }
  return colors;
};

export function Chart({ arr, filters }) {
  const monthlyRevenue = getSalesByMonth(arr);
  const labels = Object.keys(monthlyRevenue);
  const revenues = Object.values(monthlyRevenue);
  const colors = getColors(labels);
  const options = {
    responsive: true,
    plugins: {
      legend: {
        display: false,
      },
      title: {
        display: true,
        text: `Sales by months for: ${filters}`,
      },
    },
  };

  const data = {
    labels,
    datasets: [
      {
        label: "",
        data: revenues,
        backgroundColor: colors,
      },
    ],
  };
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Bar options={options} data={data} />
    </div>
  );
}
