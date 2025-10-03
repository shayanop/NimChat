import express from 'express';
import cors from 'cors';
import { OpenAI } from 'openai';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

// Load API key from env
const apiKey = process.env.NVIDIA_API_KEY;

if (!apiKey) {
  console.error('Missing NVIDIA_API_KEY. Set it in your environment or a .env file.');
  process.exit(1);
}

const client = new OpenAI({
  baseURL: "https://integrate.api.nvidia.com/v1",
  apiKey: apiKey
});

app.get('/', (_req, res) => {
  res.type('text/plain').send('NIM server is running');
});

app.get('/health', (_req, res) => {
  res.json({ status: 'ok' });
});

app.post('/api/chat', async (req, res) => {
  try {
    const { messages } = req.body;
    console.log('Received messages:', JSON.stringify(messages, null, 2));
    console.log('Using API key from env');
    
    const completion = await client.chat.completions.create({
      model: "meta/llama-3.1-8b-instruct",
      messages,
      temperature: 0.6,
      top_p: 0.7,
      max_tokens: 1024,
    });
    
    console.log('API Response:', JSON.stringify(completion, null, 2));
    res.json(completion);
  } catch (error) {
    console.error('API Error:', error);
    console.error('Error details:', error.message);

    if (error.status) {
      return res.status(error.status).json({ error: error.message || 'Upstream error' });
    }

    if (error.message.includes('401') || error.message.includes('unauthorized')) {
      return res.status(401).json({ 
        error: 'Invalid API key. Please check NVIDIA_API_KEY.',
      });
    }

    if (error.message.includes('Connection error') || error.message.includes('fetch failed')) {
      return res.status(503).json({ 
        error: 'Unable to connect to NVIDIA API.',
      });
    }

    res.status(500).json({ error: error.message });
  }
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});