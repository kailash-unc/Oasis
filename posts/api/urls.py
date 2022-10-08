from django.urls import path

from .views import (
    oasis_action_view,
    oasis_delete_view,
    oasis_detail_view,
    oasis_feed_view,
    oasis_list_view,
    oasis_create_view,
)
'''
CLIENT
Base ENDPOINT /api/posts/
'''
urlpatterns = [
    path('', oasis_list_view),
    path('feed/', oasis_feed_view),
    path('action/', oasis_action_view),
    path('create/', oasis_create_view),
    path('<int:oasis_id>/', oasis_detail_view),
    path('<int:oasis_id>/delete/', oasis_delete_view),
]
