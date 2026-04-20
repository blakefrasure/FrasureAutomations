import 'reflect-metadata';

import { Injectable } from '@nestjs/common';
import { XProvider } from '@07ai/nestjs-libraries/integrations/social/x.provider';
import { SocialProvider } from '@07ai/nestjs-libraries/integrations/social/social.integrations.interface';
import { LinkedinProvider } from '@07ai/nestjs-libraries/integrations/social/linkedin.provider';
import { RedditProvider } from '@07ai/nestjs-libraries/integrations/social/reddit.provider';
import { DevToProvider } from '@07ai/nestjs-libraries/integrations/social/dev.to.provider';
import { HashnodeProvider } from '@07ai/nestjs-libraries/integrations/social/hashnode.provider';
import { MediumProvider } from '@07ai/nestjs-libraries/integrations/social/medium.provider';
import { FacebookProvider } from '@07ai/nestjs-libraries/integrations/social/facebook.provider';
import { InstagramProvider } from '@07ai/nestjs-libraries/integrations/social/instagram.provider';
import { YoutubeProvider } from '@07ai/nestjs-libraries/integrations/social/youtube.provider';
import { TiktokProvider } from '@07ai/nestjs-libraries/integrations/social/tiktok.provider';
import { PinterestProvider } from '@07ai/nestjs-libraries/integrations/social/pinterest.provider';
import { DribbbleProvider } from '@07ai/nestjs-libraries/integrations/social/dribbble.provider';
import { LinkedinPageProvider } from '@07ai/nestjs-libraries/integrations/social/linkedin.page.provider';
import { ThreadsProvider } from '@07ai/nestjs-libraries/integrations/social/threads.provider';
import { DiscordProvider } from '@07ai/nestjs-libraries/integrations/social/discord.provider';
import { SlackProvider } from '@07ai/nestjs-libraries/integrations/social/slack.provider';
import { MastodonProvider } from '@07ai/nestjs-libraries/integrations/social/mastodon.provider';
import { BlueskyProvider } from '@07ai/nestjs-libraries/integrations/social/bluesky.provider';
import { LemmyProvider } from '@07ai/nestjs-libraries/integrations/social/lemmy.provider';
import { InstagramStandaloneProvider } from '@07ai/nestjs-libraries/integrations/social/instagram.standalone.provider';
import { FarcasterProvider } from '@07ai/nestjs-libraries/integrations/social/farcaster.provider';
import { TelegramProvider } from '@07ai/nestjs-libraries/integrations/social/telegram.provider';
import { NostrProvider } from '@07ai/nestjs-libraries/integrations/social/nostr.provider';
import { VkProvider } from '@07ai/nestjs-libraries/integrations/social/vk.provider';
import { WordpressProvider } from '@07ai/nestjs-libraries/integrations/social/wordpress.provider';
import { ListmonkProvider } from '@07ai/nestjs-libraries/integrations/social/listmonk.provider';
import { GmbProvider } from '@07ai/nestjs-libraries/integrations/social/gmb.provider';
import { KickProvider } from '@07ai/nestjs-libraries/integrations/social/kick.provider';
import { TwitchProvider } from '@07ai/nestjs-libraries/integrations/social/twitch.provider';
import { SocialAbstract } from '@07ai/nestjs-libraries/integrations/social.abstract';
import { MoltbookProvider } from '@07ai/nestjs-libraries/integrations/social/moltbook.provider';
import { SkoolProvider } from '@07ai/nestjs-libraries/integrations/social/skool.provider';
import { WhopProvider } from '@07ai/nestjs-libraries/integrations/social/whop.provider';
import { MeweProvider } from '@07ai/nestjs-libraries/integrations/social/mewe.provider';

export const socialIntegrationList: Array<SocialAbstract & SocialProvider> = [
  new XProvider(),
  new LinkedinProvider(),
  new LinkedinPageProvider(),
  new RedditProvider(),
  new InstagramProvider(),
  new InstagramStandaloneProvider(),
  new FacebookProvider(),
  new ThreadsProvider(),
  new YoutubeProvider(),
  new GmbProvider(),
  new TiktokProvider(),
  new PinterestProvider(),
  new DribbbleProvider(),
  new DiscordProvider(),
  new SlackProvider(),
  new KickProvider(),
  new TwitchProvider(),
  new MastodonProvider(),
  new BlueskyProvider(),
  new LemmyProvider(),
  new FarcasterProvider(),
  new TelegramProvider(),
  new NostrProvider(),
  new VkProvider(),
  new MediumProvider(),
  new DevToProvider(),
  new HashnodeProvider(),
  new WordpressProvider(),
  new ListmonkProvider(),
  new MoltbookProvider(),
  new WhopProvider(),
  new SkoolProvider(),
  new MeweProvider(),
  // new MastodonCustomProvider(),
];

@Injectable()
export class IntegrationManager {
  async getAllIntegrations() {
    return {
      social: await Promise.all(
        socialIntegrationList.map(async (p) => ({
          name: p.name,
          identifier: p.identifier,
          toolTip: p.toolTip,
          editor: p.editor,
          isExternal: !!p.externalUrl,
          isWeb3: !!p.isWeb3,
          isChromeExtension: !!p.isChromeExtension,
          ...(p.extensionCookies ? { extensionCookies: p.extensionCookies } : {}),
          ...(p.customFields ? { customFields: await p.customFields() } : {}),
        }))
      ),
      article: [] as any[],
    };
  }

  getAllTools(): {
    [key: string]: {
      description: string;
      dataSchema: any;
      methodName: string;
    }[];
  } {
    return socialIntegrationList.reduce(
      (all, current) => ({
        ...all,
        [current.identifier]:
          Reflect.getMetadata('custom:tool', current.constructor.prototype) ||
          [],
      }),
      {}
    );
  }

  getAllRulesDescription(): {
    [key: string]: string;
  } {
    return socialIntegrationList.reduce(
      (all, current) => ({
        ...all,
        [current.identifier]:
          Reflect.getMetadata(
            'custom:rules:description',
            current.constructor
          ) || '',
      }),
      {}
    );
  }

  getAllPlugs() {
    return socialIntegrationList
      .map((p) => {
        return {
          name: p.name,
          identifier: p.identifier,
          plugs: (
            Reflect.getMetadata('custom:plug', p.constructor.prototype) || []
          )
            .filter((f: any) => !f.disabled)
            .map((p: any) => ({
              ...p,
              fields: p.fields.map((c: any) => ({
                ...c,
                validation: c?.validation?.toString(),
              })),
            })),
        };
      })
      .filter((f) => f.plugs.length);
  }

  getInternalPlugs(providerName: string) {
    const p = socialIntegrationList.find((p) => p.identifier === providerName)!;
    return {
      internalPlugs:
        (
          Reflect.getMetadata(
            'custom:internal_plug',
            p.constructor.prototype
          ) || []
        ).filter((f: any) => !f.disabled) || [],
    };
  }

  getAllowedSocialsIntegrations() {
    return socialIntegrationList.map((p) => p.identifier);
  }
  getSocialIntegration(integration: string): SocialProvider {
    return socialIntegrationList.find((i) => i.identifier === integration)!;
  }
}
