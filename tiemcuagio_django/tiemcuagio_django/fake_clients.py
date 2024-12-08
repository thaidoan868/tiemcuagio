import requests


def fake_transfer_money():
    data = {
        "id": 92704,
        "gateway": "Vietcombank",
        "transactionDate": "2023-03-25 14:02:37",
        "accountNumber": "0123499999",
        "code": "ab",
        "content": "5892a51d-11ac-4f59-aa1a-34c095cd2f6f",
        "transferType": "in",
        "transferAmount": 4000,
        "accumulated": 19077000,
        "subAccount": "ab",
        "referenceCode": "MBVCB.3278907687",
        "description": "a",
    }
    headers = {"Authorization": "Apikey rXj88fXy.XJ3O3mhLlc8nqqmDlbU9yVzLmLr1Ih0h"}
    endpoint = "https://namvuong.org/django/api/payment/sepaywebhook/"
    # endpoint = "http://localhost/django/api/payment/sepaywebhook/"
    rs = requests.post(endpoint, data=data, headers=headers)
    print(rs.text)
    print(rs.status_code)


def get_access_token():
    auth_endpoint = "http://localhost/django/api/auth/"
    data = {
        "username": "admin",
        "password": "admin",
    }
    auth_response = requests.post(auth_endpoint, json=data)
    print(auth_response.text)
    print(auth_response.status_code)


def get_info():
    endpoint = "http://127.0.0.1:8000/api/user/navbar/"
    token = "610457514b7a923007a7dddef826021d9daff4bb"
    headers = {"Authorization": f"Token {token}"}
    response = requests.get(endpoint, headers=headers)
    print(response.text)
    print(response.status_code)


fake_transfer_money()
# get_access_token()
