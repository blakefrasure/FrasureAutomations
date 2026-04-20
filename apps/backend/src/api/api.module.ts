import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { AuthController } from '@07ai/backend/api/routes/auth.controller';
import { AuthService } from '@07ai/backend/services/auth/auth.service';
import { UsersController } from '@07ai/backend/api/routes/users.controller';
import { AuthMiddleware } from '@07ai/backend/services/auth/auth.middleware';
import { StripeController } from '@07ai/backend/api/routes/stripe.controller';
import { StripeService } from '@07ai/nestjs-libraries/services/stripe.service';
import { AnalyticsController } from '@07ai/backend/api/routes/analytics.controller';
import { PoliciesGuard } from '@07ai/backend/services/auth/permissions/permissions.guard';
import { PermissionsService } from '@07ai/backend/services/auth/permissions/permissions.service';
import { IntegrationsController } from '@07ai/backend/api/routes/integrations.controller';
import { IntegrationManager } from '@07ai/nestjs-libraries/integrations/integration.manager';
import { SettingsController } from '@07ai/backend/api/routes/settings.controller';
import { PostsController } from '@07ai/backend/api/routes/posts.controller';
import { MediaController } from '@07ai/backend/api/routes/media.controller';
import { UploadModule } from '@07ai/nestjs-libraries/upload/upload.module';
import { BillingController } from '@07ai/backend/api/routes/billing.controller';
import { NotificationsController } from '@07ai/backend/api/routes/notifications.controller';
import { OpenaiService } from '@07ai/nestjs-libraries/openai/openai.service';
import { ExtractContentService } from '@07ai/nestjs-libraries/openai/extract.content.service';
import { CodesService } from '@07ai/nestjs-libraries/services/codes.service';
import { CopilotController } from '@07ai/backend/api/routes/copilot.controller';
import { PublicController } from '@07ai/backend/api/routes/public.controller';
import { RootController } from '@07ai/backend/api/routes/root.controller';
import { TrackService } from '@07ai/nestjs-libraries/track/track.service';
import { ShortLinkService } from '@07ai/nestjs-libraries/short-linking/short.link.service';
import { Nowpayments } from '@07ai/nestjs-libraries/crypto/nowpayments';
import { WebhookController } from '@07ai/backend/api/routes/webhooks.controller';
import { SignatureController } from '@07ai/backend/api/routes/signature.controller';
import { AutopostController } from '@07ai/backend/api/routes/autopost.controller';
import { SetsController } from '@07ai/backend/api/routes/sets.controller';
import { ThirdPartyController } from '@07ai/backend/api/routes/third-party.controller';
import { MonitorController } from '@07ai/backend/api/routes/monitor.controller';
import { NoAuthIntegrationsController } from '@07ai/backend/api/routes/no.auth.integrations.controller';
import { EnterpriseController } from '@07ai/backend/api/routes/enterprise.controller';
import { OAuthAppController } from '@07ai/backend/api/routes/oauth-app.controller';
import { ApprovedAppsController } from '@07ai/backend/api/routes/approved-apps.controller';
import { OAuthController, OAuthAuthorizedController } from '@07ai/backend/api/routes/oauth.controller';
import { AnnouncementsController } from '@07ai/backend/api/routes/announcements.controller';
import { AuthProviderManager } from '@07ai/backend/services/auth/providers/providers.manager';
import { GithubProvider } from '@07ai/backend/services/auth/providers/github.provider';
import { GoogleProvider } from '@07ai/backend/services/auth/providers/google.provider';
import { FarcasterProvider } from '@07ai/backend/services/auth/providers/farcaster.provider';
import { WalletProvider } from '@07ai/backend/services/auth/providers/wallet.provider';
import { OauthProvider } from '@07ai/backend/services/auth/providers/oauth.provider';

const authenticatedController = [
  UsersController,
  AnalyticsController,
  IntegrationsController,
  SettingsController,
  PostsController,
  MediaController,
  BillingController,
  NotificationsController,
  CopilotController,
  WebhookController,
  SignatureController,
  AutopostController,
  SetsController,
  ThirdPartyController,
  OAuthAppController,
  ApprovedAppsController,
  OAuthAuthorizedController,
  AnnouncementsController,
];
@Module({
  imports: [UploadModule],
  controllers: [
    RootController,
    StripeController,
    AuthController,
    PublicController,
    MonitorController,
    EnterpriseController,
    NoAuthIntegrationsController,
    OAuthController,
    ...authenticatedController,
  ],
  providers: [
    AuthService,
    StripeService,
    OpenaiService,
    ExtractContentService,
    AuthMiddleware,
    PoliciesGuard,
    PermissionsService,
    CodesService,
    IntegrationManager,
    TrackService,
    ShortLinkService,
    Nowpayments,
    AuthProviderManager,
    GithubProvider,
    GoogleProvider,
    FarcasterProvider,
    WalletProvider,
    OauthProvider,
  ],
  get exports() {
    return [...this.imports, ...this.providers];
  },
})
export class ApiModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(AuthMiddleware).forRoutes(...authenticatedController);
  }
}
