$(document).ready(function () {
  // Handle check all checkboxes
  const checkAllCheckboxes = document.querySelectorAll('#chkAll');
  checkAllCheckboxes.forEach(function (chkAll) {
    chkAll.addEventListener('change', function () {
      const tbody = this.closest('table').querySelector('tbody');
      const checkboxes = tbody.querySelectorAll('input[type="checkbox"]');
      checkboxes.forEach((checkbox) => (checkbox.checked = this.checked));
    });
  });

  // 1차, 2차, 3차 메뉴에 추가 버튼 동작
  $('.btn-success').click(function () {
    const parent = $(this).closest('div.col-md-4').find('tbody');
    const newRow = `
        <tr>
            <td><input type="checkbox"></td>
            <td>newCode</td>
            <td>새 메뉴</td>
            <td>자동연결</td>
            <td>
                <div class="btn-group" role="group">
                    <button class="btn btn-secondary btn-sm">▲</button>
                    <button class="btn btn-secondary btn-sm">▼</button>
                    <button class="btn btn-primary btn-sm">수정</button>
                </div>
            </td>
        </tr>`;
    parent.append(newRow);
  });

  // 수정 버튼 클릭 시 동작 (예시: alert로 대체)
  $(document).on('click', '.btn-primary', function () {
    const menuName = $(this).closest('tr').find('td:eq(2)').text();
    alert(menuName + ' 메뉴를 수정합니다.');
    // 실제로는 수정 모달 창을 띄우는 방식으로 구현 가능
  });

  // ▲ 버튼 클릭 시 위로 이동
  $(document).on('click', '.btn-secondary:contains("▲")', function () {
    const row = $(this).closest('tr');
    row.prev().before(row);
  });

  // ▼ 버튼 클릭 시 아래로 이동
  $(document).on('click', '.btn-secondary:contains("▼")', function () {
    const row = $(this).closest('tr');
    row.next().after(row);
  });

  // 저장하기 버튼 클릭 시
  $('.btn-primary')
    .last()
    .click(function () {
      let menuData = [];
      $('table tbody tr').each(function () {
        const rowData = {
          code: $(this).find('td:eq(1)').text(),
          name: $(this).find('td:eq(2)').text(),
          type: $(this).find('td:eq(3)').text(),
        };
        menuData.push(rowData);
      });
      console.log(menuData);
      alert('저장 완료');
      // AJAX로 서버에 데이터 전송 등 실제 저장 기능 구현 가능
    });

  $('#addDepth1').click(() => {
    location.href = '/admin/layout/sitemap/write/0';
  });
  $('#addDepth2').click(() => {
    location.href = '/admin/layout/sitemap/write/0';
  });
  $('#addDepth3').click(() => {
    location.href = '/admin/layout/sitemap/write/0';
  });
});
