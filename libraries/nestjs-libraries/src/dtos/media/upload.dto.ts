import { IsDefined, IsString, Validate } from 'class-validator';
import { ValidUrlExtension } from '@07ai/helpers/utils/valid.url.path';
import { IsSafeWebhookUrl } from '@07ai/nestjs-libraries/dtos/webhooks/webhook.url.validator';

export class UploadDto {
  @IsString()
  @IsDefined()
  @Validate(ValidUrlExtension)
  @IsSafeWebhookUrl({
    message:
      'URL must be a public HTTPS URL and cannot point to internal network addresses',
  })
  url: string;
}
