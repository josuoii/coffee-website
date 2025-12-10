import { Link } from 'react-router-dom';
import { Coffee, Facebook, Instagram, Twitter, Mail, Phone, MapPin } from 'lucide-react';

const footerLinks = {
    company: [
        { name: 'Our Story', path: '/about' },
        { name: 'Careers', path: '/careers' },
        { name: 'Social Impact', path: '/social-impact' },
        { name: 'Press', path: '/press' },
    ],
    customer: [
        { name: 'Menu', path: '/menu' },
        { name: 'Rewards', path: '/rewards' },
        { name: 'Find a Store', path: '/stores' },
        { name: 'Gift Cards', path: '/gift-cards' },
    ],
    support: [
        { name: 'Contact Us', path: '/contact' },
        { name: 'FAQ', path: '/faq' },
        { name: 'Terms of Service', path: '/terms' },
        { name: 'Privacy Policy', path: '/privacy' },
    ],
};

const socialLinks = [
    { icon: Facebook, href: 'https://facebook.com', label: 'Facebook' },
    { icon: Instagram, href: 'https://instagram.com', label: 'Instagram' },
    { icon: Twitter, href: 'https://twitter.com', label: 'Twitter' },
];

export function Footer() {
    const currentYear = new Date().getFullYear();

    return (
        <footer className="bg-coffee-dark text-coffee-cream">
            <div className="container-custom section-padding">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12 mb-12">
                    {/* Brand Section */}
                    <div className="lg:col-span-2">
                        <Link
                            to="/"
                            className="flex items-center gap-2 text-2xl font-display font-bold mb-4 hover:text-coffee-gold transition-colors"
                        >
                            <Coffee className="w-8 h-8" />
                            <span>Kacip Coffee</span>
                        </Link>
                        <p className="text-coffee-cream/80 mb-6 max-w-sm">
                            Specialty coffee made accessible. We believe great coffee should be a daily necessity, not a luxury.
                        </p>

                        {/* Contact Info */}
                        <div className="space-y-3 text-sm">
                            <div className="flex items-center gap-2">
                                <Phone className="w-4 h-4" />
                                <a href="tel:+60321234567" className="hover:text-coffee-gold transition-colors">
                                    +60 3-2123 4567
                                </a>
                            </div>
                            <div className="flex items-center gap-2">
                                <Mail className="w-4 h-4" />
                                <a href="mailto:hello@kacipcoffee.com" className="hover:text-coffee-gold transition-colors">
                                    hello@kacipcoffee.com
                                </a>
                            </div>
                            <div className="flex items-start gap-2">
                                <MapPin className="w-4 h-4 mt-0.5" />
                                <span className="text-coffee-cream/80">
                                    Kuala Lumpur, Malaysia
                                </span>
                            </div>
                        </div>
                    </div>

                    {/* Company Links */}
                    <div>
                        <h3 className="font-display font-semibold text-lg mb-4">Company</h3>
                        <ul className="space-y-3">
                            {footerLinks.company.map((link) => (
                                <li key={link.path}>
                                    <Link
                                        to={link.path}
                                        className="text-coffee-cream/80 hover:text-coffee-gold transition-colors text-sm"
                                    >
                                        {link.name}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Customer Links */}
                    <div>
                        <h3 className="font-display font-semibold text-lg mb-4">Customer</h3>
                        <ul className="space-y-3">
                            {footerLinks.customer.map((link) => (
                                <li key={link.path}>
                                    <Link
                                        to={link.path}
                                        className="text-coffee-cream/80 hover:text-coffee-gold transition-colors text-sm"
                                    >
                                        {link.name}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Support Links */}
                    <div>
                        <h3 className="font-display font-semibold text-lg mb-4">Support</h3>
                        <ul className="space-y-3">
                            {footerLinks.support.map((link) => (
                                <li key={link.path}>
                                    <Link
                                        to={link.path}
                                        className="text-coffee-cream/80 hover:text-coffee-gold transition-colors text-sm"
                                    >
                                        {link.name}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>

                {/* Bottom Section */}
                <div className="pt-8 border-t border-coffee-cream/20">
                    <div className="flex flex-col md:flex-row justify-between items-center gap-6">
                        {/* Copyright */}
                        <p className="text-sm text-coffee-cream/60">
                            © {currentYear} Kacip Coffee. All rights reserved.
                        </p>

                        {/* Social Links */}
                        <div className="flex items-center gap-4">
                            {socialLinks.map((social) => (
                                <a
                                    key={social.label}
                                    href={social.href}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="w-10 h-10 rounded-full bg-coffee-cream/10 hover:bg-coffee-gold hover:text-coffee-dark flex items-center justify-center transition-all duration-300"
                                    aria-label={social.label}
                                >
                                    <social.icon className="w-5 h-5" />
                                </a>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    );
}
