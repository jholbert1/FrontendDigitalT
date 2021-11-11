<template>
  <v-container
    style="height: inehit"
    class="fill-height px-7 px-md-5 justify-center"
  >
    <v-row justify="center">
      <v-progress-circular
        v-if="loading"
        indeterminate
        color="primary"
      ></v-progress-circular>
      <h2 v-else>Su cuenta ha sido confirmada</h2>
    </v-row>
  </v-container>
</template>

<script>
export default {
  data() {
    return {
      loading: false,
    };
  },

  created() {
    this.confirmAccount();
  },

  methods: {
    async confirmAccount() {
      try {
        this.loading = true;
        const request = { code: this.$route.query.code };
        await this.$store.dispatch("users/ACTIVE_USER", request);
        setTimeout(() => {
          this.$router.push({ name: "Home" });
        }, 2000);
      } catch (error) {
        console.log(error);
      } finally {
        this.loading = false;
      }
    },
  },
};
</script>

<style>
</style>