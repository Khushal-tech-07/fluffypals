import React, { useState } from 'react';
import {
  MessageCircle,
  Mail,
  Phone,
  MapPin,
  ChevronDown,
  CheckCircle2,
  Gift,
  HelpCircle,
  Building2
} from 'lucide-react';

interface ContactPageProps {
  navigate: (route: string) => void;
}

interface FAQItem {
  question: string;
  answer: string;
  category: 'shipping' | 'care' | 'gifting' | 'safety';
}

const FAQS: FAQItem[] = [
  {
    category: 'shipping',
    question: 'How long does delivery take across India?',
    answer: 'Orders are dispatched within 24 hours from our Mumbai or Bengaluru centers. Metro cities (Mumbai, Delhi NCR, Bengaluru, Pune, Hyderabad, Chennai, Kolkata) typically receive deliveries in 2 to 3 days. Tier-2 and Tier-3 cities receive orders within 3 to 5 business days via BlueDart Air or Delhivery Surface.'
  },
  {
    category: 'care',
    question: 'Can I wash my FluffyPal in an automatic washing machine?',
    answer: 'Yes! Place your FluffyPal inside a mesh laundry bag or clean pillowcase. Wash using cold water (30°C) on the Gentle/Delicate cycle with baby-safe liquid detergent. Avoid bleach or heavy fabric softeners. After washing, gently squeeze out excess water with a towel and air-dry flat in a shaded breeze. Never tumble dry on high heat.'
  },
  {
    category: 'safety',
    question: 'Are FluffyPals safe for teething babies who chew on things?',
    answer: 'Yes. Our plush toys comply with Bureau of Indian Standards (BIS) IS 9873 parts 1, 2, and 3. We use zero toxic azo dyes, lead-free pigments, and BPA-free polymers. The plush fibers are interlocked to prevent shedding microfibers, and the glossy cornea eyes are mechanically fused to resist up to 15kg tensile pull.'
  },
  {
    category: 'shipping',
    question: 'What is your return & exchange policy?',
    answer: 'We offer an easy 7-day doorstep return and exchange policy. If your FluffyPal has any manufacturing defect, stitching issue, or if you simply wish to swap for another colour, initiate a request via WhatsApp or email, and our courier will pick it up from your doorstep.'
  },
  {
    category: 'gifting',
    question: 'Do you offer bulk return gift hampers for birthday parties & schools?',
    answer: 'Yes! We specialize in birthday return gifts and school graduation packages for orders of 10 or more pieces. We provide tiered wholesale discounts (up to 30% off), custom gift bags, personalized printed name tags, and coordinated colour assortments. Contact our gifting desk below!'
  }
];

export const ContactPage: React.FC<ContactPageProps> = ({ navigate }) => {
  // FAQ Accordion State
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(0);

  // Form State
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    topic: 'Customer Inquiry',
    message: ''
  });

  // Wholesale form
  const [wholesaleSubmitted, setWholesaleSubmitted] = useState(false);
  const [wholesaleData, setWholesaleData] = useState({
    schoolOrOrg: '',
    contactPerson: '',
    phone: '',
    quantity: '25-50 pieces',
    eventDate: ''
  });

  const handleContactSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setFormSubmitted(true);
    setTimeout(() => {
      setFormData({ name: '', email: '', phone: '', topic: 'Customer Inquiry', message: '' });
    }, 500);
  };

  const handleWholesaleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setWholesaleSubmitted(true);
  };

  return (
    <div className="min-h-screen py-10 lg:py-16">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto space-y-3">
          <h1 className="text-3xl sm:text-4xl font-extrabold text-white">Contact & Parent Help</h1>
          <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
            Have a question about sizes, washing instructions, delivery dates, or wholesale birthday hampers? We’re always here to help.
          </p>

          {/* Quick WhatsApp Action Button */}
          <div className="pt-3">
            <a
              href="https://wa.me/919876543210?text=Hi%20FluffyPals!%20I%20have%20an%20inquiry%20regarding%20an%20order."
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2.5 px-6 py-3 rounded-2xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs shadow-lg shadow-emerald-600/25 transition-all"
            >
              <MessageCircle className="w-4 h-4" />
              <span>Chat on WhatsApp: +91 98765 43210</span>
            </a>
          </div>
        </div>

        {/* Contact Form & Contact Details Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Column: Contact Form */}
          <div className="lg:col-span-7 p-6 sm:p-8 rounded-3xl bg-slate-900/40 border border-white/[0.08]">
            <h2 className="text-xl font-bold text-white mb-1">Send us a Message</h2>
            <p className="text-xs text-slate-400 mb-6">
              Our parent care team typically responds within 3 hours (9 AM – 8 PM IST).
            </p>

            {formSubmitted ? (
              <div className="p-8 text-center space-y-3 rounded-2xl bg-emerald-500/10 border border-emerald-500/20">
                <CheckCircle2 className="w-10 h-10 text-emerald-400 mx-auto" />
                <h3 className="text-base font-bold text-white">Message Received!</h3>
                <p className="text-xs text-slate-300">
                  Thank you! Our customer care representative will message or call you back shortly.
                </p>
                <button
                  onClick={() => setFormSubmitted(false)}
                  className="text-xs text-pink-400 font-semibold underline pt-2"
                >
                  Send another inquiry
                </button>
              </div>
            ) : (
              <form onSubmit={handleContactSubmit} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="text-xs font-semibold text-slate-300 block mb-1">
                      Your Name *
                    </label>
                    <input
                      required
                      type="text"
                      placeholder="e.g. Radhika Iyer"
                      value={formData.name}
                      onChange={e => setFormData({ ...formData, name: e.target.value })}
                      className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950/70 border border-white/10 text-xs text-white focus:outline-none focus:border-pink-500"
                    />
                  </div>

                  <div>
                    <label className="text-xs font-semibold text-slate-300 block mb-1">
                      Mobile Number (+91) *
                    </label>
                    <input
                      required
                      type="tel"
                      maxLength={10}
                      placeholder="10-digit number"
                      value={formData.phone}
                      onChange={e => setFormData({ ...formData, phone: e.target.value })}
                      className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950/70 border border-white/10 text-xs text-white focus:outline-none focus:border-pink-500"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="text-xs font-semibold text-slate-300 block mb-1">
                      Email Address *
                    </label>
                    <input
                      required
                      type="email"
                      placeholder="e.g. radhika@example.com"
                      value={formData.email}
                      onChange={e => setFormData({ ...formData, email: e.target.value })}
                      className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950/70 border border-white/10 text-xs text-white focus:outline-none focus:border-pink-500"
                    />
                  </div>

                  <div>
                    <label className="text-xs font-semibold text-slate-300 block mb-1">
                      Subject Topic
                    </label>
                    <select
                      value={formData.topic}
                      onChange={e => setFormData({ ...formData, topic: e.target.value })}
                      className="w-full px-3 py-2.5 rounded-xl bg-slate-950/70 border border-white/10 text-xs text-white focus:outline-none focus:border-pink-500"
                    >
                      <option value="Customer Inquiry">Customer Inquiry</option>
                      <option value="Delivery Status">Delivery or Delay Question</option>
                      <option value="Washing & Care">Washing & Care Advice</option>
                      <option value="Return or Exchange">Return or Exchange Request</option>
                      <option value="Wholesale & Bulk">Wholesale or Party Hampers</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="text-xs font-semibold text-slate-300 block mb-1">
                    Your Message *
                  </label>
                  <textarea
                    required
                    rows={4}
                    placeholder="Tell us how we can help your family..."
                    value={formData.message}
                    onChange={e => setFormData({ ...formData, message: e.target.value })}
                    className="w-full p-3 rounded-xl bg-slate-950/70 border border-white/10 text-xs text-white focus:outline-none focus:border-pink-500"
                  />
                </div>

                <button
                  type="submit"
                  className="px-6 py-3 rounded-xl bg-gradient-to-r from-pink-600 to-purple-600 hover:from-pink-500 hover:to-purple-500 text-white font-bold text-xs shadow-lg transition-all"
                >
                  Send Message
                </button>
              </form>
            )}
          </div>

          {/* Right Column: Direct Info */}
          <div className="lg:col-span-5 space-y-6">
            <div className="p-6 rounded-3xl bg-slate-900/40 border border-white/[0.08] space-y-4">
              <h3 className="text-base font-bold text-white">Direct Contacts</h3>

              <div className="space-y-3 text-xs text-slate-300">
                <div className="flex items-start gap-3">
                  <Mail className="w-4 h-4 text-pink-400 shrink-0 mt-0.5" />
                  <div>
                    <span className="font-semibold text-white block">Email Care Desk</span>
                    <span className="text-slate-400">help@fluffypals.in</span>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <Phone className="w-4 h-4 text-purple-400 shrink-0 mt-0.5" />
                  <div>
                    <span className="font-semibold text-white block">Parent Care Helpline</span>
                    <span className="text-slate-400">+91 1800 200 4848 (Toll-Free, 9 AM - 8 PM)</span>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <MapPin className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                  <div>
                    <span className="font-semibold text-white block">Workshop & Fulfillment</span>
                    <span className="text-slate-400">
                      FluffyPals India, 3rd Floor, Lotus Infotech Park, Road No. 16, Wagle Estate, Thane (W), Maharashtra 400604.
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Privacy Note for Parents */}
            <div className="p-5 rounded-2xl bg-slate-950/60 border border-white/[0.06] text-[11px] text-slate-400 space-y-1">
              <div className="text-pink-300 font-semibold">🔒 Child Privacy Notice</div>
              <p>
                FluffyPals is designed exclusively for adult parents, guardians, and gift-givers. We never solicit or store personal information of children.
              </p>
            </div>
          </div>
        </div>

        {/* Wholesale & School Return Gifts Section */}
        <div className="p-8 sm:p-10 rounded-3xl bg-slate-900/50 border border-amber-500/20 space-y-6">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-amber-500/10 text-amber-300 flex items-center justify-center">
              <Building2 className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-xl font-bold text-white">Wholesale, Preschool & Birthday Return Gifting</h2>
              <p className="text-xs text-slate-400">Special curated sets for 10 to 500+ pieces with customized gift tags</p>
            </div>
          </div>

          {wholesaleSubmitted ? (
            <div className="p-6 text-center rounded-2xl bg-emerald-500/10 border border-emerald-500/20 text-xs text-emerald-300 space-y-2">
              <CheckCircle2 className="w-8 h-8 text-emerald-400 mx-auto" />
              <p className="font-bold">Wholesale Enquiry Submitted!</p>
              <p className="text-slate-300">
                Our institutional gifting manager will reach out with catalog pricing and sample swatches within 4 business hours.
              </p>
            </div>
          ) : (
            <form onSubmit={handleWholesaleSubmit} className="grid grid-cols-1 sm:grid-cols-4 gap-4">
              <div>
                <label className="text-[11px] font-semibold text-slate-400 block mb-1">
                  School / Event Name
                </label>
                <input
                  required
                  type="text"
                  placeholder="e.g. EuroKids Preschool"
                  value={wholesaleData.schoolOrOrg}
                  onChange={e => setWholesaleData({ ...wholesaleData, schoolOrOrg: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl bg-slate-950/70 border border-white/10 text-xs text-white focus:outline-none focus:border-amber-400"
                />
              </div>

              <div>
                <label className="text-[11px] font-semibold text-slate-400 block mb-1">
                  Contact Person
                </label>
                <input
                  required
                  type="text"
                  placeholder="Name"
                  value={wholesaleData.contactPerson}
                  onChange={e => setWholesaleData({ ...wholesaleData, contactPerson: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl bg-slate-950/70 border border-white/10 text-xs text-white focus:outline-none focus:border-amber-400"
                />
              </div>

              <div>
                <label className="text-[11px] font-semibold text-slate-400 block mb-1">
                  Quantity Required
                </label>
                <select
                  value={wholesaleData.quantity}
                  onChange={e => setWholesaleData({ ...wholesaleData, quantity: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl bg-slate-950/70 border border-white/10 text-xs text-white focus:outline-none focus:border-amber-400"
                >
                  <option value="10-25 pieces">10 - 25 pieces (15% Off)</option>
                  <option value="25-50 pieces">25 - 50 pieces (20% Off)</option>
                  <option value="50-100 pieces">50 - 100 pieces (25% Off)</option>
                  <option value="100+ pieces">100+ pieces (Custom Quote)</option>
                </select>
              </div>

              <div className="flex items-end">
                <button
                  type="submit"
                  className="w-full py-2.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs transition-colors"
                >
                  Request Gifting Catalog
                </button>
              </div>
            </form>
          )}
        </div>

        {/* FAQ Accordion Section */}
        <div className="space-y-6">
          <div className="text-center max-w-xl mx-auto">
            <h2 className="text-2xl font-bold text-white">Frequently Asked Questions</h2>
            <p className="text-xs text-slate-400 mt-1">Everything parents ask about our sensory plush toys.</p>
          </div>

          <div className="max-w-3xl mx-auto space-y-3">
            {FAQS.map((faq, index) => {
              const isOpen = openFaqIndex === index;
              return (
                <div
                  key={index}
                  className="rounded-2xl bg-slate-900/40 border border-white/[0.08] overflow-hidden transition-all"
                >
                  <button
                    onClick={() => setOpenFaqIndex(isOpen ? null : index)}
                    className="w-full px-5 py-4 text-left flex items-center justify-between gap-4 hover:bg-white/[0.02]"
                  >
                    <span className="text-xs sm:text-sm font-bold text-white">{faq.question}</span>
                    <ChevronDown
                      className={`w-4 h-4 text-slate-400 transition-transform shrink-0 ${
                        isOpen ? 'rotate-180 text-pink-400' : ''
                      }`}
                    />
                  </button>

                  {isOpen && (
                    <div className="px-5 pb-4 pt-1 text-xs text-slate-300 leading-relaxed border-t border-white/[0.04]">
                      {faq.answer}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};
