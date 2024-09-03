// id 649842
// Access key ITh53VDsK51M8we4pOPGDOpm36do9orCJdbL8F5wV2Y

// secret key gBia0uLL7kjm5m_SNv7muyNA_FIDOegJMu7kPsTaQ58
import React, { useState, useEffect } from 'react';

function ImageScroll() {
  const [images, setImages] = useState([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);

  const ACCESS_KEY = 'ITh53VDsK51M8we4pOPGDOpm36do9orCJdbL8F5wV2Y';

  useEffect(() => {
    const fetchImages = async () => {
      setLoading(true);
      try {
        const response = await fetch(`https://api.unsplash.com/photos?page=${page}&client_id=${ACCESS_KEY}`);
        if (!response.ok) {
          throw new Error('Failed to fetch images');
        }
        const data = await response.json();
        setImages((prevImages) => [...prevImages, ...data]);
      } catch (error) {
        console.error(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchImages();
  }, [page]);

  const handleScroll = () => {
    if (window.innerHeight + window.scrollY >= document.body.offsetHeight - 500 && !loading) {
      setPage((prevPage) => prevPage + 1);
    }
  };

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [loading]);

  return (
    <div>
      <div className="image-gallery" style={{ display: 'flex', flexWrap: 'wrap', gap: '10px' }}>
        {images.map((image) => (
          <img 
            key={image.id} 
            src={image.urls.small} 
            alt={image.alt_description} 
            style={{ width: '200px', height: '200px', objectFit: 'cover' }} 
          />
        ))}
      </div>
      {loading && <p>Loading...</p>}
    </div>
  );
}

export default ImageScroll;