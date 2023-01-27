from django.db import models
from django.urls import reverse

# Create your models here.
class AutoMobileVO(models.Model):
    import_href = models.CharField(max_length=200, unique=True)
    vin = models.CharField(max_length=200, unique=True)

    def __str__(self):
        return self.vin


class Technician(models.Model):
    name = models.CharField(max_length=200)
    employee_number = models.PositiveSmallIntegerField(unique=True)

    def get_api_url(self):
        return reverse('api_list_technicians', kwargs={"pk": self.id})



class Appointment(models.Model):
    vin = models.CharField(max_length=200)
    owner = models.CharField(max_length=200)
    date = models.DateTimeField()
    technician = models.ForeignKey(
        Technician,
        related_name="appointments",
        on_delete=models.CASCADE,
    )
    reason = models.TextField(blank=False)
    completed = models.BooleanField(default=False)
    vip = models.BooleanField(default=False)

    def get_api_url(self):
        return reverse('api_show_appointment', kwargs={"pk":self.id})
