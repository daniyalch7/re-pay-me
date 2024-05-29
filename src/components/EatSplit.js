import { useState, useEffect } from "react";

function EatSplit({ friend, createFriends }) {
  const [billValue, setBillValue] = useState("");
  const [yourExpense, setYourExpense] = useState("");
  const [friendExpense, setFriendExpense] = useState("");
  const [payer, setPayer] = useState("user");

  useEffect(() => {
    // Calculate friend's expense when bill value or your expense changes
    if (billValue !== "" && yourExpense !== "") {
      const bill = parseFloat(billValue);
      const expense = parseFloat(yourExpense);
      setFriendExpense(bill - expense);
    }
  }, [billValue, yourExpense]);

  const handlePayerChange = (event) => {
    setPayer(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    // Call createFriends function with the selected payer and bill amount
    createFriends(friend.name, friend.image, payer, friendExpense, true);
  };

  return (
    <div>
      <form className="form-split-bill" onSubmit={handleSubmit}>
        <h2>Split a bill with {friend.name}</h2>
        <label>💰 Bill value</label>
        <input
          type="text"
          value={billValue}
          onChange={(e) => setBillValue(e.target.value)}
        />
        <label>🧍‍♀️ Your expense</label>
        <input
          type="text"
          value={yourExpense}
          onChange={(e) => setYourExpense(e.target.value)}
        />
        <label>👫 {friend.name}'s expense</label>
        <input type="text" value={friendExpense} disabled />
        <label>🤑 Who is paying the bill</label>
        <select onChange={handlePayerChange} value={payer}>
          <option value="user">You</option>
          <option value="friend">{friend.name}</option>
        </select>
        <button className="button" disabled={!billValue || !yourExpense}>
          Split bill
        </button>
      </form>
    </div>
  );
}

export default EatSplit;
