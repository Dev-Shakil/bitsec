"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

type User = {
  id: number;
  name: string;
  email: string;
  phone: string;
  username: string;
  company: {
    name: string;
  };
};

export default function Users({ users }: { users: User[] }) {
  const [query, setQuery] = useState("");
  const [filter, setFilter] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const usersPerPage = 5;

  // Suggestions while typing
  const suggestions = users.filter(
    (user) =>
      user.name.toLowerCase().includes(query.toLowerCase()) ||
      user.email.toLowerCase().includes(query.toLowerCase())
  );

  // Apply filter only after submit
  const filteredUsers = users.filter(
    (user) =>
      user.name.toLowerCase().includes(filter.toLowerCase()) ||
      user.email.toLowerCase().includes(filter.toLowerCase())
  );

  // Pagination logic
  const totalPages = Math.ceil(filteredUsers.length / usersPerPage);
  const startIndex = (currentPage - 1) * usersPerPage;
  const currentUsers = filteredUsers.slice(
    startIndex,
    startIndex + usersPerPage
  );

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setFilter(query);
    setShowSuggestions(false);
    setCurrentPage(1);
  };

  return (
    <div className="px-8 py-4 rounded-xl bg-white min-h-screen">
      <h2 className="text-2xl font-semibold py-2">User Management</h2>

      {/* Search Input */}
      <form onSubmit={handleSubmit} className="relative mb-4 flex flex-col">
        <div className="flex gap-4">
          <input
            type="text"
            placeholder="Search users by name or email..."
            value={query}
            onChange={(e) => {
              setQuery(e.target.value);
              setShowSuggestions(true);
            }}
            className="p-2 border border-gray-300 rounded-lg focus:outline-none w-full"
          />
          <button
            type="submit"
            className="px-6 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
          >
            Search
          </button>
        </div>

        {/* Suggestions Dropdown with Animation */}
        <AnimatePresence>
          {showSuggestions && query && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.2 }}
              className="absolute top-full mt-1 w-full bg-white border rounded shadow-md max-h-40 overflow-y-auto z-10"
            >
              {suggestions.length > 0 ? (
                suggestions.map((user) => (
                  <div
                    key={user.id}
                    onClick={() => {
                      setQuery(user.email);
                      setShowSuggestions(false);
                    }}
                    className="px-3 py-2 hover:bg-gray-100 cursor-pointer"
                  >
                    <p className="font-medium">{user.name}</p>
                    <p className="text-sm text-gray-500">{user.email}</p>
                  </div>
                ))
              ) : (
                <p className="px-3 py-2 text-gray-500 text-sm">
                  No matches found
                </p>
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </form>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="w-full rounded-lg shadow-sm">
          <thead className="bg-gray-50 font-light text-sm text-gray-400 text-left">
            <tr>
              <th className="px-3 py-2 font-normal">NAME</th>
              <th className="px-3 py-2 font-normal">EMAIL</th>
              <th className="px-3 py-2 font-normal">COMPANY</th>
              <th className="px-3 py-2 font-normal">PHONE</th>
            </tr>
          </thead>
          <tbody>
            <AnimatePresence mode="wait">
              {currentUsers.map((user) => (
                <motion.tr
                  key={user.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.2 }}
                  className="hover:bg-gray-50 border-b border-gray-300 transition cursor-pointer"
                  onClick={() => (window.location.href = `/users/${user.id}`)}
                >
                  <td className="py-2 px-3">
                    <h2 className="font-semibold">{user.name}</h2>
                    <p className="text-sm text-gray-500">@{user.username}</p>
                  </td>
                  <td className="py-2 px-3">{user.email}</td>
                  <td className="py-2 px-3">{user.company.name}</td>
                  <td className="py-2 px-3">{user.phone}</td>
                </motion.tr>
              ))}
            </AnimatePresence>
          </tbody>
        </table>
      </div>

      {/* Pagination Controls with Animation */}
      <motion.div
        key={currentPage} 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.3 }}
        className="flex justify-between items-center mt-4"
      >
        <button
          onClick={() => setCurrentPage((p) => Math.max(p - 1, 1))}
          disabled={currentPage === 1}
          className="px-3 py-1 border rounded disabled:opacity-50"
        >
          Previous
        </button>

        <span className="text-sm text-gray-600">
          Page {currentPage} of {totalPages}
        </span>

        <button
          onClick={() => setCurrentPage((p) => Math.min(p + 1, totalPages))}
          disabled={currentPage === totalPages}
          className="px-3 py-1 border rounded disabled:opacity-50"
        >
          Next
        </button>
      </motion.div>
    </div>
  );
}
