import React, { useState } from "react";

export default function CreateNewItem(props) {
  const phoneNums = props.phoneNums;

  const [phoneNum, setPhoneNum] = useState(phoneNums[0].num);
  const [itemName, setItemName] = useState("");
  const [expDate, setExpDate] = useState("");

  function handleAddButton(e) {
    const phoneNum1 = phoneNum;
    const index = phoneNums.map((e) => e.num).indexOf(phoneNum1);
    const phoneLink = phoneNums[index].link;
    const itemName1 = itemName;
    const expDate1 = expDate;
    props.handleAddItem([phoneNum1, phoneLink, itemName1, expDate1]);
    e.preventDefault();
  }

  function handlePhoneNumChange(e) {
    setPhoneNum(e.target.value);
  }

  function handleItemNameChange(e) {
    setItemName(e.target.value);
  }

  function handleExpDateChange(e) {
    setExpDate(e.target.value);
  }

  return (
    <form onSubmit={handleAddButton}>
      <select
        id="phone_nums"
        name="Phone Number"
        value={phoneNum}
        onChange={handlePhoneNumChange}
      >
        {phoneNums.map((phoneNum, index) => {
          return (
            <option value={phoneNum.num} key={index}>
              {phoneNum.num}
            </option>
          );
        })}
      </select>
      <input
        type="text"
        placeholder="Enter a new item"
        value={itemName}
        onChange={handleItemNameChange}
      />
      <input
        type="text"
        placeholder="Enter Expiration Date"
        value={expDate}
        onChange={handleExpDateChange}
      />
      <button type="submit">Add</button>
    </form>
  );
}
