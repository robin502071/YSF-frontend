<template>
  <div class="container">
    <div class="title-area text-center mt-12px mb-24px">
      <h1 class="text-36px mb-4px font-bold">好朋友機器人</h1>
      <h2 class="text-20px font-bold">powered by GPT-3</h2>
    </div>
    <div class="description-area max-w-600px mx-auto text-14px lh-16px">
      當你覺得沮喪或失落時，有人能夠和你一起分享並為你加油打氣是一件很棒的事情。現在，你不必再孤單面對，因為我們有一個
      AI 機器人，它是你的好朋友，專門為你提供心靈上的支持。
      只需要告訴它你心情不好的原因，它會提供一些慰藉和建議，幫助你重拾動力和信心。不管你是工作壓力太大、關係出現問題還是其他種種原因，我們都有合適的話語來鼓勵你。
      讓我們一起面對挑戰，相信自己，堅持下去。未來的路可能不總是平坦，但我們相信你有能力克服任何困難，迎接更好的明天！
    </div>
    <div class="mt-20px banner-area w-220px mx-auto rd-16px">
      <img
        class="w-100% rd-16px"
        src="../public/images/banner_anime-girl.gif"
        alt="banner_anime-girl"
      />
    </div>
    <div class="input-area text-center mt-32px w-500px mx-auto">
      <h4 class="mb-8px">你今天心情不好的原因是......</h4>
      <form @submit="handleSubmit">
        <textarea
          placeholder="不要打太多字 QQ 心情會越差呢"
          name="prompt"
          id=""
          rows="4"
          maxlength="100"
          class="w-100% resize-none"
        ></textarea>
        <button
          :disabled="isLoading"
          class="mt-4px cursor-pointer"
          type="submit"
        >
          取得安慰
        </button>
        <div v-if="isLoading" class="mt-8px flex items-center justify-center">
          <div class="spinner ml-4px animate-spin text-center"></div>
        </div>
      </form>
      <h4 v-if="isError" class="mt-8px">{{ errorMessage }}</h4>
    </div>
    <div class="response-area w-500px mx-auto text-center">
      <textarea
        :value="AIResponse"
        class="w-100% h-200px resize-none bg-transparent border-none text-black"
        disabled
      ></textarea>
    </div>
  </div>
</template>

<script setup lang="ts">
const AIResponse = ref("");
const isLoading = ref(false);
const isError = ref(false);
const errorMessage = ref("");
const handleSubmit = async (e: Event) => {
  e.preventDefault();
  const formData = new FormData(e.target as HTMLFormElement);
  const prompt = formData.get("prompt")?.toString().trim();

  if (!prompt) {
    isError.value = true;
    errorMessage.value = "請記得輸入文字";
    return;
  }

  if (prompt) {
    try {
      AIResponse.value = "";
      isError.value = false;
      errorMessage.value = "";
      isLoading.value = true;
      const response = await fetch(
        `http://localhost:3001/api?prompt=${encodeURIComponent(prompt)}`
      );
      const data = await response.json();
      AIResponse.value = data.AIResponse;
    } catch (error) {
      console.error(error);
      isError.value = true;
      errorMessage.value = "哎呀！很抱歉，發生了一些錯誤";
    } finally {
      isLoading.value = false;
    }
  }
};
</script>

<style scoped>
.container {
  max-width: 1200px;
  margin: 0 auto;
}
.container div {
  font-family: "Noto Sans TC", sans-serif;
}
.spinner {
  border: 4px solid #f3f3f3; /* Light grey */
  border-top: 4px solid #3498db; /* Blue */
  border-radius: 50%;
  width: 16px;
  height: 16px;
}
</style>
