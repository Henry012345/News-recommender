from flask import Flask, request, jsonify
import numpy as np
import pandas as pd
from keras.models import load_model
from keras.utils import pad_sequences
from keras.preprocessing.text import Tokenizer
app = Flask(__name__)

# Load the trained model
model = load_model("C:/Users/ph/Desktop/CU/codes/News-Recommender/news-recommender/Flask Backend/news_recommendation_model2.h5")
# Load the tokenizer
tokenizer = Tokenizer()
# Placeholder for loading the news_data
# news_data = r'news-recommender\Flask Backend\NewsCategorizer.csv' # Load your news_data here
news_data = pd.read_csv('NewsCategorizer.csv')
tokenizer.fit_on_texts(news_data['headline']) 

# Define categories
#categories = ['Politics', 'Sports', 'Entertainment', 'Technology', 'Health', 'Business']
categories = ['WELLNESS', 'POLITICS', 'ENTERTAINMENT', 'TRAVEL', 'STYLE & BEAUTY', 'PARENTING','FOOD & DRINK','WORLD NEWS','BUSINESS','SPORTS']

@app.route('/recommend', methods=['POST'])
def recommend_news():
    # Get the request data
    data = request.json
    headlines = data['headlines']
    
    # Tokenize the headlines
    headlines_seq = tokenizer.texts_to_sequences(headlines)
    max_sequence_length = 100  # Define the maximum sequence length
    headlines_padded = pad_sequences(headlines_seq, maxlen=max_sequence_length)
    
    # Make predictions using the trained model
    predictions = model.predict(headlines_padded)
    decoded_predictions = [categories[pred.argmax()] for pred in predictions]
    
    # Prepare the response data
    response = {
        'headlines': headlines,
        'categories': decoded_predictions
    }
    
    return jsonify(response)

if __name__ == '__main__':
    app.run(debug=True)
