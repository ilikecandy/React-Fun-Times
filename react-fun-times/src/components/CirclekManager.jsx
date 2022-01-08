import ItemTable from "./tables/ItemTable";
import React, { useState, useEffect } from "react";
import CreateNewItem from "./CreateNewItem";
import {
  onSnapshot,
  collection,
  addDoc,
  doc,
  deleteDoc,
} from "firebase/firestore";
import { db } from "../firebase-config";

function createData(id, phoneNum, phoneLink, itemName, expDate) {
  return {
    id,
    phoneNum,
    phoneLink,
    itemName,
    expDate,
  };
}

function CirclekManager() {
  const [items, setItems] = useState([]);
  const [phoneNums, setPhoneNums] = useState([]);

  const handleAddItem = async (item) => {
    await insertNewItem(item);
    await fetchItems();
  };

  const deleteItemById = async (id) => {
    const docRef = doc(db, "items", id);
    await deleteDoc(docRef);
  };

  const insertNewItem = async (props) => {
    const collectionRef = collection(db, "items");
    await addDoc(collectionRef, props);
  };

  const fetchItems = async () => {
    onSnapshot(collection(db, "items"), (snapshot) =>
      setItems(snapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id })))
    );
  };

  useEffect(() => fetchItems(), []);

  useEffect(
    () =>
      onSnapshot(collection(db, "phoneNums"), (snapshot) =>
        setPhoneNums(
          snapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id }))
        )
      ),
    []
  );

  return (
    <div>
      <CreateNewItem phoneNums={phoneNums} handleAddItem={handleAddItem} />
      <ItemTable rows={items} setRows={setItems} deleteItem={deleteItemById} />
    </div>
  );
}

export default CirclekManager;
