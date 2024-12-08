from django.urls import path
from money import views


urlpatterns = [
    path(
        "balance_fluctuations/",
        views.BalanceFluctuationListAPIView.as_view(),
        name="user-balance-fluctuation",
    ),
    path(
        "bank_account/retreive_update/",
        views.BankAcountRetreiveUpdateAPIView.as_view(),
    ),
    path(
        "withdrawal_request/list_create/",
        views.WithdrawalRequestListCreateAPIView.as_view(),
    ),
    path(
        "withdrawal_request/<int:pk>/detail/",
        views.WithdrawalRequestRetrieveAPIView.as_view(),
        name="withdrawal-request-detail",
    ),
    path(
        "withdrawal_request/cancell/",
        views.WithdrawalRequestCancellAPIView.as_view(),
        name="withdrawal-request-cancell",
    ),
]
