import { FC } from 'react';
import { Web3ProviderInterface } from '@07ai/frontend/components/launches/web3/web3.provider.interface';
import { WrapcasterProvider } from '@07ai/frontend/components/launches/web3/providers/wrapcaster.provider';
import { TelegramProvider } from '@07ai/frontend/components/launches/web3/providers/telegram.provider';
import { MoltbookProvider } from '@07ai/frontend/components/launches/web3/providers/moltbook.provider';
export const web3List: {
  identifier: string;
  component: FC<Web3ProviderInterface>;
}[] = [
  {
    identifier: 'telegram',
    component: TelegramProvider,
  },
  {
    identifier: 'wrapcast',
    component: WrapcasterProvider,
  },
  {
    identifier: 'moltbook',
    component: MoltbookProvider,
  },
];
