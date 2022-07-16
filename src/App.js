import React, { useState, useEffect } from "react";
import List from "./List";
import Alert from "./Alert";
const getLocalStorage = () => {
  let list = localStorage.getItem("list");
  if (list) {
    return JSON.parse(localStorage.getItem("list"));
  } else {
    return [];
  }
};

function App() {
  const [name, setName] = useState("");
  const [list, setList] = useState(getLocalStorage());
  const [isEditing, setIsEditing] = useState(false);
  const [alert, setAlert] = useState({ show: false, msg: "", type: "" });
  const [editId, setEditId] = useState(null);
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name) {
      // display alert
      setAlert({ show: true, msg: "please add something", type: "danger" });
    } else if (name && isEditing) {
      // display edit
      setList(
        list.map((item) => {
          if (item.id === editId) {
            return { ...item, title: name };
          }
          return item;
        })
      );
      setIsEditing(false);
      setEditId(null);
      setName("");
      setAlert({ show: true, msg: "value changed!", type: "success" });
    } else {
      setAlert({ show: true, msg: "item added to the list!", type: "success" });
      const newItem = { id: new Date().getTime().toString(), title: name };
      setList([...list, newItem]);
      setName("");
    }
  };

  useEffect(() => {
    localStorage.setItem("list", JSON.stringify(list));
  }, [list]);

  const clearAlert = () => {
    setAlert({ show: false, msg: "", type: "" });
  };

  const clearList = () => {
    setAlert({ show: true, msg: "empty list", type: "danger" });
    setList([]);
  };

  const removeItem = (id) => {
    setList(list.filter((item) => item.id !== id));
    setAlert({ show: true, msg: "item removed", type: "danger" });
  };

  const editName = (id) => {
    const specificElement = list.find((item) => item.id === id);
    setName(specificElement.title);
    setIsEditing(true);
    setEditId(id);
  };

  return (
    <section className="section-center">
      <form className="grocery-form" onSubmit={handleSubmit}>
        {alert.show && <Alert {...alert} clearAlert={clearAlert} />}

        <h3>grocery bud</h3>
        <div className="form-control">
          <input
            type="text"
            className="grocery"
            value={name}
            onChange={(e) => {
              setName(e.target.value);
            }}
          />
          <button type="submit" className="submit-btn">
            {isEditing ? "edit" : "submit"}
          </button>
        </div>
      </form>
      {list.length > 0 && (
        <div className="grocery-container">
          <List items={list} removeItem={removeItem} editName={editName} />
          <button className="clear-btn" onClick={clearList}>
            clear items
          </button>
        </div>
      )}
    </section>
  );
}

export default App;
