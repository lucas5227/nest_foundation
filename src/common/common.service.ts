import { Injectable } from '@nestjs/common';

@Injectable()
export class CommonService {
  pagenation(
    total: number,
    per_page: number,
    page_limit: number,
    page: number,
  ) {
    const offset = (page - 1) * per_page; // 데이터베이스 조회 시 사용할 offset
    const page_num = Math.ceil(total / per_page); // 전체 페이지 수 계산
    const start = Math.floor((page - 1) / page_limit) * page_limit + 1; // 현재 페이지 그룹의 시작 페이지
    const end = Math.min(start + page_limit - 1, page_num); // 현재 페이지 그룹의 끝 페이지

    const prevShow = start > 1; // 이전 페이지 그룹이 있는지 여부
    const nextShow = end < page_num; // 다음 페이지 그룹이 있는지 여부

    return {
      limit: per_page,
      offset: offset,
      prevShow: prevShow,
      nextShow: nextShow,
      start: start,
      end: end,
    };
  }

  formattedDatetime(post_update_datetime: Date) {
    const parsedDate = new Date(post_update_datetime);
    const year = parsedDate.getFullYear();
    const month = String(parsedDate.getMonth() + 1).padStart(2, '0'); // 월은 0부터 시작하므로 +1
    const day = String(parsedDate.getDate()).padStart(2, '0');
    const hours = String(parsedDate.getHours()).padStart(2, '0');
    const minutes = String(parsedDate.getMinutes()).padStart(2, '0');
    const seconds = String(parsedDate.getSeconds()).padStart(2, '0');

    return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
  }
}
