<template>
  <div class="game-history">
    <!-- win state -->
    <div class="bar" v-if="gameHistory.length > 0">
      <div class="user" :style="{ width: calcWinsPerc('X') }">
        <img src="./../assets/img/john.jpg" alt="john" />
        {{ countWins("X") }}
      </div>
      <div class="draw" :style="{ width: calcWinsPerc('XO') }">
        <img src="./../assets/img/war.jpeg" alt="war" />{{ countWins("XO") }}
      </div>
      <div class="skynet" :style="{ width: calcWinsPerc('O') }">
        <img src="./../assets/img/skynet.png" alt="skynet" />
        {{ countWins("O") }}
      </div>
    </div>

    <!-- no games played -->
    <h3 v-else class="no-games">No games played yet</h3>

    <!-- games history -->
    <div class="games">
      <div class="game-card" v-for="game in gameHistory" :key="game.timestamp">
        <h5
          :class="{
            'winner-x': game.winner === 'X',
            'winner-o': game.winner === 'O',
            'winner-xo': game.winner === 'XO',
          }"
        >
          Winner: {{ game.winner }}
        </h5>
        <div class="game-timestamp">{{ formatTimestamp(game.timestamp) }}</div>
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
    };
  },
  mounted() {
    this.gameHistory = getGameHistory();
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
      return (
        ((this.countWins(player) / this.gameHistory.length) * 100).toFixed(2) +
        "%"
      );
    },
    countWins(player) {
      return this.gameHistory.filter((game) => game.winner === player).length;
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

.game-history .no-games {
  text-align: center;
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
  max-width: 235px;
}

.game-history .games .game-card h5 {
  color: var(--white);
  padding: 5px 10px;
  margin: 10px auto;
  border-radius: 4px;
  width: fit-content;
}

.game-history .games .game-card h5.winner-x {
  background-color: var(--primary);
}

.game-history .games .game-card h5.winner-o {
  background-color: var(--grey);
}

.game-history .games .game-card h5.winner-xo {
  background-color: var(--blue);
}

.game-history .games .game-card .game-timestamp {
  letter-spacing: 1px;
}

.game-history .games .game-card .game-board {
  margin: 15px auto;
  border: 1px solid var(--grey);
  border-radius: 4px;
  width: fit-content;
}

.game-history .games .game-card .game-board > div > span {
  padding: 4px;
  width: 15px;
  height: 15px;
  display: inline-block;
  border: 1px solid var(--grey);
  text-align: center;
  font-size: 12px;
  font-weight: bold;
}
</style>