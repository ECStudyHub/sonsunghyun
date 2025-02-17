const PREFIX_IMAGE_SRC = 'https://fe-dev-matching-2021-03-serverlessdeploymentbuck-t3kpj3way537.s3.ap-northeast-2.amazonaws.com/public'

export default function ImageViewer({ appElem, filePath }) {
  this.target = document.createElement("div");
  this.target.className = "Modal ImageViewer";
  this.filePath = filePath;
  appElem.appendChild(this.target);

  this.setImage = (imageFilePath) => {
    if(imageFilePath === this.filePath) {
      return;
    }
    this.filePath = imageFilePath;
    this.render();
  };

  this.render = () => {
    this.target.innerHTML =
      this.filePath.length > 0
          ? `<div class="content">
              <img src="${PREFIX_IMAGE_SRC}${filePath}" alt="고양이 사진" onerror="this.src='./assets/sample_image.jpg';">
            </div>`
          : "";
        
    this.target.style.display = this.filePath.length > 0 ? "block" : "none";
  };

  this.render();
}
