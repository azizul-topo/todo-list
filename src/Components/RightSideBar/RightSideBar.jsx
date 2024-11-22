import React, { useState, useEffect } from "react";
import Offcanvas from "react-bootstrap/Offcanvas";
import Form from "react-bootstrap/Form";
import Dropdown from "react-bootstrap/Dropdown";
import { useNavigate } from "react-router-dom"; // Import useNavigate for navigation
import DeleteTaskModal from "Components/DeleteTaskModal/DeleteTaskModal";

// Import styles
import {
  OffcanvasContainer,
  Header,
  Footer,
  DeleteBtn,
  FormSwitcher,
  ButtonContainer,
  ProgressContainer,
  ProgressBarContainer,
} from "./RightSideBar.styled";

const RightSideBar = ({
  handleToggleTheme,
  setTasks,
  checkedSwitch,
  numberOfCompletedTasks,
  allTasksLength,
}) => {
  const navigate = useNavigate(); // Initialize navigate hook
  const [deleteTask, setDeleteTask] = useState(false);
  const [completedTasks, setCompletedTasks] = useState(null);

  // Delete all tasks
  const handleDeleteAllTasks = () => {
    setDeleteTask(true);
  };

  // Calculate progress of completed tasks
  useEffect(() => {
    const calculateProgress = () => {
      if (allTasksLength === 0) {
        setCompletedTasks(0);
        return;
      }
      const decimaledNumber = (
        (numberOfCompletedTasks / allTasksLength) *
        100
      ).toFixed(2);
      const result = decimaledNumber.includes(".")
        ? parseFloat(decimaledNumber)
        : parseInt(decimaledNumber);
      setCompletedTasks(result);
    };
    calculateProgress();
  }, [completedTasks, allTasksLength, numberOfCompletedTasks]);

  // Handle logout
  const handleLogout = () => {
    sessionStorage.removeItem("authToken"); // Clear token from sessionStorage
    navigate("/auth"); // Redirect to login page
  };

  return (
    <OffcanvasContainer
      placement={"end"}
      show={true}
      backdrop={false}
      enforceFocus={false}
      scroll={true}
    >
      <Header>
        <Offcanvas.Title>Sidebar</Offcanvas.Title>
        <ButtonContainer onClick={handleToggleTheme}>
          <span>Darkmode</span>
          <FormSwitcher>
            <Form.Check
              type="switch"
              id="custom-switch"
              checked={JSON.parse(checkedSwitch)}
            />
          </FormSwitcher>
        </ButtonContainer>
        <ProgressContainer>
          <span>All tasks</span>
          <ProgressBarContainer
            now={completedTasks}
            label={`${completedTasks}%`}
          />
        </ProgressContainer>
      </Header>
      <hr />
      <Offcanvas.Body>
        <Dropdown.Item href="#/today-tasks">No tasks today</Dropdown.Item>
      </Offcanvas.Body>
      <Footer>
        <DeleteBtn onClick={handleDeleteAllTasks}>Delete all tasks</DeleteBtn>
        <button onClick={handleLogout} style={{ marginTop: "10px", padding: "10px", background: "#007bff", color: "#fff", border: "none", borderRadius: "5px", cursor: "pointer" }}>
          Logout
        </button>
        <DeleteTaskModal
          deleteTask={deleteTask}
          setDeleteTask={setDeleteTask}
          singleTask={false}
          titleTask={"-1"}
          setTasks={setTasks}
        />
      </Footer>
    </OffcanvasContainer>
  );
};

export default RightSideBar;
