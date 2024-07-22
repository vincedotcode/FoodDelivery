import { getFoodOrderAI } from "../Services/foodOrderAIService.js";

const foodOrderAiController = async (req, res) => {
  try {
    let context = [
      {
        role: 'system',
        content: 'You are a food order assistant helping users with their food orders and menus. Return the currencies in Mauritian Rupees (Rs).'
      }
    ];

    const userMessage = req.body.message;
    const userId = req.body.userId;
    context.push({
      role: 'user',
      content: userMessage
    });

    let aiResponse = await getFoodOrderAI(context, userId);
    context.push(aiResponse);

    // Keep interacting until a final answer is provided
    while (true) {
      const userNextMessage = req.body.message;
      context.push({
        role: 'user',
        content: userNextMessage
      });

      aiResponse = await getFoodOrderAI(context, userId);
      context.push(aiResponse);

      if (aiResponse.finish_reason !== 'function_call') {
        break;
      }
    }

    res.json({ response: aiResponse.content });
  } catch (error) {
    res.status(500).json({ error: error.message || 'An error occurred during the chat interaction.' });
  }
};

export {
  foodOrderAiController
};
