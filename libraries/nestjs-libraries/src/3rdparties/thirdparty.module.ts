import { Global, Module } from '@nestjs/common';
import { HeygenProvider } from '@07ai/nestjs-libraries/3rdparties/heygen/heygen.provider';
import { ReelFarmProvider } from '@07ai/nestjs-libraries/3rdparties/reelfarm/reelfarm.provider';
import { ThirdPartyManager } from '@07ai/nestjs-libraries/3rdparties/thirdparty.manager';

@Global()
@Module({
  providers: [HeygenProvider, ReelFarmProvider, ThirdPartyManager],
  get exports() {
    return this.providers;
  },
})
export class ThirdPartyModule {}
