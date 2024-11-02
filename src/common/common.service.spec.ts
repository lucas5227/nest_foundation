import { Test, TestingModule } from '@nestjs/testing';
import { CommonService } from './common.service';

describe('CommonService', () => {
  let service: CommonService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CommonService],
    }).compile();

    service = module.get<CommonService>(CommonService);
  });

  it('서비스가 정의되어 있는지', () => {
    expect(service).toBeDefined();
  });

  describe('pagenation', () => {
    it('페이지네이션 계산', () => {
      const total = 100;
      const per_page = 10;
      const page_limit = 5;
      const page = 3;

      const result = service.pagenation(total, per_page, page_limit, page);
      expect(result).toEqual({
        limit: per_page,
        offset: (page - 1) * per_page,
        prevShow: false,
        nextShow: true,
        start: 1,
        end: page_limit,
      });
    });

    it('마지막 페이지 그룹을 올바르게 처리해야 함', () => {
      const total = 60;
      const per_page = 10;
      const page_limit = 5;
      const page = 6;
      const result = service.pagenation(total, per_page, page_limit, page);
      expect(result).toEqual({
        limit: 10,
        offset: 50,
        prevShow: true,
        nextShow: false,
        start: 6,
        end: 6,
      });
    });
  });

  describe('formattedDatetime', () => {
    it('기본 형식으로 날짜를 포맷', () => {
      const testDate = new Date('2024-11-02T08:19:16');
      const formatted = service.formattedDatetime(testDate);
      expect(formatted).toBe('2024-11-02 08:19:16');
    });

    it('사용자 지정 형식으로 날짜를 포맷', () => {
      const testDate = new Date('2024-11-02T08:19:16');
      const formatted = service.formattedDatetime(testDate, 'YYYY-MM-DD');
      expect(formatted).toBe('2024-11-02');
    });
  });
});
