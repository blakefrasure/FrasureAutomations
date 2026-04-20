import { getT } from '@07ai/react/translation/get.translation.service.backend';

export const dynamic = 'force-dynamic';
import { ReactNode } from 'react';
import loadDynamic from 'next/dynamic';
import { TestimonialComponent } from '@07ai/frontend/components/auth/testimonial.component';
import { LogoTextComponent } from '@07ai/frontend/components/ui/logo-text.component';
const ReturnUrlComponent = loadDynamic(() => import('./return.url.component'));
export default async function AuthLayout({
  children,
}: {
  children: ReactNode;
}) {
  const t = await getT();

  return (
    <div 
      className="flex flex-1 min-h-screen w-screen text-white relative items-center justify-center p-6"
      style={{
        background: 'radial-gradient(circle at top right, #0a0a0a 0%, #000000 100%)',
      }}
    >
      <ReturnUrlComponent />
      
      {/* Central Auth Bento Island */}
      <div className="w-full max-w-[500px] bg-white/5 backdrop-blur-3xl border border-white/10 rounded-[48px] p-10 shadow-2xl shadow-black relative z-10">
        <div className="w-full justify-center gap-8 h-full flex flex-col text-white">
          <div className="flex justify-center -mb-4">
             <LogoTextComponent />
          </div>
          <div className="flex flex-col flex-1">{children}</div>
        </div>
      </div>

      {/* Decorative Branding Background Text (Subtle) */}
      <div className="absolute top-20 right-20 text-[120px] font-bold text-white/[0.02] pointer-events-none select-none hidden lg:block">
        07AI
      </div>
      <div className="absolute bottom-20 left-20 text-[120px] font-bold text-white/[0.02] pointer-events-none select-none hidden lg:block">
        2024
      </div>
    </div>
  );
}
