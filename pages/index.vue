<template>
  <v-simple-table fixed-header>
    <template v-slot:top>
      <v-toolbar flat>
        <v-toolbar-title>List of boards</v-toolbar-title>
        <v-divider class="mx-4" inset vertical></v-divider>
        <v-spacer></v-spacer>
        <v-dialog v-model="create_dialog" max-width="500px" persistent>
          <template v-slot:activator="{ on }">
            <v-btn color="primary" dark class="mb-2" v-on="on">New Board</v-btn>
          </template>
          <v-card>
            <v-card-title>
              <span class="headline">{{ formTitle }}</span>
            </v-card-title>
            <v-card-text>
              <v-form ref="form" v-model="valid" lazy-validation>
                <v-container>
                  <v-row>
                    <v-col cols="12" sm="6" md="4">
                      <v-text-field
                        v-model="editedItem.name"
                        :counter="15"
                        :rules="nameRules"
                        required
                        label="Name of the board"
                      ></v-text-field>
                    </v-col>
                    <v-col cols="12" sm="6" md="4">
                      <v-text-field
                        v-model="editedItem.ip"
                        :rules="adressIpRules"
                        required
                        label="Adress IP"
                      ></v-text-field>
                    </v-col>
                  </v-row>
                  <v-row>
                    <v-col cols="12" sm="6" md="4">
                      <v-select
                        v-model="editedItem.role"
                        :items="roles"
                        :rules="[v => !!v || 'Item is required']"
                        label="Role"
                        required
                      ></v-select>
                    </v-col>
                    <v-col cols="12" sm="6" md="4">
                      <v-text-field
                        v-model="editedItem.port"
                        :rules="portRules"
                        required
                        label="Port"
                      ></v-text-field>
                    </v-col>
                  </v-row>
                </v-container>
              </v-form>
            </v-card-text>

            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn color="blue darken-1" text @click="cancel">Cancel</v-btn>
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
          <th class="text-center">Name</th>
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
          <td class="text-center">{{item.name}}</td>
          <td class="text-center">{{item.ip}}:{{item.port}}</td>
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
            <template>
              <v-dialog v-model="delete_dialog" persistent max-width="290">
                <template v-slot:activator="{ on }">
                  <v-icon small class="mr-2" v-on="on">mdi-delete</v-icon>
                </template>
                <v-card>
                  <v-card-title class="headline">Delete a board!</v-card-title>
                  <v-card-text>Are you sure you want to delete this board? This action is irreversible!</v-card-text>
                  <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn color="warning" text @click="delete_dialog = !delete_dialog">Disagree</v-btn>
                    <v-btn color="error" text @click="deleteItem(index)">Agree</v-btn>
                  </v-card-actions>
                </v-card>
              </v-dialog>
            </template>
            <v-icon small class="mr-2" @click="logIntoBoard(item)">mdi-login-variant</v-icon>
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
      create_dialog: false,
      delete_dialog: false,
      valid: true,
      editedIndex: -1,
      editedItem: {
        ip: '',
        name: '',
        role: '',
        port: ''
      },
      roles: ['admin', 'manager', 'user'],
      portRules: [
        v => !!v || 'Port is required',
        v => (v && 1 <= v <= 65535) || 'Port must be between 1 and 65535'
      ],
      nameRules: [
        v => !!v || 'Name is required',
        v => (v && v.length <= 15) || 'Name must be less than 15 characters'
      ],
      adressIpRules: [
        v => !!v || 'Adress IP is required',
        v => /([0-9]{1,3}\.){3}[0-9]{1,3}/.test(v) || 'Adress IP must be valid'
      ]
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
  created: async function() {
    const query_boards = await API.get_local('board')
    this.$store.dispatch('setBoard', query_boards)
  },
  methods: {
    editItem(item) {
      this.editedIndex = this.list_boards.indexOf(item)
      this.editedItem = Object.assign({}, item)
      this.create_dialog = !this.create_dialog
    },

    async deleteItem(index) {
      const real_index = this.list_boards[index].id
      this.$store.dispatch('removeBoard', index)
      await API.delete_local('board/' + real_index)
      this.delete_dialog = !this.delete_dialog
    },
    cancel() {
      this.create_dialog = !this.create_dialog
      this.editedIndex = -1
      this.editedItem = {
        ip: '',
        name: '',
        role: '',
        port: ''
      }
      this.valid = true
    },

    async save() {
      if (this.$refs.form.validate()) {
        if (this.editedIndex > -1) {
          await API.put_local('board/' + this.editedItem.id, this.editedItem)
          this.$store.dispatch('updateBoard', {
            item: this.editedItem,
            index: this.editedIndex
          })
          this.editedIndex = -1
          this.editedItem = {
            ip: '',
            name: '',
            role: '',
            port: ''
          }
        } else {
          await API.post_local('board/', this.editedItem)
          this.$store.dispatch('addBoard', this.editedItem)
          this.editedIndex = -1
          this.editedItem = {
            ip: '',
            name: '',
            role: '',
            port: ''
          }
        }
        this.create_dialog = !this.create_dialog
      }
    },

    logIntoBoard(item) {
      const index = this.list_boards.indexOf(item)
      this.$store.dispatch('updateConnectedBoard', index)
      this.$store.dispatch('setCards', [])
      this.$router.push('/board')
    },

    logoutFromBoard(item) {
      this.$store.dispatch('updateConnectedBoard', -1)
    }
  }
}
</script>