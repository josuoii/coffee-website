import { useState } from 'react';
import { motion } from 'framer-motion';
import { MapPin, Phone, Clock, Wifi, Car, Coffee as CoffeeIcon, Navigation } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { stores } from '@/data/stores';
import type { StoreFeature } from '@/types';
import { useToast } from '@/contexts/ToastContext';

const featureIcons: Record<StoreFeature, typeof Wifi> = {
    wifi: Wifi,
    parking: Car,
    'outdoor-seating': CoffeeIcon,
    'drive-thru': Car,
    'mobile-order': CoffeeIcon,
    delivery: Navigation,
};

const featureLabels: Record<StoreFeature, string> = {
    wifi: 'Free WiFi',
    parking: 'Parking',
    'outdoor-seating': 'Outdoor Seating',
    'drive-thru': 'Drive-Thru',
    'mobile-order': 'Mobile Order',
    delivery: 'Delivery',
};

export function StoresPage() {
    const [selectedCity, setSelectedCity] = useState<string>('all');
    const { showToast } = useToast();

    const cities = ['all', ...Array.from(new Set(stores.map(store => store.city)))];

    const filteredStores = selectedCity === 'all'
        ? stores
        : stores.filter(store => store.city === selectedCity);

    const getCurrentDay = () => {
        const days = ['sunday', 'monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday'];
        return days[new Date().getDay()];
    };

    return (
        <div className="min-h-screen pt-20">
            {/* Hero Section */}
            <section className="bg-gradient-coffee text-white py-16 md:py-24">
                <div className="container-custom text-center">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                    >
                        <h1 className="text-4xl md:text-5xl lg:text-6xl font-display font-bold mb-4">
                            Find a Store
                        </h1>
                        <p className="text-xl text-white/90 max-w-2xl mx-auto">
                            Visit us at any of our locations across Malaysia
                        </p>
                    </motion.div>
                </div>
            </section>

            {/* Filter Section */}
            <section className="sticky top-20 z-40 bg-background/95 backdrop-blur-md border-b shadow-sm">
                <div className="container-custom py-6">
                    <div className="flex gap-2 overflow-x-auto pb-2">
                        {cities.map((city) => (
                            <Button
                                key={city}
                                variant={selectedCity === city ? 'default' : 'outline'}
                                onClick={() => setSelectedCity(city)}
                                className={selectedCity === city ? 'bg-gradient-coffee' : ''}
                            >
                                {city === 'all' ? 'All Locations' : city}
                            </Button>
                        ))}
                    </div>
                </div>
            </section>

            {/* Stores Grid */}
            <section className="section-padding">
                <div className="container-custom">
                    <div className="mb-6 text-muted-foreground">
                        Showing {filteredStores.length} {filteredStores.length === 1 ? 'store' : 'stores'}
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                        {filteredStores.map((store, index) => (
                            <motion.div
                                key={store.id}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.4, delay: index * 0.05 }}
                            >
                                <Card className="h-full hover-lift overflow-hidden">
                                    {/* Store Image Placeholder */}
                                    <div className="h-48 bg-gradient-cream relative">
                                        <div className="absolute inset-0 flex items-center justify-center">
                                            <CoffeeIcon className="w-24 h-24 text-coffee-medium/20" />
                                        </div>
                                        <div className="absolute bottom-4 left-4 bg-white/90 backdrop-blur-sm px-4 py-2 rounded-lg">
                                            <p className="text-sm font-medium text-coffee-dark">
                                                {store.city}, {store.state}
                                            </p>
                                        </div>
                                    </div>

                                    <CardContent className="p-6">
                                        <h3 className="text-2xl font-display font-bold mb-4">
                                            {store.name}
                                        </h3>

                                        {/* Address */}
                                        <div className="flex items-start gap-3 mb-4">
                                            <MapPin className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
                                            <div>
                                                <p className="text-sm font-medium">{store.address}</p>
                                                <p className="text-sm text-muted-foreground">
                                                    {store.city}, {store.state} {store.zipCode}
                                                </p>
                                            </div>
                                        </div>

                                        {/* Phone */}
                                        <div className="flex items-center gap-3 mb-4">
                                            <Phone className="w-5 h-5 text-primary flex-shrink-0" />
                                            <a
                                                href={`tel:${store.phone}`}
                                                className="text-sm font-medium hover:text-primary transition-colors"
                                            >
                                                {store.phone}
                                            </a>
                                        </div>

                                        {/* Hours */}
                                        <div className="flex items-start gap-3 mb-6">
                                            <Clock className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
                                            <div>
                                                <p className="text-sm font-medium mb-1">Today's Hours</p>
                                                <p className="text-sm text-muted-foreground">
                                                    {store.hours[getCurrentDay() as keyof typeof store.hours]}
                                                </p>
                                            </div>
                                        </div>

                                        {/* Features */}
                                        <div className="mb-6">
                                            <p className="text-sm font-medium mb-3">Amenities</p>
                                            <div className="flex flex-wrap gap-2">
                                                {store.features.map((feature) => {
                                                    const Icon = featureIcons[feature];
                                                    return (
                                                        <div
                                                            key={feature}
                                                            className="flex items-center gap-1.5 px-3 py-1.5 bg-coffee-light/50 rounded-full text-xs font-medium"
                                                        >
                                                            <Icon className="w-3.5 h-3.5" />
                                                            {featureLabels[feature]}
                                                        </div>
                                                    );
                                                })}
                                            </div>
                                        </div>

                                        {/* Actions */}
                                        <div className="flex gap-3">
                                            <Button
                                                className="flex-1 bg-gradient-coffee"
                                                onClick={() => {
                                                    window.open(
                                                        `https://www.google.com/maps/search/?api=1&query=${store.coordinates.lat},${store.coordinates.lng}`,
                                                        '_blank'
                                                    );
                                                }}
                                            >
                                                <Navigation className="w-4 h-4 mr-2" />
                                                Get Directions
                                            </Button>
                                            <Button
                                                variant="outline"
                                                className="flex-1"
                                                onClick={() => showToast('Order feature coming soon!', 'info')}
                                            >
                                                Order Now
                                            </Button>
                                        </div>
                                    </CardContent>
                                </Card>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Info Section */}
            <section className="bg-coffee-light/30 py-12">
                <div className="container-custom text-center">
                    <h2 className="text-2xl md:text-3xl font-display font-bold mb-4">
                        Can't Find a Store Near You?
                    </h2>
                    <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
                        We're constantly expanding! Check back soon or sign up for our newsletter to be notified when we open new locations.
                    </p>
                    <Button
                        size="lg"
                        className="bg-gradient-coffee"
                        onClick={() => showToast('Notification feature coming soon!', 'info')}
                    >
                        Notify Me
                    </Button>
                </div>
            </section>
        </div>
    );
}
