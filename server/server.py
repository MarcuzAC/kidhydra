from flask import Flask, jsonify, request
from flask_cors import CORS
import joblib
import numpy as np

app = Flask(__name__)
CORS(app)

# Load your pre-trained model
model = joblib.load('kidHydra.pkl')  # Make sure the correct model file is specified

def generate_recommendations(input_data):
    recommendations = []
    
    # Define recommendations based on input data
    if input_data.get('thirstLevel', 0) > 7:
        recommendations.append("Increase fluid intake immediately.")
    if input_data.get('sunkenEyes', '') == 'yes':
        recommendations.append("Seek medical attention if symptoms persist.")
    
    if not recommendations:
        recommendations.append("Keep monitoring hydration levels.")
    
    return recommendations

@app.route('/predict', methods=['POST'])
def predict():
    if model is None:
        return jsonify({'error': 'Model not loaded properly'}), 500

    input_data = request.get_json(force=True)
    print("Received input data:", input_data)  # Debugging line

    try:
        # Extract input features
        age = float(input_data['age'])
        weight = float(input_data['weight'])
        height = float(input_data['height'])
        muac = float(input_data['muac'])
        heart_rate = float(input_data['heartRate'])
        thirst_level = float(input_data['thirstLevel'])
        sunken_eyes = 1 if input_data['sunkenEyes'].lower() == 'yes' else 0
        
        features = np.array([[age, weight, height, muac, heart_rate, thirst_level, sunken_eyes]])
    except (KeyError, ValueError) as e:
        print("Error in input data:", e)
        return jsonify({'error': 'Invalid input data', 'details': str(e)}), 400

    try:
        # Make prediction
        dehydration_status = model.predict(features)[0]

        # Generate recommendations
        recommendations = generate_recommendations(input_data)

        return jsonify({
            'dehydrationStatus': dehydration_status,
            'recommendations': recommendations
        })

    except Exception as e:
        print("Prediction error:", e)
        return jsonify({'error': 'Prediction failed', 'details': str(e)}), 500

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000, debug=True)
