<template>
  <v-app>
    <v-navigation-drawer v-model="drawer" absolute temporary>
      <v-list-item>
        <v-list-item-avatar>
          <v-img src="https://randomuser.me/api/portraits/men/78.jpg"></v-img>
        </v-list-item-avatar>

        <v-list-item-content>
          <v-list-item-title>John Leider</v-list-item-title>
        </v-list-item-content>
      </v-list-item>

      <v-divider></v-divider>

      <v-list dense class="mt-5" shaped>
        <v-list-item
          v-for="item in items"
          :key="item.title"
          link
          :to="item.ruta"
        >
          <v-list-item-icon>
            <v-icon>{{ item.icon }}</v-icon>
          </v-list-item-icon>

          <v-list-item-content>
            <v-list-item-title>{{ item.title }}</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>

    <v-app-bar app>
      <v-app-bar-nav-icon @click.stop="drawer = !drawer"></v-app-bar-nav-icon>
      <v-toolbar-title>Hospital En Casa</v-toolbar-title>
    </v-app-bar>

    <v-main>
      <v-container fluid>
        <router-view></router-view>
      </v-container>
    </v-main>

    <v-footer app>
      <!-- -->
    </v-footer>
  </v-app>
</template>

<script>
export default {
  name: "App",
  data: () => ({
    drawer: null,
    items: [
      { title: "Inicio", icon: "mdi-home", ruta: "/" },
      {
        title: "Agregar Paciente",
        icon: "mdi-account-injury",
        ruta: "registrar-paciente",
      },
      {
        title: "Agregar Familiar",
        icon: "mdi-human-male-female-child",
        ruta: "registrar-familiar-paciente",
      },
      {
        title: "Agregar Doctor",
        icon: "mdi-doctor",
        ruta: "registrar-doctor",
      },
    ],
  }),
};
</script>

