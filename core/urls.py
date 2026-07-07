from django.urls import path
from . import views

urlpatterns = [
    path('', views.home, name='home'),
    path('visit/', views.visit, name='visit'),
    path('pyramids/', views.pyramids, name='pyramids'),
    path('getting-here/', views.getting_here, name='getting_here'),
]
