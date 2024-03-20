import { createApp } from "https://cdnjs.cloudflare.com/ajax/libs/vue/3.2.29/vue.esm-browser.min.js";

const site = "https://vue3-course-api.hexschool.io/v2/";
const api_path = "juby-vue-bootcamp";

import pagination from "./pagination.js";
import productModal from "./productModal.js";

const app = createApp({
  data() {
    return {
      products: [],
      tempProduct: {
        imagesUrl: [],
      },
      pages: {},
      modalProduct: null, // productModal
      modalDel: null, // delModal
      isNew: false,
    };
  },
  methods: {
    getProducts(page = 1) { // 參數預設值
      const api = `${site}api/${api_path}/admin/products`;
      axios
        .get(api)
        .then((res) => {
          this.products = res.data.products;
          this.pages = res.data.pagination;
          // console.log(res);
        })
    },
    openModal(status, product) {
      if (status === 'new') {
        this.tempProduct = {
          imagesUrl: [],
        };
        this.isNew = true;
        // this.modalProduct.show();
        this.$refs.pModal.openModal();
      } else if (status === 'edit') {
        this.tempProduct = { ...product };
        if (!Array.isArray(this.tempProduct.imagesUrl)) {
          this.tempProduct.imagesUrl = []
        };
        this.isNew = false;
        // this.modalProduct.show();
        this.$refs.pModal.openModal();
      } else if (status === 'delete') {
        this.tempProduct = { ...product };
        this.modalDel.show();
      }
    },
    updateProduct() {
      let api = `${site}api/${api_path}/admin/product`; // post api
      let method = 'post';
      if (!this.isNew) {
        api = `${site}api/${api_path}/admin/product/${this.tempProduct.id}`; // put api
        method = 'put';
      };
      axios
        [method](api, { data: this.tempProduct })
        .then((res) => {
          this.getProducts();
          // this.modalProduct.hide();
          this.$refs.pModal.closeModal();
          this.tempProduct = {};
        })
    },
    deleteProduct() {
      const api = `${site}api/${api_path}/admin/product/${this.tempProduct.id}`;
      axios
        .delete(api)
        .then((res) => {
          this.getProducts();
          this.modalDel.hide();
        })
    }
  },
  mounted() {
    const token = document.cookie.replace(/(?:(?:^|.*;\s*)hexToken\s*=\s*([^;]*).*$)|^.*$/, '$1');
    axios.defaults.headers.common['Authorization'] = token;
    this.modalDel = new bootstrap.Modal(this.$refs.delProductModal);
  },
  components: {
    pagination,
    productModal,
  }
})

app.mount("#app");