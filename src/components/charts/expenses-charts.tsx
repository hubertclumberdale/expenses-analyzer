import AreaChartMonthlyCost from "@/components/charts/AreaChartMonthlyCost";
import BarChart from "@/components/charts/BarChart";
import FunnelChartPaymentStatus from "@/components/charts/FunnelChartPaymentStatus";
import LineChart from "@/components/charts/LineChart";
import PieChart from "@/components/charts/PieChart";
import RadarChartExpenseBreakdown from "@/components/charts/RadarChartExpenseBreakdown";
import RadialBarChartTotalCostType from "@/components/charts/RadialBarChartTotalCostType";
import ScatterPlotDueDateTotalCost from "@/components/charts/ScatterPlotDueDateTotalCost";
import StackedBarChartCostActivation from "@/components/charts/StackedBarChartCostActivation";
import TreemapExpenseDistribution from "@/components/charts/TreemapExpenseDistribution";
import { Household } from "@/types/types";
import React from "react";
import { Col, Container, Row } from "react-bootstrap";

const ExpensesCharts = ({ household }: { household: Household }) => {
  return (
    <>
      <Container>
        <Row>
          <Col>
            Bar Chart - Total Cost vs. Reference
            <BarChart
              transactions={household?.expenses}
              dataKey="totalCost"
            ></BarChart>
          </Col>
          <Col>
            Line Chart - Consumption Over Time
            <LineChart
              transactions={household?.expenses}
              dataKey="consumption"
            ></LineChart>
          </Col>
          <Col>
            Pie Chart - Expense Distribution by Typeeee
            <PieChart transactions={household?.expenses}></PieChart>
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
