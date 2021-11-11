<template>
  <login-component />
</template>

<script>
  import Login from '../components/Login'

  export default {
    name: 'Home',

    components: {
      'login-component': Login,
    },
  }
</script>
