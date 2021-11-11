<template>
  <v-dialog v-model="active" max-width="600" persistent>
    <v-card>
      <v-card-title
        >{{ action == 0 ? "Registrar" : "Actualizar" }} Vehiculos</v-card-title
      >
      <v-card-text>
        {{ this.data.phone }}
        <ValidationObserver ref="obs" v-slot="{ passes }">
          <v-form @submit.prevent="passes(register)">
            <ValidationProvider
              name="cliente"
              rules="required"
              v-slot="{ errors }"
            >
              <v-text-field
                required
                filled
                rounded
                label="Cliente"
                type="text"
                color="secondary"
                v-model="data.client"
                :error-messages="errors"
              ></v-text-field>
            </ValidationProvider>

            <ValidationProvider
              name="telefono"
              rules="required|numeric|max:6"
              v-slot="{ errors }"
            >
              <v-text-field
                required
                filled
                rounded
                label="Telefono"
                type="text"
                color="secondary"
                v-model="data.phone"
                prefix="+501"
                :error-messages="errors"
              ></v-text-field>
            </ValidationProvider>

            <ValidationProvider
              name="placa"
              rules="required"
              v-slot="{ errors }"
            >
              <v-text-field
                required
                filled
                rounded
                label="Placa"
                type="text"
                color="secondary"
                v-model="data.license"
                :error-messages="errors"
              ></v-text-field>
            </ValidationProvider>

            <v-menu
              v-model="menu2"
              :close-on-content-click="false"
              :nudge-right="40"
              transition="scale-transition"
              offset-y
              min-width="auto"
            >
              <template v-slot:activator="{ on, attrs }">
                <ValidationProvider
                  name="cumpleaños"
                  rules="required"
                  v-slot="{ errors }"
                >
                  <v-text-field
                    v-model="data.rental_from"
                    filled
                    rounded
                    label="Alquiler Desde"
                    readonly
                    v-bind="attrs"
                    v-on="on"
                    :error-messages="errors"
                  ></v-text-field>
                </ValidationProvider>
              </template>
              <v-date-picker
                v-model="data.rental_from"
                @input="menu2 = false"
              ></v-date-picker>
            </v-menu>

            <v-menu
              v-model="menu"
              :close-on-content-click="false"
              :nudge-right="40"
              transition="scale-transition"
              offset-y
              min-width="auto"
            >
              <template v-slot:activator="{ on, attrs }">
                <ValidationProvider
                  name="cumpleaños"
                  rules="required"
                  v-slot="{ errors }"
                >
                  <v-text-field
                    v-model="data.rental_to"
                    filled
                    rounded
                    label="Alquiler Hasta"
                    readonly
                    v-bind="attrs"
                    v-on="on"
                    :error-messages="errors"
                  ></v-text-field>
                </ValidationProvider>
              </template>
              <v-date-picker
                v-model="data.rental_to"
                @input="menu = false"
              ></v-date-picker>
            </v-menu>

            <v-btn
              rounded
              dark
              block
              type="submit"
              class="btn-primary-shadow"
              color="primary"
              :loading="loading"
            >
              {{ action == 0 ? "Registrar" : "Actualizar" }}
            </v-btn>
          </v-form>
        </ValidationObserver>
        <v-btn
          rounded
          dark
          block
          type="submit"
          class="btn-primary-shadow mt-1"
          color="seccondary"
          :loading="loading"
          @click="close(false)"
        >
          Cancelar
        </v-btn>
      </v-card-text>
    </v-card>
  </v-dialog>
</template>

<script>
export default {
  props: {
    active: {
      type: Boolean,
      default: false,
      required: true,
    },
    data: {
      type: Object,
      default: () => {},
      required: false,
    },
    action: {
      type: Number,
      default: 0,
      required: false,
    },
  },

  created() {
    this.data.phone = this.data.phone.substring(4).replace(" ", "");
  },

  data() {
    return {
      loading: false,
      email: "",
      names: "",
      last_names: "",
      phone: "",
      address: "",
      date: null,
      menu2: false,
      menu: false,
    };
  },
  methods: {
    async register() {
      try {
        if (this.action == 0) {
          await this.$store.dispatch("vehicles/REGISTER", this.data);
        } else {
          await this.$store.dispatch("vehicles/UPDATE", {
            id: this.data.id,
            data: this.data,
          });
        }
        this.$snotify.success(
          `Vehiculo ${
            this.action == 0 ? "Registrado" : "Actualizdo"
          } con exitos`,
          "Exitos!"
        );
        this.close(true);
      } catch (error) {
        if (error.response.status == 422) {
          this.$snotify.error(error.response.data.errors[0].message, "Error");
        } else {
          this.$snotify.error(
            "Ha ocurrido un error porfavor intente mas tarde",
            "Error"
          );
        }
      }
    },
    close(val) {
      this.$emit("dialog:change", val);
    },
  },
};
</script>

<style>
</style>