<template>
  <v-card>
    <v-card-title>
      Pacientes
      <v-spacer></v-spacer>
      <v-text-field
        v-model="buscar"
        append-icon="mdi-magnify"
        label="Buscar"
        single-line
        hide-details
      ></v-text-field>
    </v-card-title>
    <v-data-table
      :headers="headers"
      :items="pacientes"
      :search="buscar"
      :loading="cargandoPacientes"
      loading-text="Cargando pacientes..."
    >
      <template v-slot:[`item.acciones`]="{ item }">
        <v-btn v-if="item.familiarDesignado" class="primary mr-2" small @click="familiarDesignado(item)">
          Familiar Designado
        </v-btn>
         <v-btn v-else class="primary mr-2" small disabled>
          No tiene familiar
        </v-btn>
        <v-btn class="success" small @click="deleteItem(item)">
          Asignar Doctor
        </v-btn>
      </template>
    </v-data-table>
    <v-dialog
      v-model="dialog"
      transition="dialog-bottom-transition"
      max-width="600"
    >
      <template v-slot:default="dialog">
        <v-card>
          <v-toolbar dense color="primary" dark>Familiar</v-toolbar>
          <v-card-text class="mt-5">
            <v-list-item two-line>
              <v-list-item-icon>
                <v-icon color="primary"> mdi-card-account-details </v-icon>
              </v-list-item-icon>
              <v-list-item-content>
                <v-list-item-title>Nombre</v-list-item-title>
                <v-list-item-subtitle>{{
                  familiar.nombre || ""
                }}</v-list-item-subtitle>
              </v-list-item-content>
            </v-list-item>
            <v-list-item two-line>
              <v-list-item-icon>
                <v-icon color="primary"> mdi-human-male-female-child </v-icon>
              </v-list-item-icon>
              <v-list-item-content>
                <v-list-item-title>Parentesco</v-list-item-title>
                <v-list-item-subtitle>{{
                  familiar.parentesco
                }}</v-list-item-subtitle>
              </v-list-item-content>
            </v-list-item>

            <v-list-item two-line>
              <v-list-item-icon>
                <v-icon color="primary"> mdi-email </v-icon>
              </v-list-item-icon>
              <v-list-item-content>
                <v-list-item-title>Correo</v-list-item-title>
                <v-list-item-subtitle>{{
                  familiar.correo
                }}</v-list-item-subtitle>
              </v-list-item-content>
            </v-list-item>

            <v-list-item two-line>
              <v-list-item-icon>
                <v-icon color="primary"> mdi-phone </v-icon>
              </v-list-item-icon>
              <v-list-item-content>
                <v-list-item-title>Teléfono</v-list-item-title>
                <v-list-item-subtitle>{{
                  familiar.telefono
                }}</v-list-item-subtitle>
              </v-list-item-content>
            </v-list-item>
          </v-card-text>
          <v-card-actions class="justify-end">
            <v-btn text @click="dialog.value = false">Cerrar</v-btn>
          </v-card-actions>
        </v-card>
      </template>
    </v-dialog>
    <v-snackbar v-model="snackbar" :timeout="2000">
      Familiar no designado!

      <template v-slot:action="{ attrs }">
        <v-btn color="pink" text v-bind="attrs" @click="snackbar = false">
          Cerrar
        </v-btn>
      </template>
    </v-snackbar>
  </v-card>
</template>

<script>
import axios from "axios";

export default {
  data() {
    return {
      snackbar: false,
      familiar: null,
      dialog: false,
      cargandoPacientes: false,
      buscar: "",
      headers: [
        { text: "Nombre", value: "nombre" },
        { text: "Apellido", value: "apellido" },
        { text: "Correo", value: "correo" },
        { text: "Ciudad", value: "ciudad" },
        { text: "Direccion", value: "direccion" },
        { text: "Fecha de Nacimiento", value: "fechaNacimiento" },
        { text: "Acciones", value: "acciones" },
      ],
      pacientes: [],
    };
  },
  methods: {
    async getPacientes() {
      this.cargandoPacientes = true;
      try {
        const respuesta = await axios.get(
          "https://us-east4.gcp.data.mongodb-api.com/app/api-endpoints-ewdzk/endpoint/pacientes"
        );
        console.log("Pacientes cargados", respuesta.status);

        respuesta.data.forEach((paciente) => {
          let nombre = paciente.nombre + " " + paciente.apellido;

          this.pacientes.push({
            id: paciente._id,
            nombre,
            apellido: paciente.apellido,
            correo: paciente.correo,
            ciudad: paciente.ciudad,
            direccion: paciente.direccion,
            fechaNacimiento: paciente.fechaNacimiento,
            familiarDesignado: paciente.familiarDesignado,
          });
        });
      } catch (error) {
        console.log(error);
      }
      this.cargandoPacientes = false;
    },
    familiarDesignado(familiar) {
      if (familiar.familiarDesignado) {
        let famDesig = familiar.familiarDesignado;
        this.familiar = {
          nombre: famDesig.nombre || "",
          parentesco: famDesig.parentesco || "",
          telefono: famDesig.telefono || "",
          correo: famDesig.correo || "",
        };
        this.dialog = true;
      } else {
        this.snackbar = true;
      }
    },
  },
  mounted() {
    this.getPacientes();
  },
};
</script>

<style lang="scss" scoped>
</style>