<template>
  <v-dialog v-model="active" max-width="600" persistent>
    <v-card>
      <v-card-title
        >{{ action == 0 ? "Registrar" : "Actualizar" }} Usuario</v-card-title
      >
      <v-card-text>
        <ValidationObserver ref="obs" v-slot="{ passes }">
          <v-form @submit.prevent="passes(register)">
            <ValidationProvider
              name="correo"
              rules="email|required"
              v-slot="{ errors }"
            >
              <v-text-field
                required
                filled
                rounded
                label="Email"
                type="text"
                color="secondary"
                v-model="data.email"
                :error-messages="errors"
              ></v-text-field>
            </ValidationProvider>

            <ValidationProvider
              name="nombre"
              rules="required"
              v-slot="{ errors }"
            >
              <v-text-field
                required
                filled
                rounded
                label="Nombre"
                type="text"
                color="secondary"
                v-model="data.names"
                :error-messages="errors"
              ></v-text-field>
            </ValidationProvider>

            <ValidationProvider
              name="apellidos"
              rules="required"
              v-slot="{ errors }"
            >
              <v-text-field
                required
                filled
                rounded
                label="Apellidos"
                type="text"
                color="secondary"
                v-model="data.last_names"
                :error-messages="errors"
              ></v-text-field>
            </ValidationProvider>

            <ValidationProvider
              name="telefono"
              rules="required"
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
                prefix="+507"
                :error-messages="errors"
              ></v-text-field>
            </ValidationProvider>

            <ValidationProvider
              name="direccion"
              rules="required"
              v-slot="{ errors }"
            >
              <v-text-field
                required
                filled
                rounded
                label="Direccion"
                type="text"
                color="secondary"
                v-model="data.address"
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
                    v-model="data.birth_date"
                    filled
                    rounded
                    label="Cumpleaños"
                    readonly
                    v-bind="attrs"
                    v-on="on"
                    :error-messages="errors"
                  ></v-text-field>
                </ValidationProvider>
              </template>
              <v-date-picker
                v-model="data.birth_date"
                @input="menu2 = false"
              ></v-date-picker>
            </v-menu>

            <ValidationProvider name="rol" rules="required" v-slot="{ errors }">
              <v-select
                :items="role"
                item-text="name"
                item-value="id"
                required
                filled
                rounded
                label="Role"
                type="text"
                color="secondary"
                v-model="data.roles"
                :error-messages="errors"
              ></v-select>
            </ValidationProvider>

            <ValidationProvider
              name="clave"
              :rules="action == 0 ? 'required' : ''"
              v-slot="{ errors }"
            >
              <v-text-field
                required
                filled
                rounded
                label="Clave"
                type="text"
                color="secondary"
                v-model="data.password"
                :error-messages="errors"
              ></v-text-field>
            </ValidationProvider>
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
  data() {
    return {
      loading: false,
      menu2: false,
      role: [
        { name: "1000-Administrador", id: 1 },
        { name: "2000-Usuario", id: 2 },
      ],
      password: "",
    };
  },

  created() {
    this.data.phone = this.data.phone.substring(4).replace(" ", "");
  },

  methods: {
    async register() {
      try {
        this.loading = true;
        if (this.action == 0) {
          await this.$store.dispatch("users/REGISTER", this.data);
        } else {
          await this.$store.dispatch("users/UPDATE", {
            id: this.data.id,
            data: this.data,
          });
        }
        this.$snotify.success(
          `Usuario ${
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
      } finally {
        this.loading = false;
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