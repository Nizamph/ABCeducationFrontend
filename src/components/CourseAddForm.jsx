import React, { useEffect, useState } from "react";
import { Form, Button, Modal } from "react-bootstrap";
import { ADDCOURSE } from "../utils/constants";

const courseAddForm = ({ showModal, setShowModal, getAllCourses }) => {
  const [formData, setFormData] = useState({
    name: "",
    image: null,
    price: "",
    deliveredIn: "",
    inStock: "",
    offer: "",
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
      courseId: Number(formData.courseId),
      courseName: formData.courseName,
      courseInstructor: formData.courseInstructor,
      courseDuration: Number(formData.courseDuration),
      coursePrice: Number(formData.coursePrice),
    };
    console.log("dataTOSend", dataToSend);
    try {
      const response = await fetch(ADDCOURSE, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(dataToSend),
      });
      const responseData = await response.json();
      setFormData({
        courseId: "",
        courseName: null,
        courseDuration: "",
        courseInstructor: "",
        coursePrice: "",
      });
      console.log("Response:", responseData);
      getAllCourses();
      setShowModal(false);
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const handleClose = () => {
    setShowModal(false);
    setFormData({
      courseId: "",
      courseName: null,
      courseDuration: "",
      courseInstructor: "",
      coursePrice: "",
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
      <Modal show={showModal} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Add Course</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleSubmit}>
            <Form.Group controlId="formId">
              <Form.Label>Course Id</Form.Label>
              <Form.Control
                type="text"
                name="courseId"
                required
                value={formData.courseId}
                onChange={handleChange}
              />
            </Form.Group>
            <Form.Group controlId="formImage">
              <Form.Label>Course Name</Form.Label>

              <Form.Control
                type="text"
                name="courseName"
                required
                value={formData.courseName}
                onChange={handleChange}
              />
            </Form.Group>
            <Form.Group controlId="formPrice">
              <Form.Label>Course Price</Form.Label>
              <Form.Control
                type="text"
                name="coursePrice"
                required
                value={formData.coursePrice}
                onChange={handleChange}
              />
            </Form.Group>
            <Form.Group controlId="formDeliveredIn">
              <Form.Label>course Instructor</Form.Label>
              <Form.Control
                type="text"
                required
                name="courseInstructor"
                value={formData.courseInstructor}
                onChange={handleChange}
              />
            </Form.Group>
            <Form.Group controlId="formInStock">
              <Form.Label>course Duration</Form.Label>
              <Form.Control
                type="text"
                required
                name="courseDuration"
                value={formData.courseDuration}
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

export default courseAddForm;
