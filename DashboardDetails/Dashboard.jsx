import React from "react";
import "./Dashboard.css";

import FinancialSummary from "../DashboardDetails/FinancialSummary";
import CashFlow from "../DashboardDetails/CashFlow";
import SpendingBreakdown from "../DashboardDetails/SpendingBreakdown";
import RecentTransactions from "../DashboardDetails/RecentTransactions";
import BudgetOverview from "../DashboardDetails/BudgetOverview";
import AIInsight from "../DashboardDetails/AIInsight";
import DashboardHeader from '../DashboardDetails/DashboardHeader'
const Dashboard = () => {
  return (
    <main className="fs-dashboard-page">
      <div className="fs-dashboard-container">
        <DashboardHeader />

        <FinancialSummary />

        <section className="fs-dashboard-grid fs-dashboard-grid--top">
          <CashFlow />
          <SpendingBreakdown />
        </section>

        <section className="fs-dashboard-grid fs-dashboard-grid--bottom">
          <RecentTransactions />
          <BudgetOverview />
        </section>

        <AIInsight />
      </div>
    </main>
  );
};

export default Dashboard;