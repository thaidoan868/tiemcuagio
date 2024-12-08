from django.urls import path
from comments import views


urlpatterns = [
    path(
        "list_create/",
        views.CommentListCreateAPIView.as_view(),
        name="comment-list-create",
    ),
    path(
        "<int:pk>/update_destroy/",
        views.CommentUpdateDestroyAPIView.as_view(),
        name="comment-edit",
    ),
    path(
        "reply_list_create/",
        views.ReplyListCreateAPIView.as_view(),
        name="reply-list-create",
    ),
    path(
        "<int:pk>/reply_update_destroy/",
        views.ReplyUpdateDestroyAPIView.as_view(),
        name="reply-edit",
    ),
]
