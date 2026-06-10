'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

const NAV_ITEMS = [
  { href: '/',           emoji: '🏠', label: 'ホーム' },
  { href: '/check',      emoji: '✍️',  label: '診断' },
  { href: '/report',     emoji: '📊', label: 'レポート' },
  { href: '/collection', emoji: '📖', label: '図鑑' },
];

export default function Footer() {
  const pathname = usePathname();

  return (
    <footer className="mt-6">
      <p className="text-xs text-gray-400 text-center leading-relaxed px-4 mb-4">
        本サービスは医療診断を目的としたものではありません。<br />
        体調不良が続く場合は医療機関にご相談ください。
      </p>

      {/* Bottom tab bar */}
      <div className="sticky bottom-0 bg-white/90 backdrop-blur-sm border-t border-gray-100 pb-safe">
        <nav className="flex">
          {NAV_ITEMS.map((item) => {
            const active = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`flex-1 flex flex-col items-center py-3 gap-0.5 transition-colors ${
                  active ? 'text-indigo-600' : 'text-gray-400 hover:text-gray-600'
                }`}
              >
                <span className="text-lg">{item.emoji}</span>
                <span className={`text-xs ${active ? 'font-bold' : ''}`}>{item.label}</span>
                {active && <div className="w-1 h-1 bg-indigo-500 rounded-full" />}
              </Link>
            );
          })}
        </nav>
      </div>
    </footer>
  );
}
