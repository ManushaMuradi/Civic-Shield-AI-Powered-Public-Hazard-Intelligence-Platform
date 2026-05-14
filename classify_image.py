import tensorflow as tf
import numpy as np
import json
import sys
import os

def classify_image(image_path):
    """Classify an image and return the result"""
    
    try:
        # Get absolute path to model
        script_dir = os.path.dirname(os.path.abspath(__file__))
        model_path = os.path.join(script_dir, 'civic_shield_model.h5')
        
        # Check if model exists
        if not os.path.exists(model_path):
            result = {
                'success': False,
                'message': f'Model not found: {model_path}'
            }
            print(json.dumps(result))
            return result
        
        # Load model
        model = tf.keras.models.load_model(model_path)
        
        # Class indices (UPDATED with new categories)
        class_indices = {
            'drainage': 0,
            'garbage': 1,
            'road_damage': 2
        }
        
        # Load and preprocess image
        img = tf.keras.preprocessing.image.load_img(image_path, target_size=(224, 224))
        img_array = tf.keras.preprocessing.image.img_to_array(img)
        img_array = tf.expand_dims(img_array, 0) / 255.0
        
        # Predict
        predictions = model.predict(img_array, verbose=0)
        prediction = np.argmax(predictions)
        confidence = np.max(predictions)
        
        # Get class name
        className = list(class_indices.keys())[prediction]
        
        # Return result as clean JSON
        result = {
            'success': True,
            'classification': className,
            'confidence': float(confidence * 100),
            'prediction': int(prediction)
        }
        
        # Print ONLY JSON (no extra text)
        print(json.dumps(result))
        return result
        
    except Exception as e:
        # Print ONLY error JSON (no extra text)
        error_result = {
            'success': False,
            'message': str(e)
        }
        print(json.dumps(error_result))
        return error_result

if __name__ == '__main__':
    # Get image path from command line
    if len(sys.argv) < 2:
        error_result = {
            'success': False,
            'message': 'No image path provided'
        }
        print(json.dumps(error_result))
        sys.exit(1)
    
    image_path = sys.argv[1]
    classify_image(image_path)