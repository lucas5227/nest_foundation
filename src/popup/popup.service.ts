import { Injectable } from '@nestjs/common';
import { PopupEntity } from '../entities/Popup';
import { InjectRepository } from '@mikro-orm/nestjs';
import { EntityManager, EntityRepository } from '@mikro-orm/core';

@Injectable()
export class PopupService {
  constructor(
    @InjectRepository(PopupEntity)
    private readonly PopupRepository: EntityRepository<PopupEntity>,
    private readonly em: EntityManager,
  ) {}

  async writePopup(popupWriteDto: Partial<PopupEntity>) {
    let popup = null;
    if (popupWriteDto.pop_id) {
      popup = await this.PopupRepository.findOne({
        pop_id: popupWriteDto.pop_id,
      });
      popup.pop_start_date = popupWriteDto.pop_start_date;
      popup.pop_end_date = popupWriteDto.pop_end_date;
      popup.pop_left = popupWriteDto.pop_left;
      popup.pop_top = popupWriteDto.pop_top;
        popup.pop_width = Number(popupWriteDto.pop_width);
      popup.pop_title = popupWriteDto.pop_title;
      popup.pop_content = popupWriteDto.pop_content;
      popup.pop_activated = popupWriteDto.pop_activated;
      popup.pop_datetime = new Date();
      popup.pop_ip = popupWriteDto.pop_ip;
      popup.mem_id = popupWriteDto.mem_id;
      popup.pop_link = popupWriteDto.pop_link;
      popup.pop_today = popupWriteDto.pop_today;
      popup.pop_window = popupWriteDto.pop_window;
    } else {
      // 기존 팝업이 없으면 새로 생성
      delete popupWriteDto.pop_id;
      popup = this.PopupRepository.create(popupWriteDto);
    }

    // 변경 사항을 저장
    await this.em.persistAndFlush(popup);
    return popup.pop_id;
  }

  /**
   * 모든 게시물 정보를 조회하는 메서드
   * @param offset 시작 위치
   * @param limit 가져올 항목 수
   * @returns 모든 게시물 엔티티 배열
   */
  async getPopups(offset: number, limit: number = 0): Promise<PopupEntity[]> {
    const popups = await this.PopupRepository.findAll({
      limit: limit,
      offset: offset,
    });

    return popups;
  }

  async getListTotal() {
    const total = await this.PopupRepository.count();
    return total;
  }

  async getOnePopup(pop_id) {
    return await this.PopupRepository.findOne({ pop_id });
  }
}
