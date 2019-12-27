<template>
  <v-app dark>
    <v-navigation-drawer
      v-model="drawer"
      :mini-variant="miniVariant"
      :clipped="clipped"
      fixed
      app
    >
      <v-list>
        <v-list-item
          v-for="(item, i) in items"
          :key="i"
          :to="item.to"
          router
          exact
        >
          <v-list-item-action>
            <v-icon>{{ item.icon }}</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title v-text="item.title" />
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>
    <v-app-bar :clipped-left="clipped" fixed app>
      <v-app-bar-nav-icon @click.stop="drawer = !drawer" />
      <v-toolbar-title v-text="title" />
      <v-spacer />
      <v-toolbar-title v-if="connected_ip">
        Connected to {{ connected_name }} @{{ connected_ip }}
        <v-btn @click="logout" to="/" nuxt icon>
          <v-icon dark>mdi-logout</v-icon>
        </v-btn>
      </v-toolbar-title>
      <v-btn v-else to="/" nuxt>
        Login page
        <v-icon dark>mdi-login</v-icon>
      </v-btn>
    </v-app-bar>
    <v-content>
      <v-container>
        <transition name="fade" mode="out-in">
          <nuxt />
        </transition>
      </v-container>
    </v-content>
    <v-footer :fixed="fixed" app>
      <span>&copy; 2019 Jacques Antoine, Gauthier Gérard, Baptiste Pierre</span>
    </v-footer>
  </v-app>
</template>

<script>
export default {
  data() {
    return {
      clipped: false,
      drawer: false,
      fixed: false,
      items: [
        {
          icon: 'mdi-format-list-bulleted',
          title: 'List',
          to: '/'
        },
        {
          icon: 'mdi-clipboard-list',
          title: 'Board',
          to: '/board'
        }
      ],
      miniVariant: false,
      title: 'Project BachT 2019'
    }
  },
  computed: {
    connected_ip() {
      return this.$store.state.connected_board_ip
    },
    connected_name() {
      return this.$store.state.connected_board_name
    }
  },
  methods: {
    logout() {
      this.$store.dispatch('updateConnectedBoard', -1)
    }
  }
}
</script>
<style scoped>
/* ********************************************************************** **
    ** Define style for transition
    ** ********************************************************************** */
.fade-enter-active,
.fade-leave-active {
  transition: opacity 1s;
}

.fade-enter,
.fade-leave-to {
  opacity: 0;
}
</style>
