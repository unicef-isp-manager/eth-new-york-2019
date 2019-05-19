from django.urls import include, path
from rest_framework import routers
from . import views

##router = routers.DefaultRouter()
##router.register(r'schools', views.SchoolViewSet)
##router.register(r'isps', views.IspViewSet)

# Wire up our API using automatic URL routing.
# Additionally, we include login URLs for the browsable API.
urlpatterns = [
    path('isps/<pk>/', views.get_isp_status),
    path('schools', views.update_school_connectivity)
]