import { useState } from "react";

function EatForm({ createFriends, open, handleOpen }) {
  const gravatarUrl = "https://i.pravatar.cc/48";
  const baseUrl = gravatarUrl.split("?")[0];
  const [name, setName] = useState("");
  const [imageUrl, setImageUrl] = useState(baseUrl);

  const handleName = (event) => {
    setName(event.target.value);
  };

  const handleImageUrl = (event) => {
    setImageUrl(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    createFriends(name, imageUrl);
    setName(""); // Reset name input
    handleOpen(false);
  };

  const handleOpenState = () => {
    handleOpen(!open);
  };

  return (
    <div>
      {open ? (
        <form className="form-add-friend" onSubmit={handleSubmit}>
          <div>
            <label>👫 Friend name</label>
            <input type="text" onChange={handleName} value={name} />
            <label>🌄 Image URL</label>
            <input type="text" value={imageUrl} onChange={handleImageUrl} />
          </div>
          <br />
          <button className="button">Add</button>
        </form>
      ) : null}
      <button className="button" onClick={handleOpenState}>
        {open ? "Close" : "Add Friend"}
      </button>
    </div>
  );
}

export default EatForm;
