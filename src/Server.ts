import '@tsed/platform-express';
import './common/exception-filter';
import '@tsed/swagger';
import { Configuration, Inject, PlatformApplication } from '@tsed/common';
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import methodOverride from 'method-override';
import { loadChains } from './chains/chain';
import { controllers } from './ControllerRegistry';

@Configuration({
  rootDir: __dirname,
  acceptMimes: ['application/json'],
  mount: {
    '/': controllers,
  },
  logger: {
    disableRoutesSummary: true,
    disableBootstrapLog: true,
    logRequest: false,
  },
  exclude: ['**/*.spec.ts'],
})
export class Server {
  @Inject()
  app!: PlatformApplication;

  /**
   * This method let you configure the express middleware required by your application to work.
   * @returns {Server}
   */
  $beforeRoutesInit(): void | Promise<void> {
    loadChains();
    this.app
      .use(cors())
      .use(cookieParser())
      .use(methodOverride())
      .use(bodyParser.json())
      .use(
        bodyParser.urlencoded({
          extended: true,
        }),
      );
  }
}
