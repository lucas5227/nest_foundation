import { defineConfig } from '@mikro-orm/postgresql';
// import { User } from './entities/User'; // 각 엔티티 클래스 가져오기

export default defineConfig({
  entities: ['./dist/entities'], // 빌드된 엔티티 경로
  entitiesTs: ['./src/entities'], // 소스 엔티티 경로
  dbName: 'nest_foundation',
  user: 'foundation',
  password: 'foundation_5227',
  host: 'localhost',
  port: 5432,
  driver: require('@mikro-orm/postgresql').PostgreSqlDriver, // 드라이버 명시
  debug: true, // 디버그 모드 활성화
});
