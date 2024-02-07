const { CohereClient } = require("cohere-ai");
const { cohereSecret } = require("../config");

const cohere = new CohereClient({
    token: cohereSecret,
});

const aiCohere = async (query) => {
  const prediction = await cohere.generate({
      prompt: query,
      maxTokens: 10,
  });
  
  return prediction.generations[0].text;
}

module.exports = { 
  aiCohere 
};