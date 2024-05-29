import { useState } from "react";
import initialFriends from "./data";
import EatForm from "./components/EatForm";
import EatList from "./components/EatList";
import EatSplit from "./components/EatSplit";

function App() {
  const [friends, setFriends] = useState(initialFriends);
  const [selectedFriendId, setSelectedFriendId] = useState(null);
  const [open, setOpen] = useState(false);

  const createFriends = (
    name,
    image,
    payer,
    balance,
    isSplittingBill = false // by deafult it will be false and payer only for checing the who will pay it will not be preset in the created object means new user
  ) => {
    if (isSplittingBill) {
      // Splitting the bill
      const updatedFriends = friends.map((friend) => {
        if (friend.id === selectedFriendId) {
          // * Selected waley object par assarrr pare
          // If the selected friend is paying the bill
          if (payer === "friend") {
            return {
              ...friend,
              balance: parseFloat(friend.balance) - parseFloat(balance),
            };
          } else {
            // If you are paying the bill
            return {
              ...friend,
              balance: parseFloat(friend.balance) + parseFloat(balance),
            };
          }
        }
        return friend;
      });
      setFriends(updatedFriends);
      setSelectedFriendId(null); // Reset selectedFriendId after splitting the bill
    } else {
      // Creating a new friend
      const newFriend = {
        id: Math.floor(Math.random() * 1000) + 1, // Generate a unique ID
        name: name,
        image: image,
        balance: parseFloat(balance) || 0,
      };
      setFriends([...friends, newFriend]);
    }
  };

  const handleSelectFriend = (friendId) => {
    setSelectedFriendId((prevId) => (prevId === friendId ? null : friendId));
  };

  const handleOpen = () => {
    setOpen(!open);
  };

  return (
    <div className="app">
      <div className="sidebar">
        <EatList
          friends={friends}
          handleSelectFriend={handleSelectFriend}
          selectedFriendId={selectedFriendId}
          setOpen={setOpen}
        />
        <EatForm
          createFriends={createFriends}
          open={open}
          handleOpen={handleOpen}
        />
      </div>
      {selectedFriendId !== null && (
        <EatSplit
          friend={friends.find((friend) => friend.id === selectedFriendId)} // uska open krdo jiski id match hoyi hai
          createFriends={createFriends}
        />
      )}
    </div>
  );
}

export default App;
