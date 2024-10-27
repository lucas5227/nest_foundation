async function drawDropzone(id, type, acceptedFiles) {
  Dropzone.autoDiscover = false;
  const dropzoneElement = document.getElementById(id);

  if (!dropzoneElement) {
    console.error(`Element with id "${id}" not found.`);
    return false;
  }

  if (!acceptedFiles) {
    acceptedFiles = 'image/*';
  }

  const dropzone = new Dropzone(`#${id}`, {
    url: '/minio/upload',
    acceptedFiles: acceptedFiles,
    dictDefaultMessage: '여기에 드롭하거나 클릭하여 업로드하세요',
    paramName: 'file',
    params: { type: type },
    maxFiles: 1,

    init: async function () {
      // hidden input에서 초기 해시된 파일 이름 가져오기
      const initialHashedName = $('input[name=' + type + ']').val();

      if (initialHashedName) {
        try {
          const file = await getFileByHashedName(initialHashedName);
          const mockFile = {
            name: file.file_original_name,
            size: file.file_size,
            url: '/minio/download/' + initialHashedName,
          };

          this.emit('addedfile', mockFile);
          this.emit('thumbnail', mockFile, mockFile.url);
          this.emit('complete', mockFile);

          const thumbnailElement = mockFile.previewElement.querySelector('img');
          if (thumbnailElement) {
            thumbnailElement.style.width = '100%';
            thumbnailElement.style.height = 'auto';
            thumbnailElement.style.objectFit = 'cover';
          }

          const removeButton = Dropzone.createElement(
            '<button class="btn btn-danger btn-sm" style="margin-top: 10px;">삭제</button>',
          );

          removeButton.addEventListener(
            'click',
            function (e) {
              e.preventDefault();
              e.stopPropagation();
              this.removeFile(mockFile);
              $('input[name=' + type + ']').val('');
            }.bind(this),
          );

          mockFile.previewElement.appendChild(removeButton);
        } catch (error) {
          console.error('Error retrieving file:', error);
        }
      }

      this.on('success', function (file, response) {
        $('input[name=' + type + ']').val(response.hashedName);
      });

      this.on('error', function (file, errorMessage) {
        console.error('File upload error:', errorMessage);
      });

      this.on('addedfile', function (file) {
        const removeButton = Dropzone.createElement(
          '<button class="btn btn-danger btn-sm" style="margin-top: 10px;">삭제</button>',
        );

        removeButton.addEventListener(
          'click',
          function (e) {
            e.preventDefault();
            e.stopPropagation();
            this.removeFile(file);
            $('input[name=' + type + ']').val('');
          }.bind(this),
        );

        file.previewElement.appendChild(removeButton);
      });
    },
  });

  return dropzone;
}

// getFileByHashedName을 Promise로 반환하여 비동기 처리
function getFileByHashedName(hashedName) {
  return new Promise((resolve, reject) => {
    $.ajax({
      url: '/minio/file/' + hashedName,
      method: 'GET',
    })
      .done(function (data) {
        resolve(data);
      })
      .fail(function (xhr, status, error) {
        reject(new Error('File download failed: ' + error));
      });
  });
}
