import Vue from "vue";
import Toast from "vue-toastification";
import "vue-toastification/dist/index.css";

const toast_config = {
  transition: "Vue-Toastification__fade",
  maxToasts: 10,
  newestOnTop: true,
  position: "top-left",
  timeout: 2500,
  closeOnClick: true,
  pauseOnFocusLoss: true,
  pauseOnHover: true,
  draggable: true,
  draggablePercent: 0.6,
  showCloseButtonOnHover: false,
  hideProgressBar: true,
  closeButton: "button",
  rtl: false
};

Vue.use(Toast, toast_config);