'use client';

import {
  PostComment,
  withProvider,
} from '@07ai/frontend/components/new-launch/providers/high.order.provider';
import { ListmonkDto } from '@07ai/nestjs-libraries/dtos/posts/providers-settings/listmonk.dto';
import { Input } from '@07ai/react/form/input';
import { useSettings } from '@07ai/frontend/components/launches/helpers/use.values';
import { SelectList } from '@07ai/frontend/components/new-launch/providers/listmonk/select.list';
import { SelectTemplates } from '@07ai/frontend/components/new-launch/providers/listmonk/select.templates';

const SettingsComponent = () => {
  const form = useSettings();

  return (
    <>
      <Input label="Subject" {...form.register('subject')} />
      <Input label="Preview" {...form.register('preview')} />
      <SelectList {...form.register('list')} />
      <SelectTemplates {...form.register('template')} />
    </>
  );
};

export default withProvider({
  postComment: PostComment.POST,
  minimumCharacters: [],
  SettingsComponent: SettingsComponent,
  CustomPreviewComponent: undefined,
  dto: ListmonkDto,
  checkValidity: undefined,
  maximumCharacters: 300000,
});
