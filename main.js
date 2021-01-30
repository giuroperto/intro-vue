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

  <!-- <p v-if="inventory > 10">In Stock</p>
  <p v-else-if="inventory <= 10 && inventory > 0"> Almost Sold Out!</p>
  <p v-else
    :class="{classLineThrough: !inStock}">Out of Stock</p> -->

    <div>
      <h2>Reviews</h2>
      <p v-if="!review.length">There are no reviews yet.</p>
      <ul>
        <li v-for="areview in review">
          <p>{{ areview.name }}</p>
          <p>{{ areview.review }}</p>
          <p>Rating: {{ areview.rating }}</p>
          <p>Recommendation: {{ areview.recommendation }}</p>
      </ul>
    </div>

    <product-review @review-submitted="addReview"></product-review>
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
      review: [],
    };
  },
  methods: {
    addToCart: function () {
      this.$emit('add-to-cart', this.variants[this.selectedVariant].variantId);
    },
    //we can use the shorthand to the named function but be aware that not all browsers support the feature
    updateProduct(index) {
      this.selectedVariant = index;
      // console.log(index);
    },
    removeFromCart() {
      this.$emit('remove-from-cart', this.variants[this.selectedVariant].variantId);
    },
    addReview(productReview) {
      this.review.push(productReview);
    },
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

Vue.component('product-review', {
  template: `
    <form class="review-form" @submit.prevent="onSubmit">

    <p v-if="errors.length">
      <b>Please correct the following error(s): </b>
      <ul>
        <li v-for="error in errors">{{ error }}</li>
      </ul>
    </p>

    <p>
      <label for="name">Name:</label>
      <input id="name" v-model="name" placeholder="name">
    </p>
    
    <p>
      <label for="review">Review:</label>      
      <textarea id="review" v-model="review"></textarea>
    </p>
    
    <p>
      <label for="rating">Rating:</label>
      <select id="rating" v-model.number="rating">
        <option>5</option>
        <option>4</option>
        <option>3</option>
        <option>2</option>
        <option>1</option>
      </select>
    </p>

    <p>
      <div class="d-flex-h">
        <label for="recommendation">Would you recommend this product?</label> 
        <input type="radio" id="yes" name="recommendation" value="yes" v-model="recommendation">
        <label for="yes">Yes</label><br>
        <input type="radio" id="maybe" name="recommendation" value="maybe" v-model="recommendation">
        <label for="maybe">Maybe</label><br>
        <input type="radio" id="no" name="recommendation" value="no" v-model="recommendation">
        <label for="no">No</label><br>
      </div>
    </p>
        
    <p>
      <input type="submit" value="Submit">  
    </p>    
  
  </form>
  `,
  data() {
    return {
      name: null,
      review: null,
      rating: null,
      recommendation: null,
      errors: [],
    };
  },
  methods: {
    onSubmit() {
      if (this.name && this.review && this.rating  && this.recommendation) {
        let productReview = {
          name: this.name,
          review: this.review,
          rating: this.rating,
          recommendation: this.recommendation,
        };
        
        this.$emit('review-submitted', productReview);
        
        this.name = null;
        this.review = null;
        this.rating = null;
        this.recommendation = null;

      } else {
        if (!this.name) this.errors.push("Name required.");
        if (!this.review) this.errors.push("Review required.");
        if (!this.rating) this.errors.push("Rating required.");
        if (!this.recommendation) this.errors.push("Recommendation required.");
      }
    }
  }
});

var app = new Vue({
  el: '#app',
  data: {
    premium: true,
    cart: [],
  },
  methods: {
    updateCart(id) {
      this.cart.push(id);
    },
    removeProduct(id) {
      let iPos;
      if (this.cart.length >= 1) {
        iPos = this.cart.indexOf(id);
        this.cart.splice(iPos, 1);
      }
    },
    //another way of writing this function is the following - starts at the end of the array - mine would work fine in this example too because as we are considering the id it doesn't matter much when you added it to the cart considering you do remove it.
    // removeItem(id) {
    //   for (let i = this.cart.length - 1; i >=0; i--) {
    //     if (this.cart[i] === id) {
    //       this.cart.splice(i, 1);
    //     }
    //   }
    // }
  }
});