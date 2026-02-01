import { useEffect, useState } from "react";
import { createGarden, getGarden, updateGardenLayout } from "./gardenApi";
import GardenCanvas from "./GardenCanvas";
import PlantPalette from "./PlantPalette";

const DEFAULT_GARDEN_SIZE = { width: 20, height: 20 };

const GardenPlanner = () => {
  const [layout, setLayout] = useState([]);
  const [loading, setLoading] = useState(true);
  const [gardenId, setGardenId] = useState(null);

  useEffect(() => {
    fetchOrCreateGarden();
  }, []);

  const fetchOrCreateGarden = async () => {
    try {
      const { data } = await getGarden();
      if (data) {
        setLayout(data.layout || []);
        setGardenId(data._id);
      } else {
        const { data: created } = await createGarden({
          name: "My Garden",
          width: DEFAULT_GARDEN_SIZE.width,
          height: DEFAULT_GARDEN_SIZE.height,
          layout: [],
        });
        setGardenId(created._id);
        setLayout([]);
      }
    } catch (err) {
      console.error("Failed to load or create garden:", err);
    } finally {
      setLoading(false);
    }
  };

  const handleLayoutChange = async (updatedLayout) => {
    setLayout(updatedLayout);
    try {
      await updateGardenLayout(updatedLayout);
    } catch (err) {
      console.error("Failed to update layout:", err);
    }
  };

  if (loading) return (
    <div className="min-h-screen bg-light-bg flex justify-center items-center">
      <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
    </div>
  );

  return (
    <div className="min-h-screen bg-light-bg p-6 font-sans">
      <div className="max-w-[1600px] mx-auto">
        <div className="flex items-center gap-3 mb-8">
          <span className="bg-primary/10 text-primary p-3 rounded-xl text-2xl">🏡</span>
          <h1 className="text-4xl font-serif font-bold text-secondary">Garden Planner</h1>
        </div>

        <div className="flex flex-col md:flex-row gap-8">
          <div className="flex-shrink-0">
            <PlantPalette />
          </div>

          <div className="flex-1 overflow-auto border border-secondary/10 rounded-3xl shadow-xl bg-white p-8 flex justify-center items-start min-h-[85vh]">
            <GardenCanvas
              width={DEFAULT_GARDEN_SIZE.width}
              height={DEFAULT_GARDEN_SIZE.height}
              layout={layout}
              onLayoutChange={handleLayoutChange}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default GardenPlanner;
