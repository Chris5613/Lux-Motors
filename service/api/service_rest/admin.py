from django.contrib import admin
from .models import Technician, Appointment, AutoMobileVO
# Register your models here.

@admin.register(Technician)
class TechnicianAdmin(admin.ModelAdmin):
    pass

@admin.register(Appointment)
class AppointmentAdmin(admin.ModelAdmin):
    pass

@admin.register(AutoMobileVO)
class AutoMobileVOAdmin(admin.ModelAdmin):
    pass
