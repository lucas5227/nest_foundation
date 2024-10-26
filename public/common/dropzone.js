function drawDropzone(id, type) {
  Dropzone.autoDiscover = false; // Dropzone 자동 발견 비활성화
  const dropzoneElement = document.getElementById(id);

  if (!dropzoneElement) {
    console.error(`Element with id "${id}" not found.`);
    return false;
  }

  const dropzone = new Dropzone(`#${id}`, {
    url: '/minio/upload', // 파일 업로드를 위한 엔드포인트
    acceptedFiles: 'image/*',
    dictDefaultMessage: '여기에 드롭하거나 클릭하여 업로드하세요',
    paramName: 'file',
    params: { type: type }, // type 파라미터 추가
    maxFiles: 1,

    init: function () {
      // hidden input에서 초기 이미지 URL 가져오기
      const initialImageUrl = $('input[name=' + type + ']').val();

      // 초기 이미지가 있을 경우 드롭존에 추가
      if (initialImageUrl) {
        const mockFile = {
          name: 'Initial Image',
          size: 12345,
          url: initialImageUrl,
        }; // Mock file object
        this.emit('addedfile', mockFile); // Dropzone에 파일 추가
        this.emit('thumbnail', mockFile, initialImageUrl); // 썸네일 설정
        this.emit('complete', mockFile); // 업로드 완료 상태로 설정

        // 썸네일 크기 조정
        const thumbnailElement = mockFile.previewElement.querySelector("img");
        if (thumbnailElement) {
          thumbnailElement.style.width = '100%'; // 썸네일 폭을 100%로 설정
          thumbnailElement.style.height = 'auto'; // 높이는 자동으로 조정
          thumbnailElement.style.objectFit = 'cover'; // 썸네일이 배율을 맞추도록 설정
        }

        // 삭제 버튼 생성
        const removeButton = Dropzone.createElement(
          '<button class="btn btn-danger btn-sm" style="margin-top: 10px;">삭제</button>'
        );

        // 삭제 버튼 클릭 시 파일 제거
        removeButton.addEventListener('click', function (e) {
          e.preventDefault();
          e.stopPropagation();
          this.removeFile(mockFile); // Dropzone에서 mockFile 제거
          $('input[name=' + type + ']').val(''); // hidden input 초기화
        }.bind(this));

        // 파일 미리보기 영역에 삭제 버튼 추가
        mockFile.previewElement.appendChild(removeButton);
      }

      // 성공적으로 파일 업로드 시 처리
      this.on('success', function (file, response) {
        console.log('File uploaded successfully:', file);
        console.log('Server response:', response);
        $('input[name=' + type + ']').val(response.hashedName); // hidden input에 서버 응답의 파일 이름 저장
        console.log('Uploaded file name:', $('input[name=' + type + ']').val());
      });

      // 파일 업로드 에러 처리
      this.on('error', function (file, errorMessage) {
        console.error('File upload error:', errorMessage);
        console.error('Failed file:', file);
      });

      // 파일 추가 시 삭제 버튼 생성
      this.on('addedfile', function (file) {
        const removeButton = Dropzone.createElement(
          '<button class="btn btn-danger btn-sm" style="margin-top: 10px;">삭제</button>'
        );

        // 삭제 버튼 클릭 시 파일 제거
        removeButton.addEventListener('click', function (e) {
          e.preventDefault();
          e.stopPropagation();
          this.removeFile(file); // Dropzone에서 파일 제거
          $('input[name=' + type + ']').val(''); // hidden input 초기화
        }.bind(this)); // `this`는 Dropzone 인스턴스를 가리킴

        // 파일 미리보기 영역에 삭제 버튼 추가
        file.previewElement.appendChild(removeButton);
      });
    },
  });

  return dropzone;
}
