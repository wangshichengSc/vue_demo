<template>

  <div>
    <p>{{ message }}</p>
    <p>{{pa}}</p>
    <div>
      <button @click="ck">click</button>
    </div>
  </div>

</template>
<script>
  export default {
    name: 'Test',
    data: function () {
      return {
        message: 0,
        pa: ''
      };
    },
    mounted() {
      this.pa = this.$route.params.data
      alert(this.pa);
    },
    methods: {
      ck: function () {
        this.message += 1;
      }
    }
  }


</script>
<style></style>
