from django.urls import path
from . import views

urlpatterns = [
    path("sales/person/", views.salesperson, name="salesperson"),
    path("sales/person/<int:pk>/", views.salesperson_details, name="salesperson_details"),
    path("sales/customers/", views.customer, name="customer"),
    path("sales/customers/<int:pk>/", views.customer_details, name="customer_details"),
    path("sales/records/", views.salesrecords, name="salesrecords"),
    path("sales/records/<int:pk>/", views.salesrecord_details, name="salesrecord_details"),
    path("sales/automobiles/", views.automobiles, name="automobiles"),
]
