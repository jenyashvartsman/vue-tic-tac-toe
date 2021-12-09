<template>
  <div class="game">
    <div class="status">
      <div>
        <img src="./../assets/img/john.jpg" alt="john" />
        User <span v-if="winner === user">(winner)</span>
      </div>
      <div>
        Skynet <span v-if="skynetThinking">...</span
        ><span v-if="winner === skynet">(winner)</span>
        <img src="./../assets/img/skynet.png" alt="skynet" />
      </div>
    </div>

    <div class="board">
      <div v-for="(row, i) in board" :key="row" class="row">
        <div
          v-for="(square, j) in row"
          :key="square"
          class="squere"
          @click="userMove(i, j)"
        >
          {{ square }}
        </div>
      </div>
    </div>

    <button v-if="winner" @click="clearBoard()">Reset Game</button>
  </div>
</template>

<script>
import { getWinState } from "./../util/winner.util";

export default {
  data() {
    return {
      winner: null,
      user: "X",
      skynet: "O",
      skynetThinking: false,
      board: null,
      winState: null,
    };
  },
  beforeMount() {
    this.clearBoard();
    this.randomInt(0, 1) === 0 ? this.skynetMove() : null;
  },
  methods: {
    userMove(i, j) {
      if (
        this.winner == null &&
        !this.skynetThinking &&
        this.board[i][j] === null
      ) {
        this.playerMove(i, j, this.user);
        this.skynetMove();
      }
    },
    skynetMove() {
      if (this.winner === null) {
        // ultimate AI algorithm
        this.skynetThinking = true;
        setTimeout(() => {
          // find available squares
          const availableSquares = [];
          for (let i = 0; i < this.board.length; i++) {
            for (let j = 0; j < this.board[i].length; j++) {
              if (this.board[i][j] === null) {
                availableSquares.push([i, j]);
              }
            }
          }

          // pick random square
          const skynetSquare =
            availableSquares[this.randomInt(0, availableSquares.length)];
          this.playerMove(skynetSquare[0], skynetSquare[1], this.skynet);

          this.skynetThinking = false;
        }, this.randomInt(1, 10) * 100);
      }
    },
    playerMove(i, j, player) {
      this.board[i][j] = player;
      this.checkWinner(player);
    },
    checkWinner(player) {
      // player won
      this.winState = getWinState(this.board, player) || null;
      if (!!this.winState) {
        this.winner = player;
      }

      // draw
      if (!this.winner && this.board.every((row) => !row.includes(null))) {
        this.winner = "XO";
      }
    },
    // new game
    clearBoard() {
      this.winner = null;
      this.board = [
        [null, null, null],
        [null, null, null],
        [null, null, null],
      ];
    },
    randomInt(min, max) {
      return Math.floor(Math.random() * max) + min;
    },
  },
};
</script>

<style>
.game {
  text-align: center;
  width: fit-content;
  margin: 0 auto;
}

.game .status {
  display: flex;
  justify-content: space-between;
  color: var(--grey);
  font-weight: 500;
  font-size: 20px;
  padding: 0 15px;
}

.game .status > div {
  display: flex;
  align-items: center;
}

.game .status img {
  width: 50px;
  height: 50px;
  border-radius: 50%;
  object-fit: cover;
  margin: 0 5px;
}

.game .board .row {
  display: flex;
  justify-content: center;
}

.game .board .row .squere {
  width: 90px;
  height: 90px;
  line-height: 90px;
  text-align: center;
  font-size: 75px;
  border: 2px solid var(--grey);
  margin: 15px;
  color: var(--grey);
  border-radius: 4px;
  cursor: pointer;
}

.game button {
  border: none;
  background-color: var(--primary);
  color: var(--white);
  padding: 10px 8px;
  font-size: 18px;
  border-radius: 4px;
  cursor: pointer;
}
</style>