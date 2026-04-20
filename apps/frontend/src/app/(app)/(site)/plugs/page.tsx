import { Plugs } from '@07ai/frontend/components/plugs/plugs';
export const dynamic = 'force-dynamic';
import { Metadata } from 'next';
import { isGeneralServerSide } from '@07ai/helpers/utils/is.general.server.side';
export const metadata: Metadata = {
  title: `${isGeneralServerSide() ? '07ai' : '07ai'} Plugs`,
  description: '',
};
export default async function Index() {
  return <Plugs />;
}
