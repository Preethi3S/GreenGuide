from flask import Flask, request, jsonify
from flask_cors import CORS
import os
from scripts.disease_predictor import predict as predict_disease
from werkzeug.utils import secure_filename

app = Flask(__name__)
CORS(app)

UPLOAD_FOLDER = os.path.join(os.path.dirname(__file__), 'uploads')
os.makedirs(UPLOAD_FOLDER, exist_ok=True)

@app.route('/predict', methods=['POST'])
def handle_prediction():
    if 'image' not in request.files:
        print("❌ No image found in request.files")
        return jsonify({'error': 'No image file found in request'}), 400

    image_file = request.files['image']
    print("✅ Received image:", image_file.filename)

    filename = secure_filename(image_file.filename)
    image_path = os.path.join(UPLOAD_FOLDER, filename)

    try:
        image_file.save(image_path)
        print(f"[✅ INFO] Image saved to: {image_path}")

        result = predict_disease(image_path)
        print(f"[✅ INFO] Prediction result: {result}")

        return jsonify(result)

    except Exception as e:
        print(f"[❌ ERROR] Exception during prediction: {str(e)}")
        return jsonify({'error': 'Prediction failed', 'details': str(e)}), 500

    finally:
        if os.path.exists(image_path):
            os.remove(image_path)
            print(f"[🧹 INFO] Temp image deleted: {image_path}")

if __name__ == '__main__':
    port = int(os.environ.get('PORT', 5001))
    app.run(host='0.0.0.0', port=port, debug=True)
