require('dotenv').config()

const { Configuration, OpenAIApi } = require("openai");

const configuration = new Configuration({
    organization: "org-fPJueoeWvKMWWGvFBILDuk6e",
    apiKey: process.env.OPENAI_API_KEY,
});

const openai = new OpenAIApi(configuration);

export const getOpenAIResponse = async (req, res) => {
  const text = req.query.text;
  const gptResponse = await openai.createCompletion({
    model: "text-davinci-003",
    prompt: `Extract source, source airport code, destination, destination airport code, departure and arrival from this text: Text: ${text}`,
    temperature: 0,
    max_tokens: 60,
    top_p: 1,
    frequency_penalty: 0,
    presence_penalty: 0,
    // stop: ["\n"],
    
  });
  return gptResponse.data;
}
