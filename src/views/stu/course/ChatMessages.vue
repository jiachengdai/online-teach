<template>
  <div class="chat-messages">
    <div class="messages-container" ref="messagesContainer">
      <div
        v-for="(message, index) in messages"
        :key="index"
        :class="['message', message.type]"
      >
        <span class="message-content">{{ message.content }}</span>
      </div>
      <div v-if="loading" class="loading-spinner">
        <span class="dot"></span>
        <span class="dot"></span>
        <span class="dot"></span>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, watch, nextTick } from 'vue';

const props = defineProps({
  messages: {
    type: Array,
    required: true
  },
  loading:{
    type: Boolean,
    default: false
  }
});

const messagesContainer = ref(null);

const scrollToBottom = () => {
  nextTick(() => {
    if (messagesContainer.value) {
      messagesContainer.value.scrollTop = messagesContainer.value.scrollHeight;
    }
  });
};

onMounted(scrollToBottom);
watch(() => props.messages.length, scrollToBottom);
watch(() => props.loading, scrollToBottom);
</script>

<style scoped>
.chat-messages {
  overflow-y: auto;
  height: 400px; /* Adjust height as needed */
  padding: 10px;
  background-color: #f9f9f9;
  border: 1px solid #ccc;
  border-radius: 5px;
}

.loading-spinner {
  display: flex;
  align-items: center;
  margin: 10px 0;
}

.dot {
  width: 8px;
  height: 8px;
  margin: 0 2px;
  border-radius: 50%;
  background: #888;
  animation: blink 1.4s infinite both;
}
.dot:nth-child(2) { animation-delay: 0.2s; }
.dot:nth-child(3) { animation-delay: 0.4s; }
@keyframes blink {
  0%, 80%, 100% { opacity: 0.2; }
  40% { opacity: 1; }
}

.messages-container {
  display: flex;
  flex-direction: column;
}

.message {
  margin: 5px 0;
  padding: 10px;
  border-radius: 5px;
}

.message.user {
  align-self: flex-end;
  background-color: #d1e7dd;
}

.message.ai {
  align-self: flex-start;
  background-color: #f8d7da;
}
</style>