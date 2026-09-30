import "./Budget.css";
import BudgetSummary from "../BudgetDetails/BudgetSummary";
import BudgetGrid from "../BudgetDetails/BudgetGrid";
import BudgetHeader from "../BudgetDetails/BudgetHeader";
import EditBudgetModal from "../BudgetDetails/EditBudgetModal";
import { useEffect, useState } from "react";

const Budget = () => {
  const budgets = [
    {
      id: 1,
      category: "food",
      amount: 600,
      period: "monthly",
      color: "green"
    },
    {
      id: 2,
      category: "shopping",
      amount: 400,
      period: "monthly",
      color: "blue"
    },
    {
      id: 3,
      category: "transport",
      amount: 250,
      period: "monthly",
      color: "amber"
    },
    {
      id: 4,
      category: "housing",
      amount: 1000,
      period: "monthly",
      color: "red"
    },
    {
      id: 5,
      category: "entertainment",
      amount: 150,
      period: "monthly",
      color: "purple"
    },
    {
      id: 6,
      category: "bills",
      amount: 300,
      period: "monthly",
      color: "green"
    }
  ];

  const [data, setData] = useState(() => {
    const savedBudgets = JSON.parse(
      localStorage.getItem("budget") || "[]"
    );

    return savedBudgets.length > 0 ? savedBudgets : budgets;
  });

  const [editingBudget, setEditingBudget] = useState(null);

  useEffect(() => {
    localStorage.setItem("budget", JSON.stringify(data));
  }, [data]);

  function getPeriodRange(period) {
    const today = new Date();

    if (period === "weekly") {
      const start = new Date(today);
      start.setHours(0, 0, 0, 0);
      start.setDate(today.getDate() - today.getDay());

      const end = new Date(start);
      end.setDate(start.getDate() + 6);
      end.setHours(23, 59, 59, 999);

      return { start, end };
    }

    if (period === "monthly") {
      const start = new Date(
        today.getFullYear(),
        today.getMonth(),
        1
      );

      const end = new Date(
        today.getFullYear(),
        today.getMonth() + 1,
        0,
        23,
        59,
        59,
        999
      );

      return { start, end };
    }

    if (period === "quarterly") {
      const quarterStartMonth =
        Math.floor(today.getMonth() / 3) * 3;

      const start = new Date(
        today.getFullYear(),
        quarterStartMonth,
        1
      );

      const end = new Date(
        today.getFullYear(),
        quarterStartMonth + 3,
        0,
        23,
        59,
        59,
        999
      );

      return { start, end };
    }

    const start = new Date(
      today.getFullYear(),
      0,
      1
    );

    const end = new Date(
      today.getFullYear(),
      11,
      31,
      23,
      59,
      59,
      999
    );

    return { start, end };
  }

  function calculateBudgets() {
    const transactions = JSON.parse(
      localStorage.getItem("transiction") || "[]"
    );

    const categoryMap = {
      food: "Food & dining",
      shopping: "Shopping",
      transport: "Transport",
      housing: "Housing",
      entertainment: "Entertainment",
      bills: "Bills & Utilities",
      other: "Other"
    };

    return data.map((budget) => {
      const { start, end } = getPeriodRange(
        budget.period
      );

      const spent = transactions
        .filter((transaction) => {
          if (transaction.type !== "Expense") {
            return false;
          }

          if (
            categoryMap[budget.category] !==
            transaction.category
          ) {
            return false;
          }

          if (!transaction.date) {
            return false;
          }

          const transactionDate = new Date(
            transaction.date
          );

          if (Number.isNaN(transactionDate.getTime())) {
            return false;
          }

          return (
            transactionDate >= start &&
            transactionDate <= end
          );
        })
        .reduce((total, transaction) => {
          return total + Number(transaction.amount || 0);
        }, 0);

      const amount = Number(budget.amount) || 0;
      const remaining = amount - spent;
      const percentage =
        amount > 0
          ? Math.min((spent / amount) * 100, 100)
          : 0;

      let status = "On track";

      if (amount <= 0) {
        status = "Invalid";
      } else if (spent >= amount) {
        status = "Over budget";
      } else if (percentage >= 80) {
        status = "Warning";
      }

      return {
        ...budget,
        amount,
        spent,
        remaining,
        percentage,
        status
      };
    });
  }

  function handleDelete(id) {
    setData((currentData) => {
      return currentData.filter(
        (budget) => budget.id !== id
      );
    });
  }

  function handleEdit(budget) {
    setEditingBudget(budget);
  }

  function handleUpdate(updatedBudget) {
    setData((currentData) => {
      return currentData.map((budget) => {
        if (budget.id !== updatedBudget.id) {
          return budget;
        }

        return {
          ...budget,
          category: updatedBudget.category,
          amount: Number(updatedBudget.amount),
          period: updatedBudget.period,
          color: updatedBudget.color || "green"
        };
      });
    });

    setEditingBudget(null);
  }

  const calculatedBudgets = calculateBudgets();

  return (
    <main className="budget-page">
      <BudgetHeader
        data={data}
        setData={setData}
      />

      <BudgetSummary
        data={calculatedBudgets}
      />

      <BudgetGrid
        data={calculatedBudgets}
        handleDelete={handleDelete}
        handleEdit={handleEdit}
      />

      {editingBudget && (
        <EditBudgetModal
          budget={editingBudget}
          onClose={() => setEditingBudget(null)}
          onUpdate={handleUpdate}
        />
      )}
    </main>
  );
};

export default Budget;