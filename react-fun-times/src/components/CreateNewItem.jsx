import React, { useState } from "react";
import DatePicker from "@mui/lab/DatePicker";
import TextField from "@mui/material/TextField";
import MenuItem from "@mui/material/MenuItem";
import Button from "@mui/material/Button";
import AdapterDateFns from "@mui/lab/AdapterDateFns";
import LocalizationProvider from "@mui/lab/LocalizationProvider";
import { format, add } from "date-fns";
import { zonedTimeToUtc } from "date-fns-tz";

export default function CreateNewItem(props) {
  const phoneNums = props.phoneNums;

  const [phoneNum, setPhoneNum] = useState(phoneNums[0].num);
  const [itemName, setItemName] = useState("");
  const [expDate, setExpDate] = useState(
    format(add(new Date(), { days: 10 }), "yyyy-MM-dd")
  );

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

  console.log(expDate);

  function handleItemNameChange(e) {
    setItemName(e.target.value);
  }

  function handleExpDateChange(e) {
    try {
      setExpDate(format(e, "yyyy-MM-dd"));
    } catch (e) {}
  }

  return (
    <form onSubmit={handleAddButton}>
      <TextField
        select
        label="Phone Number"
        value={phoneNum}
        onChange={handlePhoneNumChange}
      >
        {phoneNums.map((phoneNum, index) => (
          <MenuItem key={index} value={phoneNum.num}>
            {phoneNum.num}
          </MenuItem>
        ))}
      </TextField>
      <TextField label="Item Name" onChange={handleItemNameChange} />
      <LocalizationProvider dateAdapter={AdapterDateFns}>
        <DatePicker
          label="Expiration Date"
          value={zonedTimeToUtc(expDate, "America/Toronto")}
          onChange={handleExpDateChange}
          renderInput={(params) => <TextField {...params} />}
        />
      </LocalizationProvider>
      <Button type="submit" variant="contained">
        Add
      </Button>
    </form>
  );
}
