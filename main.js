var app = new Vue({
  el: '#app',
  data: {
    product: 'Boots',
    description: 'These boots are made for walking, and walking is what they do... one of these days these boots are gonna walk all over you.',
    image: './assets/vmSocks-green-onWhite.jpg',
    link: 'https://nocoldfeet.co/collections/green-socks',
    inStock: true,
    inventory: 100,
    onSale: true,
    details: ["80% cotton", "20% polyester", "Gender-neutral"],
    variants: [
      {
        variantId: 2234,
        variantColour: "green",
      }, {
        variantId: 2235,
        variantColour: "blue",
      }
    ],
    sizes: ["P", "M", "G"],
  }
});