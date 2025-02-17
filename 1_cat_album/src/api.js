const PREFIX_API =
  "https://l9817xtkq3.execute-api.ap-northeast-2.amazonaws.com/dev/";

export async function nodeFetchCall({ nodeId, setLoading, finishLoading }) {
  try {
    setLoading();
    const response = await fetch(`${PREFIX_API}${nodeId ? nodeId : ""}`);

    if (!response.ok) {
      throw new Error('잠시 후에 다시 시도해주세요.');
    }
  
    const nodeData = await response.json();
    return nodeData;
  } catch (e) {
    throw new Error(`에러가 발생했습니다. ${e.message}`);
  } finally {
    finishLoading();
  }
}

//Test용 Mock Data
export function nodeFetchCall2(nodeId) {
  if (nodeId == null) {
    const data = [
      {
        id: "1",
        name: "노란고양이",
        type: "DIRECTORY",
        filePath: null,
        parent: null,
      },
      {
        id: "3",
        name: "까만고양이",
        type: "DIRECTORY",
        filePath: null,
        parent: null,
      },
      {
        id: "10",
        name: "고등어무늬 고양이",
        type: "DIRECTORY",
        filePath: null,
        parent: null,
      },
      {
        id: "13",
        name: "삼색이 고양이",
        type: "DIRECTORY",
        filePath: null,
        parent: null,
      },
      {
        id: "14",
        name: "회색고양이",
        type: "DIRECTORY",
        filePath: null,
        parent: null,
      },
      {
        id: "20",
        name: "하얀고양이",
        type: "DIRECTORY",
        filePath: null,
        parent: null,
      },
    ];

    return data;
  }

  const nodes = {
    1: [
      {
        id: "5",
        name: "2021/04",
        type: "DIRECTORY",
        filePath: null,
        parent: {
          id: "1",
        },
      },
      {
        id: "19",
        name: "물 마시는 사진",
        type: "FILE",
        filePath: "/images/a2i.jpg",
        parent: {
          id: "1",
        },
      },
    ],

    3: [
      {
        id: "6",
        name: "2021/04",
        type: "DIRECTORY",
        filePath: null,
        parent: {
          id: "3",
        },
      },
    ],

    10: [
      {
        id: "11",
        name: "고등어친구1",
        type: "FILE",
        filePath: "/images/2b0.jpg",
        parent: {
          id: "10",
        },
      },
      {
        id: "12",
        name: "고등어친구2",
        type: "FILE",
        filePath: "/images/_rWrxmDVv.png",
        parent: {
          id: "10",
        },
      },
    ],

    14: [
      {
        id: "18",
        name: "회색친구",
        type: "FILE",
        filePath: "/images/U5nc2yre6.jpg",
        parent: {
          id: "14",
        },
      },
    ],

    5: [
      {
        id: "2",
        name: "2021/04/12",
        type: "DIRECTORY",
        filePath: null,
        parent: {
          id: "5",
        },
      },
    ],

    2: [
      {
        id: "8",
        name: "1",
        type: "FILE",
        filePath: "/images/1.jpg",
        parent: {
          id: "2",
        },
      },
      {
        id: "9",
        name: "2",
        type: "FILE",
        filePath: "/images/2.jpg",
        parent: {
          id: "2",
        },
      },
    ],

    6: [
      {
        id: "4",
        name: "2021/04/13",
        type: "DIRECTORY",
        filePath: null,
        parent: {
          id: "6",
        },
      },
      {
        id: "7",
        name: "2021/04/01",
        type: "DIRECTORY",
        filePath: null,
        parent: {
          id: "6",
        },
      },
    ],

    4: [
      {
        id: "21",
        name: "세숫대야",
        type: "FILE",
        filePath: "/images/1mt.jpg",
        parent: {
          id: "4",
        },
      },
    ],

    7: [],

    13: [
      {
        id: "15",
        name: "2021",
        type: "DIRECTORY",
        filePath: null,
        parent: {
          id: "13",
        },
      },
    ],

    15: [
      {
        id: "16",
        name: "02",
        type: "DIRECTORY",
        filePath: null,
        parent: {
          id: "15",
        },
      },
    ],

    16: [
      {
        id: "17",
        name: "삼색이",
        type: "FILE",
        filePath: "/images/MTc1ODk0OQ.jpg",
        parent: {
          id: "16",
        },
      },
    ],

    20: [
      {
        id: "22",
        name: "흰둥이",
        type: "FILE",
        filePath: "/images/v0-TjU-1H.jpg",
        parent: {
          id: "20",
        },
      },
    ],
  };

  return nodes[nodeId];
}
