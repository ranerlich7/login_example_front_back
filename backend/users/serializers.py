from django.contrib.auth.models import User
from rest_framework import serializers
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['id', 'username', 'email', 'first_name', 'last_name']
        # You can include more fields if you want

class CustomTokenObtainPairSerializer(TokenObtainPairSerializer):
    """
    Custom JWT Token Serializer to include additional user data.
    """
    def validate(self, attrs):
        # Get the default token validation response
        data = super().validate(attrs)
        refresh_token = self.get_token(self.user)

        # Add additional information to the token (e.g., user profile data)
        user = self.user
        print("user is", user)

        # Optionally, add any custom fields from your User model or Profile model
        refresh_token['username'] = user.username
        refresh_token['is_staff'] = user.is_staff
        data['access'] = str(refresh_token)
        print('data returend is:',data)
        return data
