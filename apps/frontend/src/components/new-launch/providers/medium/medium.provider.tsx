'use client';

import { FC } from 'react';
import {
  PostComment,
  withProvider,
} from '@07ai/frontend/components/new-launch/providers/high.order.provider';
import { useSettings } from '@07ai/frontend/components/launches/helpers/use.values';
import { Input } from '@07ai/react/form/input';
import { MediumPublications } from '@07ai/frontend/components/new-launch/providers/medium/medium.publications';
import { MediumTags } from '@07ai/frontend/components/new-launch/providers/medium/medium.tags';
import { MediumSettingsDto } from '@07ai/nestjs-libraries/dtos/posts/providers-settings/medium.settings.dto';
import { useIntegration } from '@07ai/frontend/components/launches/helpers/use.integration';
import { Canonical } from '@07ai/react/form/canonical';

const MediumSettings: FC = () => {
  const form = useSettings();
  const { date } = useIntegration();
  return (
    <>
      <Input label="Title" {...form.register('title')} />
      <Input label="Subtitle" {...form.register('subtitle')} />
      <Canonical
        date={date}
        label="Canonical Link"
        {...form.register('canonical')}
      />
      <div>
        <MediumPublications {...form.register('publication')} />
      </div>
      <div>
        <MediumTags label="Topics" {...form.register('tags')} />
      </div>
    </>
  );
};
export default withProvider({
  postComment: PostComment.POST,
  minimumCharacters: [],
  SettingsComponent: MediumSettings,
  CustomPreviewComponent: undefined, //MediumPreview,
  dto: MediumSettingsDto,
  checkValidity: undefined,
  maximumCharacters: 100000,
});
