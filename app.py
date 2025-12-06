from flask import Flask, render_template, request, jsonify
from openai import OpenAI
import os

app = Flask(__name__)

# Load API key from environment variable
client = OpenAI(api_key=os.getenv("OPENAI_API_KEY"))

def generate_reply(message):
    try:
        response = client.chat.completions.create(
            model="gpt-4o-mini",
            messages=[
                {"role": "system", "content": "You are a helpful AI chatbot created by Gokboru."},
                {"role": "user", "content": message}
            ]
        )
        return response.choices[0].message.content
    
    except Exception as e:
        return f"Error: {str(e)}"

@app.route("/")
def home():
    return render_template("index.html")

@app.route("/chat", methods=["POST"])
def chat():
    user_message = request.json.get("message")
    bot_reply = generate_reply(user_message)
    return jsonify({"reply": bot_reply})

if __name__ == "__main__":
    app.run(debug=True)

