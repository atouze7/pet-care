import React, { useEffect, useState } from "react";
import { getUserById } from "../user/UserService";
import { Modal, Form, InputGroup, Button } from "react-bootstrap";
import AlertMessage from "../common/AlertMessage";
import { updateUserPhoto, uploadUserPhoto } from "./ImageUploaderService";
import UseMessageAlerts from "../hooks/UseMessageAlerts";

const ImageUploaderModal = ({ userId, show, handleClose }) => {
  const [file, setFile] = useState(null);
  const [user, setUSer] = useState(null);
  const {
    successMessage,
    setSuccessMessage,
    errorMessage,
    setErrorMessage,
    showSuccessAlert,
    setShowSuccessAlert,
    showErrorAlert,
    setShowErrorAlert,
  } = UseMessageAlerts();

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const getUser = async () => {
    try {
      const result = getUserById(userId);
      setSuccessMessage(result.data);
    } catch (error) {
      setErrorMessage(error.response.data.message);
      setShowErrorAlert(true);
      console.log(error.message);
    }
  };

  useEffect(() => {
    getUser();
  }, [userId]);

  const handleImageUpload = async (e) => {
    e.preventDefault();
    try {
      const formData = new FormData();
      formData.append("file", file);

      if (user && user.photo) {
        const reader = new FileReader();
        reader.readAsArrayBuffer(file);
        reader.onload = async (e) => {
          const fileBytes = new Uint8Array(e.target.result);
          const response = await updateUserPhoto(user.photoId, fileBytes);
          setSuccessMessage(response.data);
          window.location.reload();
          setShowSuccessAlert(true);
        };
      } else {
        const response = await uploadUserPhoto(userId, file);
        setSuccessMessage(response.data);
        window.location.reload();
        setShowErrorAlert(true);
      }
    } catch (error) {
      setErrorMessage(error.message);
      setShowErrorAlert(true);
      console.log(error.message);
    }
  };

  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>Upload a Photo</Modal.Header>
      <Modal.Body>
        {showErrorAlert && (
          <AlertMessage type={"danger"} message={errorMessage} />
        )}
        {showSuccessAlert && (
          <AlertMessage type={"success"} message={successMessage} />
        )}
        <Form>
          <h6>Select the photo you would like to display on your profile</h6>
          <InputGroup>
            <Form.Control type="file" onChange={handleFileChange} />
            <Button variant="secondary" onClick={handleImageUpload}>
              Upload
            </Button>
          </InputGroup>
        </Form>
      </Modal.Body>
    </Modal>
  );
};

export default ImageUploaderModal;
