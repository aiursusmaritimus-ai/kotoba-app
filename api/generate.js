export default async function handler(req, res) {
  try {
    const { text } = req.body;

    const response = await fetch("https://api.openai.com/v1/responses", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${process.env.OPENAI_API_KEY}`
      },
      body: JSON.stringify({
        model: "gpt-4.1-mini",
        input: `やさしく言い換えてください: ${text}`
      })
    });

    const data = await response.json();

    console.log("API response:", data);

    if (!response.ok) {
      return res.status(500).json({ error: data });
    }

    const result =
      data.output?.[0]?.content?.[0]?.text || "うまく生成できませんでした";

    res.status(200).json({ result });

  } catch (e) {
    res.status(500).json({ error: e.message });
  }
}
