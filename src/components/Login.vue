<template>
  <section id="login" class="fill-height">
    <v-container
      style="height: inehit"
      class="fill-height px-7 px-md-5 justify-center"
    >
      <v-row justify="space-around" align="center">
        <v-col cols="12" md="5" class="text-center">
          <h1>Digital Tech</h1>
          <p class="mt-8 mb-6">
            ¡Bienvenido! Introduzca sus credenciales para acceder.
          </p>
          <ValidationObserver ref="obs" v-slot="{ passes }">
            <v-form @submit.prevent="passes(Handlerlogin)">
              <ValidationProvider
                name="usuario"
                rules="email|required"
                v-slot="{ errors }"
              >
                <v-text-field
                  required
                  filled
                  rounded
                  label="Usuario"
                  name="user"
                  prepend-inner-icon="mdi-account"
                  type="text"
                  color="secondary"
                  v-model="email"
                  :error-messages="errors"
                ></v-text-field>
              </ValidationProvider>

              <ValidationProvider
                name="contraseña"
                rules="required|max:10"
                v-slot="{ errors }"
              >
                <v-text-field
                  required
                  filled
                  rounded
                  label="Contraseña"
                  name="password"
                  prepend-inner-icon="mdi-lock"
                  :append-icon="
                    showPassword ? 'mdi-eye-outline' : 'mdi-eye-off-outline'
                  "
                  :type="showPassword ? 'text' : 'password'"
                  color="secondary"
                  v-model="password"
                  :error-messages="errors"
                  @click:append="showPassword = !showPassword"
                ></v-text-field>
              </ValidationProvider>

              <v-btn
                rounded
                dark
                block
                x-large
                type="submit"
                class="btn-primary-shadow"
                color="primary"
                :loading="loading"
              >
                Entrar
              </v-btn>

              <v-col cols="12" md="auto" class="d-block d-md-none mt-6">
                <a href>Olvidé mi contraseña</a>
              </v-col>
            </v-form>
          </ValidationObserver>
        </v-col>
      </v-row>
    </v-container>
  </section>
</template>

<script>
export default {
  data: () => ({
    email: "",
    password: "",
    showPassword: false,
    loading: false,
  }),

  methods: {
    async Handlerlogin() {
      try {
        this.loading = true;
        const encryptedPassword = this.CryptoJS.AES.encrypt(
          this.password,
          process.env.VUE_APP_SECRET_KEY
        ).toString();

        await this.$store.dispatch("auth/LOGIN", {
          email: this.email,
          password: encryptedPassword,
        });
        this.$snotify.success("Nos encanta tenerte de vuelta.", "¡Bienvenido!");
        this.$router.push({ name: "dashboard" });
      } catch (error) {
        this.$snotify.error(error.response.data.error.err_message, "¡Error!");
      } finally {
        this.loading = false;
      }
    },
  },
};
</script>

<style lang="scss">
.btn-accent-shadow {
  -webkit-box-shadow: 0px 12px 20px -10px rgba(88, 177, 83, 1) !important;
  -moz-box-shadow: 0px 12px 20px -10px rgba(88, 177, 83, 1) !important;
  box-shadow: 0px 12px 20px -10px rgba(88, 177, 83, 1) !important;
}

.btn-primary-shadow {
  -webkit-box-shadow: 0px 12px 20px -10px rgba(51, 50, 127, 1) !important;
  -moz-box-shadow: 0px 12px 20px -10px rgba(51, 50, 127, 1) !important;
  box-shadow: 0px 12px 20px -10px rgba(51, 50, 127, 1) !important;
}
</style>
