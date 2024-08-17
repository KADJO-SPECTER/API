import React, { useState, useEffect } from 'react';

interface Photo {
  albumId: number;
  id: number;
  title: string;
  url: string;
  thumbnailUrl: string;
}

const Photos: React.FC = () => {
  const [photos, setPhotos] = useState<Photo[]>([]);
  const [currentPhoto, setCurrentPhoto] = useState<Photo | null>(null);
  const [error, setError] = useState<string>("");

 
  const getPhotos = async () => {
    try {
      const response = await fetch('https://jsonplaceholder.typicode.com/photos');
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const data: Photo[] = await response.json();
      setPhotos(data);
      if (data.length > 0) {
        setCurrentPhoto(data[Math.floor(Math.random() * data.length)]);
      }
      setError("");
    } catch (err) {
      setError("Failed to fetch photos. Please try again later.");
      console.error(err);
    }
  };

  useEffect(() => {
    getPhotos();
  }, []);

  const getRandomPhoto = () => {
    if (photos.length > 0) {
      const randomIndex = Math.floor(Math.random() * photos.length);
      setCurrentPhoto(photos[randomIndex]);
    }
  };

  return (
    <div className="Photos" style={{ display: "flex", justifyContent: "center", alignItems: "center", flexDirection: "column", width: 400, margin: "30px auto", backgroundColor: "teal", height: "520px", color: "#fff", padding: 20, gap: 10 }}>
      <h1>Photos</h1>
      {error && <p className="error" style={{ color: "#fff" }}>{error}</p>}
      {currentPhoto && (
        <>
          <h2 style={{fontSize: 15, fontWeight: "normal"}}>{currentPhoto.title}</h2>
          <img src={currentPhoto.url} alt={currentPhoto.title} style={{ width: '200px' }} />
          <p>{currentPhoto.title}</p>
        </>
      )}
      <button type="button" onClick={getRandomPhoto} style={{ padding: "10px 30px", fontWeight: "bold", color: "crimson", cursor: "pointer" }}>
        Get Random Photo
      </button>
    </div>
  );
};

export default Photos;
