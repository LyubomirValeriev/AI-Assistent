

from gradio_client import Client

client = Client("http://localhost:8001/")
result = client.predict(
		" I want if user writes you -hi- then your response would be ONLY this - Hi, my name is Boti, I'm an AI and I'm here to help you with your choice.",	# str  in 'System Prompt' Textbox component
		api_name="/_set_system_prompt"
)
print(result)