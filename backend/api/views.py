from django.contrib.auth.models import User
from rest_framework import generics, status, permissions
from rest_framework.authtoken.models import Token
from rest_framework.decorators import api_view, permission_classes
from rest_framework.response import Response

from .models import Company, Internship, Application, Review
from .serializers import (
    RegisterSerializer,
    CompanySerializer,
    InternshipSerializer,
    ApplicationSerializer,
    ReviewSerializer
)


@api_view(['POST'])
@permission_classes([permissions.AllowAny])
def register_view(request):
    serializer = RegisterSerializer(data=request.data)
    if serializer.is_valid():
        user = serializer.save()
        token, _ = Token.objects.get_or_create(user=user)
        return Response({
            'token': token.key,
            'user': {
                'id': user.id,
                'username': user.username,
                'email': user.email
            }
        }, status=status.HTTP_201_CREATED)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


@api_view(['POST'])
@permission_classes([permissions.AllowAny])
def login_view(request):
    username = request.data.get('username')
    password = request.data.get('password')

    if not username or not password:
        return Response(
            {'error': 'Username and password are required'},
            status=status.HTTP_400_BAD_REQUEST
        )

    try:
        user = User.objects.get(username=username)
    except User.DoesNotExist:
        return Response(
            {'error': 'Invalid credentials'},
            status=status.HTTP_400_BAD_REQUEST
        )

    if not user.check_password(password):
        return Response(
            {'error': 'Invalid credentials'},
            status=status.HTTP_400_BAD_REQUEST
        )

    token, _ = Token.objects.get_or_create(user=user)

    return Response({
        'token': token.key,
        'user': {
            'id': user.id,
            'username': user.username,
            'email': user.email
        }
    })


class CompanyListCreateView(generics.ListCreateAPIView):
    queryset = Company.objects.all()
    serializer_class = CompanySerializer
    permission_classes = [permissions.AllowAny]


class CompanyDetailView(generics.RetrieveUpdateDestroyAPIView):
    queryset = Company.objects.all()
    serializer_class = CompanySerializer
    permission_classes = [permissions.AllowAny]


class InternshipListCreateView(generics.ListCreateAPIView):
    queryset = Internship.objects.select_related('company').all().order_by('-created_at')
    serializer_class = InternshipSerializer

    def get_permissions(self):
        if self.request.method == 'POST':
            return [permissions.IsAuthenticated()]
        return [permissions.AllowAny()]

    def get_serializer_context(self):
        return {'request': self.request}


class InternshipDetailView(generics.RetrieveUpdateDestroyAPIView):
    queryset = Internship.objects.select_related('company').all()
    serializer_class = InternshipSerializer

    def get_permissions(self):
        if self.request.method in ['PUT', 'PATCH', 'DELETE']:
            return [permissions.IsAuthenticated()]
        return [permissions.AllowAny()]

    def get_serializer_context(self):
        return {'request': self.request}


class ApplicationListCreateView(generics.ListCreateAPIView):
    serializer_class = ApplicationSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        return Application.objects.select_related('internship', 'student').filter(student=self.request.user)

    def get_serializer_context(self):
        return {'request': self.request}


class ApplicationDetailView(generics.RetrieveUpdateDestroyAPIView):
    serializer_class = ApplicationSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        return Application.objects.select_related('internship', 'student').filter(student=self.request.user)

    def get_serializer_context(self):
        return {'request': self.request}


class ReviewListCreateView(generics.ListCreateAPIView):
    serializer_class = ReviewSerializer

    def get_permissions(self):
        if self.request.method == 'POST':
            return [permissions.IsAuthenticated()]
        return [permissions.AllowAny()]

    def get_queryset(self):
        internship_id = self.kwargs.get('internship_id')
        return Review.objects.select_related('internship', 'student').filter(internship_id=internship_id)

    def get_serializer_context(self):
        return {'request': self.request}