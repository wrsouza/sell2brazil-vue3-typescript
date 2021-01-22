<template>
  <div class="container">
    <div class="row justify-content-md-center">
      <div class="col-md-8">
        <router-view />
      </div>
    </div>
  </div>
</template>

<style lang="scss">
@import url("https://cdn.jsdelivr.net/npm/bootstrap@5.0.0-beta1/dist/css/bootstrap.min.css");
@import url("https://fonts.googleapis.com/css2?family=Poppins:wght@400;600&display=swap");
@import url("https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.2/css/all.min.css");

* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

html,
body,
#app {
  height: 100%;
}

body {
  font-family: "Poppins", sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
  background: #f7f8fc;
}

.card {
  margin: 20px;
}

.title {
  padding: 0;
  margin: 0;
  font-size: 25px;
  font-weight: 600;
  line-height: 38px;
  vertical-align: middle;
}

.btn-icon-text {
  margin-right: 7px;
  font-size: 14px;
}

.btn-light {
  color: #666;
  background-color: #fff;
  border-color: #eee;
}

.form-group span {
  color: #c70000;
  font-size: 11px;
}
</style>
