import React, { useEffect, useState } from "react";
import { db } from "../firebase";
import { collection, getDocs, doc, deleteDoc, updateDoc } from "firebase/firestore";

function UserList() {
  const [users, setUsers] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  // Editing states
  const [editingUser, setEditingUser] = useState(null);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");

  useEffect(() => {
    const fetchUsers = async () => {
      const querySnapshot = await getDocs(collection(db, "users"));
      const userData = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setUsers(userData);
    };
    fetchUsers();
  }, []);

  // ✅ Search filter
  const filteredUsers = users.filter(user =>
    user.name?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // ✅ Sort function
  const sortBy = (key) => {
    const sorted = [...users].sort((a, b) => {
      const aVal = a[key]?.toLowerCase?.() || "";
      const bVal = b[key]?.toLowerCase?.() || "";
      return aVal > bVal ? 1 : -1;
    });
    setUsers(sorted);
  };


  // ✅ Delete user
  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this user?")) {
      try {
        await deleteDoc(doc(db, "users", id));
        setUsers(users.filter(user => user.id !== id));
        alert("User deleted successfully!");
      } catch (err) {
        console.error(err);
        alert("Error deleting user");
      }
    }
  };

  // ✅ Start editing
  const handleEdit = (user) => {
    setEditingUser(user);
    setName(user.name);
    setEmail(user.email);
    setPhone(user.phone);
  };

  // ✅ Update user
  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      const userRef = doc(db, "users", editingUser.id);
      await updateDoc(userRef, { name, email, phone });
      setUsers(users.map(u => u.id === editingUser.id ? { ...u, name, email, phone } : u));
      setEditingUser(null);
      alert("User updated successfully!");
    } catch (err) {
      console.error(err);
      alert("Error updating user");
    }
  };

  return (
    <div className="container mt-5">
      <h2>Registered Users</h2>

      {/* Search Box */}
      <input
        type="text"
        placeholder="Search by name"
        className="form-control mb-3"
        onChange={(e) => setSearchTerm(e.target.value)}
      />

      {/* Table */}
      <table className="table table-bordered table-hover table-striped">
        <thead>
          <tr>
            <th onClick={() => sortBy("name")}>Name ⬍</th>
            <th onClick={() => sortBy("email")}>Email ⬍</th>
            <th onClick={() => sortBy("phone")}>Phone</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {filteredUsers.map(user => (
            <tr key={user.id}>
              <td>{user.name}</td>
              <td>{user.email}</td>
              <td>{user.phone}</td>
              <td>
                <button className="btn btn-primary btn-sm me-2" onClick={() => handleEdit(user)}>Edit</button>
                <button className="btn btn-danger btn-sm" onClick={() => handleDelete(user.id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Edit Form */}
      {editingUser && (
        <div className="card mt-4">
          <div className="card-body">
            <h4>Edit User</h4>
            <form onSubmit={handleUpdate}>
              <div className="mb-3">
                <label>Name</label>
                <input type="text" value={name} onChange={(e) => setName(e.target.value)} className="form-control" />
              </div>
              <div className="mb-3">
                <label>Email</label>
                <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} className="form-control" />
              </div>
              <div className="mb-3">
                <label>Phone</label>
                <input type="text" value={phone} onChange={(e) => setPhone(e.target.value)} className="form-control" />
              </div>
              <button type="submit" className="btn btn-success">Update</button>
              <button type="button" className="btn btn-secondary ms-2" onClick={() => setEditingUser(null)}>Cancel</button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

export default UserList;
