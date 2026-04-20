'use client';

import {
  PostComment,
  withProvider,
} from '@07ai/frontend/components/new-launch/providers/high.order.provider';
import { FacebookDto } from '@07ai/nestjs-libraries/dtos/posts/providers-settings/facebook.dto';
import { Input } from '@07ai/react/form/input';
import { useSettings } from '@07ai/frontend/components/launches/helpers/use.values';
import { FacebookPreview } from '@07ai/frontend/components/new-launch/providers/facebook/facebook.preview';

export const FacebookSettings = () => {
  const { register } = useSettings();

  return (
    <Input
      label={
        'Embedded URL (only for text Post)'
      }
      {...register('url')}
    />
  );
};

export default withProvider({
  postComment: PostComment.COMMENT,
  minimumCharacters: [],
  SettingsComponent: FacebookSettings,
  CustomPreviewComponent: FacebookPreview,
  dto: FacebookDto,
  checkValidity: undefined,
  maximumCharacters: 63206,
});
