export default function Loading({ appElem, initState }) {
    this.isLoading = initState;
    this.target = document.createElement("div");
    this.target.className = "Modal Loading";
    appElem.appendChild(this.target);

    this.init = () => {
        this.target.innerHTML = `
          <div class="content">
              <img src="./assets/nyan-cat.gif">
          </div>
      `;
        this.setLodingState(true);
    };

    this.setLodingState = (isLoading) => {
        if (this.isLoading === isLoading) {
            return;
        }
        this.isLoading = isLoading;
        this.target.style.display = this.isLoading ? "block" : "none";
    };

    this.init();
}
