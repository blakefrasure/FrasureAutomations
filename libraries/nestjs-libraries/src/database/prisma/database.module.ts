import { Global, Module } from '@nestjs/common';
import { PrismaRepository, PrismaService, PrismaTransaction } from './prisma.service';
import { OrganizationRepository } from '@07ai/nestjs-libraries/database/prisma/organizations/organization.repository';
import { OrganizationService } from '@07ai/nestjs-libraries/database/prisma/organizations/organization.service';
import { UsersService } from '@07ai/nestjs-libraries/database/prisma/users/users.service';
import { UsersRepository } from '@07ai/nestjs-libraries/database/prisma/users/users.repository';
import { SubscriptionService } from '@07ai/nestjs-libraries/database/prisma/subscriptions/subscription.service';
import { SubscriptionRepository } from '@07ai/nestjs-libraries/database/prisma/subscriptions/subscription.repository';
import { NotificationService } from '@07ai/nestjs-libraries/database/prisma/notifications/notification.service';
import { IntegrationService } from '@07ai/nestjs-libraries/database/prisma/integrations/integration.service';
import { IntegrationRepository } from '@07ai/nestjs-libraries/database/prisma/integrations/integration.repository';
import { PostsService } from '@07ai/nestjs-libraries/database/prisma/posts/posts.service';
import { PostsRepository } from '@07ai/nestjs-libraries/database/prisma/posts/posts.repository';
import { IntegrationManager } from '@07ai/nestjs-libraries/integrations/integration.manager';
import { MediaService } from '@07ai/nestjs-libraries/database/prisma/media/media.service';
import { MediaRepository } from '@07ai/nestjs-libraries/database/prisma/media/media.repository';
import { NotificationsRepository } from '@07ai/nestjs-libraries/database/prisma/notifications/notifications.repository';
import { EmailService } from '@07ai/nestjs-libraries/services/email.service';
import { StripeService } from '@07ai/nestjs-libraries/services/stripe.service';
import { ExtractContentService } from '@07ai/nestjs-libraries/openai/extract.content.service';
import { OpenaiService } from '@07ai/nestjs-libraries/openai/openai.service';
import { AgenciesService } from '@07ai/nestjs-libraries/database/prisma/agencies/agencies.service';
import { AgenciesRepository } from '@07ai/nestjs-libraries/database/prisma/agencies/agencies.repository';
import { TrackService } from '@07ai/nestjs-libraries/track/track.service';
import { ShortLinkService } from '@07ai/nestjs-libraries/short-linking/short.link.service';
import { WebhooksRepository } from '@07ai/nestjs-libraries/database/prisma/webhooks/webhooks.repository';
import { WebhooksService } from '@07ai/nestjs-libraries/database/prisma/webhooks/webhooks.service';
import { SignatureRepository } from '@07ai/nestjs-libraries/database/prisma/signatures/signature.repository';
import { SignatureService } from '@07ai/nestjs-libraries/database/prisma/signatures/signature.service';
import { AutopostRepository } from '@07ai/nestjs-libraries/database/prisma/autopost/autopost.repository';
import { AutopostService } from '@07ai/nestjs-libraries/database/prisma/autopost/autopost.service';
import { SetsService } from '@07ai/nestjs-libraries/database/prisma/sets/sets.service';
import { SetsRepository } from '@07ai/nestjs-libraries/database/prisma/sets/sets.repository';
import { ThirdPartyRepository } from '@07ai/nestjs-libraries/database/prisma/third-party/third-party.repository';
import { ThirdPartyService } from '@07ai/nestjs-libraries/database/prisma/third-party/third-party.service';
import { VideoManager } from '@07ai/nestjs-libraries/videos/video.manager';
import { FalService } from '@07ai/nestjs-libraries/openai/fal.service';
import { RefreshIntegrationService } from '@07ai/nestjs-libraries/integrations/refresh.integration.service';
import { OAuthRepository } from '@07ai/nestjs-libraries/database/prisma/oauth/oauth.repository';
import { OAuthService } from '@07ai/nestjs-libraries/database/prisma/oauth/oauth.service';
import { AnnouncementsRepository } from '@07ai/nestjs-libraries/database/prisma/announcements/announcements.repository';
import { AnnouncementsService } from '@07ai/nestjs-libraries/database/prisma/announcements/announcements.service';

@Global()
@Module({
  imports: [],
  controllers: [],
  providers: [
    PrismaService,
    PrismaRepository,
    PrismaTransaction,
    UsersService,
    UsersRepository,
    OrganizationService,
    OrganizationRepository,
    SubscriptionService,
    SubscriptionRepository,
    NotificationService,
    NotificationsRepository,
    WebhooksRepository,
    WebhooksService,
    IntegrationService,
    IntegrationRepository,
    PostsService,
    PostsRepository,
    StripeService,
    SignatureRepository,
    AutopostRepository,
    AutopostService,
    SignatureService,
    MediaService,
    MediaRepository,
    AgenciesService,
    AgenciesRepository,
    IntegrationManager,
    RefreshIntegrationService,
    ExtractContentService,
    OpenaiService,
    FalService,
    EmailService,
    TrackService,
    ShortLinkService,
    SetsService,
    SetsRepository,
    ThirdPartyRepository,
    ThirdPartyService,
    OAuthRepository,
    OAuthService,
    VideoManager,
    AnnouncementsRepository,
    AnnouncementsService,
  ],
  get exports() {
    return this.providers;
  },
})
export class DatabaseModule {}
