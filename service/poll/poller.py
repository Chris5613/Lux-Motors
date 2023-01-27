import django
import os
import sys
import time
import json
import requests

sys.path.append("")
os.environ.setdefault("DJANGO_SETTINGS_MODULE", "service_project.settings")
django.setup()

# Import models from service_rest, here.
# from service_rest.models import Something
import service_rest.models import AutoMobileVO

def get_automobiles():
    response = requests.get("http://inventory-api:8000/api/automobiles/")
    print(response)
    content = json.loads(response.content)
    for auto in content['autos']:
        AutoMobileVO.objects.update_or_create(
            import_href=auto["href"],
            vin = auto["vin"]
        )


def poll():
    while True:
        print('Service poller polling for data')
        try:
            get_automobiles()
            print("getting automobiles")
        except Exception as e:
            print(e, file=sys.stderr)
        time.sleep(60)


if __name__ == "__main__":
    poll()
