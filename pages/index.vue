<template>
  <v-simple-table fixed-header>
    <template v-slot:top>
      <v-toolbar flat>
        <v-toolbar-title>List of boards</v-toolbar-title>
        <v-divider class="mx-4" inset vertical></v-divider>
        <v-spacer></v-spacer>
        <v-dialog v-model="dialog" max-width="500px">
          <template v-slot:activator="{ on }">
            <v-btn color="primary" dark class="mb-2" v-on="on">New Board</v-btn>
          </template>
          <v-card>
            <v-card-title>
              <span class="headline">{{ formTitle }}</span>
            </v-card-title>

            <v-card-text>
              <v-container>
                <v-row>
                  <v-col cols="12" sm="6" md="4">
                    <v-text-field v-model="editedItem.ip" label="Adress IP"></v-text-field>
                  </v-col>
                  <v-col cols="12" sm="6" md="4">
                    <v-text-field v-model="editedItem.role" label="Role"></v-text-field>
                  </v-col>
                </v-row>
              </v-container>
            </v-card-text>

            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn color="blue darken-1" text @click="close">Cancel</v-btn>
              <v-btn color="blue darken-1" text @click="save">Save</v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>
      </v-toolbar>
    </template>
    <template v-slot:default>
      <thead>
        <tr>
          <th class="text-center">#</th>
          <th class="text-center">Adress IP</th>
          <th class="text-center">Role</th>
          <th class="text-center">Log in</th>
          <th class="text-center">Actions</th>
        </tr>
      </thead>
      <tbody>
        <tr
          v-for="(item, index) in list_boards"
          v-bind:item="item"
          v-bind:index="index"
          v-bind:key="index"
        >
          <td class="text-center">{{index}}</td>
          <td class="text-center">{{item.ip}}</td>
          <td class="text-center">{{item.role}}</td>
          <td class="text-center">
            <v-btn v-if="connected_board !==index" color="primary" @click="logIntoBoard(item)">
              Login
              <v-icon right dark>mdi-login-variant</v-icon>
            </v-btn>
            <v-btn v-else color="secondary" @click="logoutFromBoard(item)">
              Logout
              <v-icon right dark>mdi-logout-variant</v-icon>
            </v-btn>
          </td>
          <td class="text-center">
            <v-icon small class="mr-2" @click="editItem(item)">mdi-pencil</v-icon>
            <v-icon small @click="deleteItem(item)">mdi-delete</v-icon>
          </td>
        </tr>
      </tbody>
    </template>
  </v-simple-table>
</template>
<script>
import * as API from '../middleware/api'
export default {
  data() {
    return {
      dialog: false,
      editedIndex: -1,
      editedItem: {
        ip: '',
        role: ''
      }
    }
  },
  computed: {
    list_boards() {
      return this.$store.state.list_boards
    },
    formTitle() {
      return this.editedIndex === -1 ? 'New Board' : 'Edit Board'
    },
    connected_board() {
      return this.$store.state.connected_board
    }
  },
  watch: {
    dialog(val) {
      val || this.close()
    }
  },
  methods: {
    editItem(item) {
      this.editedIndex = this.list_boards.indexOf(item)
      this.editedItem = Object.assign({}, item)
      this.dialog = true
    },

    deleteItem(item) {
      const index = this.list_boards.indexOf(item)
      confirm('Are you sure you want to delete this board?') &&
        this.$store.dispatch('remove', index)
    },
    close() {
      this.dialog = false
      setTimeout(() => {
        this.editedItem = Object.assign({}, this.defaultItem)
        this.editedIndex = -1
      }, 300)
    },

    save() {
      if (this.editedIndex > -1) {
        this.$store.dispatch('updateIpAndRole', {
          item: this.editedItem,
          index: this.editedIndex
        })
      } else {
        this.$store.dispatch('add', this.editedItem)
      }
      this.close()
    },

    logIntoBoard(item) {
      const index = this.list_boards.indexOf(item)
      this.$store.dispatch('updateConnectedBoard', index)
      this.$router.push('/board')
    },

    logoutFromBoard(item) {
      this.$store.dispatch('updateConnectedBoard', -1)
    }
  }
}
</script>