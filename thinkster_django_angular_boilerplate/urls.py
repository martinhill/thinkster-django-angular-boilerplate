from django.conf.urls import patterns, url
from django.utils.decorators import method_decorator
from django.views.decorators.csrf import csrf_protect, ensure_csrf_cookie
from django.shortcuts import render_to_response
from django.views.generic.base import TemplateView
from authentication.views import UserCreateView


class CsrfTemplateView(TemplateView):

    @method_decorator(csrf_protect)
    def dispatch(self, *args, **kwargs):
        return super(TemplateView, self).dispatch(*args, **kwargs)


@ensure_csrf_cookie
def csrf_view(request):
    return render_to_response("index.html", {})

urlpatterns = patterns(
    '',

    url('^api/v1/users/$', UserCreateView.as_view(), name='user-create'),
    url('^', TemplateView.as_view(template_name='index.html')),
    # url('^', csrf_view),
)
