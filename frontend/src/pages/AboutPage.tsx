import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Heart, Users, Leaf, Target } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

const values = [
    {
        icon: Heart,
        title: 'Passion for Coffee',
        description: 'We are dedicated to sourcing and roasting the finest coffee beans, ensuring every cup is exceptional.',
    },
    {
        icon: Users,
        title: 'Community First',
        description: 'Building connections and creating a welcoming space for coffee lovers to gather and connect.',
    },
    {
        icon: Leaf,
        title: 'Sustainability',
        description: 'Committed to ethical sourcing and environmentally responsible practices throughout our supply chain.',
    },
    {
        icon: Target,
        title: 'Accessibility',
        description: 'Making specialty coffee accessible to everyone, because great coffee should be a necessity, not a luxury.',
    },
];

const milestones = [
    { year: '2020', title: 'Founded', description: 'Started our journey with a single store in Kuala Lumpur' },
    { year: '2021', title: 'Expansion', description: 'Opened 5 new locations across Malaysia' },
    { year: '2022', title: 'Rewards Launch', description: 'Introduced our customer loyalty program' },
    { year: '2023', title: 'Going Green', description: 'Achieved 100% sustainable sourcing' },
    { year: '2024', title: 'Innovation', description: 'Launched mobile app and delivery service' },
];

export function AboutPage() {
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
                            Our Story
                        </h1>
                        <p className="text-xl text-white/90 max-w-3xl mx-auto">
                            Bringing specialty coffee to everyone, one cup at a time
                        </p>
                    </motion.div>
                </div>
            </section>

            {/* Mission Section */}
            <section className="section-padding bg-background">
                <div className="container-custom max-w-4xl">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                        className="text-center mb-16"
                    >
                        <h2 className="text-4xl md:text-5xl font-display font-bold mb-6">
                            A Necessity, Not a Luxury
                        </h2>
                        <div className="space-y-4 text-lg text-muted-foreground">
                            <p>
                                For many, coffee is a daily need. Specialty coffee, however, is often seen as a luxury.
                                We started Kacip Coffee to change this perception.
                            </p>
                            <p>
                                Our mission is simple: make exceptional coffee accessible to everyone. We believe that
                                great coffee shouldn't be reserved for special occasions or come with a premium price tag.
                            </p>
                            <p>
                                By combining quality ingredients, expert craftsmanship, and efficient operations, we've
                                created a coffee experience that's both exceptional and affordable.
                            </p>
                        </div>
                    </motion.div>
                </div>
            </section>

            {/* Values Section */}
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
                            Our Values
                        </h2>
                        <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                            The principles that guide everything we do
                        </p>
                    </motion.div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        {values.map((value, index) => (
                            <motion.div
                                key={value.title}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.6, delay: index * 0.1 }}
                            >
                                <Card className="h-full hover-lift">
                                    <CardContent className="p-8">
                                        <div className="w-16 h-16 bg-gradient-coffee rounded-full flex items-center justify-center mb-6">
                                            <value.icon className="w-8 h-8 text-white" />
                                        </div>
                                        <h3 className="text-2xl font-display font-bold mb-3">
                                            {value.title}
                                        </h3>
                                        <p className="text-muted-foreground">
                                            {value.description}
                                        </p>
                                    </CardContent>
                                </Card>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Timeline Section */}
            <section className="section-padding bg-background">
                <div className="container-custom max-w-4xl">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                        className="text-center mb-16"
                    >
                        <h2 className="text-4xl md:text-5xl font-display font-bold mb-4">
                            Our Journey
                        </h2>
                        <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                            From a single store to a growing community of coffee lovers
                        </p>
                    </motion.div>

                    <div className="space-y-8">
                        {milestones.map((milestone, index) => (
                            <motion.div
                                key={milestone.year}
                                initial={{ opacity: 0, x: -20 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.6, delay: index * 0.1 }}
                                className="flex gap-6 items-start"
                            >
                                <div className="flex-shrink-0">
                                    <div className="w-20 h-20 bg-gradient-coffee text-white rounded-full flex items-center justify-center font-display font-bold text-lg">
                                        {milestone.year}
                                    </div>
                                </div>
                                <div className="flex-1 pt-2">
                                    <h3 className="text-2xl font-display font-bold mb-2">
                                        {milestone.title}
                                    </h3>
                                    <p className="text-muted-foreground">
                                        {milestone.description}
                                    </p>
                                </div>
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
                            Join Our Coffee Community
                        </h2>
                        <p className="text-xl mb-8 text-white/90 max-w-2xl mx-auto">
                            Be part of our mission to make specialty coffee accessible to everyone
                        </p>
                        <div className="flex flex-col sm:flex-row gap-4 justify-center">
                            <Button
                                size="lg"
                                className="bg-white text-coffee-dark hover:bg-white/90"
                                asChild
                            >
                                <Link to="/stores">Visit a Store</Link>
                            </Button>
                            <Button
                                size="lg"
                                variant="outline"
                                className="bg-white/10 backdrop-blur-sm border-2 border-white text-white hover:bg-white/20"
                                asChild
                            >
                                <Link to="/rewards">Join Rewards</Link>
                            </Button>
                        </div>
                    </motion.div>
                </div>
            </section>
        </div>
    );
}
