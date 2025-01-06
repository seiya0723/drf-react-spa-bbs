# == This code was created by https://noauto-nolife.com/post/django-auto-create-models-forms-serializers/== #

from rest_framework import serializers
from .models import Category,Topic,Reply

class CategorySerializer(serializers.ModelSerializer):
    class Meta:
        model	= Category
        fields	= ("id", "name")

class TopicSerializer(serializers.ModelSerializer):

    created_at  = serializers.DateTimeField(format="%Y年%m月%d日 %H時%M分%S秒",required=False)

    class Meta:
        model	= Topic
        fields	= ("id", "category", "created_at", "comment")


class ReplySerializer(serializers.ModelSerializer):

    created_at  = serializers.DateTimeField(format="%Y年%m月%d日 %H時%M分%S秒",required=False)

    class Meta:
        model	= Reply
        fields	= ("id", "topic", "created_at", "comment")


