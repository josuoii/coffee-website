from rest_framework import serializers
from .models import Category, Product, ProductImage, ProductVariant, SubscriptionPlan


class CategorySerializer(serializers.ModelSerializer):
    class Meta:
        model = Category
        fields = ['id', 'name', 'slug', 'description', 'image', 'is_active']


class ProductImageSerializer(serializers.ModelSerializer):
    class Meta:
        model = ProductImage
        fields = ['id', 'image', 'alt_text', 'is_featured', 'position']


class ProductVariantSerializer(serializers.ModelSerializer):
    class Meta:
        model = ProductVariant
        fields = ['id', 'name', 'sku', 'price', 'compare_price', 'stock_quantity', 'weight', 'is_active']


class ProductSerializer(serializers.ModelSerializer):
    category = CategorySerializer(read_only=True)
    category_id = serializers.PrimaryKeyRelatedField(
        queryset=Category.objects.all(),
        source='category',
        write_only=True
    )
    images = ProductImageSerializer(many=True, read_only=True)
    variants = ProductVariantSerializer(many=True, read_only=True)
    is_in_stock = serializers.BooleanField(read_only=True)
    discount_percentage = serializers.IntegerField(read_only=True)
    
    class Meta:
        model = Product
        fields = [
            'id', 'name', 'slug', 'description', 'short_description',
            'product_type', 'category', 'category_id', 'price', 'compare_price',
            'cost_per_cup', 'sku', 'barcode', 'track_inventory', 'stock_quantity',
            'weight', 'dimensions', 'origin', 'roast_level', 'flavor_notes',
            'caffeine_content', 'is_featured', 'is_digital', 'requires_shipping',
            'tax_status', 'status', 'created_at', 'updated_at', 'images',
            'variants', 'is_in_stock', 'discount_percentage'
        ]
        read_only_fields = ['created_at', 'updated_at']


class ProductListSerializer(serializers.ModelSerializer):
    """Lightweight serializer for product lists"""
    category_name = serializers.CharField(source='category.name', read_only=True)
    image = serializers.SerializerMethodField()
    is_in_stock = serializers.BooleanField(read_only=True)
    
    class Meta:
        model = Product
        fields = [
            'id', 'name', 'slug', 'short_description', 'category_name',
            'price', 'compare_price', 'image', 'is_featured', 'status',
            'is_in_stock', 'stock_quantity'
        ]
    
    def get_image(self, obj):
        featured_image = obj.images.filter(is_featured=True).first()
        if featured_image:
            request = self.context.get('request')
            if request:
                return request.build_absolute_uri(featured_image.image.url)
        return None


class SubscriptionPlanSerializer(serializers.ModelSerializer):
    products = ProductListSerializer(many=True, read_only=True)
    product_ids = serializers.PrimaryKeyRelatedField(
        queryset=Product.objects.all(),
        source='products',
        write_only=True,
        many=True
    )
    
    class Meta:
        model = SubscriptionPlan
        fields = ['id', 'name', 'description', 'price', 'delivery_frequency', 
                  'products', 'product_ids', 'is_active', 'created_at']
        read_only_fields = ['created_at']
