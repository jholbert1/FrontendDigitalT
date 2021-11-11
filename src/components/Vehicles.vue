<template>
  <v-container>
    <div class="d-flex justify-end">
      <v-icon @click="$router.go(-1)">mdi-arrow-left</v-icon>
    </div>
    <v-row>
      <v-col cols="12" md="4">
        <v-btn
          @click="
            () => {
              create = true;
              dataUser = {};
              action = 0;
            }
          "
          large
          rounded
          color="primary"
        >
          Crear
        </v-btn>
        <v-btn
          v-if="arrayStatus.length > 0"
          @click="updatedStatus()"
          large
          rounded
          color="primary"
        >
          Estatus
        </v-btn>
        <v-btn
          v-if="arrayDelete.length > 0"
          @click="deleteUsers()"
          large
          rounded
          color="primary"
        >
          Eliminar
        </v-btn>
      </v-col>
      <v-col cols="12" md="12">
        <v-data-table
          v-if="!showDetailsOrder"
          :headers="headers"
          :items="dataResponse"
          :items-per-page="5"
          class="elevation-0"
          hide-default-footer
          disable-pagination
          width="100%"
          tile
        >
          <template v-slot:[`header.user`]="{ header }">
            <span v-if="authUser.roles[0].id == 1">
              {{ header.text.toUpperCase() }}
            </span>
          </template>
          <template v-slot:[`item.user`]="{ item }">
            <span v-if="authUser.roles[0].id == 1">
              <span v-if="item.user != null && item.user.roles.length > 0">
                {{ item.user.names }} ( {{ item.user.roles[0].description }} )
              </span>
            </span>
          </template>
          <template v-slot:[`item.action`]="{ item }">
            <v-tooltip bottom>
              <template v-slot:activator="{ on, attrs }">
                <v-btn
                  @click="
                    () => {
                      create = true;
                      dataUser = { ...item };
                      action = 1;
                    }
                  "
                  icon
                  color="primary"
                  dark
                  v-bind="attrs"
                  v-on="on"
                >
                  <v-icon>mdi-pencil</v-icon>
                </v-btn>
              </template>
              <span>editar</span>
            </v-tooltip>
            <v-menu offset-y>
              <template v-slot:activator="{ on, attrs }">
                <v-btn
                  v-if="item.status.id != 4 && item.status.id != 2"
                  icon
                  :color="
                    arrayStatus.find((fx) => fx.vehicles_id == item.id) !=
                    undefined
                      ? 'green'
                      : 'primary'
                  "
                  dark
                  v-bind="attrs"
                  v-on="on"
                  @click="menuStatus(item)"
                >
                  <v-icon>mdi-list-status</v-icon>
                </v-btn>
              </template>
              <v-list>
                <v-list-item v-for="(val, index) in itemsStatus" :key="index">
                  <v-list-item-title @click="selectStatus(item, val)">
                    {{ val.name }}
                  </v-list-item-title>
                </v-list-item>
              </v-list>
            </v-menu>
            <v-btn
              v-if="authUser.id != item.id"
              @click="deleteItem(item)"
              icon
              :color="arrayDelete.includes(item.id) ? 'red' : 'primary'"
              dark
            >
              <v-icon>mdi-delete-forever</v-icon>
            </v-btn>
          </template>
        </v-data-table>
      </v-col>
    </v-row>
    <v-row justify="center">
      <v-col cols="6" md="4">
        <v-pagination
          v-model="page"
          :length="paginate.lastPage"
          circle
          color="#00A0E9"
        ></v-pagination>
      </v-col>
    </v-row>
    <register-update-component
      v-if="create"
      :active="create"
      :data="dataUser"
      :action="action"
      @dialog:change="handlerResponse"
    />
  </v-container>
</template>

<script>
import RegisterUpdate from "./CreateUpdateVehicles.vue";
export default {
    components: {
      "register-update-component": RegisterUpdate,
    },

  data() {
    return {
      loading: false,
      page: 1,
      per_page: 5,
      showDetailsOrder: false,
      headers: [
        {
          text: "Cliente",
          align: "start",
          sortable: false,
          value: "client",
          class: "header-text",
        },
        { text: "Telefono", value: "phone", class: "header-text" },
        { text: "Placa", value: "license", class: "header-text" },
        { text: "Alquiler Desde", value: "rental_from", class: "header-text" },
        { text: "Alquiler Hasta", value: "rental_to", class: "header-text" },
        {
          text: "Estatus",
          value: "status.name",
          class: "header-text",
        },
        {
          text: "Propretario",
          value: "user",
          class: "header-text",
        },
        { text: "Acción", value: "action", class: "header-text" },
      ],
      dataResponse: [],
      paginate: {},
      create: false,
      dataUser: {},
      arrayDelete: [],
      itemsStatus: [],
      originalStatus: [],
      arrayStatus: [],
      action: 0
    };
  },

  created() {
    this.getVehicles();
    this.getStatus();
  },

  watch: {
    page(val) {
      this.getVehicles(val);
    },
  },

  computed: {
    authUser() {
      return this.$store.getters["auth/GET_USER"];
    },
  },

  methods: {
    async getVehicles() {
      try {
        const request = {
          page: this.page,
          per_page: this.per_page,
        };
        const response = await this.$store.dispatch(
          "vehicles/GET_ALL",
          request
        );
        this.dataResponse = response.data.data.data;
        this.paginate = {
          lastPage: response.data.data.lastPage,
          page: response.data.data.page,
          perPage: response.data.data.perPage,
          total: response.data.data.total,
        };
        console.log(response);
      } catch (error) {
        console.log(error);
      }
    },

    async getStatus() {
      try {
        const response = await this.$store.dispatch("vehicles/STATUS");
        this.itemsStatus = response.data.data;
        this.originalStatus = response.data.data;
      } catch (error) {
        console.log(error);
      }
    },

    deleteItem(item) {
      if (this.arrayDelete.length == 0) {
        this.arrayDelete.push(item.id);
      } else if (this.arrayDelete.includes(item.id)) {
        const position = this.arrayDelete.indexOf(item.id);
        this.arrayDelete.splice(position, 1);
      } else {
        this.arrayDelete.push(item.id);
      }
    },

    async deleteUsers() {
      try {
        await this.$store.dispatch("vehicles/DELETE", {
          deleteArray: this.arrayDelete,
        });
        this.$snotify.success("eliminado exitosamente", "Exitos!");
        this.getVehicles();
        this.arrayDelete = [];
      } catch (error) {
        console.log(error);
      }
    },

    menuStatus(val) {
      if (val.status.id == 3) {
        const filter = this.itemsStatus.filter((st) => st.id == 4);
        this.itemsStatus = [...filter];
      } else {
        this.itemsStatus = [...this.originalStatus];
      }
    },

    selectStatus(val, item) {
      if (this.arrayStatus.length == 0) {
        this.arrayStatus.push({
          vehicles_id: val.id,
          current_status: val.status.id,
          status_id: item.id,
        });
      } else if (
        this.arrayStatus.find((st) => st.vehicles_id == val.id) != undefined
      ) {
        const position = this.arrayStatus.findIndex(
          (ind) => ind.vehicles_id == val.id
        );
        this.arrayStatus[position].status_id = item.id;
      } else {
        this.arrayStatus.push({
          vehicles_id: val.id,
          current_status: val.status.id,
          status_id: item.id,
        });
      }
    },

    async updatedStatus() {
      try {
           await this.$store.dispatch(
          "vehicles/STATUS_UPDATE",
          { updateStatus: this.arrayStatus }
        );
        this.arrayStatus = [];
        this.getVehicles();
      } catch (error) {
        console.log(error);
      }
    },

    handlerResponse(val) {
      if (val) {
        this.getVehicles();
      }
      this.create = false;
    },
  },
};
</script>

<style>
</style>