import type { Store } from '@/types';

export const stores: Store[] = [
    {
        id: 'store-kl-central',
        name: 'KL Central',
        address: 'Lot G-23, Ground Floor, Nu Sentral',
        city: 'Kuala Lumpur',
        state: 'Federal Territory',
        zipCode: '50470',
        phone: '+60 3-2274 1234',
        coordinates: {
            lat: 3.1336,
            lng: 101.6869,
        },
        hours: {
            monday: '7:00 AM - 10:00 PM',
            tuesday: '7:00 AM - 10:00 PM',
            wednesday: '7:00 AM - 10:00 PM',
            thursday: '7:00 AM - 10:00 PM',
            friday: '7:00 AM - 11:00 PM',
            saturday: '8:00 AM - 11:00 PM',
            sunday: '8:00 AM - 10:00 PM',
        },
        features: ['wifi', 'parking', 'mobile-order', 'delivery'],
        image: '/images/store-kl-central.jpg',
    },
    {
        id: 'store-pavilion',
        name: 'Pavilion KL',
        address: 'Level 3, Pavilion Kuala Lumpur',
        city: 'Kuala Lumpur',
        state: 'Federal Territory',
        zipCode: '55100',
        phone: '+60 3-2142 5678',
        coordinates: {
            lat: 3.1493,
            lng: 101.7143,
        },
        hours: {
            monday: '10:00 AM - 10:00 PM',
            tuesday: '10:00 AM - 10:00 PM',
            wednesday: '10:00 AM - 10:00 PM',
            thursday: '10:00 AM - 10:00 PM',
            friday: '10:00 AM - 10:00 PM',
            saturday: '10:00 AM - 10:00 PM',
            sunday: '10:00 AM - 10:00 PM',
        },
        features: ['wifi', 'outdoor-seating', 'mobile-order'],
        image: '/images/store-pavilion.jpg',
    },
    {
        id: 'store-bangsar',
        name: 'Bangsar Village',
        address: 'G-12, Bangsar Village II',
        city: 'Kuala Lumpur',
        state: 'Federal Territory',
        zipCode: '59100',
        phone: '+60 3-2282 9012',
        coordinates: {
            lat: 3.1285,
            lng: 101.6714,
        },
        hours: {
            monday: '7:30 AM - 9:30 PM',
            tuesday: '7:30 AM - 9:30 PM',
            wednesday: '7:30 AM - 9:30 PM',
            thursday: '7:30 AM - 9:30 PM',
            friday: '7:30 AM - 10:00 PM',
            saturday: '8:00 AM - 10:00 PM',
            sunday: '8:00 AM - 9:30 PM',
        },
        features: ['wifi', 'parking', 'outdoor-seating', 'mobile-order', 'delivery'],
        image: '/images/store-bangsar.jpg',
    },
    {
        id: 'store-mid-valley',
        name: 'Mid Valley Megamall',
        address: 'LG-234, Lower Ground Floor',
        city: 'Kuala Lumpur',
        state: 'Federal Territory',
        zipCode: '58000',
        phone: '+60 3-2938 3456',
        coordinates: {
            lat: 3.1185,
            lng: 101.6774,
        },
        hours: {
            monday: '10:00 AM - 10:00 PM',
            tuesday: '10:00 AM - 10:00 PM',
            wednesday: '10:00 AM - 10:00 PM',
            thursday: '10:00 AM - 10:00 PM',
            friday: '10:00 AM - 10:00 PM',
            saturday: '10:00 AM - 10:00 PM',
            sunday: '10:00 AM - 10:00 PM',
        },
        features: ['wifi', 'parking', 'mobile-order'],
        image: '/images/store-mid-valley.jpg',
    },
    {
        id: 'store-pj',
        name: 'Petaling Jaya',
        address: '45, Jalan SS 2/24, SS 2',
        city: 'Petaling Jaya',
        state: 'Selangor',
        zipCode: '47300',
        phone: '+60 3-7875 2345',
        coordinates: {
            lat: 3.1166,
            lng: 101.6197,
        },
        hours: {
            monday: '7:00 AM - 9:00 PM',
            tuesday: '7:00 AM - 9:00 PM',
            wednesday: '7:00 AM - 9:00 PM',
            thursday: '7:00 AM - 9:00 PM',
            friday: '7:00 AM - 10:00 PM',
            saturday: '8:00 AM - 10:00 PM',
            sunday: '8:00 AM - 9:00 PM',
        },
        features: ['wifi', 'parking', 'drive-thru', 'mobile-order', 'delivery'],
        image: '/images/store-pj.jpg',
    },
    {
        id: 'store-sunway',
        name: 'Sunway Pyramid',
        address: 'LG2.112, Sunway Pyramid Shopping Mall',
        city: 'Subang Jaya',
        state: 'Selangor',
        zipCode: '47500',
        phone: '+60 3-7492 6789',
        coordinates: {
            lat: 3.0733,
            lng: 101.6069,
        },
        hours: {
            monday: '10:00 AM - 10:00 PM',
            tuesday: '10:00 AM - 10:00 PM',
            wednesday: '10:00 AM - 10:00 PM',
            thursday: '10:00 AM - 10:00 PM',
            friday: '10:00 AM - 10:00 PM',
            saturday: '10:00 AM - 10:00 PM',
            sunday: '10:00 AM - 10:00 PM',
        },
        features: ['wifi', 'parking', 'outdoor-seating', 'mobile-order'],
        image: '/images/store-sunway.jpg',
    },
];

export const getStoreById = (id: string) => {
    return stores.find(store => store.id === id);
};

export const getStoresByCity = (city: string) => {
    return stores.filter(store => store.city.toLowerCase() === city.toLowerCase());
};

export const getNearbyStores = (lat: number, lng: number, radiusKm: number = 10) => {
    // Simple distance calculation (Haversine formula)
    const toRad = (value: number) => (value * Math.PI) / 180;

    return stores.filter(store => {
        const R = 6371; // Earth's radius in km
        const dLat = toRad(store.coordinates.lat - lat);
        const dLng = toRad(store.coordinates.lng - lng);
        const a =
            Math.sin(dLat / 2) * Math.sin(dLat / 2) +
            Math.cos(toRad(lat)) *
            Math.cos(toRad(store.coordinates.lat)) *
            Math.sin(dLng / 2) *
            Math.sin(dLng / 2);
        const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
        const distance = R * c;

        return distance <= radiusKm;
    });
};
