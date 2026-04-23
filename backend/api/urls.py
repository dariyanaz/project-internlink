from django.urls import path
from .views import (
    register_view,
    login_view,
    CompanyListCreateView,
    CompanyDetailView,
    InternshipListCreateView,
    InternshipDetailView,
    ApplicationListCreateView,
    ApplicationDetailView,
    ReviewListCreateView,
)

urlpatterns = [
    path('auth/register/', register_view, name='register'),
    path('auth/login/', login_view, name='login'),

    path('companies/', CompanyListCreateView.as_view(), name='company-list'),
    path('companies/<int:pk>/', CompanyDetailView.as_view(), name='company-detail'),

    path('internships/', InternshipListCreateView.as_view(), name='internship-list'),
    path('internships/<int:pk>/', InternshipDetailView.as_view(), name='internship-detail'),

    path('applications/', ApplicationListCreateView.as_view(), name='application-list'),
    path('applications/<int:pk>/', ApplicationDetailView.as_view(), name='application-detail'),

    path('internships/<int:internship_id>/reviews/', ReviewListCreateView.as_view(), name='review-list'),
]