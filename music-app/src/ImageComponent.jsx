import React from 'react';

const ImageComponent = () => {
  const imageUrl = "/src/assets/spotify_icon.png"; 

  return (
    <img src={imageUrl} alt="Playlist image" className="w-full mt-4 rounded-md" />
  );
};

export default ImageComponent;