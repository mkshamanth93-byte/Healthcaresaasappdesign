import { BookingWidget } from './components/BookingWidget';
import { useState } from 'react';
import damiraHero from 'figma:asset/adcde12fb13046ee8350481ba848d42915b9deef.png';

export default function App() {
  const [isBookingOpen, setIsBookingOpen] = useState(false);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-purple-50/30">
      {/* Mock Website Content - Damira Dental Style */}
      <header className="bg-white/90 backdrop-blur-sm border-b border-black/5 sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gradient-to-br from-[#7A2C7F] to-[#5F1E63] rounded-lg flex items-center justify-center">
              <span className="text-white text-xl">✨</span>
            </div>
            <h1 className="text-xl text-gray-900">Damira Dental</h1>
          </div>
          <nav className="hidden md:flex items-center gap-6 text-sm text-gray-600">
            <a href="#" className="hover:text-gray-900 transition-colors">Services</a>
            <a href="#" className="hover:text-gray-900 transition-colors">About</a>
            <a href="#" className="hover:text-gray-900 transition-colors">Team</a>
            <a href="#" className="hover:text-gray-900 transition-colors">Contact</a>
          </nav>
        </div>
      </header>

      {/* Hero Section with Damira Background */}
      <main className="max-w-7xl mx-auto px-6 py-20">
        <div 
          className="relative rounded-3xl overflow-hidden mb-16 h-[500px] flex items-center"
          style={{
            backgroundImage: `linear-gradient(to right, rgba(0, 0, 0, 0.6), rgba(0, 0, 0, 0.3)), url(${damiraHero})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center'
          }}
        >
          <div className="relative z-10 px-12 max-w-2xl">
            <h2 className="text-5xl text-white tracking-tight mb-4">
              Damira Dental Studios,<br/>
              Caring for Smiles of All Ages
            </h2>
            <button 
              className="px-8 py-3 rounded-full text-white transition-all"
              style={{
                background: 'linear-gradient(135deg, #7A2C7F 0%, #5F1E63 100%)',
              }}
              onClick={() => setIsBookingOpen(true)}
            >
              BOOK APPOINTMENT
            </button>
          </div>
        </div>

        {/* CTA Section */}
        <div 
          className="rounded-3xl p-12 text-center text-white mb-16"
          style={{
            background: 'linear-gradient(135deg, #7A2C7F 0%, #5F1E63 100%)'
          }}
        >
          <h3 className="text-3xl mb-4">Ready to book your visit?</h3>
          <p className="text-xl mb-8" style={{ color: 'rgba(255, 255, 255, 0.9)' }}>
            Click the button below to get started with our easy online booking
          </p>
          <div className="inline-flex items-center gap-3 px-6 py-3 bg-white/20 rounded-full text-sm backdrop-blur-sm">
            <span>👉</span>
            <span>Look for the "Book Appointment" button in the bottom right</span>
          </div>
        </div>

        {/* Services Grid */}
        <div className="grid md:grid-cols-3 gap-6 mb-20">
          <div className="p-8 bg-white rounded-2xl border border-black/5 hover:shadow-lg transition-shadow">
            <div className="w-12 h-12 rounded-xl flex items-center justify-center mb-4" style={{ backgroundColor: '#F3E8F4' }}>
              <span className="text-2xl">🦷</span>
            </div>
            <h3 className="text-xl text-gray-900 mb-2">General Dentistry</h3>
            <p className="text-gray-600">
              Comprehensive exams, cleanings, and preventive care for optimal oral health.
            </p>
          </div>

          <div className="p-8 bg-white rounded-2xl border border-black/5 hover:shadow-lg transition-shadow">
            <div className="w-12 h-12 rounded-xl flex items-center justify-center mb-4" style={{ backgroundColor: '#F3E8F4' }}>
              <span className="text-2xl">✨</span>
            </div>
            <h3 className="text-xl text-gray-900 mb-2">Cosmetic Services</h3>
            <p className="text-gray-600">
              Whitening, veneers, and bonding to help you achieve your perfect smile.
            </p>
          </div>

          <div className="p-8 bg-white rounded-2xl border border-black/5 hover:shadow-lg transition-shadow">
            <div className="w-12 h-12 rounded-xl flex items-center justify-center mb-4" style={{ backgroundColor: '#F3E8F4' }}>
              <span className="text-2xl">👨‍👩‍👧‍👦</span>
            </div>
            <h3 className="text-xl text-gray-900 mb-2">Family Care</h3>
            <p className="text-gray-600">
              Gentle, comprehensive care for patients of all ages in a welcoming environment.
            </p>
          </div>
        </div>

        {/* Why Choose Us */}
        <div className="mt-20 grid md:grid-cols-2 gap-12 items-center">
          <div className="space-y-6">
            <h3 className="text-3xl text-gray-900">Why Choose Damira?</h3>
            <ul className="space-y-4">
              {[
                'State-of-the-art technology',
                'Experienced, caring team',
                'Flexible scheduling',
                'Insurance accepted',
                'Emergency care available',
              ].map((item, idx) => (
                <li key={idx} className="flex items-center gap-3">
                  <div 
                    className="w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0"
                    style={{ backgroundColor: '#F3E8F4' }}
                  >
                    <span className="text-sm" style={{ color: '#7A2C7F' }}>✓</span>
                  </div>
                  <span className="text-lg text-gray-700">{item}</span>
                </li>
              ))}
            </ul>
          </div>
          <div className="bg-gradient-to-br from-gray-100 to-gray-200 rounded-2xl h-96 flex items-center justify-center">
            <span className="text-6xl">🏥</span>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t border-black/5 mt-20">
        <div className="max-w-7xl mx-auto px-6 py-12">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <h4 className="text-lg text-gray-900 mb-4">Damira Dental</h4>
              <p className="text-sm text-gray-600">
                Your trusted partner in oral health since 2010.
              </p>
            </div>
            <div>
              <h5 className="text-sm text-gray-900 mb-3">Services</h5>
              <ul className="space-y-2 text-sm text-gray-600">
                <li><a href="#" className="hover:text-gray-900">General Dentistry</a></li>
                <li><a href="#" className="hover:text-gray-900">Cosmetic</a></li>
                <li><a href="#" className="hover:text-gray-900">Emergency Care</a></li>
              </ul>
            </div>
            <div>
              <h5 className="text-sm text-gray-900 mb-3">Company</h5>
              <ul className="space-y-2 text-sm text-gray-600">
                <li><a href="#" className="hover:text-gray-900">About Us</a></li>
                <li><a href="#" className="hover:text-gray-900">Our Team</a></li>
                <li><a href="#" className="hover:text-gray-900">Contact</a></li>
              </ul>
            </div>
            <div>
              <h5 className="text-sm text-gray-900 mb-3">Legal</h5>
              <ul className="space-y-2 text-sm text-gray-600">
                <li><a href="#" className="hover:text-gray-900">Privacy Policy</a></li>
                <li><a href="#" className="hover:text-gray-900">Terms of Service</a></li>
                <li><a href="#" className="hover:text-gray-900">HIPAA Notice</a></li>
              </ul>
            </div>
          </div>
          <div className="mt-12 pt-8 border-t border-black/5 text-center text-sm text-gray-500">
            © 2025 Damira Dental. All rights reserved.
          </div>
        </div>
      </footer>

      {/* Booking Widget */}
      <BookingWidget externalIsOpen={isBookingOpen} onExternalClose={() => setIsBookingOpen(false)} />
    </div>
  );
}