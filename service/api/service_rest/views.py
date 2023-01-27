from django.shortcuts import render
from django.views.decorators.http import require_http_methods
from django.http import JsonResponse
from .models import Technician, Appointment, AutoMobileVO
from common.json import ModelEncoder
import json

# Create your views here.
#encoders here
class AutoMobileVOEncoder(ModelEncoder):
    model = AutoMobileVO
    properties = [
        "import_href",
        "vin",
    ]


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
        "vin",
        "owner",
        "date",
        "technician",
        "reason",
        "completed",
        "vip",
        "id"
    ]
    encoders = {
    "technician": TechnicianEncoder(),
  }


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


@require_http_methods(["GET", "POST"])
def api_list_appointments(request, vin=None):
    if request.method == "GET":
        if vin == None:
            appointments = Appointment.objects.all()
            return JsonResponse(
                {"appointments": appointments},
                encoder=AppointmentEncoder,
                safe=False
            )
        else:
            try:
                appointments = Appointment.objects.filter(vin=vin)
                return JsonResponse(
                    {"appointments": appointments},
                    encoder=AppointmentEncoder
                )
            except Appointment.DoesNotExist:
                response = JsonResponse(
                    {"message": "Could not find service Appointment"}
                )
                response.status_code = 400
                return response
    else:
        content = json.loads(request.body)

        try:
            technician = Technician.objects.get(id=content["technician"])
            content["technician"] = technician
        except Technician.DoesNotExist:
            response = JsonResponse(
                {"message": "Could not find technician id"}
            )
            response.status_code = 400
            return response

        appointment = Appointment.objects.create(**content)
        return JsonResponse(
            appointment,
            encoder=AppointmentEncoder,
            safe=False,
        )

@require_http_methods(["GET", "DELETE"])
def api_show_appointment(request, pk):
    if request.method == "GET":
        try:
            appointment = Appointment.objects.get(id=pk)
            return JsonResponse(
                appointment,
                AppointmentEncoder,
                safe=False
            )
        except Appointment.DoesNotExist:
            return JsonResponse(
                {"message": "Invalid Appointment"}
            )
    else:
        try:
            appointment = Appointment.object.get(id=pk)
            appointment.delete()
            return JsonResponse(
                {"message": "Appointment has been successfully deleted"}
            )
        except:
            response = JsonResponse(
                {"message": "Could not delete technician"}
            )
            response.status_code = 400
            return response
        # if this doesnt work, try your code below when you can test it
        # count, _ = Appointment.objects.filter(id=pk).delete()
        # return JsonResponse({"deleted": count > 0})
