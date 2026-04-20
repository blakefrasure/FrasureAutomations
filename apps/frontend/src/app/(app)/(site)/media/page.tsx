import { MediaLayoutComponent } from '@07ai/frontend/components/new-layout/layout.media.component';
import { Metadata } from 'next';
import { isGeneralServerSide } from '@07ai/helpers/utils/is.general.server.side';

export const metadata: Metadata = {
  title: `${isGeneralServerSide() ? '07ai' : '07ai'} Media`,
  description: '',
};

export default async function Page() {
  return <MediaLayoutComponent />
}
