import React, { useEffect, useState } from "react";
import axios from "axios";
import NewsModal from "./components/NewsModal";
import { newsGet } from "../../utils/constants/api";
import "./News.css";

export default function News() {
  const [news, setNews] = useState([]);
  const [selectedNews, setSelectedNews] = useState(null);

  useEffect(() => {
    const fetchNews = async () => {
      try {
        const response = await axios.get(newsGet);
        const data = response.data;

        const sortedData = data.sort(
          (a, b) => new Date(b.date) - new Date(a.date)
        );

        setNews(sortedData);
      } catch (error) {
        console.error("Error fetching news:", error);
      }
    };

    fetchNews();
  }, []);

  const handleViewDetails = (newsItem) => {
    setSelectedNews(newsItem);
  };

  const closeModal = () => {
    setSelectedNews(null);
  };

  return (
    <section className="news-container">
      {news.length === 0 ? (
        <div className="no-news">
          <p>No hay noticias disponibles</p>
          <p>¡Disculpe las molestias!</p>
        </div>
      ) : (
        news.map((n) => (
          <div key={n.id} className="new-item">
            <div className="new-image">
              <img src={`/assets/news-${n.imageId}.jpg`} alt={n.name} />
            </div>
            <div className="new-content">
              <p className="date-tag">
                {new Date(n.date).toLocaleDateString("es-ES", {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}
              </p>
              <h3>{n.name}</h3>
              <p>{n.description.substring(0, 120)}...</p>
              <button onClick={() => handleViewDetails(n)}>Ver más</button>
            </div>
          </div>
        ))
      )}
      {selectedNews && <NewsModal news={selectedNews} onClose={closeModal} />}
    </section>
  );
}
