import { NextResponse } from 'next/server';

export async function POST(req: Request) {
    try {
        const { messages, cvData } = await req.json();

        if (!messages || !Array.isArray(messages)) {
            return NextResponse.json({ error: 'Messages are required' }, { status: 400 });
        }

        const systemInstruction = `You are "CV Buddy", an expert AI assistant that helps users build their CVs and optimize them for ATS (Applicant Tracking Systems). 
Here is the user's current CV context:
${JSON.stringify(cvData, null, 2)}

Your task is to answer their questions based on this data. If they ask about their CV, give specific, actionable advice. If they ask for general tips, provide them. If relevant, suggest specific keywords or action verbs they should use based on their target job title. Be encouraging and professional. Keep your answers concise, clear, and well-formatted. Do not use overly complex markdown, simple paragraphs are fine.`;

        // Map messages specifically for the REST API
        const geminiMessages = messages.map((msg: any) => ({
            role: msg.role === 'assistant' ? 'model' : 'user',
            parts: [{ text: msg.content }]
        }));

        const response = await fetch("https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=AIzaSyDS1jsZju2LvEsztvC7MO0fvplG8SipuDA", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                systemInstruction: {
                    parts: [{ text: systemInstruction }]
                },
                contents: geminiMessages
            })
        });

        if (!response.ok) {
            const errorData = await response.text();
            console.error("Gemini API Error:", errorData);
            return NextResponse.json({ error: "Failed to connect to the Gemini API" }, { status: 500 });
        }

        const data = await response.json();
        const resultText = data.candidates?.[0]?.content?.parts?.[0]?.text || "Sorry, I couldn't generate a response.";

        return NextResponse.json({ result: resultText });
    } catch (error) {
        console.error('Error in chat route:', error);
        return NextResponse.json({ error: 'Failed to generate response' }, { status: 500 });
    }
}
