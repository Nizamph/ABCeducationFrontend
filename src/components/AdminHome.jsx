import React, { useEffect, useState } from "react";
import CourseTable from "./CourseTable";
import { GETALLCOURSES } from "../utils/constants";
import CourseAddform from "./CourseAddForm";
import { Form, Button, Modal } from "react-bootstrap";
import ResourceAddForm from "./ResourceAddForm";
const AdminHome = () => {
  const token = localStorage.getItem("token");
  const [allCourses, setAllCourses] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [showResourceModal, setShowResourceModal] = useState(false);
  useEffect(() => {
    getAllcourses();
  }, []);

  const getAllcourses = async () => {
    const res = await fetch(GETALLCOURSES, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });

    const data = await res.json();
    console.log("data from the backend", data);
    setAllCourses(data.allCourses);
  };
  return (
    <div>
      <Button
        variant="dark"
        style={{ marginTop: "10px", marginLeft: "120px" }}
        onClick={() => {
          setShowModal(true);
          setFormStatus("Add");
        }}
      >
        Add New Products
      </Button>
      <CourseAddform
        showModal={showModal}
        getAllCourses={getAllcourses}
        setShowModal={setShowModal}
      />
      <CourseTable
        setShowResourceModal={setShowResourceModal}
        allCourses={allCourses}
        getallCourses={getAllcourses}
      />
      <ResourceAddForm
        showResourceModal={showResourceModal}
        setShowResourceModal={setShowResourceModal}
        getAllCourses={getAllcourses}
      />
    </div>
  );
};

export default AdminHome;
