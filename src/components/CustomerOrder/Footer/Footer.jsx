import React from 'react';
import { MapPin, Phone, Clock, Mail, Facebook, Instagram, Twitter } from 'lucide-react';

const Footer = () => {
    const currentYear = new Date().getFullYear();
    
    return (
        <footer className="bg-gradient-to-b from-amber-800 to-amber-900 pt-16 pb-8">
            {/* Top section */}
            <div className="max-w-6xl mx-auto px-4">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">
                    {/* Contact Info */}
                    <div>
                        <h3 className="text-amber-200 font-bold text-xl mb-4">Contact Us</h3>
                        <div className="space-y-3">
                            <div className="flex items-start gap-3 text-amber-100">
                                <MapPin className="w-5 h-5 mt-1 text-orange-400" />
                                <p>Bakery Bliss,<br />Dhak City, Dhaka-1212</p>
                            </div>
                            <div className="flex items-center gap-3 text-amber-100">
                                <Phone className="w-5 h-5 text-orange-400" />
                                <p>+8801874327077</p>
                            </div>
                            <div className="flex items-center gap-3 text-amber-100">
                                <Mail className="w-5 h-5 text-orange-400" />
                                <p>bakerybliss@Sweet.ac.bd</p>
                            </div>
                        </div>
                    </div>
                    
                    {/* Business Hours */}
                    <div>
                        <h3 className="text-amber-200 font-bold text-xl mb-4">Business Hours</h3>
                        <div className="space-y-2 text-amber-100">
                            <div className="flex justify-between">
                                <span>Satday -Wedday:</span>
                                <span>7:00 AM - 8:00 PM</span>
                            </div>
                            <div className="flex justify-between">
                                <span>Thursday:</span>
                                <span>8:00 AM - 9:00 PM</span>
                            </div>
                            <div className="flex justify-between">
                                <span>Friday:</span>
                                <span>9:00 AM - 6:00 PM</span>
                            </div>
                        </div>
                    </div>
                    
                    {/* Quick Links */}
                    <div>
                        <h3 className="text-amber-200 font-bold text-xl mb-4">Quick Links</h3>
                        <ul className="space-y-2">
                            <li><a href="/about" className="text-amber-100 hover:text-orange-400 transition-colors">About Us</a></li>
                            <li><a href="/careers" className="text-amber-100 hover:text-orange-400 transition-colors">Careers</a></li>
                            
                            <li><a href="/privacy" className="text-amber-100 hover:text-orange-400 transition-colors">Privacy Policy</a></li>
                            <li><a href="/terms" className="text-amber-100 hover:text-orange-400 transition-colors">Terms of Service</a></li>
                        </ul>
                    </div>
                    
                    {/* Newsletter & Social */}
                    <div>
                        <h3 className="text-amber-200 font-bold text-xl mb-4">Stay Connected</h3>
                    
                        <div className="flex gap-4">
                            <a href="#" className="text-amber-100 hover:text-orange-400 transition-colors">
                                <Facebook className="w-6 h-6" />
                            </a>
                            <a href="#" className="text-amber-100 hover:text-orange-400 transition-colors">
                                <Instagram className="w-6 h-6" />
                            </a>
                            <a href="#" className="text-amber-100 hover:text-orange-400 transition-colors">
                                <Twitter className="w-6 h-6" />
                            </a>
                        </div>
                    </div>
                </div>
                
                {/* Divider */}
                <div className="border-t border-amber-700 my-8"></div>
                
                {/* Bottom section */}
                <div className="flex flex-col md:flex-row justify-between items-center">   
                    <p className="text-amber-200">© {currentYear} Bakery Bliss. All rights reserved.</p>
                </div>
            </div>
        </footer>
    );
};

export default Footer;