import GoalEditModal from "./GoalEditModal";
import GoalDeleteModal from "./GoalDeleteModal";
import GoalAddMoneyModal from "./GoalAddMoneyModal";
import GoalCreateModal from "./GoalCreateModal";
import GoalDetailsModal from "./GoalDetailsModal";

const GoalsModals = ({
  CreatingGoal,
  setCreatingGoal,
  handleCreate,
  EditingGoal,
  setEditingGoal,
  handleUpdate,
  DeletingGoal,
  setDeletingGoal,
  handleConfirmDelete,
  AddingMoneyGoal,
  setAddingMoneyGoal,
  handleConfirmAddMoney,
  DetailsGoal,
  setDetailsGoal,
  goals,
  activities,
  handleAddMoney,
  handleEdit
}) => {
  return (
    <>
      {CreatingGoal && (
        <GoalCreateModal
          onCreate={handleCreate}
          onClose={() =>
            setCreatingGoal(false)
          }
        />
      )}

      {EditingGoal && (
        <GoalEditModal
          goal={EditingGoal}
          onSave={handleUpdate}
          onClose={() =>
            setEditingGoal(null)
          }
        />
      )}

      {DeletingGoal && (
        <GoalDeleteModal
          goal={DeletingGoal}
          onConfirm={handleConfirmDelete}
          onClose={() =>
            setDeletingGoal(null)
          }
        />
      )}

      {AddingMoneyGoal && (
        <GoalAddMoneyModal
          goal={AddingMoneyGoal}
          onConfirm={
            handleConfirmAddMoney
          }
          onClose={() =>
            setAddingMoneyGoal(null)
          }
        />
      )}

      {DetailsGoal && (
        <GoalDetailsModal
          goal={
            goals.find(
              (goal) =>
                goal.id === DetailsGoal.id
            ) || DetailsGoal
          }
          activities={activities}
          onClose={() =>
            setDetailsGoal(null)
          }
          onAddMoney={handleAddMoney}
          onEdit={handleEdit}
        />
      )}
    </>
  );
};

export default GoalsModals;