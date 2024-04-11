import React, { useEffect, useState } from "react";
import { Form, Button, Modal } from "react-bootstrap";
import { ADDCOURSE, ADDRESOURCES } from "../utils/constants";

const ResourceAddForm = ({
  showModal,
  setShowResourceModal,
  getAllCourses,
  showResourceModal,
}) => {
  const [formData, setFormData] = useState({
    resourceName: "",
    resourceDescription: "",
    resourceDuration: "",
    resourceType: "",
  });
  const token = localStorage.getItem("token");
  const [covertedImage, setConvertedImage] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("submitting");
    const dataToSend = {
      resourceName: formData.resourceName,
      resourceDescription: formData.resourceDescription,
      resourceDuration: Number(formData.resourceDuration),
      resourceType: formData.resourceType,
    };
    console.log("dataTOSend", dataToSend);
    try {
      const response = await fetch(ADDRESOURCES, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(dataToSend),
      });
      const responseData = await response.json();
      setFormData({
        resourceName: "",
        resourceDescription: "",
        resourceDuration: "",
        resourceType: "",
      });
      console.log("Response:", responseData);
      getAllCourses();
      setShowResourceModal(false);
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const handleClose = () => {
    setShowResourceModal(false);
    setFormData({
      resourceName: "",
      resourceDescription: "",
      resourceDuration: "",
      resourceType: "",
    });
  };
  const handleShow = () => setShowModal(true);

  const convertToBase64 = (e) => {
    console.log(e);
    let reader = new FileReader();
    reader.readAsDataURL(e.target.files[0]);
    reader.onload = () => {
      console.log(reader.result);
      setConvertedImage(reader.result);
    };
    reader.onerror = (error) => {
      consol.log("Error", error);
    };
  };
  return (
    <>
      <Modal show={showResourceModal} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Add Resources</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleSubmit}>
            <Form.Group controlId="formId">
              <Form.Label>Resource Name</Form.Label>
              <Form.Control
                type="text"
                name="resourceName"
                required
                value={formData.resourceName}
                onChange={handleChange}
              />
            </Form.Group>
            <Form.Group controlId="formResourceDescription">
              <Form.Label>Resource Description</Form.Label>

              <Form.Control
                type="text"
                name="resourceDescription"
                required
                value={formData.resourceDescription}
                onChange={handleChange}
              />
            </Form.Group>
            <Form.Group controlId="resourceDuration">
              <Form.Label>resourceDuration</Form.Label>
              <Form.Control
                type="text"
                name="resourceDuration"
                required
                value={formData.resourceDuration}
                onChange={handleChange}
              />
            </Form.Group>
            <Form.Group controlId="resourceType">
              <Form.Label>resourceType</Form.Label>
              <Form.Control
                type="text"
                required
                name="resourceType"
                value={formData.resourceType}
                onChange={handleChange}
              />
            </Form.Group>
            <Button style={{ marginTop: "8px" }} variant="dark" type="submit">
              Submit
            </Button>
          </Form>
        </Modal.Body>
        <Modal.Footer></Modal.Footer>
      </Modal>
    </>
  );
};

export default ResourceAddForm;
