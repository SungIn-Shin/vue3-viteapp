<template>
  <div class="container">
    <h1>{{ getUserId }}</h1>
    <router-link to="/home">home(public)</router-link>
    |
    <router-link to="/login">login(public)</router-link>
    |
    <a @click="logout">logout</a>
    |
    <router-link to="/users">users(private)</router-link>
  </div>
</template>

<script>
import { computed } from 'vue';
import { useRouter } from 'vue-router';
import axios from 'axios';

import useAccount from '../composables/useAccount';

export default {
  setup() {
    // main.js에 정의한 전역변수에 접근하기 위한 선언
    const user = useAccount();
    const router = useRouter();

    const getUserId = computed(() => {
      return user.state.userId === ''
        ? '로그인하세요.'
        : user.state.userId + '님 환영합니다.';
    });

    const logout = async () => {
      await axios.post('/api/auth/logout');
      user.clearUserData();

      router
        .push({
          path: '/home',
        })
        .catch(err => {
          console.log(err);
          if (!err.name == 'NavigationDuplicated') throw err;
        });
    };

    return {
      getUserId,
      logout,
    };
  },
};
</script>

<style scoped>
.container h1 {
  border-style: solid;
  /* border: 2; */
}
</style>
