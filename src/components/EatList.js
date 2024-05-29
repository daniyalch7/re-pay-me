function EatList({
  friends,
  handleSelectFriend,
  selectedFriendId,
  open,
  setOpen,
}) {
  const handleSpilitBill = (friend) => {
    handleSelectFriend(friend.id);
    setOpen(false);
  };

  const renderedFriends = friends.map((friend) => {
    return (
      <li
        key={friend.id}
        className={friend.id === selectedFriendId ? "selected" : ""}
      >
        <img src={friend.image} alt={friend.name} />
        <h3>{friend.name}</h3>
        <p
          className={`${
            friend.balance > 0 ? "green" : friend.balance < 0 ? "red" : ""
          }`}
        >
          {friend.balance === 0
            ? `You and ${friend.name} are even`
            : friend.balance > 0
            ? `${friend.name} owes you ${friend.balance}€`
            : `You owe ${friend.name} ${-friend.balance}€`}
        </p>
        <button className="button" onClick={() => handleSpilitBill(friend)}>
          {friend.id === selectedFriendId ? "Close" : "Select"}
        </button>
      </li>
    );
  });

  return (
    <div>
      <ul>{renderedFriends}</ul>
    </div>
  );
}

export default EatList;
