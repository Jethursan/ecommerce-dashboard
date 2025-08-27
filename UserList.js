import React, { useEffect, useState } from "react";
import { db } from "../firebase";
import { collection, getDocs } from "firebase/firestore";

function UserList() {
  const [users, setUsers] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    const fetchUsers = async () => {
      const querySnapshot = await getDocs(collection(db, "users"));
      const userData = querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
      setUsers(userData);
    };
    fetchUsers();
  }, []);

  // ✅ Filter by search
  const filteredUsers = users.filter(user =>
    user.name?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // ✅ Sorting function
  const sortBy = (key) => {
    const sorted = [...users].sort((a, b) => {
      const aVal = a[key]?.toLowerCase?.() || "";
      const bVal = b[key]?.toLowerCase?.() || "";
      return aVal > bVal ? 1 : -1;
    });
    setUsers(sorted);
  };

  return (
    <div className="container mt-5">
      <h2>Registered Users</h2>

      {/* 🔍 Search Box */}
      <input
        type="text"
        placeholder="Search by name"
        className="form-control mb-3"
        onChange={(e) => setSearchTerm(e.target.value)}
      />

      {/* 📋 User Table */}
      <table className="table table-bordered table-hover table-striped">
        <thead>
          <tr>
            <th onClick={() => sortBy("name")}>Name ⬍</th>
            <th onClick={() => sortBy("email")}>Email ⬍</th>
            <th onClick={() => sortBy("phone")}>Phone</th>
          </tr>
        </thead>
        <tbody>
          {filteredUsers.map(user => (
            <tr key={user.id}>
              <td>{user.name}</td>
              <td>{user.email}</td>
              <td>{user.phone}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default UserList;
