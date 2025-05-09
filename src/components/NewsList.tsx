"use client";

import { useEffect, useState } from "react";
import { News } from "../types/news";

export default function NewsList() {
  const [news, setNews] = useState<News[]>([]);

  useEffect(() => {
    const fetchNews = async () => {
      const response = await fetch("/api/news");
      const data = await response.json();
      setNews(data);
    };
    fetchNews();
  }, []);

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h2 className="text-2xl font-bold text-primary mb-6 text-center">
        Submitted News
      </h2>
      {news.length === 0 ? (
        <p className="text-center text-gray-600">No news submitted yet.</p>
      ) : (
        <div className="grid gap-6 md:grid-cols-2">
          {news.map((item) => (
            <div
              key={item._id}
              className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition"
            >
              {item.imageUrl && (
                <img
                  src={item.imageUrl}
                  alt={item.title}
                  className="w-full h-48 object-cover rounded-lg mb-4"
                />
              )}
              <h3 className="text-xl font-semibold text-primary">
                {item.title}
              </h3>
              <p className="text-gray-600 mt-2">{item.content}</p>
              <div className="mt-4 text-sm text-gray-500">
                <p>By {item.author}</p>
                <p>{new Date(item.createdAt).toLocaleDateString()}</p>
                <p>Status: {item.status}</p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
