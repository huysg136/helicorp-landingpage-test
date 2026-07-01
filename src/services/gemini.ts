import { GoogleGenerativeAI } from '@google/generative-ai';

// Initialize Gemini client. 
// Uses API Key from environment or falls back to standard client side API simulation.
const API_KEY = import.meta.env.VITE_GEMINI_API_KEY || '';

const genAI = API_KEY ? new GoogleGenerativeAI(API_KEY) : null;

const SYSTEM_INSTRUCTION = `
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

Always reply politely and concisely. Support multiple languages, but prefer replying in the user's language (e.g. Vietnamese if they ask in Vietnamese). Keep answers under 3 sentences if possible.
IMPORTANT: Do NOT use any markdown formatting (no **bold**, no *italic*, no bullet points with *, no headers). Write in plain text only.
`;

export const askGemini = async (prompt: string, chatHistory: { role: 'user' | 'model'; parts: string[] }[] = []): Promise<string> => {
  if (!genAI) {
    // Simulated delay & response for demo when API key is missing
    await new Promise((resolve) => setTimeout(resolve, 1000));
    // Determine the actual user text: either the explicit prompt or the last
    // user turn appended to chatHistory.
    const userText = prompt || chatHistory.filter((m) => m.role === 'user').slice(-1)[0]?.parts[0] || '';
    const promptLower = userText.toLowerCase();
    if (promptLower.includes('giá') || promptLower.includes('price') || promptLower.includes('bao nhiêu')) {
      return 'AuraRing X hiện tại có giá bán là 9.990.000 ₫ kèm theo bộ Sizing Kit đo size tay miễn phí.';
    }
    if (promptLower.includes('pin') || promptLower.includes('battery')) {
      return 'Nhẫn có thời lượng pin lên đến 7 ngày và sạc đầy chỉ trong 60 phút qua đế sạc nam châm đi kèm.';
    }
    if (promptLower.includes('chống nước') || promptLower.includes('water')) {
      return 'AuraRing X đạt chuẩn chống nước 50m, hoàn toàn an toàn khi đi tắm, bơi lội hoặc lặn biển.';
    }
    if (promptLower.includes('size') || promptLower.includes('kích thước')) {
      return 'Chúng tôi cung cấp các size từ 6 đến 9. Khi đặt mua, bạn sẽ được nhận Sizing Kit trước để đo chính xác nhất.';
    }
    return 'Xin chào! Tôi có thể giúp bạn giải đáp mọi thông tin về tính năng, thời lượng pin, thiết kế Titanium, và mức giá của AuraRing X.';
  }

  try {
    const model = genAI.getGenerativeModel({
      model: 'gemini-2.5-flash',
      // Pass system instruction at the model level so it applies to every turn
      // without polluting the conversation history.
      systemInstruction: SYSTEM_INSTRUCTION,
    });

    // When the caller appends the latest user message to chatHistory (and
    // passes an empty prompt), we pop that last entry to use as the
    // sendMessage payload, while the rest becomes the prior context.
    let historySlice = chatHistory;
    let messageToSend = prompt;

    if (!messageToSend && chatHistory.length > 0) {
      const last = chatHistory[chatHistory.length - 1];
      if (last.role === 'user') {
        historySlice = chatHistory.slice(0, -1); // everything before the latest user turn
        messageToSend = last.parts[0];           // the latest user turn becomes the prompt
      }
    }

    // The Gemini SDK's `Content.parts` type expects `Part[]` (objects like
    // `{ text: string }`), not plain strings. Convert our simpler
    // `parts: string[]` shape into the SDK's expected format here, so
    // callers of `askGemini` can keep passing plain strings.
    const formattedHistory = historySlice.map((entry) => ({
      role: entry.role,
      parts: entry.parts.map((text) => ({ text })),
    }));

    const chat = model.startChat({
      history: formattedHistory,
      generationConfig: {
        maxOutputTokens: 200,
      },
    });

    const result = await chat.sendMessage(messageToSend);
    const response = await result.response;
    return response.text();
  } catch (error) {
    console.error('Error calling Gemini API:', error);
    return 'Xin lỗi, kết nối tới trợ lý AI đang bị gián đoạn. Bạn có thể hỏi lại sau ít phút hoặc xem thêm thông tin chi tiết trên trang web.';
  }
};