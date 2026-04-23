const fs = require('fs');
const { GoogleGenAI } = require('@google/genai');

async function test() {
  try {
    const env = fs.readFileSync('.env.local', 'utf8');
    const key = env.split('GEMINI_API_KEY=')[1].split('\n')[0].trim();
    const ai = new GoogleGenAI({ apiKey: key });
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: 'say hi'
    });
    console.log("Success:", response.text);
  } catch (e) {
    console.error("Error:", e.message);
  }
}

test();
