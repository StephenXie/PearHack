from dotenv import load_dotenv
import os
import time
from uuid import uuid4
from pinecone import Pinecone, ServerlessSpec
from langchain_pinecone import PineconeVectorStore
from langchain_openai import OpenAIEmbeddings
from langchain_community.document_loaders import PyPDFLoader

load_dotenv()


pinecone_api_key = os.environ.get("PINECONE_API_KEY")
pc = Pinecone(api_key=pinecone_api_key)
index_name = "pearhack"
def save_file(company_id, file):
    
    file_path = os.path.join(os.getcwd() + "/media/", f"{company_id}_info.pdf")
    with open(file_path, "wb") as f:
        f.write(file.read())
    return file_path

def handle_file(company_id, file):
    file_path = save_file(company_id, file)
    index = pc.Index(index_name)
    vector_store = PineconeVectorStore(index=index, embedding=OpenAIEmbeddings())
    loader = PyPDFLoader(file_path)
    pages = loader.load_and_split()
    uuids = [str(uuid4()) for _ in range(len(pages))]
    vector_store.add_documents(documents=pages, ids=uuids)
    
