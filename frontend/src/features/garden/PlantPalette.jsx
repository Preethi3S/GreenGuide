
const plants = [
  { name: "Tomato", icon: "🍅", type: "plant", size: { w: 1, h: 1 } },
  { name: "Sunflower", icon: "🌻", type: "plant", size: { w: 2, h: 1 } },
  { name: "Mango Tree", icon: "🌳", type: "tree", size: { w: 2, h: 2 } },
  { name: "Mint", icon: "🌿", type: "herb", size: { w: 2, h: 2 } },
  { name: "Carrot", icon: "🥕", type: "plant", size: { w: 1, h: 2 } },
  { name: "Apple Tree", icon: "🍎", type: "tree", size: { w: 2, h: 2 } },
  { name: "Coconut Tree", icon: "🥥", type: "tree", size: { w: 2, h: 2 } },
  { name: "Basil", icon: "🪴", type: "herb", size: { w: 1, h: 1 } },
  { name: "Strawberry", icon: "🍓", type: "plant", size: { w: 1, h: 1 } },
  { name: "Pumpkin", icon: "🎃", type: "plant", size: { w: 2, h: 2 } },
  { name: "Cabbage", icon: "🥬", type: "plant", size: { w: 1, h: 1 } },
  { name: "Corn", icon: "🌽", type: "plant", size: { w: 1, h: 2 } },
  { name: "Peach Tree", icon: "🍑", type: "tree", size: { w: 2, h: 2 } },
  { name: "Pear Tree", icon: "🍐", type: "tree", size: { w: 2, h: 2 } },
  { name: "Chili", icon: "🌶️", type: "plant", size: { w: 1, h: 1 } },
  { name: "Eggplant", icon: "🍆", type: "plant", size: { w: 1, h: 1 } },
  { name: "Lemon Tree", icon: "🍋", type: "tree", size: { w: 2, h: 2 } },
  { name: "Orange Tree", icon: "🍊", type: "tree", size: { w: 2, h: 2 } },
  { name: "Rosemary", icon: "🌿", type: "herb", size: { w: 1, h: 1 } },
  { name: "Thyme", icon: "🌿", type: "herb", size: { w: 1, h: 1 } },
  { name: "Lavender", icon: "💐", type: "herb", size: { w: 1, h: 1 } },
  { name: "Blueberry", icon: "🫐", type: "plant", size: { w: 1, h: 1 } },
  { name: "Blackberry", icon: "🫐", type: "plant", size: { w: 1, h: 1 } },
  { name: "Papaya Tree", icon: "🍈", type: "tree", size: { w: 2, h: 2 } },
  { name: "Watermelon", icon: "🍉", type: "plant", size: { w: 2, h: 2 } },
  { name: "Banana Tree", icon: "🍌", type: "tree", size: { w: 2, h: 2 } },
  { name: "Spinach", icon: "🥬", type: "plant", size: { w: 1, h: 1 } },
  { name: "Onion", icon: "🧅", type: "plant", size: { w: 1, h: 1 } },
  { name: "Garlic", icon: "🧄", type: "plant", size: { w: 1, h: 1 } },
  { name: "Peas", icon: "🌱", type: "plant", size: { w: 1, h: 1 } },
  { name: "Broccoli", icon: "🥦", type: "plant", size: { w: 1, h: 1 } },
  { name: "Cucumber", icon: "🥒", type: "plant", size: { w: 1, h: 2 } },
  { name: "Grapes", icon: "🍇", type: "plant", size: { w: 2, h: 1 } },
  { name: "Guava Tree", icon: "🍈", type: "tree", size: { w: 2, h: 2 } },
  { name: "Pineapple", icon: "🍍", type: "plant", size: { w: 1, h: 2 } },
  { name: "Jackfruit Tree", icon: "🌳", type: "tree", size: { w: 2, h: 2 } },
  { name: "Neem Tree", icon: "🌲", type: "tree", size: { w: 2, h: 2 } },
  { name: "Aloe Vera", icon: "🪴", type: "herb", size: { w: 1, h: 1 } },
  { name: "Zucchini", icon: "🥒", type: "plant", size: { w: 1, h: 1 } },
  { name: "Radish", icon: "🥕", type: "plant", size: { w: 1, h: 1 } },
  { name: "Coriander", icon: "🌿", type: "herb", size: { w: 1, h: 1 } },
  { name: "Parsley", icon: "🌿", type: "herb", size: { w: 1, h: 1 } },
  { name: "Chickpea", icon: "🌱", type: "plant", size: { w: 1, h: 1 } },
  { name: "Mustard", icon: "🌿", type: "plant", size: { w: 1, h: 1 } },
  { name: "Turmeric", icon: "🧡", type: "herb", size: { w: 1, h: 1 } },
  { name: "Ginger", icon: "🫚", type: "herb", size: { w: 1, h: 1 } },
  { name: "Tulsi", icon: "🪴", type: "herb", size: { w: 1, h: 1 } },
  { name: "Fig Tree", icon: "🌳", type: "tree", size: { w: 2, h: 2 } },
  { name: "Sapota Tree", icon: "🍈", type: "tree", size: { w: 2, h: 2 } },
];

const PlantPalette = () => {
  return (
    <div className="w-64 p-6 border border-secondary/10 bg-white rounded-3xl shadow-xl h-[85vh] overflow-y-auto">
      <h3 className="font-serif font-bold text-xl mb-6 text-secondary">🌱 Drag Plants</h3>
      <div className="space-y-3">
        {plants.map((p) => (
          <div
            key={p.name}
            draggable
            onDragStart={(e) => e.dataTransfer.setData("plant", JSON.stringify(p))}
            className="bg-light-bg border border-secondary/10 p-4 rounded-xl cursor-grab hover:shadow-lg hover:bg-primary/5 hover:border-primary/30 transition-all group"
          >
            <div className="flex items-center gap-3">
              <span className="text-2xl">{p.icon}</span>
              <span className="text-sm font-bold text-secondary group-hover:text-primary transition-colors">{p.name}</span>
              <span className="text-gray-400 text-xs ml-auto font-mono bg-white px-2 py-1 rounded-lg border border-secondary/5">{p.size.w}×{p.size.h}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PlantPalette;
