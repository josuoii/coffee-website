import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, ShoppingCart, User, Coffee, Shield } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useCart } from '@/contexts/CartContext';
import { useToast } from '@/contexts/ToastContext';
import { useAuth } from '@/contexts/AuthContext';

const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'Menu', path: '/menu' },
    { name: 'Rewards', path: '/rewards' },
    { name: 'Stores', path: '/stores' },
    { name: 'About', path: '/about' },
];

export function Header() {
    const [isScrolled, setIsScrolled] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const location = useLocation();
    const { getTotalItems } = useCart();
    const { showToast } = useToast();
    const { isAuthenticated, isAdmin } = useAuth();

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 20);
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    // Close mobile menu when route changes
    useEffect(() => {
        setIsMobileMenuOpen(false);
    }, [location.pathname]);

    return (
        <header
            className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${isScrolled
                ? 'bg-background/95 backdrop-blur-md shadow-md'
                : 'bg-transparent'
                }`}
        >
            <nav className="container-custom">
                <div className="flex items-center justify-between h-20">
                    {/* Logo */}
                    <Link
                        to="/"
                        className="flex items-center gap-2 text-2xl font-display font-bold text-primary hover:text-coffee-dark transition-colors"
                    >
                        <Coffee className="w-8 h-8" />
                        <span className="hidden sm:inline">Kacip Coffee</span>
                    </Link>

                    {/* Desktop Navigation */}
                    <div className="hidden md:flex items-center gap-8">
                        {navLinks.map((link) => (
                            <Link
                                key={link.path}
                                to={link.path}
                                className={`text-sm font-medium transition-colors relative group ${location.pathname === link.path
                                    ? 'text-primary'
                                    : 'text-foreground/70 hover:text-primary'
                                    }`}
                            >
                                {link.name}
                                <span
                                    className={`absolute -bottom-1 left-0 h-0.5 bg-primary transition-all duration-300 ${location.pathname === link.path
                                        ? 'w-full'
                                        : 'w-0 group-hover:w-full'
                                        }`}
                                />
                            </Link>
                        ))}
                    </div>

                    {/* Right Actions */}
                    <div className="flex items-center gap-4">
                        <Button
                            variant="ghost"
                            size="icon"
                            className="relative"
                            aria-label="Shopping cart"
                        >
                            <ShoppingCart className="w-5 h-5" />
                            {getTotalItems() > 0 && (
                                <span className="absolute -top-1 -right-1 w-5 h-5 bg-primary text-primary-foreground text-xs rounded-full flex items-center justify-center">
                                    {getTotalItems()}
                                </span>
                            )}
                        </Button>

                        {/* Admin Panel Button - Only show for admins */}
                        {isAdmin && (
                            <Link to="/admin">
                                <Button
                                    variant="ghost"
                                    size="icon"
                                    className="hidden md:flex"
                                    aria-label="Admin panel"
                                >
                                    <Shield className="w-5 h-5" />
                                </Button>
                            </Link>
                        )}

                        {/* Login/User Button */}
                        {isAuthenticated ? (
                            <Link to="/admin">
                                <Button
                                    variant="ghost"
                                    size="icon"
                                    className="hidden md:flex"
                                    aria-label="User account"
                                >
                                    <User className="w-5 h-5" />
                                </Button>
                            </Link>
                        ) : (
                            <Link to="/login">
                                <Button
                                    variant="ghost"
                                    size="icon"
                                    className="hidden md:flex"
                                    aria-label="Login"
                                >
                                    <User className="w-5 h-5" />
                                </Button>
                            </Link>
                        )}

                        <Button
                            className="hidden md:flex bg-gradient-coffee hover:opacity-90 transition-opacity"
                            onClick={() => showToast('Order feature coming soon!', 'info')}
                        >
                            Order Now
                        </Button>

                        {/* Mobile Menu Button */}
                        <Button
                            variant="ghost"
                            size="icon"
                            className="md:hidden"
                            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                            aria-label="Toggle menu"
                        >
                            {isMobileMenuOpen ? (
                                <X className="w-6 h-6" />
                            ) : (
                                <Menu className="w-6 h-6" />
                            )}
                        </Button>
                    </div>
                </div>
            </nav>

            {/* Mobile Menu */}
            <AnimatePresence>
                {isMobileMenuOpen && (
                    <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.3 }}
                        className="md:hidden bg-background border-t"
                    >
                        <div className="container-custom py-6 space-y-4">
                            {navLinks.map((link) => (
                                <Link
                                    key={link.path}
                                    to={link.path}
                                    className={`block py-2 text-lg font-medium transition-colors ${location.pathname === link.path
                                        ? 'text-primary'
                                        : 'text-foreground/70 hover:text-primary'
                                        }`}
                                >
                                    {link.name}
                                </Link>
                            ))}
                            <div className="pt-4 space-y-3">
                                {/* Admin Panel Button for Mobile */}
                                {isAdmin && (
                                    <Link to="/admin">
                                        <Button
                                            variant="outline"
                                            className="w-full"
                                        >
                                            <Shield className="w-4 h-4 mr-2" />
                                            Admin Panel
                                        </Button>
                                    </Link>
                                )}

                                <Button
                                    className="w-full bg-gradient-coffee"
                                    onClick={() => showToast('Order feature coming soon!', 'info')}
                                >
                                    Order Now
                                </Button>

                                {/* Login/User Button for Mobile */}
                                {isAuthenticated ? (
                                    <Link to="/admin">
                                        <Button
                                            variant="outline"
                                            className="w-full"
                                        >
                                            <User className="w-4 h-4 mr-2" />
                                            My Account
                                        </Button>
                                    </Link>
                                ) : (
                                    <Link to="/login">
                                        <Button
                                            variant="outline"
                                            className="w-full"
                                        >
                                            <User className="w-4 h-4 mr-2" />
                                            Sign In
                                        </Button>
                                    </Link>
                                )}
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </header>
    );
}
