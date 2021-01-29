var app = new Vue({
  el: '#app',
  data: {
    brand: 'Vue Mastery',
    product: 'Boots',
    description: 'These boots are made for walking, and walking is what they do... one of these days these boots are gonna walk all over you.',
    selectedVariant: 0,
    link: 'https://nocoldfeet.co/collections/green-socks',
    inventory: 5,
    // onSale: true,
    details: ["80% cotton", "20% polyester", "Gender-neutral"],
    variants: [
      {
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
      }
    ],
    sizes: ["P", "M", "G"],
    cart: 0,
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
      if(this.cart >= 1) {
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
    }
  }
});