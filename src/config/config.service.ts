import { Injectable } from '@nestjs/common';
import { ConfigEntity } from '../entities/Config';
import { InjectRepository } from '@mikro-orm/nestjs';
import { EntityManager, EntityRepository } from '@mikro-orm/core';

@Injectable()
export class ConfigService {
  constructor(
    @InjectRepository(ConfigEntity)
    private readonly ConfigRepository: EntityRepository<ConfigEntity>,
    private readonly em: EntityManager,
  ) {}

  async saveConfig(cofigData: Record<string, string>) {
    for (const [key, value] of Object.entries(cofigData)) {
      let config = await this.ConfigRepository.findOne({ conf_key: key });
      if (config) {
        config.conf_val = value;
      } else {
        config = this.ConfigRepository.create({
          conf_key: key,
          conf_val: value,
        });
      }
      await this.em.persistAndFlush(config);
    }
    return true;
  }

  async getConfig(
    conf_keys: string[],
  ): Promise<Record<string, string | undefined>> {
    const configData: Record<string, string | undefined> = {};
    for (const key of conf_keys) {
      const config = await this.ConfigRepository.findOne({ conf_key: key });
      configData[key] = config ? config.conf_val : undefined;
    }

    return configData;
  }
}
