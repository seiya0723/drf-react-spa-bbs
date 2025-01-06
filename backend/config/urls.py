"""
URL configuration for config project.

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/5.1/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.contrib import admin
from django.urls import path,include


from rest_framework import routers
from bbs import views

router = routers.DefaultRouter()
router.register(r"topics", views.TopicView, "topic")
router.register(r"categories", views.CategoryView, "category")
router.register(r"replies", views.ReplyView, "reply")


from django.http import JsonResponse
from django.middleware.csrf import get_token

def csrf_token(request):
    return JsonResponse({"csrfToken": get_token(request)})

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/', include(router.urls)),

    path("api/csrf-token/", csrf_token, name="csrf_token"),
]

