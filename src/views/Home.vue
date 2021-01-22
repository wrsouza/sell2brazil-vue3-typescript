<template>
  <div class="card">
    <div class="card-header">
      <h1 class="title float-start">User List</h1>
      <router-link to="/new-user" class="btn btn-success float-end"
        ><i class="fa fa-plus btn-icon-text"></i>New User</router-link
      >
    </div>
    <div class="card-body">
      <table class="table table-striped">
        <thead>
          <tr>
            <th scope="col" style="width: 60px; text-align: right;">#</th>
            <th scope="col">Name</th>
            <th scope="col">E-mail</th>
            <th scope="col"></th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="item in list" :key="item.id">
            <th scope="row" style="width: 70px; text-align: right;">
              {{ item.id }}
            </th>
            <td>{{ item.name }}</td>
            <td>{{ item.email }}</td>
            <td style="width: 90px">
              <router-link
                :to="{
                  name: 'edit.user',
                  params: { id: item.id }
                }"
                class="btn btn-outline-primary btn-sm"
                ><i class="fa fa-edit"></i
              ></router-link>
              <button
                @click="confirmDestroy(item.id)"
                class="btn btn-outline-danger btn-sm"
                style="margin-left: 5px;"
              >
                <i class="fa fa-trash"></i>
              </button>
            </td>
          </tr>
        </tbody>
      </table>
      <pagination
        :currentPage="currentPage"
        :totalPage="totalPage"
        @changePage="changePage"
      />
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, computed } from "vue";
import Pagination from "@/components/Pagination.vue";
import { ApiUserListType, ErrorsType, useState } from "@/modules/User";
import api from "@/services/api";
import Swal, { SweetAlertOptions } from "sweetalert2";

export default defineComponent({
  name: "Home",
  components: {
    Pagination
  },
  setup() {
    const { list, currentPage, totalPage } = useState();

    const getList = async (page: number) => {
      try {
        const response = (await api.get(`users?page=${page}`))
          .data as ApiUserListType;
        list.value = response.data;
        currentPage.value = response.current_page;
        totalPage.value = response.last_page;
      } catch (err) {
        console.log(err);
      }
    };

    const delItem = async (id: number) => {
      try {
        await api.delete(`users/${id}`);
        await getList(1);
      } catch (err) {
        console.log(err);
      }
    };

    getList(1);

    return { list, currentPage, totalPage, getList, delItem };
  },
  methods: {
    changePage(page: number) {
      this.getList(page);
    },
    confirmDestroy(id: number) {
      const options: SweetAlertOptions = {
        title: "Confirm Delete",
        text: "Do you really want to delete this user?",
        showCancelButton: true,
        confirmButtonColor: "#c70000",
        confirmButtonText: "Yes, Delete",
        cancelButtonColor: "#1C7CD5",
        cancelButtonText: "No"
      };
      Swal.fire(options).then(result => {
        if (result.value) {
          this.delItem(id);
        }
      });
    }
  }
});
</script>
