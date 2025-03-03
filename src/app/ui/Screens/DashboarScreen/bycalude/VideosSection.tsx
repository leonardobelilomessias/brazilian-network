import React from 'react';

export default function VideosSection() {
  const videos = [
    {
      id: 1,
      title: "Portugal Travel Vlog",
      thumbnail: "/api/placeholder/400/320"
    },
    {
      id: 2,
      title: "Japan Travel Vlog",
      thumbnail: "/api/placeholder/400/320"
    },
    {
      id: 3,
      title: "Valencia Travel Guide",
      thumbnail: "/api/placeholder/400/320"
    },
    {
      id: 4,
      title: "Travel Vlog",
      thumbnail: "/api/placeholder/400/320"
    }
  ];
  
  return (
    <div className="mb-8">
      <h2 className="text-xl font-semibold mb-4">Videos</h2>
      <div className="grid grid-cols-4 gap-4">
        {videos.map((video) => (
          <div key={video.id} className="relative bg-white rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow group">
            <img 
              src={video.thumbnail} 
              alt={video.title} 
              className="w-full h-36 object-cover"
            />
            <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
              <div className="bg-black bg-opacity-50 rounded-full p-3">
                <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M8 5v10l8-5-8-5z" />
                </svg>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}