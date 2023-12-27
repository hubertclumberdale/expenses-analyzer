import AreaChartMonthlyCost from "@/components/charts/AreaChartMonthlyCost";
import BarChartTotalCost from "@/components/charts/BarChartTotalCost";
import FunnelChartPaymentStatus from "@/components/charts/FunnelChartPaymentStatus";
import LineChartConsumption from "@/components/charts/LineChartConsumption";
import PieChartExpenseDistribution from "@/components/charts/PieChartExpenseDistribution";
import RadarChartExpenseBreakdown from "@/components/charts/RadarChartExpenseBreakdown";
import RadialBarChartTotalCostType from "@/components/charts/RadialBarChartTotalCostType";
import ScatterPlotDueDateTotalCost from "@/components/charts/ScatterPlotDueDateTotalCost";
import StackedBarChartCostActivation from "@/components/charts/StackedBarChartCostActivation";
import TreemapExpenseDistribution from "@/components/charts/TreemapExpenseDistribution";
import { useExpensesContext } from "@/contexts/expenses";
import React from "react";
import { Col, Container, Row } from "react-bootstrap";

const ExpensesCharts = () => {
  return (
    <>
      <Container>
        <Row>
          <Col>
            Bar Chart - Total Cost vs. Reference
            <BarChartTotalCost></BarChartTotalCost>
          </Col>
          <Col>
            Line Chart - Consumption Over Time
            <LineChartConsumption></LineChartConsumption>
          </Col>
          <Col>
            Pie Chart - Expense Distribution by Type
            <PieChartExpenseDistribution></PieChartExpenseDistribution>
          </Col>

          <Col>
            Area Chart - Monthly Cost Over Time
            <AreaChartMonthlyCost></AreaChartMonthlyCost>
          </Col>
          <Col>
            Stacked Bar Chart - Cost vs. Activation Cost
            <StackedBarChartCostActivation></StackedBarChartCostActivation>
          </Col>

          <Col>
            Radar Chart - Expense Breakdown
            <RadarChartExpenseBreakdown></RadarChartExpenseBreakdown>
          </Col>
          <Col>
            Scatter Plot - Due Date vs. Total Cost
            <ScatterPlotDueDateTotalCost></ScatterPlotDueDateTotalCost>
          </Col>

          <Col>
            Treemap - Expense Distribution by Reference
            <TreemapExpenseDistribution></TreemapExpenseDistribution>
          </Col>
          <Col>
            Radial Bar Chart - Total Cost by Type
            <RadialBarChartTotalCostType></RadialBarChartTotalCostType>
          </Col>
          <Col>
            Funnel Chart - Expense Payment Status
            <FunnelChartPaymentStatus></FunnelChartPaymentStatus>
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default ExpensesCharts;
