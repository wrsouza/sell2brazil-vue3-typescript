import { reactive, toRefs, computed } from "vue";

export type ApiUserListType = {
  current_page: number;
  total: number;
  last_page: number;
  data: ItemUserType[];
};

export type ItemUserType = {
  id: null | number;
  name: string;
  email: string;
  created_at: Date;
  updated_at: Date;
};

export type FormUserType = {
  id: null | number;
  name: string;
  email: string;
  password: string;
  passwordConfirmation: string;
};

export type ErrorsType = {
  [key: string]: string[] | string;
};

export type UserType = {
  list: ItemUserType[];
  form: FormUserType;
  errors: ErrorsType;
  currentPage: number;
  totalPage: number;
};

export const useState = () => {
  const state = reactive<UserType>({
    list: [],
    form: {
      id: null,
      name: "",
      email: "",
      password: "",
      passwordConfirmation: ""
    },
    errors: {},
    currentPage: 1,
    totalPage: 1
  });

  const clearForm = (state: UserType) => {
    state.form = {
      id: null,
      name: "",
      email: "",
      password: "",
      passwordConfirmation: ""
    };
  };

  const setErrors = (state: UserType, errors: ErrorsType) => {
    state.errors = errors;
  };

  const errorList = computed(() => {
    const err: ErrorsType = {};
    Object.keys(state.errors).forEach((key, idx) => {
      err[key] = Object.values(state.errors)[idx][0];
    });
    return err;
  });

  return {
    ...toRefs(state),
    clearForm,
    setErrors,
    errorList
  };
};
