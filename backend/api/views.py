from rest_framework.response import Response
from rest_framework.decorators import api_view, permission_classes, parser_classes
from rest_framework.parsers import FormParser, MultiPartParser, FileUploadParser
from rest_framework.permissions import AllowAny

@api_view(['GET'])
@permission_classes([AllowAny])
def home(request):
    return Response({"data": "Hello World"})

@api_view(['POST'])
@parser_classes([FormParser, MultiPartParser])
@permission_classes([AllowAny])
def upload_file(request):
    first_name = request.data.get("firstName")
    last_name = request.data.get("lastName")
    email = request.data.get("email")
    company_id = request.data.get("companyId")
    file = request.data.get("benefitDocument")
    print(first_name, last_name, email, company_id, file)
    return Response({"status": "success"})

