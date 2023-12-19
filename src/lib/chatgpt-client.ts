import { ChatGPTAPI, ChatMessage } from 'chatgpt'
export interface SendMessageRequest {
    prompt: string,
    systemMessage?: string
    parentMessageId?: string,
    conversationId?: string
}


class ChatGPTClient {
    private apiKey: string
    private chatGPTAPI: ChatGPTAPI;

    constructor() {
        this.apiKey = process.env.NEXT_PUBLIC_OPENAI_API_KEY ?? ''
        this.chatGPTAPI = new ChatGPTAPI({
            apiKey: this.apiKey,
            completionParams: {
                temperature: 0.2
            },
            debug: true
        })
    }

    public async sendMessage({ prompt, systemMessage = '', parentMessageId }: SendMessageRequest): Promise<ChatMessage> {
        try {
            const response = await this.chatGPTAPI.sendMessage(prompt, {
                parentMessageId,
                systemMessage
            })
            return response
        } catch (error: any) {
            console.error('Error communicating with ChatGPT API:', error.message)
            throw error
        }
    }


}
const chatGPTClient = new ChatGPTClient()
export default chatGPTClient