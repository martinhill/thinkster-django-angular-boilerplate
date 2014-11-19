from rest_framework import serializers

from authentication.serializers import UserProfileSerializer
from .models import Post


class PostSerializer(serializers.ModelSerializer):
    author = UserProfileSerializer(required=False)

    class Meta:
        model = Post

        fields = ('id', 'author', 'content', 'created_at', 'updated_at')
        read_only_fields = ('id', 'created_at', 'updated_at')

    def get_validation_exclusions(self, *args, **kwargs):
        exclusions = super(PostSerializer, self).get_validation_exclusions()

        return exclusions + ['author']
