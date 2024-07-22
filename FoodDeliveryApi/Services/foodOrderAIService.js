import OpenAI from 'openai';
import { getOrdersByUserId, getAllMenus } from './FoodService.js';
import dotenv from 'dotenv';

dotenv.config(); // This will load the environment variables from a .env file into process.env

const openAI = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

async function getFoodOrderAI(context, userId) {
  const initialContext = [
    {
      role: 'system',
      content: 'You are a food order assistant helping users with their food orders and menus. User ID will always be provided as user_id. Return the currencies in Mauritian Rupees (Rs).'
    },
    {
      role: 'user',
      content: `User ID: ${userId}`
    },
    ...context
  ];

  const response = await callOpenAIWithTools(initialContext, userId);
  return response;
}

async function callOpenAIWithTools(context, userId) {
  const response = await openAI.chat.completions.create({
    model: 'gpt-4',
    messages: context,
    functions: [
      {
        name: 'getOrdersByUserId',
        description: 'Fetch orders by user ID',
        parameters: {
          type: 'object',
          properties: {
            userId: { type: 'string', description: 'User ID' }
          },
          required: ['userId']
        }
      },
      {
        name: 'getAllMenus',
        description: 'Fetch all available menus',
        parameters: {}
      }
    ]
  });

  const willInvokeFunction = response.choices[0].finish_reason === 'function_call';
  const functionCall = response.choices[0].message.function_call;

  if (willInvokeFunction && functionCall) {
    const { name, arguments: rawArguments } = functionCall;
    const parsedArguments = JSON.parse(rawArguments);

    if (name === 'getOrdersByUserId') {
      const orders = await getOrdersByUserId(parsedArguments.userId);
      const toolResponse = `Here are your orders:\n${JSON.stringify(orders, null, 2)}`;

      context.push(response.choices[0].message);
      context.push({
        role: 'function',
        name: 'getOrdersByUserId',
        content: toolResponse
      });

    } else if (name === 'getAllMenus') {
      const menus = await getAllMenus();
      const toolResponse = `Here are all available menus:\n${JSON.stringify(menus, null, 2)}`;

      context.push(response.choices[0].message);
      context.push({
        role: 'function',
        name: 'getAllMenus',
        content: toolResponse
      });
    }
  }

  const secondResponse = await openAI.chat.completions.create({
    model: 'gpt-4',
    messages: context
  });

  return secondResponse.choices[0].message;
}

export {
  getFoodOrderAI
};
