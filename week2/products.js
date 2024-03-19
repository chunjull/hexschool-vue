import { createApp } from "https://cdnjs.cloudflare.com/ajax/libs/vue/3.2.29/vue.esm-browser.min.js";

const site = "https://vue3-course-api.hexschool.io/v2/";
const api_path = "juby-vue-bootcamp";

const app = createApp({
  data() {
    return {
      products: [],
      tempProduct: {}
    }
  },
  methods: {
    checkAdmin() {
      const url = `${site}api/user/check`;
      axios
        .post(url)
        .then((res) => {
          this.getData();
        })
        .catch((err) => {
          alert(err.response.data.message);
          window.location = "login.html";
        })
    },
    getData() {
      const api = `${site}api/${api_path}/admin/products/all`;
      axios
        .get(api)
        .then((res) => {
          this.products = res.data.products;
        })
    },
    openProducts() {
      this.tempProduct = item;
    }
  },
  mounted() {
    const token = document.cookie.replace(/(?:(?:^|.*;\s*)hexToken\s*=\s*([^;]*).*$)|^.*$/, '$1');
    axios.defaults.headers.common['Authorization'] = token;
    this.checkAdmin();
  }
})

app.mount("#app");