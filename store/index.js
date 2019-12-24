export const state = () => ({
  list_boards: [{
      ip: '127.0.0.1',
      role: 'admin',
      port: ':9000',
      root_path: '/v1/'
    },
    {
      ip: '192.168.1.1',
      role: 'manager',
      port: ':9001',
      root_path: '/v1/'
    }
  ],
  connected_board: -1
})

export const mutations = {
  add(state, board) {
    state.list_boards.push(
      board
    )
  },
  updateIpAndRole(state, board) {
    state.list_boards[board.index].ip = board.item.ip
    state.list_boards[board.index].role = board.item.role
  },
  remove(state, {
    board
  }) {
    state.list_boards.splice(state.list_boards.indexOf(board), 1)
  },
  updateConnectedBoard(state, id) {
    state.connected_board = id
  }
}

export const getters = {}

export const actions = {
  add({
    commit
  }, board) {
    commit('add', board)
  },
  remove({
    commit
  }, board) {
    commit('remove', board)
  },
  updateIpAndRole({
    commit
  }, board) {
    commit('updateIpAndRole', board)
  },
  updateConnectedBoard({
    commit
  }, index) {
    commit('updateConnectedBoard', index)
  }
}

export const modules = () => ({})
