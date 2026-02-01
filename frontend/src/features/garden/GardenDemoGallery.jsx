// src/components/garden/GardenDemoGallery.jsx
import { useState } from "react";

const demoImages = {
  Layouts: [
    "/images/garden-demo1.jpg",
    "/images/garden-demo2.jpg",
  ],
  Inspiration: [
    "/images/garden-demo3.jpg",
    "/images/garden-demo4.jpg",
  ],
  "User Designs": [
    "/images/garden-demo5.jpg",
  ],
};

const tabs = Object.keys(demoImages);

const GardenDemoGallery = () => {
  const [activeTab, setActiveTab] = useState("Layouts");
  const [modalImg, setModalImg] = useState(null);

  const openModal = (src) => setModalImg(src);
  const closeModal = () => setModalImg(null);

  return (
    <div className="bg-white rounded-3xl shadow-xl border border-secondary/10 p-8">
      <h2 className="text-2xl font-serif font-bold mb-6 text-secondary">Garden Layout Ideas 🌿</h2>

      {/* Tabs */}
      <div className="flex gap-4 mb-8 overflow-x-auto pb-2">
        {tabs.map((tab) => (
          <button
            key={tab}
            className={`px-6 py-3 rounded-xl font-bold text-sm transition-all whitespace-nowrap ${
              activeTab === tab 
                ? "bg-secondary text-white shadow-lg shadow-secondary/20" 
                : "bg-light-bg text-gray-500 hover:bg-secondary/10"
            }`}
            onClick={() => setActiveTab(tab)}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* Image Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {demoImages[activeTab].map((src, idx) => (
          <div
            key={idx}
            className="border border-secondary/10 rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 bg-white relative group"
          >
            <img
              src={src}
              alt={`Garden ${activeTab} ${idx + 1}`}
              className="w-full h-56 object-cover cursor-pointer group-hover:scale-105 transition-transform duration-700"
              onClick={() => openModal(src)}
            />
            <div className="absolute bottom-3 right-3 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
              <a
                href={src}
                download
                className="text-sm bg-white/90 backdrop-blur px-3 py-2 rounded-lg hover:bg-white text-secondary shadow-lg"
              >
                ⬇️
              </a>
              <button
                onClick={() => navigator.share?.({ url: window.location.origin + src })}
                className="text-sm bg-white/90 backdrop-blur px-3 py-2 rounded-lg hover:bg-white text-secondary shadow-lg"
              >
                📤
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Fullscreen Modal */}
      {modalImg && (
        <div
          className="fixed inset-0 bg-black/90 backdrop-blur-sm flex items-center justify-center z-50 p-4"
          onClick={closeModal}
        >
          <img
            src={modalImg}
            alt="Full view"
            className="max-w-full max-h-[90vh] rounded-2xl shadow-2xl"
          />
        </div>
      )}
    </div>
  );
};

export default GardenDemoGallery;
