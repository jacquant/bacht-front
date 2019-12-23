<template>
  <v-container class="text-center">
    <v-row>
      <v-col cols="1">
        <v-card>
          <v-card-title>#</v-card-title>
        </v-card>
      </v-col>
      <v-col cols="6">
        <v-card>
          <v-card-title>Adress IP</v-card-title>
        </v-card>
      </v-col>
      <v-col cols="3">
        <v-card>
          <v-card-title>Role</v-card-title>
        </v-card>
      </v-col>
      <v-col cols="2">
        <v-card>
          <v-card-title>Log into</v-card-title>
        </v-card>
      </v-col>
    </v-row>
    <v-row
      v-for="(item, index) in list_boards"
      v-bind:item="item"
      v-bind:index="index"
      v-bind:key="index"
    >
      <v-col cols="1">
        <v-card>{{index}}</v-card>
      </v-col>
      <v-col cols="6">
        <v-card>{{item.ip}}</v-card>
      </v-col>
      <v-col cols="3">
        <v-card>{{item.role}}</v-card>
      </v-col>
      <v-col cols="2">
        <v-card>
          <v-btn color="primary">
            Login
            <v-icon right dark>mdi-login-variant</v-icon>
          </v-btn>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>
<script>
export default {
  data() {
    return {
      list_boards: [
        {
          ip: '127.0.0.1',
          role: 'admin'
        },
        {
          ip: '192.168.1.1',
          role: 'manager'
        },
        {
          ip: '192.168.1.240',
          role: 'user'
        }
      ]
    }
  }
}
</script>