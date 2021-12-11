<template>
  <div class="game-history">
    <div class="bar" v-if="gameHistory.length > 0">
      <div class="user" :style="{ width: userWinPerc }">
        <img src="./../assets/img/john.jpg" alt="john" />
        {{ userWinPerc }}
      </div>
      <div class="draw" :style="{ width: drawPerc }">XO {{ drawPerc }}</div>
      <div class="skynet" :style="{ width: skynetWinPerc }">
        <img src="./../assets/img/skynet.png" alt="skynet" />
        {{ skynetWinPerc }}
      </div>
    </div>

    <h3 v-else>No games played yet</h3>

    <div class="games">
      <div class="game-card" v-for="game in gameHistory" :key="game.timestamp">
        <h5>Winner: {{ game.winner }}</h5>
        <div>{{ formatTimestamp(game.timestamp) }}</div>
        <div class="game-board">
          <div v-for="row in game.board" :key="row">
            <span v-for="square in row" :key="row + square">
              <span :style="{ opacity: !!square ? 1 : 0 }">
                {{ square || "-" }}
              </span>
            </span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { getGameHistory } from "./../db/db";

export default {
  data() {
    return {
      gameHistory: [],
      userWinPerc: 0,
      skynetWinPerc: 0,
      drawPerc: 0,
    };
  },
  mounted() {
    this.gameHistory = getGameHistory();
    this.userWinPerc = this.calcWinsPerc("X");
    this.skynetWinPerc = this.calcWinsPerc("O");
    this.drawPerc = this.calcWinsPerc("XO");
  },
  methods: {
    formatTimestamp(timestamp) {
      const options = {
        weekday: "long",
        year: "numeric",
        month: "long",
        day: "numeric",
        hour: "numeric",
        minute: "numeric",
        second: "numeric",
      };
      return new Date(timestamp).toLocaleDateString("en-US", options);
    },
    calcWinsPerc(player) {
      const wins = this.gameHistory.filter(
        (game) => game.winner === player
      ).length;
      return ((wins / this.gameHistory.length) * 100).toFixed(2) + "%";
    },
  },
};
</script>

<style>
.game-history .bar {
  display: flex;
  margin: 40px 0;
}

.game-history .bar div {
  float: left;
  color: var(--white);
  padding: 10px 0;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
}

.game-history .bar div img {
  width: 36px;
  height: 36px;
  border-radius: 50%;
  object-fit: cover;
  margin-right: 10px;
}

.game-history .bar .user {
  background-color: var(--primary);
  border-top-left-radius: 4px;
  border-bottom-left-radius: 4px;
}

.game-history .bar .skynet {
  background-color: var(--grey);
  border-top-right-radius: 4px;
  border-bottom-right-radius: 4px;
}

.game-history .bar .draw {
  background-color: var(--blue);
}

.game-history .games {
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
}

.game-history .games .game-card {
  border: 2px solid var(--grey);
  border-radius: 4px;
  text-align: center;
  margin: 10px;
  padding: 0 20px;
}

.game-history .games .game-card h5 {
  color: var(--primary);
}

.game-history .games .game-card .game-board {
  margin: 15px 0;
}

.game-history .games .game-card .game-board > div > span {
  padding: 4px;
  width: 15px;
  height: 15px;
  display: inline-block;
  border: 1px solid var(--grey);
  text-align: center;
}
</style>