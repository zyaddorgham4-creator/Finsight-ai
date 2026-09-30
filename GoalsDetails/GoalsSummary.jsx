import "./GoalsSummary.css";

const GoalsSummary = ({ goals }) => {

  const ActiveGoals = goals.length;
   
   const TotalSaved = goals.reduce((a,b)=>{
    return a + b.saved;
   },0)
  

const Overall_Progress = goals.reduce((sum, goal) => {
  return sum + (goal.saved / goal.target) * 100;
}, 0) / goals.length;

const CompletedGoals = goals.filter((e)=>{
  return e.saved>=e.target;
})

return (
    <section className="goals-summary" aria-label="Goals summary">

      <article className="goals-summary-item">
        <span className="goals-summary-label">Active Goals</span>
        <strong className="goals-summary-value">{ActiveGoals}</strong>
        <span className="goals-summary-note">currently in progress</span>
      </article>

      <article className="goals-summary-item">
        <span className="goals-summary-label">Total Saved</span>
        <strong className="goals-summary-value">${TotalSaved}</strong>
        <span className="goals-summary-note">across all goals</span>
      </article>

      <article className="goals-summary-item">
        <span className="goals-summary-label">Overall Progress</span>
        <strong className="goals-summary-value">{Math.round(Number(Overall_Progress))}%</strong>
        <span className="goals-summary-note">average completion</span>
      </article>

      <article className="goals-summary-item">
        <span className="goals-summary-label">Completed</span>
        <strong className="goals-summary-value">{CompletedGoals.length}</strong>
        <span className="goals-summary-note">goals achieved</span>
      </article>

    </section>
  );
};

export default GoalsSummary;