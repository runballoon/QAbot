import os
from flask import Flask, render_template, request

from haystack.nodes import PromptNode
from haystack.agents.memory import ConversationSummaryMemory
from haystack.agents.conversational import ConversationalAgent

print("Loading bot model...")
# initialze haystack model and flask framework
app = Flask(__name__)
hugging_face_api="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"
# model for QA system
model_name = "OpenAssistant/oasst-sft-1-pythia-12b"
# get result from model
prompt_node = PromptNode(model_name, api_key=hugging_face_api, max_length=512)
# save queries and answers in memory
summary_memory = ConversationSummaryMemory(prompt_node)
# prompt result considering memory/context
conversational_agent = ConversationalAgent(prompt_node=prompt_node, memory=summary_memory)

@app.route('/')
def sessions():
    return render_template('session.html')

@app.route("/get")
def get_bot_response():    
    userText = request.args.get('msg')    
    response = conversational_agent.run(userText)
    return response['transcript']

if __name__ == "__main__":    
    app.run()