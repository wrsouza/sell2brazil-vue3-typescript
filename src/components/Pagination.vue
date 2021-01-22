<template>
  <nav class="pagination">
    <ul>
      <li v-if="previousPagesVisible()">
        <a href="#" @click.prevent="change(1)" title="Primeira Página"
          ><i class="fa fa-angle-double-left"></i
        ></a>
      </li>
      <li>
        <a
          v-if="prevPageVisible()"
          href="#"
          @click.prevent="change(currentPage - 1)"
          title="Página Anterior"
          ><i class="fa fa-angle-left"></i
        ></a>
        <span v-else><i class="fa fa-angle-left"></i></span>
      </li>
      <li v-if="previousPagesVisible()"><span>...</span></li>
      <li
        v-for="(page, index) in listCenter()"
        v-bind:key="index"
        :class="isActive(page)"
      >
        <a href="#" @click.prevent="change(page)" :title="page">{{ page }}</a>
      </li>
      <li v-if="nextsPagesVisible()"><span>...</span></li>
      <li>
        <a
          v-if="nextPageVisible()"
          href="#"
          @click.prevent="change(currentPage + 1)"
          title="Próxima Página"
          ><i class="fa fa-angle-right"></i
        ></a>
        <span v-else><i class="fa fa-angle-right"></i></span>
      </li>
      <li v-if="nextsPagesVisible()">
        <a href="#" @click.prevent="change(totalPage)" title="Última Página"
          ><i class="fa fa-angle-double-right"></i
        ></a>
      </li>
    </ul>
  </nav>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  name: "Pagination",
  props: {
    currentPage: {
      type: Number,
      required: true
    },
    totalPage: {
      type: Number,
      required: true
    }
  },
  methods: {
    prevPageVisible() {
      return !(this.currentPage - 1 < 1);
    },
    previousPagesVisible() {
      return !(this.currentPage - 2 < 2);
    },
    listCenter() {
      const firstPage = 1;
      const lastPage = this.totalPage;
      const prevPage =
        this.currentPage - 2 < firstPage ? firstPage : this.currentPage - 2;
      const nextPage =
        this.currentPage + 2 > lastPage ? lastPage : this.currentPage + 2;
      const numbers = [];
      for (let i = prevPage; i <= nextPage; i++) {
        numbers.push(i);
      }
      return numbers;
    },
    nextPageVisible() {
      return !(this.currentPage + 1 > this.totalPage);
    },
    nextsPagesVisible() {
      return !(this.currentPage + 2 > this.totalPage);
    },
    isActive(page: number) {
      return this.currentPage === page ? "active" : "";
    },
    change(page: number) {
      if (this.currentPage !== page) {
        this.$emit("changePage", page);
      }
    }
  }
});
</script>

<style lang="scss" scoped>
.pagination {
  display: block;
  margin-top: 20px;
  text-align: center;

  ul {
    display: flex;
    list-style: none;
    margin: 0;
    padding: 0;
    -webkit-margin-before: 0px;
    -webkit-margin-after: 0px;
    -webkit-margin-start: 0px;
    -webkit-margin-end: 0px;
    -webkit-padding-start: 0px;
    border-radius: 5px;
    justify-content: center;

    li {
      padding: 0;
      margin-left: -1px;
      -webkit-margin-before: 0px;
      -webkit-margin-after: 0px;
      -webkit-margin-start: 0px;
      -webkit-margin-end: 0px;
      -webkit-padding-start: 0px;
      border: 1px solid #ccc;
      z-index: 1;

      &:disabled {
        background: #dddddd;

        &:hover {
          background: #dddddd;
        }
      }

      span {
        display: block;
        margin: 0;
        padding: 10px 15px;
        font-size: 14px;
        font-weight: 600;
        color: #666;
        text-decoration: none;
        opacity: 0.5;
      }

      a {
        display: block;
        margin: 0;
        padding: 10px 15px;
        font-size: 14px;
        font-weight: 600;
        color: #06c;
        text-decoration: none;
      }

      &:first-child {
        margin-left: 0;
        border-radius: 5px 0 0 5px;
      }

      &:last-child {
        border-radius: 0 5px 5px 0;
      }

      &:hover {
        background-color: rgba(28, 124, 213, 0.2);
      }

      &.active {
        background-color: #06c;
        border: 1px solid #06c;
        z-index: 2;

        a {
          color: #ffffff;
        }
      }
    }
  }
}
</style>
