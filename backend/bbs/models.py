from django.db import models

from django.utils import timezone

class Category(models.Model):
    name        = models.CharField(verbose_name="カテゴリ名",max_length=100)


class Topic(models.Model):
    category    = models.ForeignKey(Category,verbose_name="カテゴリ",on_delete=models.CASCADE)

    created_at  = models.DateTimeField(verbose_name="投稿日時",default=timezone.now)
    comment     = models.CharField(verbose_name="コメント",max_length=2000)
    

class Reply(models.Model):
    topic       = models.ForeignKey(Topic,verbose_name="カテゴリ",on_delete=models.CASCADE)

    created_at  = models.DateTimeField(verbose_name="投稿日時",default=timezone.now)
    comment     = models.CharField(verbose_name="コメント",max_length=2000)

