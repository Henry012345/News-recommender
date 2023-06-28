from flask import Flask, jsonify, request
from flask_cors import CORS
from newsapi import NewsApiClient
from concurrent.futures import ThreadPoolExecutor
from urllib3.exceptions import ReadTimeoutError
from keras.models import load_model
from keras.utils import pad_sequences
from keras.preprocessing.text import Tokenizer



app = Flask(__name__)
CORS(app)
#model = load_model("news_recommendation_model2.h5")
model = load_model("C:/Users/ph/Desktop/CU/codes/News-Recommender/news-recommender/Flask Backend/news_recommendation_model2.h5")


# Load the tokenizer
tokenizer = Tokenizer()
categories = ['WELLNESS', 'POLITICS', 'ENTERTAINMENT', 'STYLE & BEAUTY', 'PARENTING','FOOD & DRINK','WORLD NEWS','BUSINESS','SPORTS']
#categories = ['POLITICS', 'ENTERTAINMENT', 'BUSINESS','SPORTS']

def get_articles(api_key, keyword, from_param, to, language='en', sort_by='relevancy', page=1):
    newsapi = NewsApiClient(api_key=api_key)
    try:
        response = newsapi.get_everything(q=keyword,
                                          from_param=from_param,
                                          to=to,
                                          language=language,
                                          sort_by=sort_by,
                                          page=page)
        return response['articles']
    except ReadTimeoutError:
        # Handle the timeout error gracefully
        return []

def get_all_articles(api_keys, keywords, from_param, to, language='en', sort_by='relevancy', page=1):
    all_articles = {}
    with ThreadPoolExecutor() as executor:
        futures = []
        for api_key in api_keys:
            for keyword in keywords:
                futures.append(executor.submit(get_articles, api_key, keyword, from_param, to, language, sort_by, page))
        for i, future in enumerate(futures):
            api_key = api_keys[i % len(api_keys)]
            keyword = keywords[i % len(keywords)]
            articles = future.result()
            if api_key not in all_articles:
                all_articles[api_key] = {}
            all_articles[api_key][keyword] = articles
    return all_articles

# List of API keys
api_keys = ['415ac8b267884e2bb6e47b8353c90121',
            "c7ab212da85a4361a23290ec1f684177",
            "4824e9c5418a47c6a9515027a95d47c6",
            "12d5214b3ee546faa365184e6c5d977a"]

# Query parameters
keywords = ['sports','entertainment', 'politics', 'business']
from_param = '2023-05-27'
to = '2023-06-27'

# Retrieve all articles
all_articles = get_all_articles(api_keys, keywords, from_param, to)
@app.route('/articles', methods=['POST'])
def retrieve_articles():
    news = []
    user_interest = request.json['interest']
    print(user_interest)
    articles = None
    for interest in range(len(user_interest)):
        articles = all_articles.get(api_keys[interest], {}).get(user_interest[interest].lower())
        if articles:
            news.append(articles)
    
    if len(news) > 0:
        preprocessed_news = preprocess_Data(news[0])
        # Tokenize and pad the preprocessed news
        sequences = tokenizer.texts_to_sequences(preprocessed_news)
        max_sequence_length = 100  # Define the maximum sequence length
        padded_sequences = pad_sequences(sequences, maxlen=max_sequence_length)
        
        # Make predictions using the trained model
        recommendations = model.predict(padded_sequences)
        decoded_predictions = [categories[pred.argmax()] for pred in recommendations]
        print(decoded_predictions)
    
        return jsonify(news)
    else:
        return jsonify([])
    
def preprocess_Data(articles):
    preprocessed_data = []
    for article in articles:
        title = article['title']
        # Perform any additional preprocessing steps on the title, if needed
        preprocessed_title = preprocess_title(title)
        
        # Assuming your model expects input as a list of titles
        preprocessed_data.append(preprocessed_title)
    return preprocessed_data

def preprocess_title(title):
    # Implement your preprocessing steps for the title
    # You can perform tokenization, lowercasing, removing punctuation, etc.

    preprocessed_title = title.title()  # Example: Convert the title to lowercase
    # print(preprocessed_title)
    return preprocessed_title


if __name__ == '__main__':
    app.run()
