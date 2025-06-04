<template>
  <div class="chat-input">
    <input
      v-model="message"
      @keyup.enter="sendMessage"
      placeholder="Type your message..."
      class="input-field"
    />
    <button @click="sendMessage" class="send-button">Send</button>
  </div>
</template>

<script setup>
import { ref, defineEmits } from 'vue';

const emit = defineEmits(['sendMessage']);
const message = ref('');

const sendMessage = () => {
  if (message.value.trim()) {
    emit('sendMessage', message.value);
    message.value = '';
  }
};
</script>

<style scoped>
.chat-input {
  display: flex;
  align-items: center;
  padding: 10px;
  background-color: #f2f5f9;
}

.input-field {
  flex: 1;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 5px;
  margin-right: 10px;
}

.send-button {
  padding: 10px 15px;
  background-color: #16243d;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
}

.send-button:hover {
  background-color: #1a2a4d;
}
</style>