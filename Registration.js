import React, { useState } from "react";
import { db } from "../firebase";
import { collection, addDoc } from "firebase/firestore";

function Registration() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    // ✅ Basic validation
    if (name.length < 3) {
      setError("Name must be at least 3 characters long.");
      return;
    }
    if (!email.includes("@") || !email.includes(".")) {
      setError("Invalid email address.");
      return;
    }
    if (phone.length !== 10 || isNaN(phone)) {
      setError("Phone must be exactly 10 digits.");
      return;
    }

    try {
      await addDoc(collection(db, "users"), {
        name,
        email,
        phone,
        timestamp: new Date(),
      });
      setSuccess(true);
      setError("");
      setName("");
      setEmail("");
      setPhone("");

      // Auto hide success msg
      setTimeout(() => setSuccess(false), 3000);
    } catch (err) {
      console.error("❌ Error adding document: ", err);
      setError("Something went wrong while submitting.");
    }
  };

  return (
    <div className="container mt-5">
      <div className="card shadow p-4">
        <h2 className="mb-3">User Registration</h2>

        {/* ✅ Success Alert */}
        {success && (
          <div className="alert alert-success alert-dismissible fade show" role="alert">
            ✅ Registration successful!
          </div>
        )}

        {/* ❌ Error Alert */}
        {error && (
          <div className="alert alert-danger alert-dismissible fade show" role="alert">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit}>
          {/* Name */}
          <div className="mb-3">
            <label className="form-label">Full Name</label>
            <input
              type="text"
              className="form-control"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Enter your full name"
              required
            />
          </div>

          {/* Email */}
          <div className="mb-3">
            <label className="form-label">Email Address</label>
            <input
              type="email"
              className="form-control"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
              required
            />
          </div>

          {/* Phone */}
          <div className="mb-3">
            <label className="form-label">Phone Number</label>
            <input
              type="text"
              className="form-control"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              placeholder="Enter 10-digit phone number"
              required
            />
          </div>

          {/* Submit */}
          <button type="submit" className="btn btn-success w-100">
            Register
          </button>
        </form>
      </div>
    </div>
  );
}

export default Registration;
