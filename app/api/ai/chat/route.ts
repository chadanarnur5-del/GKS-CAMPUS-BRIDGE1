import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
  try {
    const { prompt, userContext, mode } = await req.json();

    if (!prompt) {
      return NextResponse.json({ error: 'Prompt is required' }, { status: 400 });
    }

    const apiKey = process.env.AI_API_KEY;

    // В продакшн режиме с настроенным ключом вызываем LLM API.
    // Если ключ еще не задан, возвращаем структурированный ответ с маркировкой источника.
    if (!apiKey) {
      return NextResponse.json({
        answer: `[DEMO MODE] Regarding "${prompt}" for ${userContext?.universityName || 'your university'}: Please consult the official GKS guide or your international office for verified procedures.`,
        sourceType: 'ai_generated',
        steps: [
          'Step 1: Check official notice on your university portal.',
          'Step 2: Visit the Global Korea Scholarship official website (studyinkorea.go.kr).',
          'Step 3: Prepare relevant identity documents before applying.'
        ],
        warning: 'Always confirm exact deadlines with your GKS coordinator.'
      });
    }

    // Пример вызова внешней нейросети (Gemini / OpenAI API)
    const systemPrompt = `You are GKS Campus Bridge AI Assistant. Mode: ${mode}. User context: University=${userContext?.universityName}, Major=${userContext?.major}, Korean Level=${userContext?.koreanLevel}. Provide clear, actionable advice with required steps and official warnings.`;

    const response = await fetch('https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=' + apiKey, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        contents: [
          { role: 'user', parts: [{ text: `${systemPrompt}\n\nUser Question: ${prompt}` }] }
        ]
      })
    });

    const data = await response.json();
    const replyText = data.candidates?.[0]?.content?.parts?.[0]?.text || 'No response generated.';

    return NextResponse.json({
      answer: replyText,
      sourceType: 'ai_generated'
    });

  } catch (error) {
    return NextResponse.json({ error: 'Failed to process AI request' }, { status: 500 });
  }
}
