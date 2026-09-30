import "./Goals.css";
import GoalsSummary from "../GoalsDetails/GoalsSummary";
import GoalSpotlight from "../GoalsDetails/GoalSpotlight";
import FinSightInsight from "../GoalsDetails/FinSightInsight";
import GoalsSection from "../GoalsDetails/GoalsSection";
import GoalActivity from "../GoalsDetails/GoalActivity";
import UpcomingDeadlines from "../GoalsDetails/UpcomingDeadlines";
import Achievements from "../GoalsDetails/Achievements";
import GoalsHeader from "../GoalsDetails/GoalsHeader";
import { useState, useEffect } from "react";

const Goals = () => {
  const initialGoals = [
    {
      id: 1,
      icon: "laptop",
      name: "New Laptop",
      category: "Technology",
      saved: 750,
      target: 1000,
      deadline: "2026-11-09"
    },
    {
      id: 2,
      icon: "shield",
      name: "Emergency Fund",
      category: "Safety",
      saved: 2400,
      target: 5000,
      deadline: "2027-03-28"
    },
    {
      id: 3,
      icon: "plane",
      name: "Dream Vacation",
      category: "Travel",
      saved: 1180,
      target: 2000,
      deadline: "2026-10-10"
    },
    {
      id: 4,
      icon: "phone",
      name: "New Phone",
      category: "Technology",
      saved: 420,
      target: 900,
      deadline: "2027-02-28"
    },
    {
      id: 5,
      icon: "car",
      name: "Car Fund",
      category: "Transport",
      saved: 3200,
      target: 8000,
      deadline: "2027-11-28"
    },
    {
      id: 6,
      icon: "book",
      name: "Education",
      category: "Learning",
      saved: 1650,
      target: 2500,
      deadline: "2026-12-28"
    }
  ];

  const [data, setData] = useState(() => {
    const goals = JSON.parse(
      localStorage.getItem("Goals") || "null"
    );

    return goals || initialGoals;
  });

  const [Activities, setActivities] = useState(
    () => {
      const savedActivities = JSON.parse(
        localStorage.getItem(
          "GoalActivities"
        ) || "null"
      );

      return savedActivities || [];
    }
  );

  const [DetailsGoal, setDetailsGoal] =
    useState(null);

  const [CreatingGoal, setCreatingGoal] =
    useState(false);

  useEffect(() => {
    localStorage.setItem(
      "Goals",
      JSON.stringify(data)
    );
  }, [data]);

  useEffect(() => {
    localStorage.setItem(
      "GoalActivities",
      JSON.stringify(Activities)
    );
  }, [Activities]);

  const handleViewDetails = (goal) => {
    setDetailsGoal(goal);
  };

  const handleCreateGoal = () => {
    setCreatingGoal(true);
  };

  return (
    <main className="goals-page">
      <GoalsHeader
        onAddGoal={handleCreateGoal}
      />

      <GoalsSummary goals={data} />

      <div className="goals-row goals-row--split">
        <GoalSpotlight goals={data} />

        <FinSightInsight
          goals={data}
          onViewDetails={handleViewDetails}
        />
      </div>

      <GoalsSection
        goals={data}
        setData={setData}
        activities={Activities}
        setActivities={setActivities}
        DetailsGoal={DetailsGoal}
        setDetailsGoal={setDetailsGoal}
        CreatingGoal={CreatingGoal}
        setCreatingGoal={setCreatingGoal}
      />

      <div className="goals-row goals-row--split">
        <GoalActivity
          goals={data}
          activities={Activities}
        />

        <UpcomingDeadlines
          goals={data}
        />
      </div>

      <Achievements goals={data} />
    </main>
  );
};

export default Goals;