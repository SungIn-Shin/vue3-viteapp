import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
// import store from './store';
import axios from 'axios';
import filters from './utils/filters';
import useAccount from './composables/useAccount';

const user = useAccount();

// 브라우저 Refresh시 서버에 인증처리 및 화면 권한별 접근제한
async function authMeAndUserRoleCheck() {
  //
  if (user.state.userId == '') {
    const res = await axios.get('/api/auth/me');
    user.setUsers(res.data);

    router.beforeEach((to, from, next) => {
      if (to.fullPath == '/login' && user.state.userId !== '') {
        // 로그인 화면 접근 제한
        alert('이미 로그인 하셨습니다.');
      } else if (to.meta.auth && to.meta.role !== user.state.role) {
        // 슈퍼관리자 화면 접근 제한
        alert('슈퍼관리자 권한만 접근 가능합니다.');
      } else {
        next();
      }
    });
  }
}

authMeAndUserRoleCheck();

const appConst = createApp(App).use(router);

// set filters
appConst.config.globalProperties.$filters = filters;

appConst.mount('#app');
