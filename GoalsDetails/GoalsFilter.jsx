export const filterAndSortGoals = (
  goals,
  Search,
  Filter,
  Sort
) => {
  const SearchValue =
    Search.trim().toLowerCase();

  const CurrentGoals = goals.filter(
    (goal) => {
      const MatchesSearch =
        !SearchValue ||
        goal.name
          .toLowerCase()
          .includes(SearchValue) ||
        goal.category
          .toLowerCase()
          .includes(SearchValue);

      if (!MatchesSearch) {
        return false;
      }

      if (Filter === "completed") {
        return (
          goal.saved >=
          goal.target
        );
      }

      if (Filter === "in-progress") {
        return (
          goal.saved <
          goal.target
        );
      }

      if (Filter === "overdue") {
        return (
          goal.saved <
            goal.target &&
          new Date(goal.deadline) <
            new Date()
        );
      }

      return true;
    }
  );

  return [...CurrentGoals].sort(
    (a, b) => {
      if (Sort === "deadline") {
        return (
          new Date(a.deadline) -
          new Date(b.deadline)
        );
      }

      if (Sort === "progress") {
        const ProgressA =
          a.saved / a.target;

        const ProgressB =
          b.saved / b.target;

        return (
          ProgressB -
          ProgressA
        );
      }

      if (Sort === "amount") {
        return (
          b.saved -
          a.saved
        );
      }

      if (Sort === "name") {
        return a.name.localeCompare(
          b.name
        );
      }

      return 0;
    }
  );
};