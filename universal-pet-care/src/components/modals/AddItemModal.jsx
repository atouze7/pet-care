import React, { useState } from "react";
import { Modal, Form, Button } from "react-bootstrap";

export default function AddItemModal({
  show,
  handleClose,
  handleSave,
  itemLabel,
}) {
  const [itemValue, setItemValue] = useState("");

  const handleSaveItem = () => {
    handleSave(itemValue);
    setItemValue("");
    handleClose();
  };

  const handleInputChange = (e) => {
    setItemValue(e.target.value);
  };

  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Add New {itemLabel}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Group className="mb-3">
            <Form.Label>{itemLabel} Name</Form.Label>
            <Form.Control
              type="text"
              placeholder={`Enter ${itemLabel.toLowerCase()} name`}
              value={itemValue}
              onChange={handleInputChange}
            />
          </Form.Group>
        </Form>
        <Modal.Footer>
          <Button>
            <Button variant="secondary" onClick={handleSaveItem}>
              Add
            </Button>
            <Button variant="danger" onClick={handleClose}>
              Close
            </Button>
          </Button>
        </Modal.Footer>
      </Modal.Body>
    </Modal>
  );
}
