var app = new Vue({
  el: '#app',
  data: {
    product: 'Boots',
    description: 'These boots are made for walking, and walking is what they do... one of these days these boots are gonna walk all over you.',
    image: './assets/vmSocks-green-onWhite.jpg',
    link: 'https://nocoldfeet.co/collections/green-socks',
    inStock: false,
    inventory: 5,
    onSale: true,
    details: ["80% cotton", "20% polyester", "Gender-neutral"],
    variants: [
      {
        variantId: 2234,
        variantColour: "green",
        variantImage: "./assets/vmSocks-green-onWhite.jpg",
      }, {
        variantId: 2235,
        variantColour: "blue",
        variantImage: "./assets/vmSocks-blue-onWhite.jpg",
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
    updateProduct(variantImage) {
      this.image = variantImage;
    },
    removeFromCart() {
      if(this.cart >= 1) {
        this.cart -= 1;
      }
    }
  }
});