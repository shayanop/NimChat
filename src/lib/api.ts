export async function sendMessage(messages: { role: string; content: string }[]) {
  try {
    const baseUrl = (import.meta as any).env?.VITE_BACKEND_URL || "";
    const url = `${baseUrl}/api/chat`;

    const response = await fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ messages }),
    });
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    return await response.json();
  } catch (error: any) {
    console.error('Error sending message:', error);
    return { error: error.message };
  }
}