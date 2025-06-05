import request from '@/utils/request.js'
export function getAIResponse(prompt) {
    return request.get('/chat?message=' + encodeURI(prompt));
}