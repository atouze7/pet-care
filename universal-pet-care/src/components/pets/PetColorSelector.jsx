import React, { useEffect, useState } from "react";
import { Form, Col } from "react-bootstrap";
import AddItemModal from "../modals/AddItemModal";
import { getAllPetColors } from "./PetService";

export default function PetColorSelector({ value, onChange }) {
  const [petColors, setPetColors] = useState([]);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    const fetchAllPetColors = async () => {
      try {
        const response = await getAllPetColors();
        setPetColors(response.data);
      } catch (error) {
        console.error(error.message);
      }
    };
    fetchAllPetColors();
  }, []);

  const handleColorChange = (e) => {
    if (e.target.value === "add-new-item") {
      setShowModal(true);
    } else {
      onChange(e);
    }
  };

  const handleSaveNewItem = (newItem) => {
    if (newItem && !petColors.includes(newItem)) {
      setPetColors([...petColors, newItem]);
      onChange({ target: { name: "petColor", value: newItem } });
    }
  };

  return (
    <React.Fragment>
      <Form.Group as={Col} controlId="petColor">
        <Form.Control
          as="select"
          name="petColor"
          value={value}
          required
          onChange={handleColorChange}
        >
          <option value="">Select Color</option>
          <option value="add-new-item">Add a new item</option>
          {petColors.map((color) => (
            <option key={color} value={color}>
              {color}
            </option>
          ))}
        </Form.Control>
        <AddItemModal
          show={showModal}
          handleClose={() => setShowModal(false)}
          handleSave={handleSaveNewItem}
          itemLabel={"Color"}
        />
      </Form.Group>
    </React.Fragment>
  );
}
