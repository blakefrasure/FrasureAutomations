import { Metadata } from 'next';
import { Agent } from '@07ai/frontend/components/agents/agent';
import { AgentChat } from '@07ai/frontend/components/agents/agent.chat';
export const metadata: Metadata = {
  title: '07ai - Agent',
  description: '',
};
export default async function Page() {
  return (
    <AgentChat />
  );
}
