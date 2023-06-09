from django.urls import path

# import views here
from .views import api_list_technicians, api_show_technician, api_list_appointments, api_show_appointment


urlpatterns = [
    path("services/technicians/", api_list_technicians, name="api_list_technicians"),
    path("services/technicians/<int:pk>/", api_show_technician, name="api_show_technician"),
    path("services/appointments/", api_list_appointments, name="api_list_appointments"),
    path("services/appointments/<int:pk>/", api_show_appointment, name="api_show_appointment"),
    path("services/appointments/<str:vin>/", api_list_appointments, name="appointments_by_vin"),
]
