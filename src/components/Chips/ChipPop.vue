<template>
  <div class="d-flex flex-row">
    <div
      class="d-flex flex-row justify-center align-center"
      :class="gradeColor(grade)"
      style="font-size: 10px; color: #fff; border-radius: 3px; min-width: 25px; height: 20px;"
    >
      {{ grade }}
    </div>
    <div
    class="d-flex flex-row justify-center align-center"
      style="
        font-weight: bold;
        font-size: 10px;
        background-color: #f2f2f2;
        color: #000;
        border-radius: 3px;
        min-width: 30px;
        height: 20px;
      "
    >
      {{ value }}
    </div>
  </div>
</template>

<script>
export default {
  name: "CardPopChip",
  props: {
    grade: String,
    value: Number,
  },
  data() {
    return {};
  },
  methods: {
    gradeColor(grade) {
      switch (grade) {
        case "10+":
          return "blue darken-2 ";
        case "10":
          return "blue";
        case "9.5":
          return "blue lighten-2";
        case "9":
          return "green darken-2";
        case "8":
          return "green";
        case "7":
          return "green lighten-2";
        case "6":
          return "orange darken-2";
        case "5":
          return "orange";
        case "4":
          return "orange lighten-2";
        case "3":
          return "red darken-2";
        case "2":
          return "red";
        case "1":
          return "red lighten-2";
        default:
          return "black";
      }
    },
  },
};
</script>
