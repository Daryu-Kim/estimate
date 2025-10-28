<template>
  <div class="login">
    <img src="@/assets/logo.png" />
    <div class="input-container">
      <input
        type="text"
        placeholder="이메일 || 아이디 || 휴대폰 번호"
        maxlength="50"
      />
      <input type="password" placeholder="비밀번호 (8 - 16자)" maxlength="16" />
    </div>
    <div class="btn-container">
      <button>관리자 로그인</button>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.login {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  > img {
    width: 512px;
  }

  > .input-container {
    margin-top: 64px;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 16px;

    > input {
      width: 100%;
      padding: 12px 24px;
      font-size: 24px;
      border: 1px solid #aaa;
      border-radius: 8px;
    }
  }

  > .btn-container {
    margin-top: 36px;
    > button {
      width: 100%;
      padding: 12px 24px;
      border: none;
      outline: none;
      border-radius: 8px;
      background-color: #ff55b3;
      font-weight: 700;
      font-size: 24px;
      cursor: pointer;
    }
  }
}
</style>
