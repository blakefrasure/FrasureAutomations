'use client';

import { FC } from 'react';
import {
  PostComment,
  withProvider,
} from '@07ai/frontend/components/new-launch/providers/high.order.provider';
import { DevToSettingsDto } from '@07ai/nestjs-libraries/dtos/posts/providers-settings/dev.to.settings.dto';
import { Input } from '@07ai/react/form/input';
import { MediaComponent } from '@07ai/frontend/components/media/media.component';
import { SelectOrganization } from '@07ai/frontend/components/new-launch/providers/devto/select.organization';
import { DevtoTags } from '@07ai/frontend/components/new-launch/providers/devto/devto.tags';
import { useMediaDirectory } from '@07ai/react/helpers/use.media.directory';
import clsx from 'clsx';
import { Canonical } from '@07ai/react/form/canonical';
import { useIntegration } from '@07ai/frontend/components/launches/helpers/use.integration';
import { useSettings } from '@07ai/frontend/components/launches/helpers/use.values';

const DevtoSettings: FC = () => {
  const form = useSettings();
  const { date } = useIntegration();
  return (
    <>
      <Input label="Title" {...form.register('title')} />
      <Canonical
        date={date}
        label="Canonical Link"
        {...form.register('canonical')}
      />
      <MediaComponent
        label="Cover picture"
        description="Add a cover picture"
        {...form.register('main_image')}
      />
      <div className="mt-[20px]">
        <SelectOrganization {...form.register('organization')} />
      </div>
      <div>
        <DevtoTags
          label="Tags (Maximum 4)"
          {...form.register('tags', {
            value: [],
          })}
        />
      </div>
    </>
  );
};
export default withProvider({
  postComment: PostComment.COMMENT,
  minimumCharacters: [],
  SettingsComponent: DevtoSettings,
  CustomPreviewComponent: undefined, // DevtoPreview,
  dto: DevToSettingsDto,
  checkValidity: undefined,
  maximumCharacters: 100000,
});
