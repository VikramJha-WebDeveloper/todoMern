import React, { useEffect, useState } from "react";
import ListComponent from "../components/ListComponent";
import { toast } from "react-toastify";
import styled from "styled-components";

const HomeSection = styled.div``;

const Home = () => {
  const [deletedAllItems, setDeletedAllItems] = useState(false);
  const [category, setCategory] = useState("");
  const [item, setItem] = useState("");
  const [quantity, setQuantity] = useState(0);
  const [fruitsItem, setFruitsItem] = useState([]);
  const [vegetablesItem, setVegetablesItem] = useState([]);
  const [snacksItem, setSnacksItem] = useState([]);
  const [newItem, setNewItem] = useState();

  useEffect(() => {
    const collectFruits = async () => {
      try {
        const response = await fetch("http://localhost:8000/showItems", {credentials: "include"});
        const result = await response.json();
        setFruitsItem(
          result.filter((item) => {
            return item.category === "Fruits";
          })
        );
        setSnacksItem(
          result.filter((item) => {
            return item.category === "Snacks";
          })
        );
        setVegetablesItem(
          result.filter((item) => {
            return item.category === "Vegetables";
          })
        );
      } catch (err) {
        console.log(err);
      }
    };
    collectFruits();
  }, [newItem, deletedAllItems]);

  const collectData = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("http://localhost:8000/addItems", {
        method: "POST",
        body: JSON.stringify({ item, category, quantity, completedTask: false }),
        headers: { "Content-Type": "application/json" },
        credentials: "include",
      });
      const result = await response.json();

      if (result.errorMessage) {
        toast.error(result.errorMessage);
      } else if (result.category === "Fruits") {
        console.log("rrr", result);
        setFruitsItem((prevItem) => [...prevItem, result]);
      } else if (result.category === "Vegetables") {
        setVegetablesItem((prevItem) => [...prevItem, result]);
      } else if (result.category === "Snacks") {
        setSnacksItem((prevItem) => [...prevItem, result]);
      } else {
        alert("Please select Category");
      }
      setItem("");
      setQuantity("");
    } catch (err) {
      console.log(err);
    }
  };

  // for deleting item
  const deleteItem = async (itemToDelete) => {
    try {
      const response = await fetch("http://localhost:8000/deleteItems", {
        method: "delete",
        body: JSON.stringify(itemToDelete),
        headers: { "Content-Type": "application/json" },
      });
      const result = await response.json();
      console.log(result._doc.category);
      if(result.message){
        toast.success(result.message);
      }else if(result.errorMessage){
        toast.error(result.errorMessage);
      }

      if (result._doc.category === "Fruits") {
        
        setFruitsItem((prevItem) =>
          prevItem.filter((item) => {
            return item._id !== result._doc._id;
          })
        );
      } else if (result._doc.category === "Vegetables") {
        setVegetablesItem((prevItem) =>
          prevItem.filter((item) => {
            return item._id !== result._doc._id;
          })
        );
      } else if (result._doc.category === "Snacks") {
        setSnacksItem((prevItem) =>
          prevItem.filter((item) => {
            return item._id !== result._doc._id;
          })
        );
      }else{
        console.log("problem")
      }
    } catch (err) {
      console.log(err);
    }
  };
  // for Edit item
  const editItem = async (e, modalItem, newItem, newQuantity) => {
    e.preventDefault();
    console.log(modalItem, newItem, newQuantity);
    try {
      const response = await fetch("http://localhost:8000/editItems", {
        method: "put",
        body: JSON.stringify({ ...modalItem, newItem, newQuantity }),
        headers: { "Content-Type": "application/json" },
      });
      const result = await response.json();
      if (result.errorMessage) {
        toast.error(result.errorMessage);
      } else {
        setNewItem(result);
        console.log("", result);
        toast.success(result.message);
      }
    } catch (err) {
      console.log(err);
    }
  };

  // for completion of task
  const taskCompletion = async(e, item)=>{
    console.log("current target", e.currentTarget);
    const response = await fetch("http://localhost:8000/taskCompletion", {
      method: "put",
      body: JSON.stringify(item),
      headers: {"Content-Type":"application/json"}
    })
    const result = await response.json();
    if(result){
      console.log("current target", e.currentTarget);
      e.target.innerText="✓"
      e.target.classList.add("text-success")
      console.log(result);

    };
  }
  

  const deleteAllItems = async (category) => {
   const response = await fetch("http://localhost:8000/deleteAllItems", {
    method: "delete",
    body: JSON.stringify({category}),
    headers: {"Content-Type":"application/json"},
   });
   const result = await response.json();
   if(result.message){
    toast.success(result.message);
    setDeletedAllItems(true);
   }else if(result.errorMessage){
    toast.error(result.errorMessage);
   }
  }


  return (
    <HomeSection>
      <div className="container-fluid">
        <div className="row">
          <div className="col">
            <form className="input-group my-3" onSubmit={(e) => collectData(e)}>
              <select
                style={{ cursor: "pointer" }}
                className=" me-2 form-select"
                name="category"
                onChange={(e) => setCategory(e.target.value)}
              >
                <option defaultValue="Select Category">Select Category</option>
                <option value="Fruits">Fruits</option>
                <option value="Vegetables">Vegetables</option>
                <option value="Snacks">Snacks</option>
              </select>
              <input
                onChange={(e) => setItem(e.target.value)}
                className="form-control"
                type="text"
                name="item"
                placeholder="Add item here"
                value={item}
              ></input>

              <input
                onChange={(e) => setQuantity(e.target.value)}
                type="string"
                className="form-control"
                name="quantity"
                placeholder="Type quantity"
                value={quantity === 0 ? "" : quantity}
              />

              <button
                type="submit"
                style={{ zIndex: "0" }}
                className="btn btn-primary"
              >
                Submit
              </button>
            </form>

            {/* <div className="myModal position-absolute top-0 start-50 z-3">
              hello
            </div> */}

            <div className="accordion" id="accordionExample">
              <div className="row gy-3">
              <div className="col-12">
                  <ListComponent
                    category="Fruits"
                    item={fruitsItem}
                    collapseId="collapseOne"
                    deleteItem={deleteItem}
                    editItem={editItem}
                    taskCompletion={taskCompletion}
                    deleteAllItems={deleteAllItems}
                  />
                </div>
                <div className="col-12">
                  <ListComponent
                    category="Vegetables"
                    item={vegetablesItem}
                    collapseId="collapseTwo"
                    deleteItem={deleteItem}
                    editItem={editItem}
                    taskCompletion={taskCompletion}
                    deleteAllItems={deleteAllItems}
                  />
                </div>
                <div className="col-12">
                  <ListComponent
                    category="Snacks"
                    item={snacksItem}
                    collapseId="collapseThree"
                    deleteItem={deleteItem}
                    editItem={editItem}
                    taskCompletion={taskCompletion}
                    deleteAllItems={deleteAllItems}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </HomeSection>
  );
};

export default Home;
