<template>
  <div class="d-flex flex-row" style="width: 100%">
    <div class="d-flex flex-column" style="width: 50%">
      <h1 class="mb-4">Admin</h1>
      <v-file-input
        v-model="file"
        accept=".json"
        hide-details
        label="Ajouter un fichier au format json"
        class="mb-4"
      ></v-file-input>
      <v-btn
        color="primary"
        class="mb-4"
        @click="handleSubmitFile(file)"
        :disabled="!file"
      >
        <span>Upload cards</span>
        <IconLoading v-if="loading" class="ml-2"></IconLoading>
      </v-btn>
      <div class="mb-4">{{ response }}</div>
      <!-- <v-btn
        :loading="loadingUpdate"
        color="primary"
        class="mb-4"
        @click="updateCards()"
        >Update cards</v-btn
      >
      <v-btn :loading="loadingTask" class="mb-4" color="primary" @click="testTask()"
        >Launch tasks test</v-btn
      > -->
      <v-btn :loading="loadingTest" class="mb-4" color="primary" @click="test()"
        >Test</v-btn
      >
    </div>
  </div>
</template>

<script>
import { getAuth, getIdToken } from "firebase/auth";
import IconLoading from "@/components/Icons/IconLoading.vue";
export default {
  name: "Admin",
  components: {
    IconLoading,
  },
  data() {
    return {
      loading: false,
      loadingTest: false,
      // loadingUpdate: false,
      // loadingTask: false,
      file: null,
      response: "",
    };
  },
  computed: {},
  mounted() {},
  methods: {
    async handleSubmitFile(file) {
      this.loading = true;
      try {
        this.response = await this.submitFile(file);
        this.loading = false;
      } catch (err) {
        this.response = err;
        this.loading = false;
      }
    },
    async submitFile(file) {
      const auth = getAuth();
      const token = await getIdToken(auth.currentUser);

      return this.$api
        .post("/importCardsFromJSON", file, {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: token,
          },
        })
        .then((res) => {
          return res.data;
        })
        .catch(() => {
          throw "Error while submiting file.";
        });
    },
    test() {
      this.loadingTest = true;

      return this.$api
        .get("/updateAllCardsWithTasks")
        .then((res) => {
          console.log(res);
        })
        .catch((err) => {
          console.log(err);
        })
        .finally(() => {
          this.loadingTest = false;
        });
    },
    // updateCards() {
    //   this.loadingUpdate = true;

    //   return this.$api
    //     .get("/updateCardsPopulations")
    //     .then((res) => {
    //       console.log(res);
    //       this.loadingUpdate = false;
    //     })
    //     .catch((err) => {
    //       console.log(err);
    //       this.loadingUpdate = false;
    //     });
    // },
    // testTask() {
    //   this.loadingTask = true;

    //   return this.$api
    //     .get("/launchTasksTest")
    //     .then((res) => {
    //       console.log(res);
    //     })
    //     .catch((err) => {
    //       console.log(err);
    //     })
    //     .finally(() => {
    //       this.loadingTask = false;
    //     });
    // },
    // test() {
    //   this.loadingDB = true;

    //   return this.$api
    //     .post("/tasksTesto", {"data":"35"}, {
    //       headers: {
    //         "Content-Type": "application/json"
    //       },
    //     })
    //     .then((res) => {
    //       console.log(res);
    //     })
    //     .catch((err) => {
    //       console.log(err);
    //     })
    //     .finally(() => {
    //       this.loadingDB = false;
    //     });
    // },
    // async task() {
    //   this.loadingTask = true;

    //   const auth = getAuth();
    //   const token = await getIdToken(auth.currentUser);

    //   const data = { test: "oui" }

    //   return this.$api
    //     .post("/tasksTest", data, {
    //       headers: {
    //         "Content-Type": "application/json",
    //         Authorization: token,
    //       },
    //     })
    //     .then((res) => {
    //       console.log(res);
    //     })
    //     .catch((err) => {
    //       console.log(err);
    //     })
    //     .finally(() => {
    //       this.loadingTask = false;
    //     });
    // },
  },
};
</script>
