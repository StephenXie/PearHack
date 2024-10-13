from rest_framework.response import Response
from rest_framework.decorators import api_view, permission_classes, parser_classes
from rest_framework.parsers import JSONParser, FormParser, MultiPartParser, FileUploadParser
from rest_framework.permissions import AllowAny
from .api import handle_file, make_questions
from langchain_openai import OpenAIEmbeddings, ChatOpenAI
from langchain_community.document_loaders import PyPDFLoader
import os 
import voyageai
@api_view(['GET'])
@permission_classes([AllowAny])
def home(request):
    return Response({"data": "Hello World"})

@api_view(['POST'])
@parser_classes([JSONParser, FormParser, MultiPartParser])
@permission_classes([AllowAny])
def upload_file(request):
    print(request.data)
    first_name = request.data.get("firstName")
    last_name = request.data.get("lastName")
    email = request.data.get("email")
    company_id = request.data.get("companyId")
    file = request.data.get("benefitDocument")
    handle_file(company_id, file)
    print(first_name, last_name, email, company_id, file)
    return Response({"status": "success"})

@api_view(['GET'])
@permission_classes([AllowAny])
def generate_mcq(request):
    """
    Endpoint: api/generate_mcq

    Input:
    {
        "companyId": <company_id>
    }

    Output:
    {
        "questions": [
            {
                "Question": <string>,
                "Option_1": <string>
                "Option_2": <string>
                "Option_3": <string>
                "Option_4": <string>
                "Correct_Answer": <string> ("1, 2, 3 or 4"),
                "Explanation": <string>
            }
        ]
    }
    """
    company_id = request.GET.get("companyId", "Google")
    questions = make_questions(company_id)
    return Response({"questions": questions})

@api_view(['POST'])
@permission_classes([AllowAny])
def chat(request):
    query = request.data.get("query")
    company_id = request.data.get("companyId")
    loader = PyPDFLoader(os.path.join(os.getcwd(), f"{company_id}.pdf"))
    pages = loader.load_and_split()
    vo = voyageai.Client()
    documents = []
    for page in pages:
        documents.append(page.page_content)
    llm = ChatOpenAI(
        model="gpt-4o",
        temperature=0.5,
        max_tokens=1024,
        timeout=None,
        max_retries=2,
    )
    prompt = query
    details = vo.rerank(query, documents, model="rerank-2-lite", top_k=3).results
    prompt += "\n Here are some relevant details about the company's employee benefits: \n"
    for detail in details:
        prompt += detail.document + "\n"
    result = llm.invoke(prompt)
    return Response({"response": result.content})