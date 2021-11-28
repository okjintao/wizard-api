import '@tsed/platform-express';
import { PlatformAws } from '@tsed/platform-aws';
import { Server } from './Server';

PlatformAws.bootstrap(Server, {
  aws: {
    binaryMimeTypes: [
      'image/png',
      'image/jpeg',
      'image/gif',
      'image/webp',
      'image/svg+xml',
    ],
  },
});

export const handler = PlatformAws.callback();
