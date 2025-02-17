// https://developer.mozilla.org/ko/docs/Glossary/Breadcrumb
export default function Breadcrumb({ appElem, step, onClick }) {
  this.step = step;
  this.onClick = onClick;
  this.target = document.createElement("nav");
  this.target.className = "Breadcrumb";
  appElem.appendChild(this.target);

  this.setStep = (nextStep) => {
      this.step = nextStep;
      this.render();
  };

  this.render = () => {
      this.target.innerHTML = `${this.step
          .map((node) => `<div data-nodeid=${node.id}>${node.name}</div>`)
          .join("")}
    `;
  };

  this.target.addEventListener('click', (e) => {
      const { nodeid } = e.target.dataset;

      const selectedNode = this.step.find((node) => node.id === nodeid);
      if (selectedNode) {
          this.onClick(selectedNode.id)
      }
  });

  this.render();
}
