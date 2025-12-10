from django.urls import path, include
from rest_framework.routers import DefaultRouter
from . import views

router = DefaultRouter(trailing_slash=False)
router.register(r'categories', views.CategoryViewSet)
router.register(r'products', views.ProductViewSet)
router.register(r'product-images', views.ProductImageViewSet)
router.register(r'product-variants', views.ProductVariantViewSet)
router.register(r'subscription-plans', views.SubscriptionPlanViewSet)

urlpatterns = [
    path('', include(router.urls)),
]

