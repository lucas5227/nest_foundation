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

  $('#addDepth1, #addDepth2, #addDepth3').click(function () {
    let parent = $(this).data('parent');
    if (parent == undefined) {
      alert('상위 메뉴를 선택하세요.');
      return;
    }
    location.href = `/admin/layout/sitemap/write/${parent}`;
  });

  $(document).on('click', '.depth-1, .depth-2', function () {
    let depth = $(this).data('depth');
    let men_id = $(this).data('men_id');
    $(this).siblings().css('background-color', '');
    $(this).css('background-color', 'lightblue');
    if (depth == 1 || depth == 2) {
      let targetDepth = parseInt(depth) + 1;
      let children;
      if (depth == 1) {
        children = menuTree[men_id].children;
      }
      if (depth == 2) {
        parent = $(`#addDepth${depth}`).data('parent');
        children = menuTree[parent].children[men_id].children;
      }
      let html = '';
      children.forEach((child) => {
        if (child) {
          html += `<tr class="depth-${targetDepth}" data-depth="${targetDepth}" data-men_id="${child.men_id}">
                  <td><input type="checkbox" name="chk[]" value="${child.men_id}"></td>
                  <td>${child.men_code}</td>
                  <td>${child.men_title}</td>
                  <td>${child.men_type}</td>
                  <td>
                      <div class="btn-group" role="group">
                          <button class="btn btn-secondary btn-sm">▲</button>
                          <button class="btn btn-secondary btn-sm">▼</button>
                          <button class="btn btn-primary btn-sm" data-update="${child.men_id}">수정</button>
                      </div>
                  </td>
              </tr>`;
        }
      });
      if (html == '') {
        html = `<tr>
                    <td colspan="5" class="text-center">하위 메뉴 없음</td>
                </tr>`;
      }
      $(`#addDepth${targetDepth}`).data('parent', men_id);
      $(`.depth-${targetDepth}-body`).html(html);
    }
  });
});

$(document).on('click', '[data-update]', function () {
  let depth = $(this).parents('tr').data('depth');
  let parent = $(`#addDepth${depth}`).data('parent');
  let men_id = $(this).data('update');
  location.href = `/admin/layout/sitemap/write/${parent}?update=${men_id}`;
});

$('#delDepth1, #delDepth2, #delDepth3').click(function () {
  const men_ids = [];
  $(this)
    .parents('.depth')
    .find('input[name="chk[]"]:checked')
    .each(function () {
      men_ids.push($(this).val());
    });

  if (confirm('메뉴를 삭제하시겠습니까?')) {
    $.ajax({
      type: 'DELETE',
      url: '/admin/layout/sitemap/delete',
      data: JSON.stringify({ men_ids: men_ids }), // Serialize data as JSON
      contentType: 'application/json', // Ensure content-type is set to JSON
      async: true,
      success: function (data, status) {
        console.log(data, status);
        alert('Deleted successfully');
        window.location.reload();
      },
      error: function (xhr, status, error) {
        console.error('Error:', error);
        alert('An error occurred while deleting the menu.');
      },
    });
  }
});
