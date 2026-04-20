export const dynamic = 'force-dynamic';
import { LaunchesComponent } from '@07ai/frontend/components/launches/launches.component';
import { Metadata } from 'next';
import { isGeneralServerSide } from '@07ai/helpers/utils/is.general.server.side';
export const metadata: Metadata = {
  title: `${isGeneralServerSide() ? '07ai Calendar' : '07ai Launches'}`,
  description: '',
};
export default async function Index() {
  return <LaunchesComponent />;
}
