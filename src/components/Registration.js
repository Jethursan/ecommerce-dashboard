import React, { useState } from "react";
import { db } from "../firebase";
import { collection, addDoc } from "firebase/firestore";

function Registration() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    // ✅ Validation
    if (name.length < 3) {
      alert("Name must be at least 3 characters");
      return;
    }
    if (!email.includes("@")) {
      alert("Invalid email");
      return;
    }
    if (phone.length !== 10 || isNaN(phone)) {
      alert("Phone must be 10 digits");
      return;
    }

    try {
      await addDoc(collection(db, "users"), {
        name: name,
        email: email,
        phone: phone,
        timestamp: new Date()
      });

      setSuccess(true);
      setName("");
      setEmail("");
      setPhone("");

      setTimeout(() => setSuccess(false), 3000);


    } catch (err) {
      console.error("❌ Error adding document: ", err);
      alert("Error submitting form. Check console.");
    }
  };

  return (
    <div className="container mt-5">
      <h2>Register</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label>Name</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="form-control"
          />
        </div>
        <div className="mb-3">
          <label>Email</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="form-control"
          />
        </div>
        <div className="mb-3">
          <label>Phone</label>
          <input
            type="text"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            className="form-control"
          />
        </div>
        <button type="submit" className="btn btn-success">Submit</button>
      </form>

      {success && (
        <div className="alert alert-success mt-3" role="alert">
          Registration successful!
        </div>
      )}
    </div>
  );
}

export default Registration;
