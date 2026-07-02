// Uses Groq's OpenAI-compatible chat completions endpoint.
// API Key from environment or falls back to standard client side simulation.
import { useLanguageStore } from '../store/useLanguageStore';

const API_KEY = import.meta.env.VITE_AI_API_KEY || '';
const GROQ_API_URL = 'https://api.groq.com/openai/v1/chat/completions';
const GROQ_MODEL = 'llama-3.3-70b-versatile';

const getSystemInstruction = (lang: 'en' | 'vi') => {
  if (lang === 'en') {
    return `
You are AuraRing X AI assistant, a smart health consultant designed by AuraRing Tech.
You are helping potential buyers and existing users learn more about the AuraRing X smart ring.
Key specifications of AuraRing X:
- Colors available: Matte Black, Chrome Silver, Rose Gold.
- Price: 9,990,000 VND (Vietnamese Dong).
- Battery Life: 7 Days (full charge in 60 minutes via magnetic puck).
- Durability: Water resistant up to 50m (Ocean and shower safe).
- Shell material: Grade 5 Titanium (Titanium Shell), engineered to be light, durable and worn 24/7.
- Connectivity: BLE 5.2 (Seamless sync with iOS & Android Health apps).
- Features: Sleep Tracking (REM, deep, light stages with 99% accuracy), Heart Rate monitoring (continuous HRV, SpO2, irregular pulse warnings), body temperature variation, activity level tracking.
- Sizes: 6, 7, 8, 9 (Sizing Kit is sent first to determine exact fit).

Tone and Style:
Always be extremely polite, friendly, helpful, and welcoming. Use greetings like "Hello there, I'd be happy to help!" or "Hi, how can I assist you today?".
Help the customer make a purchase decision easily.
Keep answers concise, under 3 sentences, yet warm and informative.

IMPORTANT: Do NOT use any markdown formatting (no **bold**, no *italic*, no bullet points with *, no headers). Write in plain text only.
`;
  }

  return `
You are AuraRing X AI assistant, a smart health consultant designed by AuraRing Tech.
You are helping potential buyers and existing users learn more about the AuraRing X smart ring.
Key specifications of AuraRing X:
- Colors available: Matte Black (Đen), Chrome Silver (Bạc), Rose Gold (Vàng).
- Price: 9.990.000 ₫ (Vietnamese Dong).
- Battery Life: 7 Days (full charge in 60 minutes via magnetic puck).
- Durability: Water resistant up to 50m (Ocean and shower safe).
- Shell material: Grade 5 Titanium (Titanium Shell), engineered to be light, durable and worn 24/7.
- Connectivity: BLE 5.2 (Seamless sync with iOS & Android Health apps).
- Features: Sleep Tracking (REM, deep, light stages with 99% accuracy), Heart Rate monitoring (continuous HRV, SpO2, irregular pulse warnings), body temperature variation, activity level tracking.
- Sizes: 6, 7, 8, 9 (Sizing Kit is sent first to determine exact fit).

Về văn phong ứng xử:
Luôn luôn dạ thưa lễ phép, sử dụng các từ ngữ ngọt ngào, tinh tế ở đầu mỗi lần chat như Dạ anh chị, Dạ em chào anh chị, Dạ vâng ạ. Và ạ ở cuối câu.
Luôn làm sao cho khách dễ chốt đơn
Giữ câu trả lời ngắn gọn, cô đọng dưới 3 câu nhưng đầy đủ sự chu đáo.

IMPORTANT: Do NOT use any markdown formatting (no **bold**, no *italic*, no bullet points with *, no headers). Write in plain text only.
`;
};

type ChatTurn = { role: 'user' | 'model'; parts: string[] };
type GroqMessage = { role: 'system' | 'user' | 'assistant'; content: string };

// Simulated fallback response, reused when no API key or when the real call fails.
const getSimulatedResponse = async (prompt: string, chatHistory: ChatTurn[]): Promise<string> => {
  await new Promise((resolve) => setTimeout(resolve, 1000));
  const userText = prompt || chatHistory.filter((m) => m.role === 'user').slice(-1)[0]?.parts[0] || '';
  const promptLower = userText.toLowerCase();
  const lang = useLanguageStore.getState().language;

  if (lang === 'en') {
    if (promptLower.includes('price') || promptLower.includes('cost') || promptLower.includes('how much')) {
      return 'The AuraRing X is officially priced at 9,990,000 VND. If you order today, you will receive a free Sizing Kit sent to your home. Just click Add to Cart to secure this offer!';
    }
    if (promptLower.includes('battery') || promptLower.includes('pin') || promptLower.includes('charge')) {
      return 'The AuraRing X battery lasts up to 7 days on a single charge and charges fully in just 60 minutes. You can track your health all week without interruption!';
    }
    if (promptLower.includes('water') || promptLower.includes('swim') || promptLower.includes('resistant')) {
      return 'It is water-resistant up to 50 meters, so you can wear it swimming, in the shower, or during workouts without any worries!';
    }
    if (promptLower.includes('size') || promptLower.includes('fit')) {
      return 'We offer sizes from 6 to 9. We will ship a free Sizing Kit to your home first, so you can try it on and choose the perfect fit before we ship your ring!';
    }
    return 'Hello! I am Aura Assistant. I would be happy to help you with the AuraRing X features, battery, or configuration. What information can I help you with today?';
  }

  // Vietnamese fallback
  if (promptLower.includes('giá') || promptLower.includes('price') || promptLower.includes('bao nhiêu')) {
    return 'Dạ AuraRing X hiện tại có giá bán chính thức là 9.990.000 ₫ ạ. Khi anh chị đặt mua hôm nay sẽ được tặng kèm bộ Sizing Kit đo size tay miễn phí tận nhà, mình nhấn Add to Cart để giữ ưu đãi liền nhé.';
  }
  if (promptLower.includes('pin') || promptLower.includes('battery')) {
    return 'Dạ nhẫn AuraRing X sở hữu thời lượng pin rất bền bỉ lên đến 7 ngày và sạc đầy siêu tốc chỉ trong 60 phút thôi ạ. Anh chị có thể yên tâm đeo theo dõi sức khỏe cả tuần dài mà không lo gián đoạn đâu ạ.';
  }
  if (promptLower.includes('chống nước') || promptLower.includes('water')) {
    return 'Dạ siêu phẩm này đạt chuẩn chống nước chuyên sâu lên đến 50m lặn biển thoải mái ạ. Mình cứ an tâm đeo nhẫn khi đi tắm, bơi lội hay vận động thể thao mà không cần tháo ra đâu ạ.';
  }
  if (promptLower.includes('size') || promptLower.includes('kích thước')) {
    return 'Dạ bên em có sẵn các size từ 6 đến 9 phù hợp cho mọi cỡ tay ạ. Anh chị cứ yên tâm chọn mua, bên em sẽ gửi một bộ Sizing Kit mẫu đến tận nhà để mình đeo thử và chọn được size chuẩn xác nhất hoàn toàn miễn phí ạ.';
  }
  
  return 'Dạ em chào anh chị ạ. Trợ lý Aura Assistant rất vinh hạnh được tư vấn cho mình về siêu phẩm nhẫn thông minh Titanium AuraRing X, anh chị cần em hỗ trợ thông tin gì để chuẩn bị đặt hàng ạ?';
};

// Converts our { role: 'user'|'model', parts: string[] } shape into
// Groq/OpenAI's { role: 'user'|'assistant', content: string } shape.
const toGroqMessages = (prompt: string, chatHistory: ChatTurn[], lang: 'en' | 'vi'): GroqMessage[] => {
  let historySlice = chatHistory;
  let messageToSend = prompt;

  if (!messageToSend && chatHistory.length > 0) {
    const last = chatHistory[chatHistory.length - 1];
    if (last.role === 'user') {
      historySlice = chatHistory.slice(0, -1);
      messageToSend = last.parts[0];
    }
  }

  const historyMessages: GroqMessage[] = historySlice.map((entry) => ({
    role: entry.role === 'model' ? 'assistant' : 'user',
    content: entry.parts.join('\n'),
  }));

  return [
    { role: 'system', content: getSystemInstruction(lang) },
    ...historyMessages,
    { role: 'user', content: messageToSend },
  ];
};

const isRetryableStatus = (status: number) => status === 429 || status === 503;
const sleep = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

export const askGemini = async (prompt: string, chatHistory: ChatTurn[] = []): Promise<string> => {
  if (!API_KEY) {
    return getSimulatedResponse(prompt, chatHistory);
  }

  const lang = useLanguageStore.getState().language;
  const messages = toGroqMessages(prompt, chatHistory, lang);
  const MAX_RETRIES = 3;
  let lastError: unknown;

  for (let attempt = 0; attempt <= MAX_RETRIES; attempt++) {
    try {
      const response = await fetch(GROQ_API_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${API_KEY}`,
        },
        body: JSON.stringify({
          model: GROQ_MODEL,
          messages,
          max_tokens: 200,
        }),
      });

      if (!response.ok) {
        if (isRetryableStatus(response.status) && attempt < MAX_RETRIES) {
          await sleep(1000 * Math.pow(2, attempt));
          continue;
        }
        throw new Error(`Groq API error: ${response.status} ${response.statusText}`);
      }

      const data = await response.json();
      return data.choices?.[0]?.message?.content ?? '';
    } catch (error) {
      lastError = error;
      console.error(`Error calling Groq API (attempt ${attempt + 1}/${MAX_RETRIES + 1}):`, error);
      if (attempt >= MAX_RETRIES) break;
      await sleep(1000 * Math.pow(2, attempt));
    }
  }

  console.error('Groq API failed after retries, falling back to simulated response:', lastError);
  return getSimulatedResponse(prompt, chatHistory);
};