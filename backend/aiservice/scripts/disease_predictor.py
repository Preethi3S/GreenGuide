import tensorflow as tf
import numpy as np
from PIL import Image
import os

# Load the trained model (place your .h5 model file in models/)
MODEL_PATH = os.path.join(os.path.dirname(__file__), '../models/plant_disease_model.h5')
model = tf.keras.models.load_model(MODEL_PATH)

# Define class labels - match them with your training dataset
CLASS_NAMES = [
    "Tomato___Bacterial_spot", "Tomato___Early_blight", "Tomato___Late_blight",
    "Tomato___Leaf_Mold", "Tomato___Septoria_leaf_spot", "Tomato___Spider_mites",
    "Tomato___Target_Spot", "Tomato___Tomato_Yellow_Leaf_Curl_Virus",
    "Tomato___Tomato_mosaic_virus", "Tomato___healthy"
]

# Generalized disease info (crop-agnostic)
disease_info = {
    "Tomato___Bacterial_spot": {
        "summary": "This plant is affected by Bacterial Spot.",
        "cause": "Caused by bacteria and spread through water splashes and contaminated tools.",
        "treatment": "Remove infected leaves, avoid overhead watering, and apply copper-based bactericides.",
        "fertilizer_advice": "Use balanced fertilizer to boost plant immunity.",
        "survivability": "Moderate. With early care, plant recovery is possible."
    },
    "Tomato___Early_blight": {
        "summary": "This plant is affected by Early Blight.",
        "cause": "Fungal infection causing leaf spots and fruit rot.",
        "treatment": "Apply fungicides like chlorothalonil or mancozeb and remove infected parts.",
        "fertilizer_advice": "Apply potassium-rich fertilizer.",
        "survivability": "Moderate to High. Treat early for best results."
    },
    "Tomato___Late_blight": {
        "summary": "This plant is affected by Late Blight.",
        "cause": "Caused by a fungus-like pathogen, thrives in wet and humid conditions.",
        "treatment": "Use fungicides and remove infected plants immediately.",
        "fertilizer_advice": "Do not fertilize during infection; focus on treatment.",
        "survivability": "Low. Highly destructive if not controlled early."
    },
    "Tomato___Leaf_Mold": {
        "summary": "This plant shows signs of Leaf Mold.",
        "cause": "Fungal disease due to poor air circulation and high humidity.",
        "treatment": "Improve airflow, avoid wetting leaves, and use fungicides.",
        "fertilizer_advice": "Use a foliar fertilizer after treatment.",
        "survivability": "High if managed quickly."
    },
    "Tomato___Septoria_leaf_spot": {
        "summary": "This plant is affected by Septoria Leaf Spot.",
        "cause": "Caused by Septoria lycopersici fungus affecting lower leaves.",
        "treatment": "Remove infected leaves and apply fungicides.",
        "fertilizer_advice": "Use low-nitrogen fertilizer to reduce susceptibility.",
        "survivability": "High with timely treatment."
    },
    "Tomato___Spider_mites": {
        "summary": "This plant has a Spider Mite infestation.",
        "cause": "Caused by tiny spider mites sucking plant sap.",
        "treatment": "Spray neem oil or insecticidal soap. Keep humidity high.",
        "fertilizer_advice": "Use nitrogen-rich fertilizer to encourage new growth.",
        "survivability": "High if caught early."
    },
    "Tomato___Target_Spot": {
        "summary": "This plant is affected by Target Spot.",
        "cause": "Fungal disease causing concentric spots on leaves.",
        "treatment": "Apply broad-spectrum fungicide and remove plant debris.",
        "fertilizer_advice": "Apply balanced NPK fertilizer post-treatment.",
        "survivability": "Moderate to High."
    },
    "Tomato___Tomato_Yellow_Leaf_Curl_Virus": {
        "summary": "This plant is affected by Yellow Leaf Curl Virus.",
        "cause": "Transmitted by whiteflies; causes leaf curl and stunted growth.",
        "treatment": "Remove infected plants. Control whiteflies using neem oil or imidacloprid.",
        "fertilizer_advice": "Avoid fertilizing now. Replant with resistant variety.",
        "survivability": "Low. This virus is usually terminal."
    },
    "Tomato___Tomato_mosaic_virus": {
        "summary": "This plant is affected by Tomato Mosaic Virus.",
        "cause": "Transmitted by tools, hands, or infected seeds.",
        "treatment": "Remove infected plants. Disinfect tools and avoid contact when wet.",
        "fertilizer_advice": "Avoid fertilizing infected plants.",
        "survivability": "Low. Prevention is best."
    },
    "Tomato___healthy": {
        "summary": "The plant appears healthy! 🍀",
        "cause": "No disease symptoms detected.",
        "treatment": "Continue with proper watering, light, and pest monitoring.",
        "fertilizer_advice": "Use organic compost or a balanced NPK fertilizer regularly.",
        "survivability": "Excellent."
    }
}

def predict(image_path):
    try:
        print(f"[INFO] Starting prediction for: {image_path}")

        if not os.path.exists(image_path):
            raise FileNotFoundError(f"Image file not found: {image_path}")

        # Load and preprocess image
        img = Image.open(image_path)
        print(f"[INFO] Image opened. Mode: {img.mode}, Size: {img.size}")

        img = img.resize((224, 224)).convert('RGB')
        img_array = np.expand_dims(np.array(img) / 255.0, axis=0)

        # Model prediction
        predictions = model.predict(img_array)
        print(f"[INFO] Model prediction output: {predictions}")

        predicted_index = int(np.argmax(predictions[0]))
        confidence = float(np.max(predictions[0]))
        label = CLASS_NAMES[predicted_index]

        print(f"[INFO] Predicted label: {label} (Confidence: {confidence})")

        # Fetch additional info
        info = disease_info.get(label, {
            "summary": f"Disease detected: {label.replace('___', ' ').replace('_', ' ')}",
            "cause": "Details not available.",
            "treatment": "Consult a plant health expert.",
            "fertilizer_advice": "No advice available.",
            "survivability": "Unknown."
        })

        return {
            "disease": label,
            "confidence": round(confidence, 4),
            **info
        }

    except Exception as e:
        print(f"[❌ ERROR] Prediction failed: {str(e)}")
        raise
