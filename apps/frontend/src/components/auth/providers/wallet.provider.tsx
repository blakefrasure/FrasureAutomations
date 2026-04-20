import React, { FC } from 'react';
import { WalletUiProvider } from '@07ai/frontend/components/auth/providers/placeholder/wallet.ui.provider';

const WalletProvider: FC = () => {
  return (
    <div className="flex-1 opacity-50 cursor-not-allowed grayscale pointer-events-none">
      <WalletUiProvider />
    </div>
  );
};

export const ButtonCaster: FC<{
  login: (code: string) => void;
}> = () => {
  return <WalletProvider />;
};

export default WalletProvider;
