import { useState, useEffect, useRef } from "react";
import "./AIAssistant.css";
import AIHero from "./AIHero";
import AIQuickCommands from "./AIQuickCommands";
import AIResponse from "./AIResponse";
import AIThinking from "./AIThinking";
import AIFinancialPulse from "./AIFinancialPulse";
import AIInsights from "./AIInsights";
import AIScenarioLab from "./AIScenarioLab";
import AIForecast from "./AIForecast";
import AIAnalysisHistory from "./AIAnalysisHistory";
import AIModal from "./AIModal";

const responses = {
  spending: {
    category: "Spending Analysis",
    confidence: 94,
    metrics: [
      { label: "This month", value: "$2,180", tone: "neutral" },
      { label: "Last month", value: "$1,945", tone: "neutral" },
      { label: "Change", value: "+12%", tone: "warning" },
      { label: "Largest category", value: "Dining", tone: "neutral" }
    ],
    assessment: "Your spending increased 12% this month, driven primarily by dining and shopping. Dining alone rose $142 above your recent average.",
    actions: ["Explore Spending", "Set Dining Limit", "View Trend"]
  },
  goals: {
    category: "Goal Analysis",
    confidence: 91,
    metrics: [
      { label: "Active goals", value: "6", tone: "neutral" },
      { label: "On track", value: "4", tone: "positive" },
      { label: "At risk", value: "1", tone: "warning" },
      { label: "Overall progress", value: "64%", tone: "neutral" }
    ],
    assessment: "Most of your goals are progressing well. The Car Fund is at risk due to a slower contribution pace than originally planned.",
    actions: ["Review Goals", "Adjust Car Fund", "Set New Goal"]
  },
  save: {
    category: "Saving Strategy",
    confidence: 89,
    metrics: [
      { label: "Monthly saving", value: "$420", tone: "neutral" },
      { label: "Potential", value: "$585", tone: "positive" },
      { label: "Opportunity", value: "+$165", tone: "positive" },
      { label: "Safe to save", value: "$150", tone: "neutral" }
    ],
    assessment: "By adjusting three recurring subscriptions and reducing dining frequency, you could save approximately $165 more per month without impacting essentials.",
    actions: ["Apply Plan", "View Subscriptions", "Compare Scenarios"]
  },
  afford: {
    category: "Affordability Analysis",
    confidence: 92,
    metrics: [
      { label: "Purchase", value: "$900", tone: "neutral" },
      { label: "Current savings", value: "$2,400", tone: "neutral" },
      { label: "Commitments", value: "$1,150", tone: "warning" },
      { label: "Safe amount", value: "$680", tone: "neutral" }
    ],
    assessment: "Your current cash position suggests that purchasing this item next month would put pressure on your emergency buffer. Consider delaying by 3 weeks or splitting the payment.",
    actions: ["Adjust Budget", "View Spending", "Compare Scenarios"]
  },
  forecast: {
    category: "Financial Forecast",
    confidence: 87,
    metrics: [
      { label: "30 days", value: "$3,420", tone: "positive" },
      { label: "60 days", value: "$4,180", tone: "positive" },
      { label: "90 days", value: "$5,050", tone: "positive" },
      { label: "Risk level", value: "Low", tone: "positive" }
    ],
    assessment: "Your projected balance continues to grow steadily. No major shortfalls detected across the next 90 days, assuming current income and spending patterns remain stable.",
    actions: ["View Summary", "Export Report", "Run Scenario"]
  },
  general: {
    category: "Financial Analysis",
    confidence: 88,
    metrics: [
      { label: "Balance", value: "$8,420", tone: "positive" },
      { label: "Monthly net", value: "+$1,240", tone: "positive" },
      { label: "Savings rate", value: "28%", tone: "positive" },
      { label: "Risk", value: "Low", tone: "positive" }
    ],
    assessment: "Your overall financial position is healthy. Savings rate sits above your 3-month average, and no significant risks were identified.",
    actions: ["View Summary", "Explore Insights", "Set New Goal"]
  }
};

const AIAssistant = () => {
  const [prompt, setPrompt] = useState("");
  const [thinking, setThinking] = useState(false);
  const [response, setResponse] = useState(null);
  const [modal, setModal] = useState(null);
  const [toast, setToast] = useState(null);
  const [history, setHistory] = useState([
    { id: 1, title: "Laptop affordability", time: "2 minutes ago" },
    { id: 2, title: "Spending anomaly", time: "Today" },
    { id: 3, title: "Vacation goal forecast", time: "Yesterday" },
    { id: 4, title: "Monthly saving strategy", time: "Sep 28" }
  ]);
  const timerRef = useRef(null);

  useEffect(() => {
    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, []);

  useEffect(() => {
    if (!toast) return;
    const t = setTimeout(() => setToast(null), 2600);
    return () => clearTimeout(t);
  }, [toast]);

  const detectIntent = (text) => {
    const t = text.toLowerCase();
    if (t.includes("spend") || t.includes("expense")) return "spending";
    if (t.includes("goal") || t.includes("saving for")) return "goals";
    if (t.includes("save") || t.includes("cut")) return "save";
    if (t.includes("afford") || t.includes("buy") || t.includes("laptop")) return "afford";
    if (t.includes("forecast") || t.includes("balance") || t.includes("days")) return "forecast";
    return "general";
  };

  const runAnalysis = (text) => {
    if (!text.trim() || thinking) return;
    setThinking(true);
    setResponse(null);

    timerRef.current = setTimeout(() => {
      const intent = detectIntent(text);
      setResponse({ prompt: text, ...responses[intent] });
      setThinking(false);
      setHistory((prev) => [
        { id: Date.now(), title: text.slice(0, 42), time: "Just now" },
        ...prev.slice(0, 5)
      ]);
    }, 1400);
  };

  const handleCommand = (command) => {
    setPrompt(command);
    runAnalysis(command);
  };

  const openSummary = () => {
    setModal({
      type: "summary",
      title: "Financial Summary",
      subtitle: "Snapshot of your current financial position."
    });
  };

  const openInsightsDetail = () => {
    setModal({
      type: "insights",
      title: "AI Insights Explorer",
      subtitle: "Detailed view of every insight FinSight AI generated for you."
    });
  };

  const openNewGoal = () => {
    setModal({
      type: "new-goal",
      title: "Set a New Goal",
      subtitle: "Define what you're saving for and how much you need."
    });
  };

  const openSubscriptions = () => {
    setModal({
      type: "subscriptions",
      title: "Recurring Subscriptions",
      subtitle: "FinSight AI identified these as potential saving opportunities."
    });
  };

  const openCompareScenarios = () => {
    setModal({
      type: "compare",
      title: "Compare Scenarios",
      subtitle: "See how different decisions shape your financial future."
    });
  };

  const openAdjustBudget = () => {
    setModal({
      type: "adjust-budget",
      title: "Adjust Budget",
      subtitle: "Rebalance your monthly allocations without hurting essentials."
    });
  };

  const openExportReport = () => {
    setModal({
      type: "export-report",
      title: "Export Financial Report",
      subtitle: "Download a snapshot of your finances as a PDF."
    });
  };

  const handleResponseAction = (action) => {
    switch (action) {
      case "View Summary":
        openSummary();
        break;
      case "Explore Insights":
        openInsightsDetail();
        break;
      case "Set New Goal":
        openNewGoal();
        break;
      case "View Subscriptions":
        openSubscriptions();
        break;
      case "Compare Scenarios":
      case "Run Scenario":
        openCompareScenarios();
        break;
      case "Adjust Budget":
        openAdjustBudget();
        break;
      case "Export Report":
        openExportReport();
        break;
      case "Explore Spending":
      case "View Spending":
      case "View Trend":
        setToast({ tone: "info", text: "Opening spending breakdown…" });
        document.getElementById("ai-forecast-title")?.scrollIntoView({ behavior: "smooth" });
        break;
      case "Set Dining Limit":
        setToast({ tone: "success", text: "Dining limit updated to $450/month." });
        break;
      case "Apply Plan":
        setToast({ tone: "success", text: "Saving plan applied to your account." });
        break;
      case "Review Goals":
        setToast({ tone: "info", text: "Reviewing your active goals…" });
        document.getElementById("ai-insights-title")?.scrollIntoView({ behavior: "smooth" });
        break;
      case "Adjust Car Fund":
        setToast({ tone: "success", text: "Car Fund contribution increased by $80/month." });
        break;
      default:
        setToast({ tone: "info", text: `Action: ${action}` });
    }
  };

  const handleInsightAction = (action) => {
    switch (action) {
      case "Explore Spending":
        setToast({ tone: "info", text: "Opening detailed spending view…" });
        document.getElementById("ai-forecast-title")?.scrollIntoView({ behavior: "smooth" });
        break;
      case "Adjust Goal":
        openNewGoal();
        break;
      case "Review Subscriptions":
        openSubscriptions();
        break;
      case "Adjust Pace":
        openAdjustBudget();
        break;
      default:
        setToast({ tone: "info", text: `Action: ${action}` });
    }
  };

  const handleApplyPlan = (title) => {
    setHistory((prev) => [
      { id: Date.now(), title: `Applied plan: ${title}`, time: "Just now" },
      ...prev.slice(0, 5)
    ]);
    setToast({ tone: "success", text: `Plan applied — "${title}"` });
  };

  const handleViewAllHistory = () => {
    setModal({
      type: "history",
      title: "All AI Analyses",
      subtitle: "Everything FinSight AI has analyzed for you."
    });
  };

  const closeModal = () => setModal(null);

  return (
    <main className="ai-page">
      <AIHero
        prompt={prompt}
        setPrompt={setPrompt}
        onSubmit={() => runAnalysis(prompt)}
        thinking={thinking}
      />

      <AIQuickCommands onSelect={handleCommand} />

      {thinking && <AIThinking />}
      {response && !thinking && (
        <AIResponse data={response} onAction={handleResponseAction} />
      )}

      <AIFinancialPulse onOpenSummary={openSummary} />
      <AIInsights onAction={handleInsightAction} />
      <AIScenarioLab onApplyPlan={handleApplyPlan} />
      <AIForecast onExportReport={openExportReport} />
      <AIAnalysisHistory items={history} onViewAll={handleViewAllHistory} />

      {modal && (
        <AIModal
          modal={modal}
          history={history}
          onClose={closeModal}
          onConfirmGoal={(goal) => {
            setHistory((prev) => [
              { id: Date.now(), title: `New goal: ${goal}`, time: "Just now" },
              ...prev.slice(0, 5)
            ]);
            setToast({ tone: "success", text: `Goal created — "${goal}"` });
            closeModal();
          }}
          onApplyPlan={(title) => {
            handleApplyPlan(title);
            closeModal();
          }}
          onToast={setToast}
        />
      )}

      {toast && (
        <div className={`ai-toast ai-toast--${toast.tone}`} role="status">
          {toast.text}
        </div>
      )}
    </main>
  );
};

export default AIAssistant;