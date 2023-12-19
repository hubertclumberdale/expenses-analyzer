import AreaChart from "@/components/charts/area-chart";
import BarChart from "@/components/charts/bar-chart";
import LineChart from "@/components/charts/line-chart";
import RadarChart from "@/components/charts/radar-chart";
import { useExpensesContext } from "@/contexts/expenses-context";
import React from "react";
import { Container, Row } from "react-bootstrap";

const data = [
  {
    name: "Spesa 1",
    cost: 123,
    consumption: 123,
    activationCost: 1111,
    paid: true,
    monthlyInstallments: 1,
  },
  {
    name: "Spesa 5",
    cost: 123,
    consumption: 123123,
    activationCost: 123,
    paid: true,
    monthlyInstallments: 1123,
  },
  {
    name: "asdfadfasdfasdfasdf",
    cost: 123,
    consumption: 123,
    activationCost: 123,
    paid: false,
    monthlyInstallments: 1123,
  },
];

const ExpensesCharts = () => {
  const { expenses } = useExpensesContext();

  return (
    <>
      <Container>
        <Row>
          <LineChart expenses={expenses}></LineChart>
          <AreaChart expenses={expenses}></AreaChart>
          <BarChart expenses={expenses}></BarChart>
          <RadarChart expenses={expenses}></RadarChart>
        </Row>
      </Container>
    </>
  );
};

export default ExpensesCharts;
