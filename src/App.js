import Breacrumb from "./Breadcrumb.js";
import ImageViwer from "./ImageViewer.js";
import Loading from "./Loading.js";
import Nodes from "./Nodes.js";
import { nodeFetchCall } from "./api.js";

//data 보관
const dataCache = {};

export default function App() {
    this.appElem = document.querySelector(".App");
    this.dirStep = [{ id: "root", name: "root" }];

    this.breacrumb = new Breacrumb({
        appElem: this.appElem,
        step: this.dirStep,
        onClick: (selectedNodeId) => { //Breacrumb 버튼 클릭
            const curSize = this.dirStep.length;

            while (this.dirStep.length > 1) {
                const node = this.dirStep.at(-1);
                if (selectedNodeId === node.id) {
                    break;
                }
                this.dirStep.pop();
            }
            // dir을 변경한 경우에만 상태업데이트
            if (curSize !== this.dirStep.length) {
                this.setState();
            }
        },
    });

    this.nodes = new Nodes({
        appElem: this.appElem,
        isRoot: true,
        nodes: [],
        onClick: async (node) => {
            if (node.type === "DIRECTORY") {
                if (dataCache[node.id] == null) {
                    const result = await nodeFetchCall({
                        nodeId: node.id,
                        setLoading: () => this.loading.setLodingState(true),
                        finishLoading: () => this.loading.setLodingState(false),
                    });
                    dataCache[node.id] = result;
                }

                this.dirStep.push({ id: node.id, name: node.name });
                this.setState();
            } else if (node.type === "FILE") {
                this.imageViewer.setImage(node.filePath);
            }
        },
        onPrevClick: () => { //뒤로가기 버튼클릭
            if (this.dirStep.length > 1) {
                this.dirStep.pop();
                this.setState();
            }
        },
    });
    this.imageViewer = new ImageViwer({ appElem: this.appElem, filePath: "" });

    this.loading = new Loading({ appElem: this.appElem, initState: false });

    // 초기화
    this.init = async () => {
        const result = await nodeFetchCall({
            setLoading: () => this.loading.setLodingState(true),
            finishLoading: () => this.loading.setLodingState(false),
        });
        dataCache["root"] = result;

        this.nodes.setNodes({ isRoot: true, nodes: result });

        document.addEventListener("keydown", (e) => {
            if (e.key === "Escape") {
                this.imageViewer.setImage("");
            }
        });
    };

    // 상태업데이트
    this.setState = () => {
        const currentNode = this.dirStep.at(-1);
        if (dataCache[currentNode.id] == null) {
            window.alert("잠시후에 다시 시도해 주세요");
            this.dirStep.pop();
            return;
        }
        this.breacrumb.setStep(this.dirStep);
        this.nodes.setNodes({
            isRoot: currentNode.id === "root",
            nodes: dataCache[currentNode.id],
        });
    };

    this.init();
}
