'use client';

import React, { ReactNode, useCallback } from 'react';
import { Logo } from '@07ai/frontend/components/new-layout/logo';
import { Plus_Jakarta_Sans } from 'next/font/google';
const ModeComponent = dynamic(
  () => import('@07ai/frontend/components/layout/mode.component'),
  {
    ssr: false,
  }
);

import clsx from 'clsx';
import dynamic from 'next/dynamic';
import { useFetch } from '@07ai/helpers/utils/custom.fetch';
import { useVariables } from '@07ai/react/helpers/variable.context';
import { useSearchParams } from 'next/navigation';
import useSWR from 'swr';
import { CheckPayment } from '@07ai/frontend/components/layout/check.payment';
import { ToolTip } from '@07ai/frontend/components/layout/top.tip';
import { ShowMediaBoxModal } from '@07ai/frontend/components/media/media.component';
import { ShowLinkedinCompany } from '@07ai/frontend/components/launches/helpers/linkedin.component';
import { MediaSettingsLayout } from '@07ai/frontend/components/launches/helpers/media.settings.component';
import { Toaster } from '@07ai/react/toaster/toaster';
import { ShowPostSelector } from '@07ai/frontend/components/post-url-selector/post.url.selector';
import { NewSubscription } from '@07ai/frontend/components/layout/new.subscription';
import { Support } from '@07ai/frontend/components/layout/support';
import { ContinueProvider } from '@07ai/frontend/components/layout/continue.provider';
import { ContextWrapper } from '@07ai/frontend/components/layout/user.context';
import { CopilotKit } from '@copilotkit/react-core';
import { MantineWrapper } from '@07ai/react/helpers/mantine.wrapper';
import { Impersonate } from '@07ai/frontend/components/layout/impersonate';
import { AnnouncementBanner } from '@07ai/frontend/components/layout/announcement.banner';
import { Title } from '@07ai/frontend/components/layout/title';
import { TopMenu } from '@07ai/frontend/components/layout/top.menu';
import { LanguageComponent } from '@07ai/frontend/components/layout/language.component';
import { ChromeExtensionComponent } from '@07ai/frontend/components/layout/chrome.extension.component';
import NotificationComponent from '@07ai/frontend/components/notifications/notification.component';
import { OrganizationSelector } from '@07ai/frontend/components/layout/organization.selector';
import { StreakComponent } from '@07ai/frontend/components/layout/streak.component';
import { PreConditionComponent } from '@07ai/frontend/components/layout/pre-condition.component';
import { AttachToFeedbackIcon } from '@07ai/frontend/components/new-layout/sentry.feedback.component';
import { FirstBillingComponent } from '@07ai/frontend/components/billing/first.billing.component';

const jakartaSans = Plus_Jakarta_Sans({
  weight: ['600', '500', '700'],
  style: ['normal', 'italic'],
  subsets: ['latin'],
});

export const LayoutComponent = ({ children }: { children: ReactNode }) => {
  const fetch = useFetch();

  const { backendUrl, billingEnabled, isGeneral } = useVariables();

  // Feedback icon component attaches Sentry feedback to a top-bar icon when DSN is present
  const searchParams = useSearchParams();
  const load = useCallback(async (path: string) => {
    return await (await fetch(path)).json();
  }, []);
  const { data: user, mutate } = useSWR('/user/self', load, {
    revalidateOnFocus: false,
    revalidateOnReconnect: false,
    revalidateIfStale: false,
    refreshWhenOffline: false,
    refreshWhenHidden: false,
  });

  if (!user) return null;

  return (
    <ContextWrapper user={user}>
      <CopilotKit
        credentials="include"
        runtimeUrl={backendUrl + '/copilot/chat'}
        showDevConsole={false}
      >
        <MantineWrapper>
          <ToolTip />
          <Toaster />
          <CheckPayment check={searchParams.get('check') || ''} mutate={mutate}>
            <ShowMediaBoxModal />
            <ShowLinkedinCompany />
            <MediaSettingsLayout />
            <ShowPostSelector />
            <PreConditionComponent />
            <NewSubscription />
            <ContinueProvider />
            <div
              className={clsx(
                'flex flex-col min-h-screen min-w-screen text-white relative',
                jakartaSans.className
              )}
              style={{
                background: 'radial-gradient(circle at top right, #0a0a0a 0%, #000000 100%)',
                overflow: 'hidden'
              }}
            >
              <div>{user?.admin ? <Impersonate /> : <div />}</div>
              {user.tier === 'FREE' && isGeneral && billingEnabled ? (
                <FirstBillingComponent />
              ) : (
                <>
                  <AnnouncementBanner />
                  
                  {/* Global Content Island (Bento Box) */}
                  <div className="flex-1 flex flex-col p-8 pb-32 overflow-hidden relative">
                    <div 
                       className="flex-1 flex flex-col bg-white/5 backdrop-blur-3xl border border-white/10 rounded-[48px] overflow-hidden shadow-2xl shadow-black"
                       style={{ minHeight: 'calc(100vh - 160px)' }}
                    >
                      {/* Integrated Top Navigation inside Island */}
                      <div className="flex h-20 px-8 items-center border-b border-white/5 bg-white/5">
                        <div className="text-[20px] font-bold flex flex-1 tracking-tight">
                          <Logo />
                          <div className="w-[1px] h-6 bg-white/10 mx-6 self-center" />
                          <Title />
                        </div>
                        <div className="flex gap-6 items-center text-white/60">
                          <StreakComponent />
                          <div className="w-[1px] h-4 bg-white/10" />
                          <OrganizationSelector />
                          <ModeComponent />
                          <div className="w-[1px] h-4 bg-white/10" />
                          <LanguageComponent />
                          <ChromeExtensionComponent />
                          <NotificationComponent />
                          <AttachToFeedbackIcon />
                        </div>
                      </div>

                      {/* Main Scrollable Content */}
                      <div className="flex-1 overflow-auto custom-scrollbar p-6">
                        {children}
                      </div>
                    </div>
                  </div>

                  {/* Radical Floating Bottom Dock */}
                  <div className="fixed bottom-8 left-1/2 -translate-x-1/2 z-50">
                    <div className="bg-black/40 backdrop-blur-2xl border border-white/10 rounded-full px-6 py-3 flex items-center gap-2 shadow-2xl shadow-black/50">
                      <TopMenu />
                      <div className="w-[1px] h-6 bg-white/20 mx-2" />
                      <Support />
                    </div>
                  </div>
                </>
              )}
            </div>
          </CheckPayment>
        </MantineWrapper>
      </CopilotKit>
    </ContextWrapper>
  );
};
