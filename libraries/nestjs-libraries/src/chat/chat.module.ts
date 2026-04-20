import { Global, Module } from '@nestjs/common';
import { LoadToolsService } from '@07ai/nestjs-libraries/chat/load.tools.service';
import { MastraService } from '@07ai/nestjs-libraries/chat/mastra.service';
import { toolList } from '@07ai/nestjs-libraries/chat/tools/tool.list';

@Global()
@Module({
  providers: [MastraService, LoadToolsService, ...toolList],
  get exports() {
    return this.providers;
  },
})
export class ChatModule {}
