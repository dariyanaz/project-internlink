from django.db import models
from django.contrib.auth.models import User


class Company(models.Model):
    name = models.CharField(max_length=255)
    description = models.TextField(blank=True)
    location = models.CharField(max_length=255, blank=True)
    website = models.URLField(blank=True)

    def __str__(self):
        return self.name


class Internship(models.Model):
    WORK_TYPE_CHOICES = [
        ('Full-time', 'Full-time'),
        ('Part-time', 'Part-time'),
        ('Remote', 'Remote'),
        ('Hybrid', 'Hybrid'),
    ]

    company = models.ForeignKey(
        Company,
        on_delete=models.CASCADE,
        related_name='internships'
    )
    title = models.CharField(max_length=255)
    location = models.CharField(max_length=255)
    description = models.TextField()
    salary = models.CharField(max_length=100, blank=True)
    work_type = models.CharField(max_length=50, choices=WORK_TYPE_CHOICES, default='Full-time')
    duration = models.CharField(max_length=100, blank=True)
    deadline = models.DateField(null=True, blank=True)
    category = models.CharField(max_length=100, blank=True)
    created_by = models.ForeignKey(
        User,
        on_delete=models.CASCADE,
        related_name='created_internships',
        null=True,
        blank=True
    )
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.title


class Application(models.Model):
    STATUS_CHOICES = [
        ('Pending', 'Pending'),
        ('Accepted', 'Accepted'),
        ('Rejected', 'Rejected'),
    ]

    internship = models.ForeignKey(
        Internship,
        on_delete=models.CASCADE,
        related_name='applications'
    )
    student = models.ForeignKey(
        User,
        on_delete=models.CASCADE,
        related_name='applications'
    )
    cover_letter = models.TextField(blank=True)
    status = models.CharField(max_length=20, choices=STATUS_CHOICES, default='Pending')
    applied_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        unique_together = ('internship', 'student')

    def __str__(self):
        return f'{self.student.username} -> {self.internship.title}'


class Review(models.Model):
    internship = models.ForeignKey(
        Internship,
        on_delete=models.CASCADE,
        related_name='reviews'
    )
    student = models.ForeignKey(
        User,
        on_delete=models.CASCADE,
        related_name='reviews'
    )
    rating = models.PositiveIntegerField(default=5)
    comment = models.TextField(blank=True)
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f'Review for {self.internship.title} by {self.student.username}'