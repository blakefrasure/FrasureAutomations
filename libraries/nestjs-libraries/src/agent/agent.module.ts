import { Global, Module } from '@nestjs/common';
import { AgentGraphService } from '@07ai/nestjs-libraries/agent/agent.graph.service';
import { AgentGraphInsertService } from '@07ai/nestjs-libraries/agent/agent.graph.insert.service';

@Global()
@Module({
  providers: [AgentGraphService, AgentGraphInsertService],
  get exports() {
    return this.providers;
  },
})
export class AgentModule {}
