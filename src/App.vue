<template>
  <v-app>
    <v-main>
      <v-container v-if="isAuth">
        <v-app-bar color="primary">
          <v-toolbar-title class="white--text">Digital Tech</v-toolbar-title>
          <v-spacer></v-spacer>
          <v-btn rounded @click="$router.push({ name: 'users' })">
            Usuarios
          </v-btn>
          <v-btn
            class="ml-2"
            rounded
            @click="$router.push({ name: 'vehicles' })"
          >
            Vehiculos
          </v-btn>
          <v-btn class="ml-2" rounded @click="logout"> Salir </v-btn>
        </v-app-bar>
      </v-container>
      <router-view />
      <vue-snotify></vue-snotify>
    </v-main>
  </v-app>
</template>

<script>
export default {
  name: "App",

  data: () => ({}),

  computed: {
    isAuth() {
      return this.$store.getters["auth/AUTHENTICATED"];
    },
  },

  methods: {
    async logout() {
      try {
        await this.$store.dispatch("auth/LOGOUT");
        this.$router.push('/');
      } catch (error) {
        console.log(error);
      }
    },
  },
};
</script>
