import { BeehiivProvider } from '@07ai/nestjs-libraries/newsletter/providers/beehiiv.provider';
import { EmailEmptyProvider } from '@07ai/nestjs-libraries/newsletter/providers/email-empty.provider';
import { ListmonkProvider } from '@07ai/nestjs-libraries/newsletter/providers/listmonk.provider';

export const newsletterProviders = [
  new BeehiivProvider(),
  new ListmonkProvider(),
  new EmailEmptyProvider(),
];
