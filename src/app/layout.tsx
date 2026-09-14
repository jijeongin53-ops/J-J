import type { Metadata } from 'next';
import './globals.css';
import { LanguageProvider } from '@/lib/i18n';
import { Header } from '@/components/Header';
import { Leaf, Heart } from 'lucide-react';

export const metadata: Metadata = {
  title: 'J&J Solutions | Global Wellness Product Feedback & Intelligence',
  description:
    'Share your experience with J&J Solutions luxury botanical wellness rituals. Multi-language feedback and personalized care solutions.',
  keywords: ['J&J Solutions', 'Wellness', 'Aromatherapy', 'Skincare', 'Holistic Care', 'Product Feedback'],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className="min-h-screen flex flex-col justify-between bg-sand-50 text-wellness-950">
        <LanguageProvider>
          <div>
            <Header />
            <main>{children}</main>
          </div>

          {/* Luxury Footer */}
          <footer className="mt-20 border-t border-wellness-100 bg-sand-100/60 py-12 text-wellness-800 text-xs">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-6">
              <div className="flex items-center gap-2">
                <div className="w-6 h-6 rounded-full bg-wellness-700 flex items-center justify-center text-gold-300">
                  <Leaf className="w-3.5 h-3.5" />
                </div>
                <span className="font-serif font-bold text-sm tracking-wider text-wellness-950">
                  J&amp;J SOLUTIONS
                </span>
                <span className="text-wellness-400">|</span>
                <span className="text-wellness-600">Global Holistic Wellness Ecosystem</span>
              </div>

              <div className="text-wellness-500 text-center sm:text-right">
                <p>&copy; 2026 J&amp;J Solutions Co., Ltd. All rights reserved.</p>
                <p className="mt-1 text-[11px] text-wellness-400">
                  Crafted for pure harmony between nature, science, and human well-being.
                </p>
              </div>
            </div>
          </footer>
        </LanguageProvider>
      </body>
    </html>
  );
}
