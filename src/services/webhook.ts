interface WebhookPayload {
  event: 'pre_order' | 'newsletter' | 'wishlist_toggle';
  email?: string;
  name?: string;
  details?: string;
  timestamp: string;
}

export const sendWebhookNotification = async (payload: WebhookPayload): Promise<boolean> => {
  // Read Telegram / Discord webhook configurations from env or fallback to console log
  const telegramBotToken = import.meta.env.VITE_TELEGRAM_BOT_TOKEN;
  const telegramChatId = import.meta.env.VITE_TELEGRAM_CHAT_ID;
  const discordWebhookUrl = import.meta.env.VITE_DISCORD_WEBHOOK_URL;

  const textMessage = `🔔 *AuraRing X Alert*
• Event: \`${payload.event}\`
• Name: ${payload.name || 'N/A'}
• Email: ${payload.email || 'N/A'}
• Details: ${payload.details || 'N/A'}
• Time: ${payload.timestamp}`;

  console.log('Sending Webhook Notification:', payload);

  let success = false;

  // Send to Telegram if configured
  if (telegramBotToken && telegramChatId) {
    try {
      const response = await fetch(`https://api.telegram.org/bot${telegramBotToken}/sendMessage`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          chat_id: telegramChatId,
          text: textMessage,
          parse_mode: 'Markdown',
        }),
      });
      if (response.ok) success = true;
    } catch (e) {
      console.error('Failed to dispatch Telegram Webhook', e);
    }
  }

  // Send to Discord if configured
  if (discordWebhookUrl) {
    try {
      const response = await fetch(discordWebhookUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          content: `🔔 **AuraRing X Alert**\n- Event: \`${payload.event}\`\n- Name: ${payload.name || 'N/A'}\n- Email: ${payload.email || 'N/A'}\n- Details: ${payload.details || 'N/A'}\n- Time: ${payload.timestamp}`,
        }),
      });
      if (response.ok) success = true;
    } catch (e) {
      console.error('Failed to dispatch Discord Webhook', e);
    }
  }

  // Default true if simulation
  return success || (!telegramBotToken && !discordWebhookUrl);
};
