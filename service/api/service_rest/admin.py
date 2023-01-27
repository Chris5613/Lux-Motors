from django.contrib import admin

# Register your models here.
from .models import Technician, Appointment, AutomobileVO

@admin.register(Technician)
class TechnicianAdmin(admin.ModelAdmin):
    pass

@admin.register(Appointment)
class AppointmentAdmin(admin.ModelAdmin):
    pass

@admin.register(AutomobileVO)
class AutoMobileVOAdmin(admin.ModelAdmin):
    pass
