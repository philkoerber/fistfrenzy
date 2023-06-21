import { io } from "socket.io-client";
import { create } from "zustand";

const useFistStore = create((set) => ({
  //___________Lobbying________
  socket: null,
  connectToSocket: (callback) => {
    const socket = io("http://localhost:3002");
    socket.on("connect", () => {
      set({ socket });
      if (callback) {
        callback(socket);
      }
    });
  },
  // disconnectSocket: () => {
  //   const { socket } = get();
  //   if (socket) {
  //     socket.disconnect();
  //     set({ socket: null });
  //   }
  // },
  gameId: null,
  setGameId: (id) => set(() => ({ gameId: id })),

  playerNumber: null,
  setPlayerNumber: (number) => set(() => ({ playerNumber: number })),

  phase: "",
  setPhase: (newPhase) => set(()=> ({phase: newPhase})),

  gameState: null,
  setGameState: (newState) => set(() => ({ gameState: newState })),

  winner: null,
  setWinner: (newWinner) => set(() => ({ winner: newWinner })),

  hands: { player1: null, player2: null },
  setHands: (newHands) => set(() => ({ hands: newHands})),


}));

export default useFistStore;
