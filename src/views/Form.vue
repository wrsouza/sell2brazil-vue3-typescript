<template>
  <div class="card">
    <div class="card-header">
      <h1 class="title float-start">Edit User</h1>
      <router-link to="/" class="btn btn-light float-end"
        ><i class="fa fa-arrow-left btn-icon-text"></i>Go back</router-link
      >
    </div>
    <div class="card-body">
      <form
        id="form"
        @submit.prevent="sendForm"
        autocomplete="off"
        class="form"
      >
        <div class="container">
          <div class="row">
            <div class="col-md-6">
              <div class="form-group">
                <label for="name">Nome</label>
                <input
                  type="text"
                  name="name"
                  id="name"
                  v-model="form.name"
                  class="form-control"
                  v-bind:class="{ 'is-invalid': errorList.name }"
                />
                <span>{{ errorList.name }}</span>
              </div>
            </div>
            <div class="col-md-6">
              <div class="form-group">
                <label for="email">E-mail</label>
                <input
                  type="text"
                  name="email"
                  id="email"
                  v-model="form.email"
                  class="form-control"
                  v-bind:class="{ 'is-invalid': errorList.email }"
                />
                <span>{{ errorList.email }}</span>
              </div>
            </div>
          </div>
          <br />
          <div class="row">
            <div class="col-md-6">
              <div class="form-group">
                <label for="password">Senha</label>
                <input
                  type="password"
                  name="password"
                  id="password"
                  v-model="form.password"
                  class="form-control"
                  v-bind:class="{ 'is-invalid': errorList.password }"
                />
                <span>{{ errorList.password }}</span>
              </div>
            </div>
            <div class="col-md-6">
              <div class="form-group">
                <label for="password_confirm">Confirmar Senha</label>
                <input
                  type="password"
                  name="password_confirm"
                  id="password_confirm"
                  v-model="form.password_confirmation"
                  class="form-control"
                  v-bind:class="{
                    'is-invalid': errorList.password_confirmation
                  }"
                />
                <span>{{ errorList.password_confirmation }}</span>
              </div>
            </div>
          </div>
          <br />
          <div class="row">
            <div class="form-group">
              <button type="submit" class="btn btn-lg btn-primary">
                Confirmar
              </button>
            </div>
          </div>
        </div>
      </form>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { useRoute, useRouter } from "vue-router";
import { useState } from "@/modules/User";
import api from "@/services/api";

export default defineComponent({
  name: "Form",
  setup() {
    const { form, errors, errorList } = useState();
    const { params } = useRoute();
    const router = useRouter();

    const getItem = async (id: number) => {
      try {
        const response = await api.get(`users/${id}`);
        form.value = {
          id: response.data.id,
          name: response.data.name,
          email: response.data.email,
          password: "",
          passwordConfirmation: ""
        };
      } catch (err) {
        console.log(err);
      }
    };

    const setItem = async () => {
      console.log(form.value);
      try {
        if (params.id) {
          await api.put(`users/${params.id}`, form.value);
        } else {
          await api.post("users", form.value);
        }
        router.push("/");
      } catch (err) {
        console.log(err);
        errors.value = err.response.data;
      }
    };

    if (params.id) {
      getItem(parseInt(params.id.toString()));
    }

    return { form, errorList, setItem };
  },
  methods: {
    sendForm() {
      console.log("ok");
      this.setItem();
    }
  }
});
</script>
