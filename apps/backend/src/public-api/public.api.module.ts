import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { AuthService } from '@07ai/backend/services/auth/auth.service';
import { StripeService } from '@07ai/nestjs-libraries/services/stripe.service';
import { PoliciesGuard } from '@07ai/backend/services/auth/permissions/permissions.guard';
import { PermissionsService } from '@07ai/backend/services/auth/permissions/permissions.service';
import { IntegrationManager } from '@07ai/nestjs-libraries/integrations/integration.manager';
import { UploadModule } from '@07ai/nestjs-libraries/upload/upload.module';
import { OpenaiService } from '@07ai/nestjs-libraries/openai/openai.service';
import { ExtractContentService } from '@07ai/nestjs-libraries/openai/extract.content.service';
import { CodesService } from '@07ai/nestjs-libraries/services/codes.service';
import { PublicIntegrationsController } from '@07ai/backend/public-api/routes/v1/public.integrations.controller';
import { PublicAuthMiddleware } from '@07ai/backend/services/auth/public.auth.middleware';

const authenticatedController = [PublicIntegrationsController];
@Module({
  imports: [UploadModule],
  controllers: [...authenticatedController],
  providers: [
    AuthService,
    StripeService,
    OpenaiService,
    ExtractContentService,
    PoliciesGuard,
    PermissionsService,
    CodesService,
    IntegrationManager,
  ],
  get exports() {
    return [...this.imports, ...this.providers];
  },
})
export class PublicApiModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(PublicAuthMiddleware).forRoutes(...authenticatedController);
  }
}

