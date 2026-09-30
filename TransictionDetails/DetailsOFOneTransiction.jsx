import { useParams, Link } from "react-router-dom";
import "./DetailsOFOneTransiction.css";

export default function DetailsOFOneTransiction() {
    const { id } = useParams();

    const data = JSON.parse(localStorage.getItem("transiction")) || [];

    const found = data.find((e) => e.id === Number(id));

    if (found) {
        return (
            <main className="transaction-details-page">
                <div className="transaction-details-container">

                    <div className="transaction-details-topbar">
                        <Link to="/transactions" className="transaction-back-link">
                            <span>←</span>
                            Back to Transactions
                        </Link>

                        <div className="transaction-id">
                            Transaction #{found.id}
                        </div>
                    </div>

                    <section className="transaction-hero">

                        <div className="transaction-hero-main">

                            <div
                                className={`transaction-main-icon transaction-main-icon--${found.tone}`}
                            >
                                {found.icon === "shopping" && "🛍"}
                                {found.icon === "briefcase" && "💼"}
                                {found.icon === "car" && "🚗"}
                                {found.icon === "bolt" && "⚡"}
                                {found.icon === "home" && "⌂"}
                                {found.icon === "coffee" && "☕"}
                                {![
                                    "shopping",
                                    "briefcase",
                                    "car",
                                    "bolt",
                                    "home",
                                    "coffee"
                                ].includes(found.icon) && "◉"}
                            </div>

                            <div className="transaction-hero-info">
                                <span className="transaction-eyebrow">
                                    Transaction Details
                                </span>

                                <h1>{found.name}</h1>

                                <p>
                                    {found.description || "No description available"}
                                </p>

                                <div className="transaction-hero-meta">
                                    <span className={`transaction-status transaction-status--${found.tone}`}>
                                        <i></i>
                                        {found.type}
                                    </span>

                                    <span className="transaction-category">
                                        {found.category}
                                    </span>
                                </div>
                            </div>

                        </div>

                        <div className={`transaction-hero-amount transaction-hero-amount--${found.tone}`}>
                            <span>
                                {found.type === "Income" ? "Amount received" : "Amount spent"}
                            </span>

                            <strong>
                                {found.type === "Income" ? "+" : "-"}$
                                {Number(found.amount).toLocaleString("en-US", {
                                    minimumFractionDigits: 2,
                                    maximumFractionDigits: 2
                                })}
                            </strong>
                        </div>

                    </section>

                    <div className="transaction-details-grid">

                        <section className="transaction-info-card">

                            <div className="transaction-card-header">
                                <div>
                                    <span className="transaction-card-label">
                                        TRANSACTION INFORMATION
                                    </span>

                                    <h2>Payment details</h2>
                                </div>

                                <div className="transaction-card-icon">
                                    ◈
                                </div>
                            </div>

                            <div className="transaction-info-list">

                                <div className="transaction-info-row">
                                    <div className="transaction-info-label">
                                        <span className="transaction-info-symbol">◷</span>
                                        Date
                                    </div>

                                    <strong>{found.date}</strong>
                                </div>

                                <div className="transaction-info-row">
                                    <div className="transaction-info-label">
                                        <span className="transaction-info-symbol">⌁</span>
                                        Category
                                    </div>

                                    <strong>{found.category}</strong>
                                </div>

                                <div className="transaction-info-row">
                                    <div className="transaction-info-label">
                                        <span className="transaction-info-symbol">▣</span>
                                        Payment Method
                                    </div>

                                    <strong>{found.method}</strong>
                                </div>

                                <div className="transaction-info-row">
                                    <div className="transaction-info-label">
                                        <span className="transaction-info-symbol">↕</span>
                                        Transaction Type
                                    </div>

                                    <strong>{found.type}</strong>
                                </div>

                                <div className="transaction-info-row">
                                    <div className="transaction-info-label">
                                        <span className="transaction-info-symbol">#</span>
                                        Transaction ID
                                    </div>

                                    <strong>#{found.id}</strong>
                                </div>

                            </div>

                        </section>

                        <aside className="transaction-summary-card">

                            <div className="transaction-summary-glow"></div>

                            <span className="transaction-card-label">
                                TRANSACTION SUMMARY
                            </span>

                            <h2>Financial impact</h2>

                            <div className="transaction-summary-amount">
                                <span>
                                    {found.type === "Income" ? "Income" : "Expense"}
                                </span>

                                <strong>
                                    {found.type === "Income" ? "+" : "-"}$
                                    {Number(found.amount).toLocaleString("en-US", {
                                        minimumFractionDigits: 2,
                                        maximumFractionDigits: 2
                                    })}
                                </strong>
                            </div>

                            <div className="transaction-summary-divider"></div>

                            <div className="transaction-summary-row">
                                <span>Status</span>

                                <span className="summary-status">
                                    Completed
                                </span>
                            </div>

                            <div className="transaction-summary-row">
                                <span>Category</span>

                                <strong>{found.category}</strong>
                            </div>

                            <div className="transaction-summary-row">
                                <span>Method</span>

                                <strong>{found.method}</strong>
                            </div>

                        </aside>

                    </div>

                    <section className="transaction-description-card">

                        <div className="transaction-description-heading">
                            <div className="transaction-description-icon">
                                ≡
                            </div>

                            <div>
                                <span className="transaction-card-label">
                                    DESCRIPTION
                                </span>

                                <h2>About this transaction</h2>
                            </div>
                        </div>

                        <p>
                            {found.description || "No description was added to this transaction."}
                        </p>

                    </section>

                    <div className="transaction-footer-actions">
                        <Link to="/transactions" className="transaction-secondary-action">
                            ← Back to Transactions
                        </Link>
                    </div>

                </div>
            </main>
        );
    }

    return (
        <main className="transaction-not-found">
            <div className="transaction-not-found-card">
                <div className="transaction-not-found-icon">?</div>

                <span className="transaction-card-label">
                    TRANSACTION NOT FOUND
                </span>

                <h1>This transaction doesn't exist</h1>

                <p>
                    The transaction you're looking for could not be found.
                    It may have been deleted or the ID may be invalid.
                </p>

                <Link to="/transactions" className="transaction-not-found-button">
                    ← Back to Transactions
                </Link>
            </div>
        </main>
    );
}