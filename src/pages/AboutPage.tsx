import React from 'react';
import { ShieldCheck, Heart, Sparkles, Award, Users, CheckCircle2 } from 'lucide-react';

interface AboutPageProps {
  navigate: (route: string) => void;
}

export const AboutPage: React.FC<AboutPageProps> = ({ navigate }) => {
  const teamMembers = [
    {
      name: 'Tanvi Kulkarni',
      role: 'Founder & Head of Toy Design',
      bio: 'Former product designer and mother of two toddlers in Pune. Started FluffyPals after searching for plush toys that would not shed synthetic fibers into her baby’s mouth.',
      avatarBg: 'bg-rose-500/20 text-rose-300'
    },
    {
      name: 'Dr. Arvind Nambiar',
      role: 'Pediatric Sensory Advisor',
      bio: 'Consultant child occupational therapist in Bengaluru specializing in deep-touch pressure comfort, sleep cues, and tactile regulation in early childhood.',
      avatarBg: 'bg-purple-500/20 text-purple-300'
    },
    {
      name: 'Rajesh & Kavita Mestry',
      role: 'Master Pattern Artisans',
      bio: 'Leading our craft workshop in Kolhapur with 18+ years of high-tensile lock-stitch upholstery, ensuring every seam holds through tug-of-war toddler play.',
      avatarBg: 'bg-amber-500/20 text-amber-300'
    }
  ];

  return (
    <div className="min-h-screen py-10 lg:py-16">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        {/* Hero Story Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-pink-500/10 border border-pink-500/20 text-pink-300 text-xs font-semibold">
            <Sparkles className="w-3.5 h-3.5" />
            <span>The FluffyPals Story</span>
          </div>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white leading-tight">
            Designed for Pure Toddler Hugs, Built for Parent Peace of Mind
          </h1>
          <p className="text-sm sm:text-base text-slate-300 leading-relaxed pt-2">
            Born out of a simple realization: Indian parents shouldn't have to choose between hard plastic imported toys and shedding plushies with toxic dye smells. We built the plush toy we wanted for our own children.
          </p>
        </div>

        {/* Brand Mission & Story */}
        <div className="p-8 sm:p-10 rounded-3xl bg-slate-900/40 border border-white/[0.08] space-y-6">
          <h2 className="text-2xl font-bold text-white">Why the Round, Puffy Shape?</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 text-xs text-slate-300 leading-relaxed">
            <p>
              When babies and toddlers feel overwhelmed, their nervous systems crave smooth, continuous tactile surfaces without sharp corners, hard limbs, or protruding wire frames. Our signature round, puffy creature provides continuous, uninterrupted softness from every angle.
            </p>
            <p>
              Every FluffyPal is proportioned to sit comfortably against a child’s chest during storytime, stroller rides, and bedtime routines. The deep, glossy anime-style eyes are ultrasonically heat-fused into the inner core, eliminating any detachment risk.
            </p>
          </div>
        </div>

        {/* Safety & Quality Promise */}
        <div className="space-y-6">
          <div className="text-center max-w-xl mx-auto">
            <div className="text-xs font-semibold uppercase tracking-wider text-pink-400">Strict Quality Mandate</div>
            <h2 className="text-2xl sm:text-3xl font-bold text-white mt-1">Our Safety & Quality Promise</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="p-6 rounded-2xl bg-slate-900/40 border border-white/[0.08] space-y-3">
              <ShieldCheck className="w-8 h-8 text-pink-400" />
              <h3 className="text-base font-bold text-white">BIS IS 9873 Compliant</h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                Thoroughly tested under Indian toy safety standards: mechanical strength, non-flammability, and zero harmful metal migration (lead, cadmium, barium).
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-slate-900/40 border border-white/[0.08] space-y-3">
              <Award className="w-8 h-8 text-purple-400" />
              <h3 className="text-base font-bold text-white">Hypoallergenic Fibers</h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                Filled with 100% virgin anti-bacterial hollow conjugate fibers that resist moisture and dust mites, ideal for children with sensitive skin or allergies.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-slate-900/40 border border-white/[0.08] space-y-3">
              <Heart className="w-8 h-8 text-amber-400" />
              <h3 className="text-base font-bold text-white">Double Lock-Stitch Seams</h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                Every seam undergoes a 15-kilogram continuous pull test. Toddlers can pull, tug, and swing their pal without exposing any inner filling.
              </p>
            </div>
          </div>
        </div>

        {/* Team Section */}
        <div className="space-y-6">
          <div className="text-center max-w-xl mx-auto">
            <div className="text-xs font-semibold uppercase tracking-wider text-pink-400">People Behind the Pals</div>
            <h2 className="text-2xl sm:text-3xl font-bold text-white mt-1">Meet Our Small Team</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {teamMembers.map((member, i) => (
              <div key={i} className="p-6 rounded-2xl bg-slate-900/40 border border-white/[0.08] space-y-3">
                <div className={`w-12 h-12 rounded-2xl ${member.avatarBg} flex items-center justify-center font-bold text-lg`}>
                  {member.name[0]}
                </div>
                <div>
                  <h4 className="text-base font-bold text-white">{member.name}</h4>
                  <div className="text-xs font-semibold text-pink-400 mt-0.5">{member.role}</div>
                </div>
                <p className="text-xs text-slate-400 leading-relaxed">{member.bio}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Call to action */}
        <div className="p-8 sm:p-10 rounded-3xl bg-gradient-to-r from-pink-900/30 via-purple-900/20 to-slate-900 border border-pink-500/20 text-center space-y-4">
          <h3 className="text-xl sm:text-2xl font-bold text-white">Ready to bring home a FluffyPal?</h3>
          <p className="text-xs sm:text-sm text-slate-300 max-w-md mx-auto">
            All orders include our 7-day no-questions-asked doorstep exchange guarantee.
          </p>
          <button
            onClick={() => navigate('#/shop')}
            className="px-7 py-3.5 rounded-xl bg-gradient-to-r from-pink-600 to-purple-600 hover:from-pink-500 hover:to-purple-500 text-white font-bold text-sm shadow-lg shadow-pink-600/25 transition-all"
          >
            Explore The Toys
          </button>
        </div>
      </div>
    </div>
  );
};
