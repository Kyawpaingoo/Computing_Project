import React from "react";
import './App.css'

const Playlist = ( ) => {
  const staticData = [
    {
      id: 1,
      title: "Song Title 1",
      artist: "Artist Name 1",
      album: "Album Name 1",
      duration: "2 mins"
    },
    {
      id: 2,
      title: "Song Title 2",
      artist: "Artist Name 2",
      album: "Album Name 2",
      duration: "2 mins"
    },
    {
        id: 3,
        title: "Song Title 3",
        artist: "Artist Name 3",
        album: "Album Name 3",
        duration: "1 mins"
    },
    {
        id: 4,
        title: "Song Title 4",
        artist: "Artist Name 4",
        album: "Album Name 4",
        duration: "2 mins"
    },
    {
      id: 5,
      title: "Song Title 5",
      artist: "Artist Name 5",
      album: "Album Name 5",
      duration: "2 mins"
  },
  {
    id: 6,
    title: "Song Title 6",
    artist: "Artist Name 6",
    album: "Album Name 6",
    duration: "2 mins"
  },
  {
    id: 7,
    title: "Song Title 7",
    artist: "Artist Name 7",
    album: "Album Name 7",
    duration: "2 mins"
  },
  {
    id: 8,
    title: "Song Title 8",
    artist: "Artist Name 8",
    album: "Album Name 8",
    duration: "2 mins"
  },
];
  return (
    <div className="p-4 bg-gray-800 text-white">
       <div className="flex items-center mb-4">
        <div className="bg-green-500 text-white rounded-full p-2 mr-2">
          #
        </div>
        <h2 className="text-xl font-bold">example / #16A637</h2>
      </div>
    <table className="w-full text-left">
    <thead>
      <tr>
        <th className="w-1/6">#</th>
        <th className="w-1/6">Title</th>
        <th className="w-1/6">Artist(s)</th>
        <th className="w-1/6">Album</th>
        <th className="w-1/6">Duration</th>
       
      </tr>
    </thead>
    <tbody>
      {staticData.map((song, index) => (
        <tr key={index}>
          <td className="px-4 py-2 border border-gray-300">{index + 1}</td>
          <td className="px-4 py-2 border border-gray-300">{song.title}</td>
          <td className="px-4 py-2 border border-gray-300">{song.artist}</td>
          <td className="px-4 py-2 border border-gray-300">{song.album}</td>
          <td className="px-4 py-2 border border-gray-300">{song.duration}</td>
        </tr>
      ))}
    </tbody>
  </table>
  </div>
  );
};

export default Playlist;
