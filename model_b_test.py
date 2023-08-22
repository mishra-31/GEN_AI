# StarChat

Here is an example of Python code that can be used to check the validity of a URL:

import requests

def is_url_valid(url):
    try:
        response = requests.get(url)
        return response.status_code == 200
    except:
        return False

# Example usage:
print(is_url_valid('https://google.com')) # Returns True
print(is_url_valid('https://this-url-does-not-exist.com')) # Returns False