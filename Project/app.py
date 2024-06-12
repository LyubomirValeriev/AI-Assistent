from flask import Flask, request, jsonify
from flask_cors import CORS
from gradio_client import Client
import time  # Import the time module

app = Flask(__name__)
CORS(app)  # This will enable CORS for all routes


@app.route('/upload-path', methods=['POST'])
def upload_path():
    data = request.json
    simulated_file_path = data.get('simulatedFilePath', '')
    if simulated_file_path:
        try:
            # Initialize the Gradio client inside the route function
            client = Client("http://localhost:8001/")
            # Send the request only once
            result = client.predict([simulated_file_path], api_name="/_upload_file")
            # Return the result immediatelys
            client.close()
            return jsonify(result), 200
        except Exception as e:
            return jsonify({'error': str(e)}), 500
    else:
        return jsonify({'error': 'No file path provided'}), 400


@app.route('/chat', methods=['POST'])
def chat():
    # Get message from request
    message = request.json.get('message')
    client = Client("http://localhost:8001/")
    # Call Gradio model
    result = client.predict(
                message,
                "Query Files",
                ["http://localhost:8001/"],
                "Hello!!",
                api_name="/chat"
            )
    client.close()

    # Return response
    return jsonify(result)



@app.route('/set_mode', methods=['POST'])
def set_mode():
    # Get message from request
    client = Client("http://localhost:8001/")
    # Call Gradio model
    setMode = client.predict(
		"LLM Chat (no context from files)",	# Literal['Query Files', 'Search Files', 'LLM Chat (no context from files)']  in 'Mode' Radio component
		api_name="/_set_current_mode"
)
    result = client.predict(
                "hi",
                "LLM Chat (no context from files)",
                ["http://localhost:8001/"],
                "Hello!!",
                api_name="/chat"
            )
    client.close()

    # Return response
    return jsonify(result)

@app.route('/refresh', methods=['POST'])
def refresh_mode():
   
    client = Client("http://localhost:8001/")
    # Call Gradio model
    setMode = client.predict(
		"Query Files",	
		api_name="/_set_current_mode"
    )
    
    client.close()

    # Return response
    return jsonify(setMode)

@app.route('/deleteAllFiles', methods=['POST'])
def deleteAllFiles():
    # Get message from request
    client = Client("http://localhost:8001/")
    # Call Gradio model
    result = client.predict(
             		api_name="/_delete_all_files"
            )
    client.close()

    # Return response
    return jsonify(result)



if __name__ == '__main__':
    app.run(debug=True)



