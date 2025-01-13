export default function Nodes({ appElem, isRoot, nodes, onClick, onPrevClick }) {
  this.isRoot = isRoot;
  this.nodes = nodes;
  this.onClick = onClick;
  this.onPrevClick = onPrevClick;
  this.target = document.createElement("div");
  this.target.className = "Nodes";
  appElem.appendChild(this.target);

  this.setNodes = ({ isRoot, nodes }) => {
      this.isRoot = isRoot;
      this.nodes = nodes;
      this.render();
  };

  this.render = () => {
      const template = this.isRoot
          ? ""
          : `<div class="Node" data-nodeid="prev">
          <img src="./assets/prev.png" />
        </div>`;
      this.target.innerHTML = `
            ${template}
            ${this.nodes
              .map(
                  (node) => `
                    <div class="Node" data-nodeid=${node.id}>
                        <img src="./assets/${node.type.toLowerCase()}.png" />
                        <div class="Name">${node.name}</div>
                    </div>`
              )
              .join("")}
        `;
  };

  this.target.addEventListener('click', (e) => {
      const { nodeid } = e.target.parentElement.dataset;
      if (nodeid === 'prev') {
          this.onPrevClick();
          return
      }

      const selectedNode = this.nodes.find(node => node.id === nodeid);
      if (selectedNode) {
          this.onClick(selectedNode);
      }
  })

  this.render();
}
