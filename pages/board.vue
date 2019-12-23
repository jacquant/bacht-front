<template>
  <client-only>
    <kanban-board :stages="stages" :blocks="blocks"></kanban-board>
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
  }
}
</script>
<style lang="scss">
@import '../assets/kanban.scss';
$on-hold: #fb7d44;
$in-progress: #2a92bf;
$needs-review: #f4ce46;
$approved: #00b961;
* {
  box-sizing: border-box;
}
body {
  background: #33363d;
  color: white;
  font-family: 'Lato';
  font-weight: 300;
  line-height: 1.5;
  -webkit-font-smoothing: antialiased;
}
.drag-column {
  .drag-column-header > div {
    width: 100%;
    h2 > a {
      float: right;
    }
  }
  .drag-column-footer > div {
    margin-left: 10px;
    a {
      text-decoration: none;
      color: white;
      &:hover {
        text-decoration: underline;
      }
    }
  }
  &-on-hold {
    .drag-column-header,
    .is-moved,
    .drag-options {
      background: $on-hold;
    }
  }
  &-in-progress {
    .drag-column-header,
    .is-moved,
    .drag-options {
      background: $in-progress;
    }
  }
  &-needs-review {
    .drag-column-header,
    .is-moved,
    .drag-options {
      background: $needs-review;
    }
  }
  &-approved {
    .drag-column-header,
    .is-moved,
    .drag-options {
      background: $approved;
    }
  }
}
.section {
  padding: 20px;
  text-align: center;
  a {
    color: white;
    text-decoration: none;
    font-weight: 300;
  }
  h4 {
    font-weight: 400;
    a {
      font-weight: 600;
    }
  }
}
</style>