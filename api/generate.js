export default async function handler(req, res) {
  const { text } = req.body;

  const prompt = `
以下の文章から、小さな前進や気づきをやさしく言語化してください。
褒めすぎない。断定しない。やさしい口語。

入力:
${text}
`;

  const response = await fetch("https://api.openai.com/v1/responses", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Authorization": "Bearer " + process.env.OPENAI_API_KEY
    },
    body: JSON.stringify({
      model: "gpt-5-mini",
      input: prompt
    })
  });

  const data = await response.json();

  res.status(200).json({
    result: data.output[0].content[0].text
  });
}