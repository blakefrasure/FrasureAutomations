import { Module } from '@nestjs/common';
import { PostActivity } from '@07ai/orchestrator/activities/post.activity';
import { getTemporalModule } from '@07ai/nestjs-libraries/temporal/temporal.module';
import { DatabaseModule } from '@07ai/nestjs-libraries/database/prisma/database.module';
import { AutopostService } from '@07ai/nestjs-libraries/database/prisma/autopost/autopost.service';
import { EmailActivity } from '@07ai/orchestrator/activities/email.activity';
import { IntegrationsActivity } from '@07ai/orchestrator/activities/integrations.activity';
import { HealthController } from '@07ai/orchestrator/health.controller';

const activities = [
  PostActivity,
  AutopostService,
  EmailActivity,
  IntegrationsActivity,
];
@Module({
  imports: [
    DatabaseModule,
    getTemporalModule(true, require.resolve('./workflows'), activities),
  ],
  controllers: [HealthController],
  providers: [...activities],
  get exports() {
    return [...this.providers, ...this.imports];
  },
})
export class AppModule {}
