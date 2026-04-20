'use client';

import { FC } from 'react';
import {
  PostComment,
  withProvider,
} from '@07ai/frontend/components/new-launch/providers/high.order.provider';
import { MoltbookDto } from '@07ai/nestjs-libraries/dtos/posts/providers-settings/moltbook.dto';
import { useSettings } from '@07ai/frontend/components/launches/helpers/use.values';
import { Input } from '@07ai/react/form/input';
import { useT } from '@07ai/react/translation/get.transation.service.client';

const MoltbookSettings: FC = () => {
  const form = useSettings();
  const t = useT();

  return (
    <div>
      <Input
        label={t('submolt', 'Submolt')}
        placeholder="general"
        {...form.register('submolt')}
      />
    </div>
  );
};

export default withProvider({
  postComment: PostComment.COMMENT,
  minimumCharacters: [],
  SettingsComponent: MoltbookSettings,
  CustomPreviewComponent: undefined,
  dto: MoltbookDto,
  maximumCharacters: 300,
});
