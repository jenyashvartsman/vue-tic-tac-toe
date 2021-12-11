const key = 'game_history';

export const addGameHistory = (winner, board) => {
  const gameHistory = getGameHistory();
  gameHistory.push({
    timestamp: new Date(),
    winner: winner,
    board: board
  });
  window.localStorage.setItem(key, JSON.stringify(gameHistory));
};

export const getGameHistory = () => {
  const games = JSON.parse(window.localStorage.getItem(key));
  return games ? games.reverse() : [];
}