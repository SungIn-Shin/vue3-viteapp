<template>
  <div>
    <span v-if="isUserEmpty">
      어서오세요. 메인 화면입니다. 로그인을 시도하세요.
    </span>
    <span v-else> {{ state.userId }} 님의 메인화면입니다.</span>
  </div>
</template>

<script>
import { computed, reactive } from 'vue';
import useAccount from '../composables/useAccount';

export default {
  setup() {
    const state = reactive({
      userId: '',
    });

    const user = useAccount();

    state.userId = user.state.userId;

    const isUserEmpty = computed(() => {
      return state.userId == '' ? true : false;
    });
    return {
      state,
      isUserEmpty,
    };
  },
};
</script>

<style></style>
