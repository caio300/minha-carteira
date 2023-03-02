import React from "react";
// import {
//   PieChart,
//   Pie,
//   ResponsiveContainer
// } from 'recharts';

import {
  Container,
  SideLeft,
  LegendContainer,
  Legend,
  SideRight
} from "./styles";

const PieChart: React.FC = () => (
  <Container>
    <SideLeft>
      <LegendContainer>
        <Legend color="#F7931B">
          <div>5%</div>
          <span>Entradas</span>
        </Legend>
        <Legend color="#E44C4E">
          <div>95%</div>
          <span>Saídas</span>
        </Legend>
      </LegendContainer>
    </SideLeft>

    <SideRight>
      {/* <ResponsiveContainer>
        <PieChart>
          <Pie
            data={[{amount: 30, percent: 95}]}
            labelLine={false}
            dataKey='percent'
          >
            
          </Pie>
        </PieChart>
      </ResponsiveContainer> */}
    </SideRight>

  </Container>
);

export default PieChart;
