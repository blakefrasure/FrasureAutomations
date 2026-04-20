import { Injectable } from '@nestjs/common';
import { Activity, ActivityMethod } from 'nestjs-temporal-core';
import { PostsService } from '@07ai/nestjs-libraries/database/prisma/posts/posts.service';
import {
  NotificationService,
  NotificationType,
} from '@07ai/nestjs-libraries/database/prisma/notifications/notification.service';
import { Integration, Post, State } from '@prisma/client';
import { stripHtmlValidation } from '@07ai/helpers/utils/strip.html.validation';
import { IntegrationManager } from '@07ai/nestjs-libraries/integrations/integration.manager';
import { AuthTokenDetails } from '@07ai/nestjs-libraries/integrations/social/social.integrations.interface';
import { RefreshIntegrationService } from '@07ai/nestjs-libraries/integrations/refresh.integration.service';
import { timer } from '@07ai/helpers/utils/timer';
import { IntegrationService } from '@07ai/nestjs-libraries/database/prisma/integrations/integration.service';
import { WebhooksService } from '@07ai/nestjs-libraries/database/prisma/webhooks/webhooks.service';
import { AutopostService } from '@07ai/nestjs-libraries/database/prisma/autopost/autopost.service';

@Injectable()
@Activity()
export class AutopostActivity {
  constructor(private _autoPostService: AutopostService) {}

  @ActivityMethod()
  async autoPost(id: string) {
    return this._autoPostService.startAutopost(id)
  }
}
