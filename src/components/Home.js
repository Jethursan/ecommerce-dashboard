import React from "react";
import { Link } from "react-router-dom";

function Home() {
  return (
    <div className="container mt-5">
      <h1>Welcome to Ecommerce Dashboard</h1>
      <p>Manage your ecommerce data efficiently with our dashboard app.</p>
      <Link to="/registration" className="btn btn-primary">Register</Link> <br /><br />
      <Link to="/about" className="btn btn-info">About</Link>
    </div>
  );
}

export default Home;
