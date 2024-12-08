
def has_number_validator(value):
    for char in value:
        if char.isdigit(): print('error')

has_number_validator('3a')