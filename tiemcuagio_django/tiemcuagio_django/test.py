from django.contrib.auth import get_user_model
from user.functions import purchased_amount


users = get_user_model().objects.all()
amount_user = []

for user in users:
    amount = purchased_amount(user)
    amount_user.append((amount, user))

for (amount, user) in sorted(amount_user):
    print(amount,user.username)