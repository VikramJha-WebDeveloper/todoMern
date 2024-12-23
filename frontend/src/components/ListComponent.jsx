import React, { useEffect, useState } from "react";
import styled from "styled-components";

const ListSection = styled.div`
  .accordion-button{
    box-shadow: rgba(0, 0, 0, 0.15) 1.95px 1.95px 2.6px;
  }
  div.myModal {
    color: red;
    background: white;
    transition-duration: 0.5s;
    transform: translateX(50%);
    @media (max-width: 991px) {
      transform: translateX(0%);
    }

    .card {
      box-shadow: rgba(0, 0, 0, 0.56) 0px 22px 70px 4px;
      top: 50%;
      transition-duration: 0.5s;
    }

    .cardTranslate1 {
      transform: translateY(-50%) scale(0);
    }
    .cardTranslate2 {
      transform: translateY(-50%) scale(1);
    }
    .close {
      cursor: pointer;
      width: 25px;
      height: 25px;
    }
  }
`;

const ListComponent = ({
  category,
  item,
  collapseId,
  deleteItem,
  editItem,
  taskCompletion,
  deleteAllItems,
}) => {
  const [newItem, setNewItem] = useState("");
  const [newQuantity, setNewQuantity] = useState("");
  const [modalItem, setModalItem] = useState({});
  const [displayEditModal, setDisplayEditModal] = useState("opacity-0 z-n1");
  const [displayDeleteModal, setDisplayDeleteModal] =
    useState("opacity-0 z-n1");
  const [displayAllDeleteModal, setDisplayAllDeleteModal] =
    useState("opacity-0 z-n1");
  const [cardStyle, setCardStyle] = useState("cardTranslate1");

  const openEditModal = (item) => {
    setDisplayEditModal("opacity-100 z-3");
    setModalItem(item);
    setCardStyle("cardTranslate2");
  };
  const openDeleteModal = (item) => {
    setDisplayDeleteModal("opacity-100 z-3");
    setModalItem(item);
    setCardStyle("cardTranslate2");
  };
  const closeModal = () => {
    setDisplayEditModal("opacity-0 z-n1");
    setDisplayDeleteModal("opacity-0 z-n1");
    setDisplayAllDeleteModal("opacity-0 z-n1");
    setModalItem({});
    setCardStyle("cardTranslate1");
  };
  const openDeleteAllModal = () => {
    setDisplayAllDeleteModal("opacity-100 z-3");
    setModalItem(item);
    setCardStyle("cardTranslate2");
  };

  return (
    <ListSection className="row">
      {/* edit modal */}
      <div
        className={`col col-12 col-lg-6 myModal bg-transparent position-absolute h-100 top-0 ${displayEditModal} `}
      >
        <div
          id="modal"
          className={`w-100 card ${cardStyle}`}
          style={{ width: "18rem" }}
        >
          <div className="card-body">
            <div className="d-flex align-items-center justify-content-between">
              <h5 className="card-title">{modalItem.item}</h5>
              <button
                onClick={closeModal}
                type="button"
                className="btn-close"
                aria-label="Close"
              ></button>
            </div>
            <form
              onSubmit={(e) => {
                editItem(e, modalItem, newItem, newQuantity);
              }}
            >
              <div className="mb-3">
                <label htmlFor="itemName" className="form-label">
                  Item Name
                </label>
                <input
                  onChange={(e) => setNewItem(e.target.value)}
                  type="text"
                  className="form-control"
                  id="itemName"
                  name="item"
                  value={newItem}
                />
              </div>
              <div className="mb-3">
                <label htmlFor="quantity" className="form-label">
                  Quantity
                </label>
                <input
                  onChange={(e) => setNewQuantity(e.target.value)}
                  type="text"
                  className="form-control"
                  id="quantity"
                  value={newQuantity}
                />
              </div>
              <button type="submit" className="btn btn-primary">
                Submit
              </button>
            </form>
          </div>
        </div>
      </div>

      {/* delete modal */}
      <div
        className={`col col-12 col-lg-6 myModal bg-transparent position-absolute h-100 top-0 ${displayDeleteModal} `}
      >
        <div
          id="modal"
          className={`w-100 card ${cardStyle}`}
          style={{ width: "18rem" }}
        >
          <div className="card-body">
            <div className="d-flex align-items-center justify-content-between">
              <h5 className="card-title">{modalItem.item}</h5>
              <button
                onClick={closeModal}
                type="button"
                className="btn-close"
                aria-label="Close"
              ></button>
            </div>
            <p className="text-secondary">
              Are you sure you want to delete this item?
            </p>
            <div className="row">
              <div className="col">
                <button
                  className="col btn btn-secondary w-100"
                  onClick={closeModal}
                >
                  Cancel
                </button>
              </div>
              <div className="col">
                <button
                  className="col btn btn-danger w-100"
                  onClick={() => {
                    deleteItem(modalItem);
                    closeModal();
                  }}
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* delete all modal */}
      <div
        className={`col col-12 col-lg-6 myModal bg-transparent position-absolute h-100 top-0 ${displayAllDeleteModal} `}
      >
        <div
          id="modal"
          className={`w-100 card ${cardStyle}`}
          style={{ width: "18rem" }}
        >
          <div className="card-body">
            <div className="d-flex align-items-center justify-content-between">
              <h5 className="card-title">{category}</h5>
              <button
                onClick={closeModal}
                type="button"
                className="btn-close"
                aria-label="Close"
              ></button>
            </div>
            <p className="text-secondary">
              Are you sure you want to delete this all item from {category}?
            </p>
            <div className="row">
              <div className="col">
                <button
                  className="col btn btn-secondary w-100"
                  onClick={closeModal}
                >
                  Cancel
                </button>
              </div>
              <div className="col">
                <button
                  className="col btn btn-danger w-100"
                  onClick={() => {
                    deleteAllItems(category);
                    closeModal();
                  }}
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="z-0 accordion-item border-0 w-100">
        <h2 className="accordion-header">
          <button
            className="accordion-button collapsed bg-warning rounded d-flex justify-content-between"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target={`#${collapseId}`}
            aria-expanded="true"
            aria-controls="collapseOne"
          >
            {category}
          </button>
        </h2>
        <div
          id={collapseId}
          className="accordion-collapse collapse"
          data-bs-parent="#accordionExample"
        >
          <div className="accordion-body p-0">
            <div
              className="my-2 d-flex flex-column align-items-start justify-content-center flex-sm-row align-items-sm-center justify-content-sm-start"
              style={{ position: "relative", left: 0, bottom: 0 }}
            >
              <h5>Delete all items from {category}</h5>
              <button
                onClick={() => openDeleteAllModal(category)}
                className="ms-2 btn btn-danger"
                style={{ position: "absolut", right: 0, bottom: 0 }}
              >
                Delete All
              </button>
            </div>
            <div className="table-responsive">
              <table className="table text-center table-hover table-striped table-bordered table-sm">
                <thead>
                  <tr className="row">
                    <th className="col" scope="col">
                      #
                    </th>
                    <th className="col" scope="col">
                      Name
                    </th>
                    <th className="col" scope="col">
                      Quantity
                    </th>
                    <th className="col" scope="col">
                      Edit
                    </th>
                    <th className="col" scope="col">
                      Delete
                    </th>
                    <th className="col" scope="col">
                      Completed
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {item.map((item, index) => (
                    <tr key={item._id} className="row">
                      <th className="col " scope="row">
                        {index + 1}
                      </th>
                      <td className="col ">{item.item}</td>
                      <td className="col ">{item.quantity}</td>
                      <td className="col ">
                        <button
                          type="button"
                          className="btn btn-primary"
                          onClick={() => {
                            openEditModal(item);
                          }}
                        >
                          <i className="fa-solid fa-pen-to-square"></i>
                        </button>
                      </td>
                      <td className="col ">
                        <button
                          className="btn btn-danger mx-1"
                          // onClick={() => deleteItem(item)}
                          onClick={() => openDeleteModal(item)}
                        >
                          <i className="fa-solid fa-trash"></i>
                        </button>
                      </td>
                      <td className="col ">
                        <button
                          className={`btn fw-bolder ${
                            item.completedTask ? "text-success" : ""
                          } `}
                          onClick={(e) => taskCompletion(e, item)}
                        >
                          {item.completedTask ? "✓" : "⭕"}
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </ListSection>
  );
};

export default ListComponent;
