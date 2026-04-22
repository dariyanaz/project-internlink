from django.contrib.auth.models import User
from rest_framework import serializers
from .models import Company, Internship, Application, Review


class RegisterSerializer(serializers.ModelSerializer):
    password = serializers.CharField(write_only=True)

    class Meta:
        model = User
        fields = ['id', 'username', 'email', 'password']

    def create(self, validated_data):
        user = User.objects.create_user(
            username=validated_data['username'],
            email=validated_data.get('email', ''),
            password=validated_data['password']
        )
        return user


class CompanySerializer(serializers.ModelSerializer):
    class Meta:
        model = Company
        fields = '__all__'


class InternshipSerializer(serializers.ModelSerializer):
    company = serializers.CharField()
    applicants = serializers.SerializerMethodField()

    class Meta:
        model = Internship
        fields = [
            'id',
            'title',
            'company',
            'location',
            'description',
            'salary',
            'work_type',
            'duration',
            'deadline',
            'category',
            'applicants',
            'created_at',
        ]

    def get_applicants(self, obj):
        return obj.applications.count()

    def to_representation(self, instance):
        data = super().to_representation(instance)
        data['company'] = instance.company.name
        return data

    def create(self, validated_data):
        company_name = validated_data.pop('company')
        company, _ = Company.objects.get_or_create(name=company_name)

        request = self.context.get('request')
        user = request.user if request and request.user.is_authenticated else None

        internship = Internship.objects.create(
            company=company,
            created_by=user,
            **validated_data
        )
        return internship

    def update(self, instance, validated_data):
        company_name = validated_data.pop('company', None)

        if company_name:
            company, _ = Company.objects.get_or_create(name=company_name)
            instance.company = company

        for attr, value in validated_data.items():
            setattr(instance, attr, value)

        instance.save()
        return instance


class ApplicationSerializer(serializers.ModelSerializer):
    student = serializers.CharField(source='student.username', read_only=True)
    internship_title = serializers.CharField(source='internship.title', read_only=True)

    class Meta:
        model = Application
        fields = [
            'id',
            'internship',
            'internship_title',
            'student',
            'cover_letter',
            'status',
            'applied_at',
        ]
        read_only_fields = ['student', 'status', 'applied_at']

    def create(self, validated_data):
        request = self.context.get('request')
        return Application.objects.create(
            student=request.user,
            **validated_data
        )


class ReviewSerializer(serializers.ModelSerializer):
    student = serializers.CharField(source='student.username', read_only=True)

    class Meta:
        model = Review
        fields = [
            'id',
            'internship',
            'student',
            'rating',
            'comment',
            'created_at',
        ]
        read_only_fields = ['student', 'created_at']

    def create(self, validated_data):
        request = self.context.get('request')
        return Review.objects.create(
            student=request.user,
            **validated_data
        )