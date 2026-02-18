interface Message {
  role: "user" | "assistant"
  content: string
}

interface UIMessage {
  id?: string
  role: "user" | "assistant"
  parts?: Array<{ type: string; text: string }>
  text?: string
}

export async function POST(req: Request) {
  try {
    const { messages } = await req.json()

    // Extract text from the messages
    const formattedMessages = messages.map((msg: any) => ({
      role: msg.role === "user" ? "user" : "model",
      parts: [
        {
          text: msg.parts?.[0]?.text || msg.text || "",
        },
      ],
    }))

    const response = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${process.env.GOOGLE_GEMINI_API_KEY}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          systemInstruction: {
            parts: {
              text: `You are a helpful customer support chatbot for SolarTech, a solar inverter company. Answer questions about solar inverters, products, specifications, warranty, installation, dealers, and technical support. Provide clear, concise answers in 3-4 sentences - direct and helpful without unnecessary details. Be friendly and professional. 

Current Product Range:
- Mark Series: 4.2kW and 6.2kW SP-Hybrid inverters with WiFi, touch display, solar + battery ready
- Nord Series: 8.2kW and 10.2kW SP-Hybrid inverters with WiFi, touch display, solar + battery ready, ideal for larger installations

All models feature MPPT solar charging, AC backup charging, advanced hybrid capability, and 15-year warranty. If unsure about specific details, direct customers to contact page or visit our products page.`,
            },
          },
          contents: formattedMessages,
          generationConfig: {
            temperature: 0.7,
            maxOutputTokens: 250,
          },
        }),
      },
    )

    if (!response.ok) {
      const error = await response.json()
      console.error("[v0] Gemini API error:", error)
      throw new Error(`Gemini API error: ${error.error?.message || "Unknown error"}`)
    }

    const data = await response.json()
    const assistantMessage = data.candidates?.[0]?.content?.parts?.[0]?.text || "I couldn't generate a response."

    // Return response in the expected format
    return new Response(
      JSON.stringify({
        id: Math.random().toString(36).substr(2, 9),
        role: "assistant",
        parts: [{ type: "text", text: assistantMessage }],
      }),
      {
        headers: { "Content-Type": "application/json" },
      },
    )
  } catch (error) {
    console.error("[v0] Chat API error:", error)
    return new Response(
      JSON.stringify({
        error: "Failed to process message. Please check your Google Gemini API key.",
      }),
      { status: 500, headers: { "Content-Type": "application/json" } },
    )
  }
}
