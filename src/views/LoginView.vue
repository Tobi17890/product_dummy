<template>
    <div class="flex w-full flex-col h-full items-center justify-center">
        <el-form ref="formRef" :model="loginFormData" :rules="formRule" :validate-on-rule-change="false"
            label-width="130px" @submit.prevent="submitLogin(formRef)">
            <el-form-item label="Activity name" prop="username">
                <el-input v-model="loginFormData.username" />
            </el-form-item>
            <el-form-item label="Activity name" prop="password">
                <el-input v-model="loginFormData.password" />
            </el-form-item>
        </el-form>
        <el-button class="loginbtn w-28" native-type="submit" :loading="isLoading" @click="submitLogin(formRef)">
            Login
        </el-button>
    </div>
</template>

<script lang="ts" setup>
import useLogin from '@/composables/useLogin';



const {
    loginFormData,
    formRef,
    formRule,
    isLoading,
    submitLogin,
    passwordFormat,
} = useLogin();


</script>