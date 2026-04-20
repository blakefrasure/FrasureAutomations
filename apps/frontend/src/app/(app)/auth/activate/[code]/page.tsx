export const dynamic = 'force-dynamic';
import { Metadata } from 'next';
import { AfterActivate } from '@07ai/frontend/components/auth/after.activate';
import { isGeneralServerSide } from '@07ai/helpers/utils/is.general.server.side';
export const metadata: Metadata = {
  title: `${
    isGeneralServerSide() ? '07ai' : '07ai'
  } - Activate your account`,
  description: '',
};
export default async function Auth() {
  return <AfterActivate />;
}
