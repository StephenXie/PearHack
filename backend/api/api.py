from dotenv import load_dotenv
import os
import time
from uuid import uuid4
from langchain_openai import OpenAIEmbeddings, ChatOpenAI
from langchain_community.document_loaders import PyPDFLoader
from langchain_core.pydantic_v1 import BaseModel, Field
import voyageai

load_dotenv()


def save_file(company_id, file):
    file_path = os.path.join(os.getcwd(), f"{company_id}.pdf")
    with open(file_path, "wb") as f:
        f.write(file.read())

def handle_file(company_id, file=None):
    save_file(company_id, file)


def load_to_voyage(company_id):
    loader = PyPDFLoader(os.path.join(os.getcwd(), f"{company_id}.pdf"))
    pages = loader.load_and_split()
    vo = voyageai.Client()
    docs = []
    for page in pages:
        docs.append(page.page_content)
    # documents_embeddings = vo.embed(docs, model="voyage-3-lite", input_type="document").embeddings
    documents_embeddings = [] # TODO fix later
    return docs, documents_embeddings

class MCQModel(BaseModel):
    Question: str = Field(description="Quiz to test the user's understanding of their employee benefits")
    Option_1: str = Field(description="1st option for the multiple choice question")
    Option_2: str = Field(description="2nd option for the multiple choice question")
    Option_3: str = Field(description="3rd option for the multiple choice question")
    Option_4: str = Field(description="4th option for the multiple choice question")
    Correct_Answer: str = Field(description="The correct answer to the question (1, 2, 3 or 4)")
    Explanation: str = Field(description="Explanation of the correct answer")

class QuizTopics(BaseModel):
    Topics: list[str] = Field(description="List of employee benefit topics to generate quiz questions on.")

def generate_quiz_topics(company_id, documents, embeddings):
    llm = ChatOpenAI(
        model="gpt-4o",
        temperature=0.5,
        max_tokens=1024,
        timeout=None,
        max_retries=2,
    )
    vo = voyageai.Client()
    prompt = f"You are an HR manager at {company_id} and you need to create a quiz to test the employees' understanding of their employee financial benefits. You decide to brainstorm a list of topics to quiz the employees on."
    details = vo.rerank("Financial & Retirement", documents, model="rerank-2-lite", top_k=3).results
    prompt += "Here are some details about the company's employee benefits: \n"
    for detail in details:
        prompt += detail.document + "\n"
    prompt += "Based on these company-specific information, you came up with these 5 topics about financial benefits: \n"
    structured_llm = llm.with_structured_output(QuizTopics)
    result = structured_llm.invoke(prompt)
    print(result)
    return format_llm_output(result)    

def generate_multiple_choice_question(company_id, topic, documents, embeddings):
    llm = ChatOpenAI(
        model="gpt-4o",
        temperature=0.5,
        max_tokens=1024,
        timeout=None,
        max_retries=2,
    )
    vo = voyageai.Client()
    prompt = f"You are an HR manager at {company_id} and you need to create a quiz to test the employees' understanding of their employee financial benefits, specifically about {topic}. You decide to create a multiple choice question to test their knowledge."
    details = vo.rerank("Financial & Retirement", documents, model="rerank-2-lite", top_k=3).results
    prompt += f"Here are some details about {topic} at {company_id}: \n"
    for detail in details:
        prompt += detail.document + "\n"
    prompt += "Based on these company-specific information, you came up with this multiple choice question: \n"
    structured_llm = llm.with_structured_output(MCQModel)
    result = structured_llm.invoke(prompt)
    return format_llm_output(result) 


def make_questions(company_id):
    documents, embeddings = load_to_voyage(company_id)
    topics = generate_quiz_topics(company_id, documents, embeddings)
    questions = {}
    for topic in topics["Topics"]:
        questions[topic] = generate_multiple_choice_question(company_id, topic, documents, embeddings)
    return questions


def format_llm_output(output):
    res = {}
    for pair in output:
        res[pair[0]] = pair[1]
    return res