import { motion } from 'framer-motion';
import { Gift, Star, Coffee, Award, Zap, TrendingUp } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { useToast } from '@/contexts/ToastContext';

const benefits = [
    {
        icon: Coffee,
        title: 'Free Birthday Drink',
        description: 'Celebrate your special day with a complimentary drink of your choice',
    },
    {
        icon: Star,
        title: 'Earn Points',
        description: 'Get 1 point for every RM1 spent on all purchases',
    },
    {
        icon: Gift,
        title: 'Exclusive Rewards',
        description: 'Redeem points for free drinks, food, and merchandise',
    },
    {
        icon: Zap,
        title: 'Early Access',
        description: 'Be the first to try new menu items and seasonal specials',
    },
    {
        icon: Award,
        title: 'Member Discounts',
        description: 'Enjoy special pricing and promotions throughout the year',
    },
    {
        icon: TrendingUp,
        title: 'Tier Benefits',
        description: 'Unlock more perks as you reach higher membership tiers',
    },
];

const tiers = [
    {
        name: 'Green',
        points: '0-299',
        color: 'bg-green-500',
        benefits: ['Earn 1 point per RM1', 'Birthday reward', 'Mobile ordering'],
    },
    {
        name: 'Gold',
        points: '300-999',
        color: 'bg-yellow-500',
        benefits: ['All Green benefits', 'Extra point days', 'Free drink every month'],
    },
    {
        name: 'Platinum',
        points: '1000+',
        color: 'bg-purple-500',
        benefits: ['All Gold benefits', 'Priority service', 'Exclusive events access'],
    },
];

export function RewardsPage() {
    const { showToast } = useToast();

    const handleJoinRewards = () => {
        showToast('Rewards program registration coming soon!', 'info');
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
                        <div className="inline-flex items-center justify-center w-20 h-20 bg-coffee-gold rounded-full mb-6">
                            <Star className="w-10 h-10 text-coffee-dark" />
                        </div>
                        <h1 className="text-4xl md:text-5xl lg:text-6xl font-display font-bold mb-4">
                            Kacip Rewards
                        </h1>
                        <p className="text-xl text-white/90 max-w-2xl mx-auto mb-8">
                            Join our rewards program and start earning points with every purchase
                        </p>
                        <Button
                            size="lg"
                            className="bg-white text-coffee-dark hover:bg-white/90 text-lg px-8 py-6"
                            onClick={handleJoinRewards}
                        >
                            Join Now - It's Free!
                        </Button>
                    </motion.div>
                </div>
            </section>

            {/* How It Works */}
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
                            How It Works
                        </h2>
                        <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                            It's simple! Earn points, unlock rewards, and enjoy exclusive benefits
                        </p>
                    </motion.div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.6, delay: 0.1 }}
                            className="text-center"
                        >
                            <div className="w-16 h-16 bg-gradient-coffee text-white rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-4">
                                1
                            </div>
                            <h3 className="text-xl font-display font-semibold mb-2">Sign Up</h3>
                            <p className="text-muted-foreground">
                                Create your free account in seconds and start earning immediately
                            </p>
                        </motion.div>

                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.6, delay: 0.2 }}
                            className="text-center"
                        >
                            <div className="w-16 h-16 bg-gradient-coffee text-white rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-4">
                                2
                            </div>
                            <h3 className="text-xl font-display font-semibold mb-2">Earn Points</h3>
                            <p className="text-muted-foreground">
                                Get 1 point for every RM1 you spend on drinks, food, and merchandise
                            </p>
                        </motion.div>

                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.6, delay: 0.3 }}
                            className="text-center"
                        >
                            <div className="w-16 h-16 bg-gradient-coffee text-white rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-4">
                                3
                            </div>
                            <h3 className="text-xl font-display font-semibold mb-2">Redeem Rewards</h3>
                            <p className="text-muted-foreground">
                                Use your points to get free drinks, food, and exclusive merchandise
                            </p>
                        </motion.div>
                    </div>
                </div>
            </section>

            {/* Benefits */}
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
                            Member Benefits
                        </h2>
                        <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                            Enjoy exclusive perks and rewards as a Kacip Rewards member
                        </p>
                    </motion.div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {benefits.map((benefit, index) => (
                            <motion.div
                                key={benefit.title}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.6, delay: index * 0.1 }}
                            >
                                <Card className="h-full hover-lift">
                                    <CardContent className="p-6">
                                        <div className="w-12 h-12 bg-gradient-coffee rounded-lg flex items-center justify-center mb-4">
                                            <benefit.icon className="w-6 h-6 text-white" />
                                        </div>
                                        <h3 className="text-lg font-display font-semibold mb-2">
                                            {benefit.title}
                                        </h3>
                                        <p className="text-sm text-muted-foreground">
                                            {benefit.description}
                                        </p>
                                    </CardContent>
                                </Card>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Membership Tiers */}
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
                            Membership Tiers
                        </h2>
                        <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                            Unlock more benefits as you earn points and reach higher tiers
                        </p>
                    </motion.div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
                        {tiers.map((tier, index) => (
                            <motion.div
                                key={tier.name}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.6, delay: index * 0.1 }}
                            >
                                <Card className="h-full hover-lift">
                                    <CardContent className="p-6">
                                        <div className={`w-full h-2 ${tier.color} rounded-full mb-4`} />
                                        <h3 className="text-2xl font-display font-bold mb-2">
                                            {tier.name}
                                        </h3>
                                        <p className="text-sm text-muted-foreground mb-6">
                                            {tier.points} points
                                        </p>
                                        <ul className="space-y-3">
                                            {tier.benefits.map((benefit) => (
                                                <li key={benefit} className="flex items-start gap-2 text-sm">
                                                    <Star className="w-4 h-4 text-coffee-gold mt-0.5 flex-shrink-0" />
                                                    <span>{benefit}</span>
                                                </li>
                                            ))}
                                        </ul>
                                    </CardContent>
                                </Card>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* CTA Section */}
            <section className="section-padding bg-gradient-coffee text-white">
                <div className="container-custom text-center">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                    >
                        <h2 className="text-4xl md:text-5xl font-display font-bold mb-6">
                            Ready to Start Earning?
                        </h2>
                        <p className="text-xl mb-8 text-white/90 max-w-2xl mx-auto">
                            Join thousands of coffee lovers and start enjoying exclusive rewards today
                        </p>
                        <Button
                            size="lg"
                            className="bg-white text-coffee-dark hover:bg-white/90 text-lg px-8 py-6"
                            onClick={handleJoinRewards}
                        >
                            Create Your Account
                        </Button>
                    </motion.div>
                </div>
            </section>
        </div>
    );
}
