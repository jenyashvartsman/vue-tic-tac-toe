<template>
  <Header />
  <div id="container">
    <router-view />
  </div>
</template>

<script>
import "@/assets/style.css";
import Header from "@/components/Header";
export default {
  components: { Header },
};
</script>

<style>
#app #container {
  padding: 20px 30px;
}
</style>
