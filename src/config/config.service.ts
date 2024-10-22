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
    console.log(cofigData);
    /*
      cofigData =
      {
  site_meta_title_default: 'site_meta_title_default23',
  site_meta_description_default: 'site_meta_description_default23',
  site_meta_keywords_default: 'site_meta_keywords_default23',
  site_meta_author_default: 'site_meta_author_default23',
  og_title: 'og_title',
  og_description: 'og_description'
}

    */
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
