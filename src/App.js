import React, { useEffect } from "react";
import { HashRouter, Navigate, Route, Routes } from "react-router-dom";

// Import themes
import darkTheme from "Theme/darkTheme";
import defaultTheme from "Theme/defaultTheme";
import lightTheme from "Theme/lightTheme";

// Import Local Storage
import useLocalStorage from "Hooks/useLocalStorage";

// Import theme provider from styled-components
import { ThemeProvider } from "styled-components";

// Import Pages
import HomePage from "Pages/HomePage/HomePage";
import AuthForm from "Components/AuthForm";

// Helper function to check login status
const isLoggedIn = () => {
  // Retrieve the token or login flag from sessionStorage
  const token = sessionStorage.getItem("authToken");
  return !!token; // Returns true if token exists, otherwise false
};

function App() {
  // State to store the current theme of the website
  const [theme, setTheme] = useLocalStorage(
    "theme",
    JSON.stringify({
      ...defaultTheme,
      ...lightTheme,
    })
  );

  const [checkedSwitch, setCheckedSwitch] = useLocalStorage(
    "checkedSwitch",
    JSON.stringify(false)
  );

  /**
   * Function to toggle the theme of the website
   * It will change the theme from light to dark and vice versa
   */
  const handleToggleTheme = () => {
    if (JSON.parse(theme).id === "dark") {
      setTheme(
        JSON.stringify({
          ...defaultTheme,
          ...lightTheme,
        })
      );
    } else {
      setTheme(
        JSON.stringify({
          ...defaultTheme,
          ...darkTheme,
        })
      );
    }

    if (JSON.parse(checkedSwitch) === true)
      setCheckedSwitch(JSON.stringify(false));
    else setCheckedSwitch(JSON.stringify(true));
  };

  useEffect(() => {
    document.title = "TO DO LIST";
  }, []);

  return (
    <ThemeProvider theme={JSON.parse(theme)}>
      <HashRouter basename="/#">

        <Routes>
          {/* Conditional default route based on login status */}
          <Route
            path="/"
            element={
              isLoggedIn() ? <Navigate to="/all-tasks" /> : <Navigate to="/auth" />
            }
          />
          {/* Auth route */}
          <Route path="/auth" element={<AuthForm />} />
          {/* All Tasks (protected) */}
          <Route
            path="/*"
            element={
              isLoggedIn() ? (
                <HomePage
                  handleToggleTheme={handleToggleTheme}
                  checkedSwitch={checkedSwitch}
                />
              ) : (
                <Navigate to="/auth" />
              )
            }
          />
        </Routes>
      </HashRouter>
    </ThemeProvider>
  );
}

export default App;
