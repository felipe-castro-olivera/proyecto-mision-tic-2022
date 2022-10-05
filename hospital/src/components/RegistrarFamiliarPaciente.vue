<template>
  <v-form v-model="valid">
    <v-container>
      <v-row>
        <v-col cols="12" md="6">
          <h2 class="mb-5">Agregar Familiar Designado</h2>

          <v-autocomplete
            :items="pacientes"
            item-text="nombre"
            item-value="id"
            :loading="cargandoPacientes"
            label="Paciente"
            v-model="paciente"
          ></v-autocomplete>

          <v-text-field
            v-model="nombre"
            :rules="fieldsRules"
            label="Nombre completo familiar"
            required
          ></v-text-field>
          <!-- </v-col>

        <v-col cols="12" md="4"> -->
          <v-autocomplete
            :items="parentescos"
            v-model="parentesco"
            :rules="fieldsRules"
            label="Parentesco"
            required
          ></v-autocomplete>
          <!-- </v-col>

        <v-col cols="12" md="4"> -->
          <v-text-field
            v-model="correo"
            :rules="correoRules"
            label="Correo"
            required
          ></v-text-field>

          <v-text-field
            v-model="telefono"
            :rules="fieldsRules"
            label="Telefono"
            required
          ></v-text-field>

          <v-btn
            depressed
            class="mt-5"
            color="primary"
            :loading="agregandoFamiliar"
            :disabled="agregandoFamiliar"
            @click="agregarFamiliar"
          >
            Enviar
          </v-btn>
          <v-alert
            v-if="tipoAlerta"
            type="success"
            class="mt-5"
            :value="mostrarAlerta"
            >{{ textoAlerta }}</v-alert
          >
          <v-alert v-else type="error" class="mt-5" :value="mostrarAlerta">{{
            textoAlerta
          }}</v-alert>
        </v-col>
      </v-row>
    </v-container>
  </v-form>
</template>

<script>
import axios from "axios";

export default {
  name: "RegistrarFamiliarPaciente",
  data() {
    return {
      paciente: null,
      pacientes: [],
      nombre: null,
      parentesco: null,
      parentescos: [
        "Mamá",
        "Papá",
        "Hijo",
        "Hija",
        "Hermana",
        "Hermano",
        "Esposa",
        "Esposo",
      ],
      correo: null,
      telefono: null,
      valid: false,
      fieldsRules: [(v) => !!v || "Campo requerido"],
      correoRules: [
        (v) => !!v || "Correo es requerido",
        (v) => /.+@.+/.test(v) || "Debe ser un correo válido",
      ],
      agregandoFamiliar: null,
      cargandoPacientes: false,
      mostrarAlerta: false,
      textoAlerta: "",
      tipoAlerta: false,
    };
  },
  methods: {
    save(date) {
      this.$refs.dateField.save(date);
    },
    async agregarFamiliar() {
      this.mostrarAlerta = false;
      this.agregandoFamiliar = true;

      let datosFamiliar = {
        idPaciente: this.paciente,
        nombre: this.nombre,
        parentesco: this.parentesco,
        correo: this.correo,
        telefono: this.telefono,
      };

      try {
        const respuesta = await axios.post(
          "https://us-east4.gcp.data.mongodb-api.com/app/api-endpoints-ewdzk/endpoint/familiar",
          datosFamiliar
        );
        console.log(respuesta.status);
        this.textoAlerta = respuesta.data.message;
        this.tipoAlerta = true;
      } catch (error) {
        console.log(error);
        this.textoAlerta = error.response.data.message;
        this.tipoAlerta = false;
      }
      this.mostrarAlerta = true;
      this.agregandoFamiliar = false;
    },
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
          });
        });
      } catch (error) {
        console.log(error);
      }
      this.cargandoPacientes = false;
    },
  },
  mounted() {
    this.getPacientes();
  },
};
</script>