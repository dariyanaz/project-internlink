from django.contrib import admin
from .models import Company, Internship, Application, Review

admin.site.register(Company)
admin.site.register(Internship)
admin.site.register(Application)
admin.site.register(Review)