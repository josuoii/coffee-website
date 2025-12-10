import { motion, useInView } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowRight, Coffee, Award, Truck, Heart, Star, Users, Store, TrendingUp } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { getPopularItems, getNewItems } from '@/data/menu';
import { useCart } from '@/contexts/CartContext';
import { useToast } from '@/contexts/ToastContext';
import { useRef, useEffect, useState, useMemo, useCallback, memo } from 'react';

const features = [
    {
        icon: Coffee,
        title: 'Premium Quality',
        description: 'Hand-selected beans from the finest coffee farms worldwide',
    },
    {
        icon: Award,
        title: 'Expert Baristas',
        description: 'Trained professionals crafting your perfect cup every time',
    },
    {
        icon: Truck,
        title: 'Fast Delivery',
        description: 'Quick pickup and delivery options for your convenience',
    },
    {
        icon: Heart,
        title: 'Made with Love',
        description: 'Every cup is crafted with passion and attention to detail',
    },
];

const stats = [
    { icon: Users, label: 'Happy Customers', value: 50000, suffix: '+' },
    { icon: Store, label: 'Locations', value: 25, suffix: '+' },
    { icon: Coffee, label: 'Cups Served', value: 1000000, suffix: '+' },
    { icon: Star, label: 'Average Rating', value: 4.9, suffix: '/5' },
];

const testimonials = [
    {
        name: 'Sarah Ahmad',
        role: 'Coffee Enthusiast',
        content: 'The best coffee experience in town! The quality is consistently excellent and the staff are always friendly.',
        rating: 5,
    },
    {
        name: 'Michael Tan',
        role: 'Regular Customer',
        content: 'I come here every morning. Their signature blend is absolutely perfect, and the rewards program is amazing!',
        rating: 5,
    },
    {
        name: 'Aisha Rahman',
        role: 'Food Blogger',
        content: 'A hidden gem! The ambiance, the coffee, everything is top-notch. Highly recommended for coffee lovers.',
        rating: 5,
    },
];

// Animated Counter Component - Memoized to prevent unnecessary re-renders
const AnimatedCounter = memo(function AnimatedCounter({ value, suffix = '' }: { value: number; suffix?: string }) {
    const [count, setCount] = useState(0);
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true });

    useEffect(() => {
        if (!isInView) return;

        const duration = 2000;
        const steps = 60;
        const increment = value / steps;
        let current = 0;

        const timer = setInterval(() => {
            current += increment;
            if (current >= value) {
                setCount(value);
                clearInterval(timer);
            } else {
                setCount(Math.floor(current));
            }
        }, duration / steps);

        return () => clearInterval(timer);
    }, [isInView, value]);

    return (
        <span ref={ref}>
            {count.toLocaleString()}
            {suffix}
        </span>
    );
});

export function HomePage() {
    // Memoize expensive queries - only recalculate when dependencies change
    const popularItems = useMemo(() => getPopularItems().slice(0, 3), []);
    const newItems = useMemo(() => getNewItems().slice(0, 3), []);

    const { addItem } = useCart();
    const { showToast } = useToast();

    // Memoize callback to prevent recreation on every render
    const handleAddToCart = useCallback((item: typeof popularItems[0]) => {
        addItem(item);
        showToast(`${item.name} added to cart!`);
    }, [addItem, showToast]);

    return (
        <div className="min-h-screen">
            {/* Hero Section */}
            <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-coffee">
                {/* Animated Background Pattern */}
                <div className="absolute inset-0 opacity-10">
                    <div className="absolute inset-0" style={{
                        backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
                    }} />
                </div>

                {/* Gradient Overlay for depth */}
                <div className="absolute inset-0 bg-gradient-to-b from-transparent via-coffee-dark/10 to-coffee-dark/30" />

                <div className="container-custom relative z-10 text-center text-white px-4">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8 }}
                    >
                        {/* Badge */}
                        <motion.div
                            initial={{ opacity: 0, scale: 0.8 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ delay: 0.2, duration: 0.5 }}
                            className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm border border-white/20 px-4 py-2 rounded-full mb-6"
                        >
                            <Coffee className="w-4 h-4 text-coffee-gold" />
                            <span className="text-sm font-semibold">Premium Coffee Experience</span>
                        </motion.div>

                        <h1 className="text-5xl md:text-7xl lg:text-8xl font-display font-bold mb-6 text-shadow-lg leading-tight">
                            Specialty Coffee,
                            <br />
                            <span className="text-coffee-gold bg-clip-text">Made Accessible</span>
                        </h1>
                        <p className="text-xl md:text-2xl lg:text-3xl mb-10 text-white/90 max-w-3xl mx-auto leading-relaxed">
                            Great coffee should be a daily necessity, not a luxury. Experience the perfect brew, every time.
                        </p>
                        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                            <Button
                                size="lg"
                                className="bg-coffee-gold text-coffee-dark hover:bg-coffee-gold/90 text-lg px-10 py-7 shadow-2xl hover:shadow-coffee-gold/50 transition-all duration-300 hover:scale-105"
                                asChild
                            >
                                <Link to="/menu">
                                    Explore Menu
                                    <ArrowRight className="ml-2 w-5 h-5" />
                                </Link>
                            </Button>
                            <Button
                                size="lg"
                                variant="outline"
                                className="bg-white/10 backdrop-blur-sm border-white/30 text-white hover:bg-white/20 text-lg px-10 py-7 hover:scale-105 transition-all duration-300"
                                asChild
                            >
                                <Link to="/stores">Find a Store</Link>
                            </Button>
                        </div>
                    </motion.div>

                    {/* Scroll Indicator */}
                    <motion.div
                        className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 1, duration: 1 }}
                    >
                        <motion.div
                            animate={{ y: [0, 10, 0] }}
                            transition={{ repeat: Infinity, duration: 1.5 }}
                            className="w-6 h-10 border-2 border-white/50 rounded-full flex justify-center pt-2"
                        >
                            <div className="w-1 h-2 bg-white/50 rounded-full" />
                        </motion.div>
                    </motion.div>
                </div>
            </section>

            {/* Features Section */}
            <section className="section-padding bg-background">
                <div className="container-custom">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                        className="text-center mb-16"
                    >
                        <h2 className="text-4xl md:text-5xl font-display font-bold mb-4">
                            Why Choose Us
                        </h2>
                        <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                            We're committed to delivering the best coffee experience, from bean to cup
                        </p>
                    </motion.div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                        {features.map((feature, index) => (
                            <motion.div
                                key={feature.title}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.6, delay: index * 0.1 }}
                            >
                                <Card className="h-full hover-lift border-none shadow-lg">
                                    <CardContent className="p-6 text-center">
                                        <div className="w-16 h-16 mx-auto mb-4 bg-gradient-coffee rounded-full flex items-center justify-center">
                                            <feature.icon className="w-8 h-8 text-white" />
                                        </div>
                                        <h3 className="text-xl font-display font-semibold mb-2">
                                            {feature.title}
                                        </h3>
                                        <p className="text-muted-foreground">
                                            {feature.description}
                                        </p>
                                    </CardContent>
                                </Card>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Statistics Section */}
            <section className="section-padding bg-gradient-coffee text-white">
                <div className="container-custom">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                        className="text-center mb-12"
                    >
                        <h2 className="text-4xl md:text-5xl font-display font-bold mb-4">
                            Our Impact
                        </h2>
                        <p className="text-lg text-white/90 max-w-2xl mx-auto">
                            Numbers that speak for our commitment to excellence
                        </p>
                    </motion.div>

                    <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
                        {stats.map((stat, index) => (
                            <motion.div
                                key={stat.label}
                                initial={{ opacity: 0, scale: 0.8 }}
                                whileInView={{ opacity: 1, scale: 1 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.6, delay: index * 0.1 }}
                                className="text-center"
                            >
                                <div className="w-16 h-16 mx-auto mb-4 bg-white/10 backdrop-blur-sm rounded-full flex items-center justify-center">
                                    <stat.icon className="w-8 h-8 text-coffee-gold" />
                                </div>
                                <div className="text-3xl md:text-4xl font-bold mb-2">
                                    <AnimatedCounter value={stat.value} suffix={stat.suffix} />
                                </div>
                                <div className="text-white/80">{stat.label}</div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Popular Items Section */}
            <section className="section-padding bg-coffee-light/30">
                <div className="container-custom">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                        className="text-center mb-16"
                    >
                        <h2 className="text-4xl md:text-5xl font-display font-bold mb-4">
                            Customer Favorites
                        </h2>
                        <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                            Discover our most loved drinks, crafted to perfection
                        </p>
                    </motion.div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
                        {popularItems.map((item, index) => (
                            <motion.div
                                key={item.id}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.6, delay: index * 0.1 }}
                                whileHover={{ y: -8 }}
                            >
                                <Card className="overflow-hidden hover-lift shadow-xl hover:shadow-2xl transition-all duration-300">
                                    <div className="aspect-square bg-gradient-cream relative overflow-hidden group">
                                        <div className="absolute inset-0 flex items-center justify-center transition-transform duration-300 group-hover:scale-110">
                                            <Coffee className="w-24 h-24 text-coffee-medium/20" />
                                        </div>
                                        {item.isPopular && (
                                            <div className="absolute top-4 right-4 bg-coffee-gold text-coffee-dark px-3 py-1 rounded-full text-sm font-semibold shadow-lg">
                                                Popular
                                            </div>
                                        )}
                                        {/* Hover overlay */}
                                        <div className="absolute inset-0 bg-gradient-coffee opacity-0 group-hover:opacity-10 transition-opacity duration-300" />
                                    </div>
                                    <CardContent className="p-6">
                                        <h3 className="text-xl font-display font-semibold mb-2">
                                            {item.name}
                                        </h3>
                                        <p className="text-muted-foreground mb-4 text-sm line-clamp-2">
                                            {item.description}
                                        </p>
                                        <div className="flex items-center justify-between">
                                            <span className="text-2xl font-bold text-primary">
                                                RM {item.price.toFixed(2)}
                                            </span>
                                            <Button
                                                size="sm"
                                                className="bg-gradient-coffee hover:shadow-lg transition-all duration-300"
                                                onClick={() => handleAddToCart(item)}
                                            >
                                                Add to Cart
                                            </Button>
                                        </div>
                                    </CardContent>
                                </Card>
                            </motion.div>
                        ))}
                    </div>

                    <div className="text-center">
                        <Button size="lg" variant="outline" asChild>
                            <Link to="/menu">
                                View Full Menu
                                <ArrowRight className="ml-2 w-5 h-5" />
                            </Link>
                        </Button>
                    </div>
                </div>
            </section>

            {/* New Arrivals Section */}
            <section className="section-padding bg-background">
                <div className="container-custom">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                        className="text-center mb-16"
                    >
                        <div className="inline-flex items-center gap-2 bg-coffee-gold/10 text-coffee-gold px-4 py-2 rounded-full mb-4">
                            <TrendingUp className="w-4 h-4" />
                            <span className="text-sm font-semibold">NEW ARRIVALS</span>
                        </div>
                        <h2 className="text-4xl md:text-5xl font-display font-bold mb-4">
                            Fresh on the Menu
                        </h2>
                        <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                            Be the first to try our latest creations
                        </p>
                    </motion.div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {newItems.map((item, index) => (
                            <motion.div
                                key={item.id}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.6, delay: index * 0.1 }}
                                whileHover={{ y: -8 }}
                            >
                                <Card className="overflow-hidden border-2 border-coffee-gold/20 hover:border-coffee-gold/40 transition-all duration-300 shadow-xl">
                                    <div className="aspect-square bg-gradient-cream relative overflow-hidden group">
                                        <div className="absolute inset-0 flex items-center justify-center transition-transform duration-300 group-hover:scale-110">
                                            <Coffee className="w-24 h-24 text-coffee-medium/20" />
                                        </div>
                                        <div className="absolute top-4 left-4 bg-coffee-gold text-coffee-dark px-3 py-1 rounded-full text-sm font-semibold flex items-center gap-1">
                                            <TrendingUp className="w-3 h-3" />
                                            New
                                        </div>
                                    </div>
                                    <CardContent className="p-6">
                                        <h3 className="text-xl font-display font-semibold mb-2">
                                            {item.name}
                                        </h3>
                                        <p className="text-muted-foreground mb-4 text-sm">
                                            {item.description}
                                        </p>
                                        <div className="flex items-center justify-between">
                                            <span className="text-2xl font-bold text-primary">
                                                RM {item.price.toFixed(2)}
                                            </span>
                                            <Button
                                                size="sm"
                                                className="bg-gradient-coffee"
                                                onClick={() => handleAddToCart(item)}
                                            >
                                                Add to Cart
                                            </Button>
                                        </div>
                                    </CardContent>
                                </Card>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Testimonials Section */}
            <section className="section-padding bg-coffee-light/20">
                <div className="container-custom">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                        className="text-center mb-16"
                    >
                        <h2 className="text-4xl md:text-5xl font-display font-bold mb-4">
                            What Our Customers Say
                        </h2>
                        <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                            Don't just take our word for it - hear from our amazing community
                        </p>
                    </motion.div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {testimonials.map((testimonial, index) => (
                            <motion.div
                                key={testimonial.name}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.6, delay: index * 0.1 }}
                            >
                                <Card className="h-full hover-lift border-none shadow-lg">
                                    <CardContent className="p-6">
                                        <div className="flex gap-1 mb-4">
                                            {[...Array(testimonial.rating)].map((_, i) => (
                                                <Star
                                                    key={i}
                                                    className="w-5 h-5 fill-coffee-gold text-coffee-gold"
                                                />
                                            ))}
                                        </div>
                                        <p className="text-muted-foreground mb-6 italic">
                                            "{testimonial.content}"
                                        </p>
                                        <div className="flex items-center gap-3">
                                            <div className="w-12 h-12 rounded-full bg-gradient-coffee flex items-center justify-center text-white font-semibold">
                                                {testimonial.name.charAt(0)}
                                            </div>
                                            <div>
                                                <div className="font-semibold">{testimonial.name}</div>
                                                <div className="text-sm text-muted-foreground">
                                                    {testimonial.role}
                                                </div>
                                            </div>
                                        </div>
                                    </CardContent>
                                </Card>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* CTA Section */}
            <section className="section-padding bg-gradient-coffee text-white relative overflow-hidden">
                <div className="absolute inset-0 opacity-10">
                    <div className="absolute inset-0" style={{
                        backgroundImage: `url("data:image/svg+xml,%3Csvg width='100' height='100' viewBox='0 0 100 100' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M11 18c3.866 0 7-3.134 7-7s-3.134-7-7-7-7 3.134-7 7 3.134 7 7 7zm48 25c3.866 0 7-3.134 7-7s-3.134-7-7-7-7 3.134-7 7 3.134 7 7 7zm-43-7c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zm63 31c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zM34 90c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zm56-76c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zM12 86c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm28-65c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm23-11c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm-6 60c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm29 22c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zM32 63c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm57-13c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm-9-21c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM60 91c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM35 41c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM12 60c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2z' fill='%23ffffff' fill-opacity='1' fill-rule='evenodd'/%3E%3C/svg%3E")`,
                    }} />
                </div>

                <div className="container-custom relative z-10 text-center">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                    >
                        <h2 className="text-4xl md:text-5xl font-display font-bold mb-6">
                            Join Our Rewards Program
                        </h2>
                        <p className="text-xl mb-8 text-white/90 max-w-2xl mx-auto">
                            Earn points with every purchase and unlock exclusive rewards, free drinks, and special offers
                        </p>
                        <Button
                            size="lg"
                            className="bg-white text-coffee-dark hover:bg-white/90 text-lg px-8 py-6"
                            asChild
                        >
                            <Link to="/rewards">
                                Get Started
                                <ArrowRight className="ml-2 w-5 h-5" />
                            </Link>
                        </Button>
                    </motion.div>
                </div>
            </section>
        </div>
    );
}
