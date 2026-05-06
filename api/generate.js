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

    console.log("FULL DATA:", JSON.stringify(data, null, 2));

    // ★ 安全に取り出す
    let result = "うまく生成できませんでした";

    if (data.output && data.output.length > 0) {
      for (const item of data.output) {
        if (item.content) {
          for (const c of item.content) {
            if (c.text) {
              result = c.text;
            }
          }
        }
      }
    }

    res.status(200).json({ result });

  } catch (e) {
    res.status(500).json({ error: e.message });
  }
}
