<template>
  <dashboard-component />
</template>

<script>
  import Dashboard from '../components/Dashboard'

  export default {
    name: 'Home',

    components: {
      'dashboard-component': Dashboard,
    },
  }
</script>
