require('dotenv').config({ path: '.env.local' });

async function test() {
  try {
    const res = await fetch('http://localhost:3000/api/generate', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 'x-api-key': process.env.NEXT_PUBLIC_GEMINI_API_KEY || '' },
      body: JSON.stringify({
        model: 'gemini-3.0-flash',
        contents: { parts: [{ text: 'say hi' }] },
        config: {}
      })
    });
    
    console.log(res.status);
    console.log(await res.text());
  } catch(e) {
    console.error(e);
  }
}

test();
