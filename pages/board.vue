<template>
  <client-only>
    <kanban-board v-if="connected_board !== -1" :stages="stages" :blocks="blocks"></kanban-board>
    <v-btn v-else>Click me</v-btn>
  </client-only>
</template>
<script>
export default {
  data() {
    return {
      stages: ['on-hold', 'in-progress', 'needs-review', 'approved'],
      blocks: [
        {
          id: 1,
          status: 'on-hold',
          title: 'Welcome',
          content: 'test'
        },
        {
          id: 2,
          status: 'on-hold',
          title: 'to'
        },
        {
          id: 3,
          status: 'in-progress',
          title: 'the'
        },
        {
          id: 4,
          status: 'in-progress',
          title: 'danger'
        },
        {
          id: 5,
          status: 'in-progress',
          title: 'zone'
        }
      ]
    }
  },
  computed: {
    connected_board() {
      return this.$store.state.connected_board
    }
  }
}
</script>
<style lang="scss">
@import '../assets/kanban.scss';
</style>