import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { Button } from "react-bootstrap";
import DeleteModal from "./DeleteModal";
import { DELETECOURSE } from "../utils/constants";
// import { FRONTEND_API } from "../utils/constants";

const UserCourseTable = ({
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
  console.log("allCourses from user tables", allCourses);

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
            <th>Enroll</th>
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
                  onClick={() => {
                    alert(`enrolled successfully${course.courseName}`);
                  }}
                >
                  Enroll
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default UserCourseTable;
