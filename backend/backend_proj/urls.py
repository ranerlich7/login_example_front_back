from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView
from django.contrib import admin
from django.urls import path
from users.views import UserDetailView, CustomTokenObtainPairView

urlpatterns = [
    path('admin/', admin.site.urls),
    # your other URLs
    path('login/', CustomTokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('refresh/', TokenRefreshView.as_view(), name='token_refresh'),
    path('user/<int:id>/', UserDetailView.as_view(), name='user-detail'),

]

