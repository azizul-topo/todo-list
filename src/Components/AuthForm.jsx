import React, { useState } from "react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const AuthForm = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const [isLogin, setIsLogin] = useState(true);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const url = isLogin
        ? "https://todobackend-jcut.onrender.com/api/auth/login"
        : "https://todobackend-jcut.onrender.com/api/auth/signup";

      const response = await axios.post(url, formData);

      // Display success message
      toast.success(response.data.message);

      if (isLogin) {
        // Store token in sessionStorage
        sessionStorage.setItem("authToken", response.data.token);

        // Redirect to /all-tasks after login
        window.location.href = "/all-tasks";
      }
    } catch (error) {
      const errorMessage =
        error.response?.data?.message || "An error occurred";
      toast.error(errorMessage);
    }
  };

  return (
    <div style={styles.container}>
      <div style={styles.formContainer}>
        <h2 style={styles.heading}>{isLogin ? "Login" : "Signup"}</h2>
        <form onSubmit={handleSubmit} style={styles.form}>
          {!isLogin && (
            <div style={styles.inputGroup}>
              <label style={styles.label}>Name:</label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                style={styles.input}
                required
              />
            </div>
          )}
          <div style={styles.inputGroup}>
            <label style={styles.label}>Email:</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              style={styles.input}
              required
            />
          </div>
          <div style={styles.inputGroup}>
            <label style={styles.label}>Password:</label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleInputChange}
              style={styles.input}
              required
            />
          </div>
          <button type="submit" style={styles.button}>
            {isLogin ? "Login" : "Signup"}
          </button>
        </form>
        <p
          style={styles.switchText}
          onClick={() => setIsLogin(!isLogin)}
        >
          {isLogin ? "Switch to Signup" : "Switch to Login"}
        </p>
        <ToastContainer />
      </div>
    </div>
  );
};

const styles = {
    container: {
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        height: "100vh",
        background: `
          linear-gradient(135deg, rgba(108, 92, 231, 0.8), rgba(162, 155, 254, 0.8)),
          url('https://cdn.pixabay.com/photo/2020/02/17/07/39/pen-4855775_1280.jpg')`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        padding: "20px",
      },
  formContainer: {
    backgroundColor: "#fff",
    borderRadius: "10px",
    boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)",
    padding: "30px",
    maxWidth: "400px",
    width: "100%",
    textAlign: "center",
  },
  heading: {
    fontSize: "1.8rem",
    marginBottom: "20px",
    color: "#6c5ce7",
  },
  form: {
    display: "flex",
    flexDirection: "column",
    gap: "15px",
  },
  inputGroup: {
    textAlign: "left",
  },
  label: {
    display: "block",
    fontSize: "1rem",
    marginBottom: "5px",
    color: "#6c5ce7",
  },
  input: {
    width: "100%",
    padding: "10px",
    border: "1px solid #ddd",
    borderRadius: "5px",
    outline: "none",
    fontSize: "1rem",
    transition: "all 0.3s ease",
  },
  inputHover: {
    borderColor: "#6c5ce7",
  },
  button: {
    padding: "10px",
    backgroundColor: "#6c5ce7",
    color: "#fff",
    border: "none",
    borderRadius: "5px",
    fontSize: "1.2rem",
    cursor: "pointer",
    transition: "transform 0.2s ease, background 0.3s ease",
  },
  buttonHover: {
    backgroundColor: "#5a4bcf",
    transform: "scale(1.05)",
  },
  switchText: {
    marginTop: "20px",
    cursor: "pointer",
    color: "#6c5ce7",
    textDecoration: "underline",
    fontWeight: "bold",
  },
};

export default AuthForm;
