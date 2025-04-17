from django.urls import path
from . import views

urlpatterns = [
    path('', views.detail, name='detail'),
    path('create-quiz/', views.createQuiz, name='create-quiz'),
    path('quizes/', views.dashboard, name='quizes'),
    path('take-quiz/', views.takeQuiz, name='take-quiz'),
]