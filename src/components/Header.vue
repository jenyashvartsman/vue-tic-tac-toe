<template>
  <div id="header">
    <div id="nav">
      <router-link to="/">Home</router-link>
      <router-link to="/history">History</router-link>
    </div>
    <div id="banner">TIC TAC TOE</div>
  </div>
</template>

<script>
export default {};
</script>

<style>
#header #nav {
  padding: 30px;
  text-align: center;
}

#header #nav a {
  font-weight: bold;
  color: var(--grey);
  text-decoration: none;
  margin: 0 20px;
  border-bottom: 4px solid transparent;
  padding: 10px 5px;
  display: inline-block;
  width: 75px;
}

#header #nav a.router-link-exact-active {
  border-color: var(--primary);
}

#header #banner {
  text-align: center;
  color: var(--white);
  background-color: var(--primary);
  padding: 25px 0;
  font-weight: 500;
  font-size: 26px;
}
</style>