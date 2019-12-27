export const state = () => ({
  list_boards: [{
    id: "1",
    ip: "127.0.0.1",
    role: "admin",
    port: 9000
  }],
  connected_board: -1,
  connected_board_name: "",
  connected_board_ip: "",
  list_cards: []
})

export const mutations = {
  addBoard(state, board) {
    state.list_boards.push(
      board
    )
  },
  addCard(state, card) {
    state.list_cards.push(card)
  },
  setBoard(state, boards) {
    state.list_boards = boards
  },
  setCards(state, cards) {
    state.list_cards = cards
  },
  updateBoard(state, board) {
    state.list_boards[board.index].ip = board.item.ip
    state.list_boards[board.index].role = board.item.role
    state.list_boards[board.index].port = board.item.port
    state.list_boards[board.index].name = board.item.name
  },
  updateCard(state, card) {
    state.list_cards[card.index].title = card.item.title
    state.list_cards[card.index].content = card.item.content
    state.list_cards[card.index].status = card.item.status
  },
  removeBoard(state, index) {
    state.list_boards.splice(index, 1)
  },
  removeCard(state, index) {
    state.list_cards.splice(index, 1)
  },
  updateConnectedBoard(state, id) {
    if (id === -1) {
      state.connected_board = id
      state.connected_board_ip = null
      state.connected_board_name
    } else {
      state.connected_board = id
      state.connected_board_ip = state.list_boards[id].ip
      state.connected_board_name = state.list_boards[id].name
    }
  }
}

export const getters = {}

export const actions = {
  addBoard({
    commit
  }, board) {
    commit('addBoard', board)
  },
  setBoard({
    commit
  }, boards) {
    commit('setBoard', boards)
  },
  removeBoard({
    commit
  }, index) {
    commit('removeBoard', index)
  },
  updateBoard({
    commit
  }, board) {
    commit('updateBoard', board)
  },
  addCard({
    commit
  }, card) {
    commit('addCard', card)
  },
  setCards({
    commit
  }, cards) {
    commit('setCards', cards)
  },
  removeCard({
    commit
  }, index) {
    commit('removeCard', index)
  },
  updateCard({
    commit
  }, card) {
    commit('updateCard', card)
  },
  updateConnectedBoard({
    commit
  }, index) {
    commit('updateConnectedBoard', index)
  }
}

export const modules = () => ({})
