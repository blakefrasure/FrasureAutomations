export const dynamic = 'force-dynamic';
import { Metadata } from 'next';
import { PlatformAnalytics } from '@07ai/frontend/components/platform-analytics/platform.analytics';
import { isGeneralServerSide } from '@07ai/helpers/utils/is.general.server.side';
export const metadata: Metadata = {
  title: `${isGeneralServerSide() ? '07ai' : '07ai'} Analytics`,
  description: '',
};
export default async function Index() {
  return <PlatformAnalytics />;
}
