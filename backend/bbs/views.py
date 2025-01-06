from django.shortcuts import render

# Create your views here.
# == This code was created by https://noauto-nolife.com/post/django-auto-create-views/ == #

from rest_framework import viewsets
from rest_framework.permissions import IsAuthenticated

from .models import Category,Topic,Reply
from .serializers import CategorySerializer,TopicSerializer,ReplySerializer

class CategoryView(viewsets.ModelViewSet):
    #permission_classes  = [IsAuthenticated]
    serializer_class    = CategorySerializer
    queryset            = Category.objects.all()


class TopicView(viewsets.ModelViewSet):
    #permission_classes  = [IsAuthenticated]
    serializer_class    = TopicSerializer
    queryset            = Topic.objects.all()


class ReplyView(viewsets.ModelViewSet):
    #permission_classes  = [IsAuthenticated]
    serializer_class    = ReplySerializer
    queryset            = Reply.objects.all()


