from django.conf import settings
from rest_framework import serializers
from profiles.serializers import PublicProfileSerializer
from .models import oasis

MAX_oasis_LENGTH = settings.MAX_oasis_LENGTH
oasis_ACTION_OPTIONS = settings.oasis_ACTION_OPTIONS

class oasisActionSerializer(serializers.Serializer):
    id = serializers.IntegerField()
    action = serializers.CharField()
    content = serializers.CharField(allow_blank=True, required=False)

    def validate_action(self, value):
        value = value.lower().strip() # "Like " -> "like"
        if not value in oasis_ACTION_OPTIONS:
            raise serializers.ValidationError("This is not a valid action for posts")
        return value


class oasisCreateSerializer(serializers.ModelSerializer):
    user = PublicProfileSerializer(source='user.profile', read_only=True) # serializers.SerializerMethodField(read_only=True)
    likes = serializers.SerializerMethodField(read_only=True)
    
    class Meta:
        model = oasis
        fields = ['user', 'id', 'content', 'likes', 'timestamp']
    
    def get_likes(self, obj):
        return obj.likes.count()
    
    def validate_content(self, value):
        if len(value) > MAX_oasis_LENGTH:
            raise serializers.ValidationError("This oasis is too long")
        return value

    # def get_user(self, obj):
    #     return obj.user.id


class postserializer(serializers.ModelSerializer):
    user = PublicProfileSerializer(source='user.profile', read_only=True)
    likes = serializers.SerializerMethodField(read_only=True)
    parent = oasisCreateSerializer(read_only=True)
    class Meta:
        model = oasis
        fields = [
                'user', 
                'id', 
                'content',
                'likes',
                'is_reoasis',
                'parent',
                'timestamp']

    def get_likes(self, obj):
        return obj.likes.count()
