export const createGoal = (
  setData,
  goal
) => {
  setData((currentGoals) => [
    goal,
    ...currentGoals
  ]);
};

export const updateGoal = (
  setData,
  updatedGoal,
  setEditingGoal,
  setDetailsGoal
) => {
  setData((currentGoals) =>
    currentGoals.map((goal) =>
      goal.id === updatedGoal.id
        ? updatedGoal
        : goal
    )
  );

  setEditingGoal(null);

  setDetailsGoal((currentGoal) => {
    if (
      currentGoal &&
      currentGoal.id === updatedGoal.id
    ) {
      return updatedGoal;
    }

    return currentGoal;
  });
};

export const deleteGoal = (
  setData,
  goalId,
  setDeletingGoal,
  setDetailsGoal
) => {
  setData((currentGoals) =>
    currentGoals.filter(
      (goal) => goal.id !== goalId
    )
  );

  setDeletingGoal(null);

  setDetailsGoal((currentGoal) =>
    currentGoal?.id === goalId
      ? null
      : currentGoal
  );
};

export const addMoneyToGoal = (
  setData,
  setActivities,
  goal,
  amount
) => {
  if (!setActivities) {
    return;
  }

  const Activity = {
    id: Date.now(),
    goalId: goal.id,
    type: "deposit",
    amount,
    date: new Date().toISOString()
  };

  setData((currentGoals) =>
    currentGoals.map((currentGoal) =>
      currentGoal.id === goal.id
        ? {
            ...currentGoal,
            saved:
              currentGoal.saved +
              amount
          }
        : currentGoal
    )
  );

  setActivities(
    (currentActivities) => [
      Activity,
      ...currentActivities
    ]
  );
};