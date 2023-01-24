from django.shortcuts import render
from django.views.decorators.http import require_http_methods
from django.http import JsonResponse
from .models import Technician, Appointment, AutoMobileVO
from common.json import ModelEncoder
import json

# Create your views here.
#encoders here
class TechnicianEncoder(ModelEncoder):
    model = Technician
    properties = [
        "name",
        "employee_number",
        "id",
    ]

class AppointmentEncoder(ModelEncoder):
    model = Appointment
    properties = [
        "id"
    ]

@require_http_methods(["GET", "POST"])
def api_list_technicians(request):
    if request.method == "GET":
        technicians = Technician.objects.all()
        return JsonResponse(
            {"technicians": technicians},
            encoder=TechnicianEncoder
        )
    else:
        try:
            content = json.loads(request.body)
            technician = Technician.objects.create(**content)
            return JsonResponse(
                technician,
                encoder=TechnicianEncoder,
                safe=False,
            )
        except:
            response = JsonResponse(
                {"message": "Could not create a technician."}
            )
            response.status_code = 400
            return response


@require_http_methods(["GET", "DELETE"])
def api_show_technician(request, pk):
    if request.method == "GET":
        try:
            technician = Technician.objects.get(id=pk)
            return JsonResponse(
                technician,
                encoder=TechnicianEncoder,
                safe=False,
            )
        except Technician.DoesNotExist:
            response = JsonResponse(
                {"message": "Invalid technician"}
            )
            response.status_code = 400
            return response
    else:
        try:
            technician = Technician.objects.get(id=pk)
            technician.delete()
            return JsonResponse(
                {"message": "Technician has been successfully deleted"}
            )
        except Technician.DoesNotExist:
            response = JsonResponse(
                {"message": "Could not delete technician"}
            )
            response.status_code = 400
            return response
