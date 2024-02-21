import axios from "axios";
import { io } from "socket.io-client";

const socket = io(process.env.SUPER_NODE_SOCKET_URL!, {
  transports: ["websocket"],
});

socket.on("newFancyAdded", async ({ fancy, matchId }) => {
  axios
    .post(`${process.env.CLIENT_NODE_URL}/add-new-fancy`, {
      fancy: {
        ...fancy,
        matchId,
      },
    })
    .then((res) => {})
    .catch((e) => console.log(e.response));
});

socket.on("deactivateFancy-Super", (fancy) => {
  if (Object.keys(fancy).length > 0) {
    axios
      .post(`${process.env.CLIENT_NODE_URL}/deactivate-fancy`, {
        fancies: fancy,
      })
      .then((res) => {
        // here add new fancy to frontend
      })
      .catch((e) => console.log(e.response));
  }
});

socket.on("deactivateMarket-Super", (market: any) => {
  axios
    .post(`${process.env.CLIENT_NODE_URL}/deactivate-markets`, {
      market,
    })
    .then(async (res) => {
      if (res.data && res.data.data.matchDelete) {
      }

      // here add new fancy to frontend
    })
    .catch((e) => console.log(e.response.data));
});

socket.on("activateMarket-Super", (marketIds: string) => {
  axios
    .post(`${process.env.CLIENT_NODE_URL}/activate-markets`, {
      marketIds,
    })
    .then((res) => {
      // here add new fancy to frontend
    })
    .catch((e) => console.log(e.response.data));
});

socket.on("inplayMarket-Super", (marketIds: string) => {
  axios
    .post(`${process.env.CLIENT_NODE_URL}/inplay-market`, {
      marketIds,
    })
    .then((res) => {
      // here add new fancy to frontend
    })
    .catch((e) => console.log(e.message));
});

socket.on("t10ResultFancy-Super", ({ score, type }: any) => {
  if (score && Object.keys(score).length > 0) {
    const over = score?.current_over?.split(".")[0];
    const wickets = score?.current_wickets;

    if (score.EventID && (over || wickets)) {
      axios
        .get(
          `${process.env.CLIENT_NODE_URL}/set-t10-fancy-over-run-result?over=${
            type == "run" || type == "only-run" ? over : wickets
          }&matchId=${score.EventID}&result=${
            score?.current_score
          }&type=${type}`
        )
        .catch((e) => console.log(e.message));
    }
  }
});
