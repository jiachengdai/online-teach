<template>
  <div class="ai-assistant-container">
    <h1 class="ai-assistant-title">AI助教</h1>
    <div class="chat-window">
      <ChatMessages :messages="messages" />
      <ChatInput @sendMessage="handleSendMessage" />
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import ChatInput from './ChatInput.vue';
import ChatMessages from './ChatMessages.vue';
import { getAIResponse } from '@/api/AI';

const messages = ref([]);

const handleSendMessage = async (message) => {
  messages.value.push({ content: message, type: 'user' });
  try {
    const res = await getAIResponse(message);
    const reply = res.result.output.text;
    messages.value.push({ content: reply, type: 'ai' });
  } catch (e) {
    messages.value.push({ content: "AI 助教暂时无法响应，请稍后再试。", type: 'ai' });
  }
};
</script>


<style scoped>
.ai-assistant-container {
  padding: 20px;
  background-color: #f9f9f9;
  border-radius: 10px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
}

.ai-assistant-title {
  text-align: center;
  margin-bottom: 20px;
}

.chat-window {
  display: flex;
  flex-direction: column;
  height: 400px;
  border: 1px solid #ccc;
  border-radius: 5px;
  overflow: hidden;
}

.chat-window > * {
  flex: 1;
}
</style>