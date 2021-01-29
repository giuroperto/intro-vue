Vue.component('product', {
  props: {
    premium: {
      type: Boolean,
      required: true,
    }
  },
  template: `
  <div class="product">
    <div class="product-image">
      <a :href="link" target="_blank">
        <img :src="image" alt="">
      </a>
    </div>

    <div class="product-info">
    <h1>{{ title }}</h1>
    <p>{{ description }}</p>
    <p>{{ onSale }}</p>
    <!-- <p v-show="inStock">In Stock</p> -->
    <!-- <p v-if="onSale">ON SALE!</p> -->
    <p v-if="inStock">In Stock</p>
    <p v-else>Out of Stock</p>
    <product-details :details="details"></product-details>

    <p>Shipping: {{ shipping }}</p>

    <div v-for="(variant, idx) in variants" :key="variant.variantId"
    class="color-box"
    :style="{ backgroundColor: variant.variantColour} "
    @mouseover="updateProduct(idx)">
    </div>
    
    <div> SIZES:
      <ul>
        <li v-for="size in sizes">
          {{ size }}
        </li>
      </ul>
    </div>
  </div>

    <button v-on:click="addToCart"
      :disabled="!inStock"
      :class="{ disabledButton: !inStock}"
      >Add to Cart</button>

    <button v-on:click="removeFromCart">Remove from Cart</button>

    <div class="cart">
      <p>Cart({{cart}})</p>
    </div>
    <!-- <p v-if="inventory > 10">In Stock</p>
    <p v-else-if="inventory <= 10 && inventory > 0"> Almost Sold Out!</p>
    <p v-else
      :class="{classLineThrough: !inStock}">Out of Stock</p> -->
  </div>
  `,
  data() {
    return {
      brand: 'Vue Mastery',
      product: 'Boots',
      description: 'These boots are made for walking, and walking is what they do... one of these days these boots are gonna walk all over you.',
      selectedVariant: 0,
      link: 'https://nocoldfeet.co/collections/green-socks',
      inventory: 5,
      // onSale: true,
      details: ["80% cotton", "20% polyester", "Gender-neutral"],
      variants: [{
        variantId: 2234,
        variantColour: "green",
        variantImage: "./assets/vmSocks-green-onWhite.jpg",
        variantQuantity: 10,
        onSale: true,
      }, {
        variantId: 2235,
        variantColour: "blue",
        variantImage: "./assets/vmSocks-blue-onWhite.jpg",
        variantQuantity: 0,
        onSale: false,
      }],
      sizes: ["P", "M", "G"],
      cart: 0,
    };
  },
  methods: {
    addToCart: function () {
      this.cart += 1;
    },
    //we can use the shorthand to the named function but be aware that not all browsers support the feature
    updateProduct(index) {
      this.selectedVariant = index;
      // console.log(index);
    },
    removeFromCart() {
      if (this.cart >= 1) {
        this.cart -= 1;
      }
    }
  },
  computed: {
    title() {
      return this.brand + ' ' + this.product;
    },
    image() {
      return this.variants[this.selectedVariant].variantImage;
    },
    inStock() {
      return this.variants[this.selectedVariant].variantQuantity;
    },
    onSale() {
      return this.variants[this.selectedVariant].onSale ? this.brand + ' ' + this.product + ' is on sale' : this.brand + ' ' + this.product + ' is not on sale';
    },
    shipping() {
      if (this.premium) {
        return "Free";
      }
      return 2.99;
    }
  }
});

Vue.component('product-details', {
  props: {
    details: {
      type: Array,
      required: true,
    }
  },
  template: `
    <ul>
      <li v-for="detail in details"> {{detail}} </li>
    </ul>
  `
});

var app = new Vue({
  el: '#app',
  data: {
    premium: true,
  }
});