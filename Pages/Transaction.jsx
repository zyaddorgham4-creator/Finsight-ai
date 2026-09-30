import "./Transaction.css";

import TransactionSummary from "../TransictionDetails/TransactionSummary";
import TransactionToolbar from "../TransictionDetails/TransactionToolbar";
import TransactionTable from "../TransictionDetails/TransactionTable";
import { useState } from "react";
import TransactionsHeader from '../TransictionDetails/TransactionsHeader';


const Transactions = () => {

  const[search,setsearch] = useState("");
  const[Category,setCategory] = useState("all");
  const[type,settype] = useState("all")

  function Cleard()
  {
    setsearch("");
    setCategory("all");
    settype("all");
  }

  return (
    <main className="fs-transactions-page">
      <div className="fs-transactions-container">
        <TransactionsHeader />
        <TransactionSummary />
        <TransactionToolbar search={search} setsearch={setsearch} Category={Category} setCategory={setCategory} type={type} settype={settype} Cleard={Cleard}/>
        <TransactionTable search={search} Category={Category} type={type}/>
      </div>
    </main>
  );
  
};

export default Transactions;