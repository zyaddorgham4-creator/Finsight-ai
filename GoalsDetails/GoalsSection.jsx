import "./GoalsSection.css";
import GoalCard from "./GoalCard";
import GoalsToolbar from "./GoalsToolbar";
import GoalsModals from "./GoalsModals";
import { useMemo, useState } from "react";
import {
  createGoal,
  updateGoal,
  deleteGoal,
  addMoneyToGoal
} from "./GoalsActions";
import { filterAndSortGoals } from "./GoalsFilter";

const GoalsSection = ({
  goals,
  setData,
  activities,
  setActivities,
  DetailsGoal,
  setDetailsGoal,
  CreatingGoal,
  setCreatingGoal
}) => {
  const [View, setView] = useState("grid");

  const [EditingGoal, setEditingGoal] =
    useState(null);

  const [DeletingGoal, setDeletingGoal] =
    useState(null);

  const [AddingMoneyGoal, setAddingMoneyGoal] =
    useState(null);

  const [Filter, setFilter] =
    useState("all");

  const [Sort, setSort] =
    useState("deadline");

  const [Search, setSearch] =
    useState("");

  const handleEdit = (goal) => {
    setEditingGoal(goal);
  };

  const handleDelete = (goal) => {
    setDeletingGoal(goal);
  };

  const handleAddMoney = (goal) => {
    setAddingMoneyGoal(goal);
  };

  const handleDetails = (goal) => {
    setDetailsGoal(goal);
  };

  const handleCreate = (goal) => {
    createGoal(setData, goal);
    setCreatingGoal(false);
  };

  const handleUpdate = (updatedGoal) => {
    updateGoal(
      setData,
      updatedGoal,
      setEditingGoal,
      setDetailsGoal
    );
  };

  const handleConfirmDelete = (goalId) => {
    deleteGoal(
      setData,
      goalId,
      setDeletingGoal,
      setDetailsGoal
    );
  };

  const handleConfirmAddMoney = (amount) => {
    if (!AddingMoneyGoal) {
      return;
    }

    addMoneyToGoal(
      setData,
      setActivities,
      AddingMoneyGoal,
      amount
    );

    setAddingMoneyGoal(null);
  };

  const FilteredAndSortedGoals = useMemo(() => {
    return filterAndSortGoals(
      goals,
      Search,
      Filter,
      Sort
    );
  }, [
    goals,
    Search,
    Filter,
    Sort
  ]);

  return (
    <>
      <section
        className="goals-section"
        aria-labelledby="goals-section-title"
      >
        <div className="goals-section-header">
          <div className="goals-section-header-text">
            <h2 id="goals-section-title">
              Your Goals
            </h2>

            <p>
              All the financial milestones
              you're working towards.
            </p>
          </div>

          <button
            className="goals-create-btn"
            type="button"
            onClick={() =>
              setCreatingGoal(true)
            }
          >
            <span>+</span>
            Create Goal
          </button>
        </div>

        <GoalsToolbar
          Search={Search}
          setSearch={setSearch}
          Filter={Filter}
          setFilter={setFilter}
          Sort={Sort}
          setSort={setSort}
          View={View}
          setView={setView}
        />

        {FilteredAndSortedGoals.length ===
        0 ? (
          <div className="goals-filter-empty">
            <span>⌕</span>

            <strong>
              No goals found
            </strong>

            <p>
              Try changing your search or
              filter.
            </p>
          </div>
        ) : (
          <div
            className={`goals-section-grid ${
              View === "list"
                ? "goals-section-grid--list"
                : ""
            }`}
          >
            {FilteredAndSortedGoals.map(
              (goal) => (
                <GoalCard
                  key={goal.id}
                  goal={goal}
                  onEdit={handleEdit}
                  onDelete={handleDelete}
                  onAddMoney={
                    handleAddMoney
                  }
                  onDetails={
                    handleDetails
                  }
                />
              )
            )}
          </div>
        )}
      </section>

      <GoalsModals
        CreatingGoal={CreatingGoal}
        setCreatingGoal={
          setCreatingGoal
        }
        handleCreate={handleCreate}
        EditingGoal={EditingGoal}
        setEditingGoal={
          setEditingGoal
        }
        handleUpdate={handleUpdate}
        DeletingGoal={DeletingGoal}
        setDeletingGoal={
          setDeletingGoal
        }
        handleConfirmDelete={
          handleConfirmDelete
        }
        AddingMoneyGoal={
          AddingMoneyGoal
        }
        setAddingMoneyGoal={
          setAddingMoneyGoal
        }
        handleConfirmAddMoney={
          handleConfirmAddMoney
        }
        DetailsGoal={DetailsGoal}
        setDetailsGoal={
          setDetailsGoal
        }
        goals={goals}
        activities={activities}
        handleAddMoney={
          handleAddMoney
        }
        handleEdit={handleEdit}
      />
    </>
  );
};

export default GoalsSection;