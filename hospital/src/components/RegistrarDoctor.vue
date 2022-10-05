<template>
  <v-form v-model="valid">
    <v-container>
      <v-row>
        <v-col cols="12" md="6">
          <h2 class="mb-5">Agregar doctor</h2>
          <v-text-field
            v-model="nombre"
            :rules="fieldsRules"
            label="Nombre"
            required
          ></v-text-field>
          <!-- </v-col>

        <v-col cols="12" md="4"> -->
          <v-text-field
            v-model="apellido"
            :rules="fieldsRules"
            label="Apellido"
            required
          ></v-text-field>
          <!-- </v-col>

        <v-col cols="12" md="4"> -->
          <v-text-field
            v-model="correo"
            :rules="correoRules"
            label="Correo"
            required
          ></v-text-field>

          <v-text-field
            v-model="ciudad"
            :rules="fieldsRules"
            label="Ciudad"
            required
          ></v-text-field>

          <v-text-field
            v-model="direccion"
            :rules="fieldsRules"
            label="Dirección"
            required
          ></v-text-field>

          <v-menu
            ref="dateField"
            v-model="dateField"
            :close-on-content-click="false"
            transition="scale-transition"
            offset-y
            min-width="auto"
          >
            <template v-slot:activator="{ on, attrs }">
              <v-text-field
                v-model="date"
                label="Fecha de nacimiento"
                readonly
                v-bind="attrs"
                v-on="on"
                :rules="fieldsRules"
              ></v-text-field>
            </template>
            <v-date-picker
              v-model="date"
              :max="
                new Date(Date.now() - new Date().getTimezoneOffset() * 60000)
                  .toISOString()
                  .substr(0, 10)
              "
              min="1950-01-01"
              @change="save"
            ></v-date-picker>
          </v-menu>
          <v-btn
            depressed
            class="mt-5"
            color="primary"
            :loading="agregandoDoctor"
            :disabled="agregandoDoctor"
            @click="agregarDoctor"
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
  name: "RegistrarDoctor",
  data() {
    return {
      nombre: null,
      apellido: null,
      correo: null,
      ciudad: null,
      direccion: null,
      fechaNacimiento: null,
      valid: false,
      fieldsRules: [(v) => !!v || "Campo requerido"],
      correoRules: [
        (v) => !!v || "Correo es requerido",
        (v) => /.+@.+/.test(v) || "Debe ser un correo válido",
      ],
      date: null,
      dateField: false,
      agregandoDoctor: null,
      mostrarAlerta: false,
      textoAlerta: "",
      tipoAlerta: false,
    };
  },
  methods: {
    save(date) {
      this.$refs.dateField.save(date);
    },
    async agregarDoctor() {
      this.mostrarAlerta = false;
      this.agregandoDoctor = true;

      let datosDoctor = {
        nombre: this.nombre,
        apellido: this.apellido,
        correo: this.correo,
        ciudad: this.ciudad,
        direccion: this.direccion,
        fechaNacimiento: this.date,
      };

      try {
        const respuesta = await axios.post(
          "https://us-east4.gcp.data.mongodb-api.com/app/api-endpoints-ewdzk/endpoint/doctores",
          datosDoctor
        );
        console.log(respuesta.status);
        this.textoAlerta = respuesta.data.message;
        this.tipoAlerta = true;
      } catch (error) {
        console.log(error.response.data.message);
        this.textoAlerta = error.response.data.message;
        this.tipoAlerta = false;
      }
      this.mostrarAlerta = true;
      this.agregandoDoctor = false;
    },
  },
};
</script>