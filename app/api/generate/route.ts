import { GoogleGenAI, Type } from '@google/genai';
import { NextRequest, NextResponse } from 'next/server';

export const maxDuration = 60;

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { model, contents, config } = body;

    const userKey = request.headers.get('x-api-key');
    const apiKey = userKey || process.env.GEMINI_API_KEY || '';

    if (!apiKey) {
      return NextResponse.json(
        { error: 'No API key configured. Please provide your Gemini API key.' },
        { status: 401 }
      );
    }

    const ai = new GoogleGenAI({ apiKey });

    const processedConfig = config ? reconstructConfig(config) : undefined;

    const response = await ai.models.generateContent({
      model,
      contents,
      config: processedConfig,
    });

    if (response.candidates?.[0]?.content?.parts) {
      const parts = response.candidates[0].content.parts;
      const hasImageParts = parts.some((p: any) => p.inlineData);

      if (hasImageParts) {
        return NextResponse.json({
          text: response.text || '',
          candidates: response.candidates,
        });
      }
    }

    return NextResponse.json({
      text: response.text || '',
    });
  } catch (error: any) {
    console.error('API Generate Error:', error);

    const status = error.status || error.code || 500;
    const errorBody: any = {
      error: error.message || 'Internal server error',
      status: typeof status === 'number' ? status : 500,
    };

    if (error.error) {
      errorBody.error_details = {
        code: error.error.code,
        status: error.error.status,
        message: error.error.message,
      };
    }

    return NextResponse.json(errorBody, {
      status: typeof status === 'number' && status >= 400 && status < 600 ? status : 500,
    });
  }
}

function reconstructConfig(config: any): any {
  if (!config) return config;

  const processed = { ...config };

  if (processed.responseSchema) {
    processed.responseSchema = reconstructSchema(processed.responseSchema);
  }

  return processed;
}

function reconstructSchema(schema: any): any {
  if (!schema) return schema;

  const processed = { ...schema };

  if (processed.type) {
    const typeMap: Record<string, any> = {
      OBJECT: Type.OBJECT,
      ARRAY: Type.ARRAY,
      STRING: Type.STRING,
      NUMBER: Type.NUMBER,
      BOOLEAN: Type.BOOLEAN,
      INTEGER: Type.INTEGER,
    };
    processed.type = typeMap[processed.type] || processed.type;
  }

  if (processed.properties) {
    const newProps: any = {};
    for (const [key, value] of Object.entries(processed.properties)) {
      newProps[key] = reconstructSchema(value);
    }
    processed.properties = newProps;
  }

  if (processed.items) {
    processed.items = reconstructSchema(processed.items);
  }

  return processed;
}

