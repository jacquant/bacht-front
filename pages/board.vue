<template>
  <client-only>
    <kanban-board
      v-if="connected_board !== -1"
      :stages="stages"
      :blocks="blocks"
      :state-machine-config="stateMachineConfig"
      @update-block="updateBlock"
    >
      <div v-for="stage in stages" :slot="stage" :key="stage">
        <h2>
          {{ stage }}
          <v-dialog
            v-model="create_dialog"
            fullscreen
            :retain-focus="false"
            persistent
          >
            <template v-slot:activator="{ on }">
              <v-btn
                style="float:right"
                icon
                small
                v-on="on"
                @click="editedItem.status = stage"
              >
                <v-icon>mdi-plus-circle</v-icon>
              </v-btn>
            </template>
            <v-app-bar color="#303030">
              <v-btn @click="cancel" icon>
                <v-icon>mdi-arrow-left</v-icon>
              </v-btn>
              <v-toolbar-title>{{ formTitle }}</v-toolbar-title>
            </v-app-bar>
            <v-card>
              <v-form ref="cardForm" v-model="valid" lazy-validation>
                <v-container>
                  <v-row>
                    <v-col cols="12" sm="6" md="4">
                      <v-text-field
                        v-model="editedItem.title"
                        required
                        label="Title Card"
                      ></v-text-field>
                    </v-col>
                    <v-col cols="12" sm="6" md="4">
                      <v-select
                        v-model="editedItem.status"
                        :items="stages"
                        :rules="[v => !!v || 'Item is required']"
                        label="Stage"
                        required
                      ></v-select>
                    </v-col>
                  </v-row>
                  <v-row>
                    <v-col cols="12">
                      <tiptap-vuetify
                        :toolbar-attributes="{ color: 'accent' }"
                        v-model="editedItem.content"
                        :extensions="extensions"
                        required
                      />
                    </v-col>
                  </v-row>
                </v-container>
              </v-form>

              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn color="blue darken-1" @click="cancel">Cancel</v-btn>
                <v-btn color="blue darken-1" @click="save(stage)">Save</v-btn>
              </v-card-actions>
            </v-card>
          </v-dialog>
        </h2>
      </div>
      <div v-for="block in blocks" :slot="block.id" :key="block.id" v-ripple>
        <div>
          <strong>{{ block.title }}</strong>
        </div>
        <div>
          <div v-html="block.content"></div>
          <v-btn icon x-small dark style="float:right" @click="editItem(block)">
            <v-icon>mdi-pencil</v-icon>
          </v-btn>
          <v-dialog
            v-model="delete_dialog"
            persistent
            max-width="290"
            :retain-focus="false"
          >
            <template v-slot:activator="{ on }">
              <v-btn icon x-small dark style="float:right" v-on="on">
                <v-icon>mdi-delete</v-icon>
              </v-btn>
            </template>
            <v-card>
              <v-card-title class="headline">Delete a card!</v-card-title>
              <v-card-text
                >Are you sure you want to delete this card? This action is
                irreversible!</v-card-text
              >
              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn
                  color="warning"
                  text
                  @click="delete_dialog = !delete_dialog"
                  >Disagree</v-btn
                >
                <v-btn color="error" text @click="deleteItem(block.id)"
                  >Agree</v-btn
                >
              </v-card-actions>
            </v-card>
          </v-dialog>
        </div>
      </div>
    </kanban-board>
    <v-card v-else>
      <v-card-text>Your are not connected to any board!</v-card-text>
      <v-card-actions>
        <v-btn to="/" nuxt color="info">Click here to choose a board</v-btn>
      </v-card-actions>
    </v-card>
  </client-only>
</template>
<script>
import * as API from '~/middleware/api'
import {
  TiptapVuetify,
  Heading,
  Bold,
  Italic,
  Strike,
  Underline,
  Paragraph,
  BulletList,
  OrderedList,
  ListItem,
  Link,
  Blockquote,
  HardBreak,
  HorizontalRule,
  History
} from 'tiptap-vuetify'
export default {
  components: {
    TiptapVuetify
  },
  data() {
    return {
      create_dialog: false,
      delete_dialog: false,
      valid: true,
      editedIndex: -1,
      editedItem: {
        title: '',
        content: '',
        status: ''
      },
      extensions: [
        Bold,
        Italic,
        Underline,
        Strike,
        History,
        Blockquote,
        [
          Heading,
          {
            options: {
              levels: [1, 2, 3]
            }
          }
        ],
        ListItem,
        BulletList,
        OrderedList,
        HorizontalRule,
        Paragraph,
        HardBreak
      ],
      stages: ['on-hold', 'in-progress', 'needs-review', 'approved'],
      stateMachineConfig: {
        id: 'kanban',
        initial: 'on-hold',
        states: {
          'on-hold': {
            on: {
              PICK_UP: 'in-progress'
            }
          },
          'in-progress': {
            on: {
              RELINQUISH_TASK: 'on-hold',
              PUSH_TO_QA: 'needs-review'
            }
          },
          'needs-review': {
            on: {
              REQUEST_CHANGE: 'in-progress',
              PASS_QA: 'approved'
            }
          },
          approved: {
            type: 'final'
          }
        }
      }
    }
  },
  created: async function() {
    if (this.connected_board !== -1) {
      const query_cards = await API.get_connected_board(
        this.$store.state.list_boards,
        this.connected_board,
        'card'
      )
      this.$store.dispatch('setCards', query_cards)
    }
  },
  computed: {
    blocks() {
      return JSON.parse(JSON.stringify(this.$store.state.list_cards))
    },
    connected_board() {
      return this.$store.state.connected_board
    },
    formTitle() {
      return this.editedIndex === -1 ? 'New Card' : 'Edit Card'
    }
  },
  methods: {
    async updateBlock(id, status, new_index) {
      let concerned_block = this.blocks.find(b => b.id === id.toString())
      concerned_block.status = status
      await API.put_connected_board(
        this.$store.state.list_boards,
        this.connected_board,
        'card/' + concerned_block.id,
        concerned_block
      )

      this.$store.dispatch(
        'setCards',
        await API.get_connected_board(
          this.$store.state.list_boards,
          this.connected_board,
          'card/'
        )
      )
    },
    editItem(item) {
      this.editedIndex = this.blocks.indexOf(item)
      this.editedItem = Object.assign({}, item)
      this.create_dialog = !this.create_dialog
    },

    async deleteItem(index) {
      this.$store.dispatch('removeCard', index)
      await API.delete_connected_board(
        this.$store.state.list_boards,
        this.connected_board,
        'card/' + index
      )
      this.delete_dialog = !this.delete_dialog
    },

    async save(stage) {
      const index_stage = this.stages.indexOf(stage)
      if (this.$refs['cardForm'][index_stage].validate()) {
        if (this.editedIndex > -1) {
          await API.put_connected_board(
            this.$store.state.list_boards,
            this.connected_board,
            'card/' + this.editedItem.id,
            this.editedItem
          )

          this.$store.dispatch(
            'setCards',
            await API.get_connected_board(
              this.$store.state.list_boards,
              this.connected_board,
              'card/'
            )
          )
          this.editedIndex = -1
          this.editedItem = {
            title: '',
            content: '',
            status: ''
          }
        } else {
          await API.post_connected_board(
            this.$store.state.list_boards,
            this.connected_board,
            'card',
            this.editedItem
          )
          this.$store.dispatch(
            'setCards',
            await API.get_connected_board(
              this.$store.state.list_boards,
              this.connected_board,
              'card/'
            )
          )
          this.editedIndex = -1
          this.editedItem = {
            title: '',
            content: '',
            status: ''
          }
        }
        this.create_dialog = !this.create_dialog
      }
    },

    cancel() {
      this.editedIndex = -1
      this.editedItem = {
        title: '',
        content: '',
        status: ''
      }
      this.create_dialog = !this.create_dialog
      this.valid = true
    }
  }
}
</script>
<style lang="scss">
@import '../assets/kanban.scss';
</style>
