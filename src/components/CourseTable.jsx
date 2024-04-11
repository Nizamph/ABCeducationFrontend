import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { Button } from "react-bootstrap";
import DeleteModal from "./DeleteModal";
import { DELETECOURSE } from "../utils/constants";
// import { FRONTEND_API } from "../utils/constants";

const courseTable = ({
  allCourses,
  setShowModal,
  setFormStatus,
  setShowResourceModal,
  getallCourses,
}) => {
  const token = localStorage.getItem("token");
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [idNeedsToDelete, setIdNeedsToDelete] = useState(false);
  const handleUpdate = (course) => {
    setDataNeedsToUpdate(course);
  };
  console.log("allCourses from tables", allCourses);
  const confirmDeleteHandler = async () => {
    const response = await fetch(DELETECOURSE, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ id: idNeedsToDelete }),
    });
    const data = await response.json();
    console.log("data", data);
    setShowDeleteModal(false);
    getallCourses();
  };
  const addResourceModalHandler = () => {
    setShowResourceModal(true);
  };
  return (
    <div className="container" style={{ marginTop: "10px", minWidth: "60rem" }}>
      <table className="table table-dark">
        <thead>
          <tr>
            <th>CourseId</th>
            <th>CourseName</th>
            <th>Price</th>
            <th>Course Instructor</th>
            <th>courseDuration</th>
            <th>Resources</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {allCourses?.map((course, index) => (
            <tr key={course.courseId} style={{ border: "1px solid grey" }}>
              <td>{course.courseId}</td>
              <td>
                <td>{course.courseName}</td>
              </td>
              <td>{course.coursePrice}</td>
              <td>{course.courseInstructor}</td>
              <td>{course.courseDuration}</td>
              <td>
                <Button onClick={addResourceModalHandler}>Add</Button>
              </td>
              <td>
                <Button
                  variant="danger"
                  onClick={() => {
                    setShowDeleteModal(true);
                    setIdNeedsToDelete(course._id);
                  }}
                >
                  Delete
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <DeleteModal
        confirmDeleteHandler={confirmDeleteHandler}
        onShow={showDeleteModal}
        onHideHandler={() => setShowDeleteModal(false)}
      />
    </div>
  );
};

export default courseTable;
