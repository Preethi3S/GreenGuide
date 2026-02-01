// src/components/garden/GardenCanvas.jsx
import { motion } from "framer-motion";
import wateringSound from "../../assets/audio/water.mp3";
import "./GardenCanvas.css"; // Import the CSS file
import GardenDemoGallery from "./GardenDemoGallery";


const cellSize = 40;
const audio = new Audio(wateringSound);

const GardenCanvas = ({ width, height, layout, onLayoutChange }) => {
  const handleDrop = (e, x, y) => {
    const plant = JSON.parse(e.dataTransfer.getData("plant"));
    const updatedLayout = [...layout, { ...plant, position: { x, y }, watered: false, grown: false }];
    onLayoutChange(updatedLayout);
  };

  const handleRightClick = (e, pos) => {
    e.preventDefault();
    const updated = layout.filter(
      (p) => !(p.position.x === pos.x && p.position.y === pos.y)
    );
    onLayoutChange(updated);
  };

  const handleWater = (index) => {
    const updated = [...layout];
    updated[index].watered = true;

    // Play water sound for 5 seconds
    audio.currentTime = 0;
    audio.play();
    setTimeout(() => {
      audio.pause();
      audio.currentTime = 0;
    }, 5000);

    setTimeout(() => {
      updated[index].grown = true;
      onLayoutChange([...updated]);
    }, 2000);

    onLayoutChange(updated);
  };

  return (
    <div className="flex flex-col gap-8 w-full">
      <div className="garden-wrapper bg-light-bg border border-secondary/10 rounded-3xl p-8 shadow-inner overflow-auto">
        <div
          className="garden-canvas mx-auto"
          style={{ gridTemplateColumns: `repeat(${width}, ${cellSize}px)` }}
        >
          {[...Array(height)].map((_, row) =>
            [...Array(width)].map((_, col) => {
              const index = layout.findIndex(
                (p) => p.position.x === col && p.position.y === row
              );
              const plant = layout[index];

              return (
                <div
                  key={`${row}-${col}`}
                  onDragOver={(e) => e.preventDefault()}
                  onDrop={(e) => handleDrop(e, col, row)}
                  onContextMenu={(e) => handleRightClick(e, { x: col, y: row })}
                  className={`garden-cell ${plant ? "planted" : ""} border border-secondary/5 bg-white hover:bg-secondary/5 transition-colors`}
                >
                  {plant && (
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{
                        scale: plant.grown ? 1.3 : 1,
                        rotate: plant.watered ? [0, 5, -5, 0] : 0,
                      }}
                      transition={{ duration: plant.type === "tree" ? 1 : 0.5 }}
                      className="plant-icon relative w-full h-full flex items-center justify-center text-2xl"
                    >
                      {plant.icon}
                      {!plant.watered && (
                        <button
                          onClick={() => handleWater(index)}
                          className="absolute -bottom-1 -right-1 bg-blue-100 text-blue-600 hover:bg-blue-200 rounded-full p-1 shadow-sm text-[10px] z-10 transition-colors"
                          title="Water Plant"
                        >
                          💧
                        </button>
                      )}
                    </motion.div>
                  )}
                </div>
              );
            })
          )}
        </div>
      </div>
      <GardenDemoGallery />
    </div>
  );
};

export default GardenCanvas;
