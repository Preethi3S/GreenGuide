import os
import shutil
from sklearn.model_selection import train_test_split

DATASET_DIR = os.path.join(os.path.dirname(__file__), '../datasets/PlantVillage')
OUTPUT_DIR = os.path.join(os.path.dirname(__file__), '../datasets_split')

train_dir = os.path.join(OUTPUT_DIR, 'train')
val_dir = os.path.join(OUTPUT_DIR, 'val')

# Create split folders
for folder in [train_dir, val_dir]:
    os.makedirs(folder, exist_ok=True)

# Loop over each class
for class_name in os.listdir(DATASET_DIR):
    class_path = os.path.join(DATASET_DIR, class_name)
    if not os.path.isdir(class_path):
        continue

    images = os.listdir(class_path)
    train_imgs, val_imgs = train_test_split(images, test_size=0.2, random_state=42)

    # Make class folders
    os.makedirs(os.path.join(train_dir, class_name), exist_ok=True)
    os.makedirs(os.path.join(val_dir, class_name), exist_ok=True)

    for img in train_imgs:
        shutil.copy(os.path.join(class_path, img), os.path.join(train_dir, class_name, img))

    for img in val_imgs:
        shutil.copy(os.path.join(class_path, img), os.path.join(val_dir, class_name, img))

print("✅ Dataset split done!")
