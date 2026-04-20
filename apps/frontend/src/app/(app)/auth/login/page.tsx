export const dynamic = 'force-dynamic';
import { Login } from '@07ai/frontend/components/auth/login';
import { Metadata } from 'next';
import { isGeneralServerSide } from '@07ai/helpers/utils/is.general.server.side';
export const metadata: Metadata = {
  title: `${isGeneralServerSide() ? '07ai' : '07ai'} Login`,
  description: '',
};
export default async function Auth() {
  return <Login />;
}
