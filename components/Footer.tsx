
import React from 'react';
import { Link } from 'react-router-dom';
import { Linkedin, Twitter, Mail, MapPin, Lock } from 'lucide-react';
import { Button } from './Button';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-[#0A0F14] text-stone-400 pt-32 pb-16 relative overflow-hidden">
      <div className="absolute top-0 left-0 w-full h-1 bg-mosaic-teal"></div>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-24">
          
          {/* Brand Column */}
          <div className="col-span-1 md:col-span-1">
            <div className="flex items-center mb-10 group">
              <div className="w-10 h-10 bg-white flex items-center justify-center mr-4 group-hover:bg-mosaic-teal transition-colors duration-500">
                <span className="text-[#0A0F14] font-serif font-bold text-xl tracking-tighter">M</span>
              </div>
              <span className="font-serif text-2xl font-bold text-white tracking-tighter transition-all duration-500 group-hover:text-mosaic-teal transition-all">MOSAIC</span>
            </div>
            <p className="text-sm leading-relaxed text-stone-500 mb-10 font-light">
              Engineering recruiting, engineered better. Connecting top civil and construction talent with industry leaders through technical precision.
            </p>
            <div className="flex space-x-6">
              <a href="#" className="text-stone-500 hover:text-mosaic-teal transition-colors"><Linkedin className="w-5 h-5" /></a>
              <a href="#" className="text-stone-500 hover:text-mosaic-teal transition-colors"><Twitter className="w-5 h-5" /></a>
              <a href="#" className="text-stone-500 hover:text-mosaic-teal transition-colors"><Mail className="w-5 h-5" /></a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-white font-black mb-8 tracking-[0.2em] uppercase text-[10px]">Services</h3>
            <ul className="space-y-4 text-sm font-light">
              <li><Link to="/employers" className="hover:text-mosaic-teal transition-colors">Employer Solutions</Link></li>
              <li><Link to="/employers" className="hover:text-mosaic-teal transition-colors">Fractional Recruiting</Link></li>
              <li><Link to="/employers" className="hover:text-mosaic-teal transition-colors">Launch Specials</Link></li>
              <li><Link to="/candidates" className="hover:text-mosaic-teal transition-colors">Candidates</Link></li>
            </ul>
          </div>

          {/* Company */}
          <div>
            <h3 className="text-white font-black mb-8 tracking-[0.2em] uppercase text-[10px]">Company</h3>
            <ul className="space-y-4 text-sm font-light">
              <li><Link to="/contact" className="hover:text-mosaic-teal transition-colors">Contact</Link></li>
              <li><a href="#" className="hover:text-mosaic-teal transition-colors">Privacy Policy</a></li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-white font-black mb-8 tracking-[0.2em] uppercase text-[10px]">Contact</h3>
            <ul className="space-y-6 text-sm font-light">
              <li className="flex items-start">
                <MapPin className="w-5 h-5 mr-4 text-mosaic-teal flex-shrink-0" />
                <span className="leading-relaxed">Serving clients across the U.S. with technical precision.</span>
              </li>
              <li className="mt-8">
                <Link to="/contact">
                  <Button className="bg-mosaic-teal text-white px-8 py-4 rounded-none text-[10px] font-black uppercase tracking-[0.3em] hover:bg-mosaic-teal/90 transition-all shadow-2xl">
                    BOOK A FREE CONSULTATION
                  </Button>
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-white/5 mt-32 pt-12 flex flex-col md:flex-row justify-between items-center text-[10px] font-black uppercase tracking-[0.2em] text-stone-600">
          <p>&copy; {new Date().getFullYear()} Mosaic Talent Consulting. All rights reserved.</p>
          <div className="flex items-center gap-12 mt-6 md:mt-0">
             <span className="opacity-50">Designed with AI & Precision.</span>
             <Link to="/admin/login" className="flex items-center hover:text-mosaic-teal transition-colors opacity-30 hover:opacity-100">
                <Lock className="w-3 h-3 mr-2" /> Admin Panel
             </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};
