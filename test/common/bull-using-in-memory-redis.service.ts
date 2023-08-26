import { BullModuleOptions, SharedBullConfigurationFactory } from '@nestjs/bull';
import { RedisMemoryServer } from 'redis-memory-server';
import { BullConfigService } from '../../src/shared/bull.helper';
import * as config from 'config';

export class BullUsingInMemoryRedisService implements SharedBullConfigurationFactory {
  private redisServer;

  async createSharedConfiguration(): Promise<BullModuleOptions> {
    // Use common setting. Same Redis will be used for CachingModule and Bull
    const port = +config.get('redis.port');
    const host = config.get('redis.host').toString();
    const useLocalRedisForTests = config.get('bull.useLocalRedisForTests');

    if (useLocalRedisForTests) {
      const bullConfigService = new BullConfigService();
      return bullConfigService.createSharedConfiguration();
    }

    this.redisServer = new RedisMemoryServer({
      instance: {
        port,
        ip: host,
      },
      binary: {
        // Context relative to root. Declare here instead of package.json to avoid reading binary before initialising RedisMemoryServer
        systemBinary: `./redis-server-x86-64`,
      },
    });

    // Starts and binds new RedisMemoryServer to specified host and port in instance{}
    await this.redisServer.getHost();
    await this.redisServer.getPort();

    return {
      redis: {
        host,
        port,
      },
      prefix: config.get('bull.keyPrefix'),
      limiter: {
        max: config.get('bull.maxJobs'),
        duration: config.get('bull.jobInterval'),
      },
      defaultJobOptions: {
        attempts: config.get('bull.numAttempts'),
        backoff: {
          type: config.get('bull.backoffStrategy'),
        },
      },
    };
  }
}
