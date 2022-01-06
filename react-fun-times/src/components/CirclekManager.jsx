import ItemTable from "./tables/ItemTable";
import React, { useState } from "react";
import CreateNewItem from "./CreateNewItem";

function createData(id, phoneNum, phoneLink, itemName, expDate) {
  return {
    id,
    phoneNum,
    phoneLink,
    itemName,
    expDate,
  };
}

const rows = [
  createData(
    "1",
    "(123) 456-7890",
    "https://www.google.com",
    "Item 1",
    "2020-01-01"
  ),
  createData(
    "2",
    "(223) 456-7890",
    "https://www.google.com",
    "Item 2",
    "2020-01-02"
  ),
  createData(
    "3",
    "(323) 456-7890",
    "https://www.google.com",
    "Item 3",
    "2020-01-03"
  ),
];

const nums = [
  { num: "(123) 456-7890", link: "google" },
  { num: "(153) 456-7890", link: "google" },
  { num: "(923) 456-7890", link: "google" },
];

function CirclekManager() {
  const [items, setItems] = useState(rows);
  const [phoneNums, setPhoneNums] = useState(nums);
  const [nextId, setNextId] = useState(4);

  function handleAddItem(item) {
    const newId = nextId;
    const newItem = createData(newId, ...item);
    setItems([...items, newItem]);
    setNextId(nextId + 1);
  }

  return (
    <div>
      <CreateNewItem phoneNums={phoneNums} handleAddItem={handleAddItem} />
      <ItemTable rows={items} setRows={setItems} />
    </div>
  );
}

export default CirclekManager;
