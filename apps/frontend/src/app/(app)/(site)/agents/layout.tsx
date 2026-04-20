import { Metadata } from 'next';
import { Agent } from '@07ai/frontend/components/agents/agent';
export const metadata: Metadata = {
  title: '07ai - Agent',
  description: 'agents',
};
export default async function Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <Agent>{children}</Agent>;
}
