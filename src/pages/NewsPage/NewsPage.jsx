import React, { useEffect, useState } from 'react';
import axios from 'axios';

const NewsPage = () => {
  const [news, setNews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchNews = async () => {
      try {
        const response = await axios.get('/news'); // API endpoint
        setNews(response.data);
      } catch (err) {
        setError('Failed to fetch news');
      } finally {
        setLoading(false);
      }
    };

    fetchNews();
  }, []);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div style={styles.app}>
      <div style={styles.headline}>
        <img
          src="https://via.placeholder.com/500x250"
          alt="John Wick Chapter 4"
          style={styles.headlineImage}
        />
        <div style={styles.headlineContent}>
          <h2 style={styles.headlineTitle}>Where To Watch 'John Wick: Chapter 4'</h2>
          <p style={styles.headlineDescription}>
            There's been no official announcement regarding John Wick: Chapter 4's streaming release. However, given it's a Lionsgate film, John Wick: Chapter 4 will eventually be released...
          </p>
        </div>
      </div>

      <h3 style={styles.latestNewsTitle}>Latest News</h3>
      <div style={styles.cardGrid}>
        {news.length > 0 ? (
          news.map((item, index) => (
            <Card
              key={index}
              title={item.title}
              image={item.image || "https://via.placeholder.com/150"}
              description={item.description}
              date={item.date}
              source={item.source}
            />
          ))
        ) : (
          <p>No news available</p>
        )}
      </div>
    </div>
  );
};

function Card({ title, image, description, date, source, url }) {
  return (
    <div style={styles.card}>
      <img src={image} alt={title} style={styles.cardImage} />
      <div style={styles.cardContent}>
        <h3 style={styles.cardTitle}>
          <a href={url} style={styles.cardLink} target="_blank" rel="noopener noreferrer">
            {title}
          </a>
        </h3>
        <p style={styles.cardMeta}>
          <span style={styles.cardSource}>{source}</span> • <span>{date}</span>
        </p>
        <p style={styles.cardDescription}>{description}</p>
      </div>
    </div>
  );
}

const styles = {
  app: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    padding: '20px',
  },
  headline: {
    display: 'flex',
    width: '100%',
    maxWidth: '600px',
    marginBottom: '20px',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
    borderRadius: '8px',
    overflow: 'hidden',
  },
  headlineImage: {
    width: '50%',
    height: 'auto',
  },
  headlineContent: {
    padding: '15px',
    width: '50%',
  },
  headlineTitle: {
    fontSize: '1.5rem',
    margin: '0 0 10px',
    color: '#333',
  },
  headlineDescription: {
    fontSize: '1rem',
    color: '#666',
  },
  latestNewsTitle: {
    alignSelf: 'flex-start',
    fontSize: '1.2rem',
    marginBottom: '10px',
    color: '#333',
  },
  cardGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))',
    gap: '20px',
    width: '100%',
    maxWidth: '800px',
  },
  card: {
    border: '2px solid #ddd',
    borderRadius: '8px',
    overflow: 'hidden',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
    transition: 'transform 0.2s',
    cursor: 'pointer',
  },
  cardHover: {
    transform: 'scale(1.05)',
  },
  cardImage: {
    width: '100%',
    height: 'auto',
  },
  cardContent: {
    padding: '10px',
  },
  cardTitle: {
    color: '#ff6600',
    fontSize: '1rem',
    marginBottom: '5px',
  },
  cardMeta: {
    fontSize: '0.8rem',
    color: '#888',
    marginBottom: '5px',
  },
  cardSource: {
    fontWeight: 'bold',
  },
  cardDescription: {
    fontSize: '0.9rem',
    color: '#555',
  },
};

export default NewsPage;
