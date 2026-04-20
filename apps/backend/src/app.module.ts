import { Global, Module } from '@nestjs/common';
import { DatabaseModule } from '@07ai/nestjs-libraries/database/prisma/database.module';
import { ApiModule } from '@07ai/backend/api/api.module';
import { APP_GUARD } from '@nestjs/core';
import { PoliciesGuard } from '@07ai/backend/services/auth/permissions/permissions.guard';
import { PublicApiModule } from '@07ai/backend/public-api/public.api.module';
import { ThrottlerBehindProxyGuard } from '@07ai/nestjs-libraries/throttler/throttler.provider';
import { ThrottlerModule } from '@nestjs/throttler';
import { AgentModule } from '@07ai/nestjs-libraries/agent/agent.module';
import { ThirdPartyModule } from '@07ai/nestjs-libraries/3rdparties/thirdparty.module';
import { VideoModule } from '@07ai/nestjs-libraries/videos/video.module';
import { SentryModule } from '@sentry/nestjs/setup';
import { FILTER } from '@07ai/nestjs-libraries/sentry/sentry.exception';
import { ChatModule } from '@07ai/nestjs-libraries/chat/chat.module';
import { getTemporalModule } from '@07ai/nestjs-libraries/temporal/temporal.module';
import { TemporalRegisterMissingSearchAttributesModule } from '@07ai/nestjs-libraries/temporal/temporal.register';
import { InfiniteWorkflowRegisterModule } from '@07ai/nestjs-libraries/temporal/infinite.workflow.register';
import { ThrottlerStorageRedisService } from '@nest-lab/throttler-storage-redis';
import { ioRedis } from '@07ai/nestjs-libraries/redis/redis.service';

@Global()
@Module({
  imports: [
    SentryModule.forRoot(),
    DatabaseModule,
    ApiModule,
    PublicApiModule,
    AgentModule,
    ThirdPartyModule,
    VideoModule,
    ChatModule,
    getTemporalModule(false),
    TemporalRegisterMissingSearchAttributesModule,
    InfiniteWorkflowRegisterModule,
    ThrottlerModule.forRoot({
      throttlers: [
        {
          ttl: 3600000,
          limit: process.env.API_LIMIT ? Number(process.env.API_LIMIT) : 30,
        },
      ],
      storage: new ThrottlerStorageRedisService(ioRedis),
    }),
  ],
  controllers: [],
  providers: [
    FILTER,
    {
      provide: APP_GUARD,
      useClass: ThrottlerBehindProxyGuard,
    },
    {
      provide: APP_GUARD,
      useClass: PoliciesGuard,
    },
  ],
  exports: [
    DatabaseModule,
    ApiModule,
    PublicApiModule,
    AgentModule,
    ThrottlerModule,
    ChatModule,
  ],
})
export class AppModule {}
