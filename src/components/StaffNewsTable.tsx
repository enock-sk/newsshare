"use client";

import { useState, useEffect } from "react";
import { News } from "../types/news";

export default function StaffNewsTable() {
  const [news, setNews] = useState<News[]>([]);
  const [filter, setFilter] = useState<
    "all" | "pending" | "approved" | "rejected"
  >("all");

  useEffect(() => {
    const fetchNews = async () => {
      const response = await fetch("/api/news");
      const data = await response.json();
      setNews(data);
    };
    fetchNews();
  }, []);

  const handleStatusChange = async (id: string, status: News["status"]) => {
    try {
      const response = await fetch(`/api/news/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status }),
      });
      if (response.ok) {
        setNews((prev) =>
          prev.map((item) => (item._id === id ? { ...item, status } : item))
        );
      }
    } catch (error) {
      console.error("Failed to update status:", error);
    }
  };

  const filteredNews =
    filter === "all" ? news : news.filter((item) => item.status === filter);

  return (
    <div className="max-w-6xl mx-auto p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-bold text-primary mb-6 text-center">
        News Submissions
      </h2>
      <div className="mb-6 flex justify-end">
        <div className="flex items-center space-x-2">
          <label htmlFor="filter" className="text-sm font-medium text-gray-700">
            Filter by Status:
          </label>
          <select
            id="filter"
            value={filter}
            onChange={(e) =>
              setFilter(
                e.target.value as "all" | "pending" | "approved" | "rejected"
              )
            }
            className="p-2 border rounded-lg focus:ring-primary focus:border-primary"
          >
            <option value="all">All</option>
            <option value="pending">Pending</option>
            <option value="approved">Approved</option>
            <option value="rejected">Rejected</option>
          </select>
        </div>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full border-collapse">
          <thead>
            <tr className="bg-secondary">
              <th className="p-3 text-left text-sm font-medium text-gray-700">
                Title
              </th>
              <th className="p-3 text-left text-sm font-medium text-gray-700">
                Author
              </th>
              <th className="p-3 text-left text-sm font-medium text-gray-700">
                Date
              </th>
              <th className="p-3 text-left text-sm font-medium text-gray-700">
                Status
              </th>
              <th className="p-3 text-left text-sm font-medium text-gray-700">
                Actions
              </th>
            </tr>
          </thead>
          <tbody>
            {filteredNews.map((item) => (
              <tr key={item._id} className="border-b hover:bg-gray-50">
                <td className="p-3">{item.title}</td>
                <td className="p-3">{item.author}</td>
                <td className="p-3">
                  {new Date(item.createdAt).toLocaleDateString()}
                </td>
                <td className="p-3 capitalize">{item.status}</td>
                <td className="p-3 flex space-x-2">
                  <select
                    value={item.status}
                    onChange={(e) =>
                      handleStatusChange(
                        item._id,
                        e.target.value as News["status"]
                      )
                    }
                    className="p-2 border rounded-lg focus:ring-primary focus:border-primary"
                  >
                    <option value="pending">Pending</option>
                    <option value="approved">Approved</option>
                    <option value="rejected">Rejected</option>
                  </select>
                  {item.status === "approved" && (
                    <button
                      onClick={() =>
                        navigator.clipboard.writeText(
                          `${item.title}\n${item.content}\nBy ${
                            item.author
                          }\nImage: ${item.imageUrl || "None"}`
                        )
                      }
                      className="bg-green-500 text-white px-3 py-1 rounded-lg hover:bg-green-600 transition"
                    >
                      Copy
                    </button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
