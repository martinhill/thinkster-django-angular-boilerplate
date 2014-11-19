from rest_framework import generics, permissions

from authentication.models import UserProfile
from .models import Post
from .permissions import IsAuthenticatedAndOwnsObject
from .serializers import PostSerializer


class PostListCreateView(generics.ListCreateAPIView):
    queryset = Post.objects.order_by('-created_at')
    serializer_class = PostSerializer

    def get_permissions(self):
        if self.request.method == 'POST':
            return (permissions.IsAuthenticated(),)
        return (permissions.AllowAny(),)

    def pre_save(self, obj):
        obj.author = UserProfile.objects.get(user=self.request.user)
        return super(PostListCreateView, self).pre_save(obj)


class PostRetrieveUpdateDestroyView(generics.RetrieveUpdateDestroyAPIView):
    queryset = Post.objects.all()
    serializer_class = PostSerializer

    def get_permissions(self):
        if self.request.method not in permissions.SAFE_METHODS:
            return (IsAuthenticatedAndOwnsObject(),)
        return (permissions.AllowAny(),)


class UserPostsListView(generics.ListAPIView):
    serializer_class = PostSerializer

    def get_queryset(self):
        return Post.objects.filter(
            author__user__username=self.kwargs['username'])
