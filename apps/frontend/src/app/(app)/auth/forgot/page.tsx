export const dynamic = 'force-dynamic';
import { Forgot } from '@07ai/frontend/components/auth/forgot';
import { Metadata } from 'next';
import { isGeneralServerSide } from '@07ai/helpers/utils/is.general.server.side';
export const metadata: Metadata = {
  title: `${isGeneralServerSide() ? '07ai' : '07ai'} Forgot Password`,
  description: '',
};
export default async function Auth() {
  return <Forgot />;
}
