import axios from 'axios';
import React, { useEffect, useRef, useState } from 'react';
import {
  GoogleGenerativeAI,
  HarmCategory,
  HarmBlockThreshold,
} from '@google/generative-ai';
import headingIcon from '../../../assets/images/website/headingIcon.svg';
import {
  Box,
  Button,
  Container,
  Heading,
  Image,
  Input,
  Stack,
  Text,
} from '@chakra-ui/react';

const Chatbot = ({ name }) => {
  const geminiApiKey = 'AIzaSyD1bEEfXEOBmwPZeXVkurvAoz5s5flveiI';
  const apiKey = geminiApiKey;
  const genAI = new GoogleGenerativeAI(apiKey);
  const model = genAI.getGenerativeModel({
    model: 'gemini-1.5-flash',
    systemInstruction:
      'You are a hospital representative. Only provide information related to medical services and appointments. Emphasize booking an appointment with our hospital. Avoid placeholders for contact details, as they are displayed above. Do not answer non-medical questions. Keep responses under 4 sentences.',
  });
  const generationConfig = {
    temperature: 1,
    topP: 0.95,
    topK: 64,
    maxOutputTokens: 8192,
    responseMimeType: 'text/plain',
  };
  const [chatInput, setChatInput] = useState('');
  const [chatResponse, setChatResponse] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [messages, setMessages] = useState([
    {
      message: " Hello, I'm an AI assistant! Ask me anything!",
      sender: 'System',
    },
  ]);

  async function run() {
    const chatHistory = messages.slice(1).map(msg => ({
      role: msg.sender === 'User' ? 'user' : 'model',
      parts: [{ text: msg.message }],
    }));

    //TODO Chat history not working will do it tommorrow

    try {
      const chatSession = model.startChat({
        generationConfig,
        history: chatHistory,
        // safetySettings: Adjust safety settings
        // See https://ai.google.dev/gemini-api/docs/safety-settings
      });

      const result = await chatSession.sendMessage(chatInput);
      console.log('API Response:', result); // Log the entire response for debugging

      // Check for both response formats
      let responseText = '';

      if (result.response && result.response.text) {
        responseText = result.response.text();
      } else if (result.candidates && result.candidates.length > 0) {
        const responseParts = result.candidates[0].content.parts;
        responseText = responseParts.map(part => part.text).join(' ');
      } else {
        console.error('Invalid response format from the AI model');
      }

      if (responseText) {
        setMessages(prevMessages => [
          ...prevMessages,
          { message: responseText, sender: 'System' },
        ]);
      }
    } catch (error) {
      console.error('Error during the chat session:', error);
    } finally {
      setIsTyping(false);
      setChatInput('');
    }
  }

  const handleSubmit = async event => {
    event.preventDefault();
    if (chatInput) {
      setIsTyping(true);
      setMessages(prevMessages => [
        ...prevMessages,
        { message: chatInput, sender: 'User' },
      ]);
      await run();
    }
  };

  const sendMessage = async message => {
    const newMessage = {
      message,
      direction: 'outgoing',
      sender: 'user',
    };

    setMessages(prevMessages => [...prevMessages, newMessage]);
    setIsTyping(true);
    try {
      const apiUrl = 'https://api.openai.com/v1/chat/completions'; // Update with the correct API endpoint
      const apiKey = 'YOUR_OPENAI_API_KEY'; // Replace with your actual API key
      const headers = {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${apiKey}`,
      };

      const requestBody = {
        model: 'gpt-3.5-turbo',
        messages: [{ role: 'user', content: chatInput }],
      };

      const { data } = await axios.post(apiUrl, requestBody, { headers });

      setChatResponse(data.choices[0].message.content);
    } catch (error) {
      console.error('Error sending message:', error);
    }
  };

  const messageAreaRef = useRef(null);

  useEffect(() => {
    if (messageAreaRef.current) {
      messageAreaRef.current.scrollTop = messageAreaRef.current.scrollHeight;
    }
  }, [messages]);

  return (
    <Stack
      border={name === 'WebLayout' ? 'none' : '2px solid #208C74'}
      flex={1}
      my={name === 'WebLayout' ? '0' : '40px'}
      textAlign={'center'}
      width={name === 'WebLayout' ? '100%' : '80%'}
      padding={'10px'}
      borderRadius={'10px'}
      className="ChatBot"
    >
      <Heading
        mb="15px"
        display={'flex'}
        alignItems={'center'}
        justifyContent={'center'}
        color={'primaryGreen.200'}
        as={'h6'}
        fontWeight={'600'}
      >
        <Image src={headingIcon} />
        <Text ml="10px" fontSize={'16px'} textTransform={'uppercase'} as="span">
          Chat Bot
        </Text>
      </Heading>
      {!name && (
        <Heading
          fontSize={'38px'}
          fontWeight={'600'}
          color={'primaryBlack.100'}
          mb="35px"
        >
          Ask Anything
        </Heading>
      )}
      <Stack
        className="messageArea"
        height={name === 'WebLayout' ? '350px' : '450px'}
        overflowY={'auto'}
        ref={messageAreaRef}
      >
        {messages.map((message, index) => (
          <Box
            width={message.sender === 'System' ? '65%' : '100%'}
            display={'flex'}
            justifyContent={
              message.sender === 'System' ? 'flex-start' : 'flex-end'
            }
          >
            <Stack
              key={index}
              direction={'row'}
              alignItems={'center'}
              mb="10px"
              style={{
                maxWidth: 'fit-content',
                backgroundColor:
                  message.direction === 'incoming' ? 'white' : '#f5f5f5',
                borderRadius: '10px',
                padding: '10px',
              }}
            >
              <Text
                fontSize={{ base: '14px', md: '16px' }}
                fontWeight={message.sender === 'user' ? '500' : '400'}
                color={
                  message.sender === 'user'
                    ? 'primaryBlack.100'
                    : 'primaryGreen.200'
                }
                mr="10px"
              >
                {message.message}
              </Text>
            </Stack>
          </Box>
        ))}
      </Stack>
      <Stack
        spacing={0}
        direction={'row'}
        flexWrap={'wrap'}
        justifyContent={'space-between'}
      >
        <form
          onSubmit={handleSubmit}
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            width: '100%',
            height: '100%',
            borderRadius: '10px',
            gap: '20px',
            padding: '10px',
          }}
        >
          <Input
            type="text"
            isDisabled={isTyping}
            onChange={e => setChatInput(e.target.value)}
            value={isTyping ? 'Typing...' : chatInput}
            placeholder={isTyping ? 'Typing...' : 'Enter your message here'}
          />
          <Button type="submit" isDisabled={isTyping}>
            <svg
              version="1.1"
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="20"
              viewBox="0 0 500 500"
            >
              <g>
                <g>
                  <polygon points="0,497.25 535.5,267.75 0,38.25 0,216.75 382.5,267.75 0,318.75" />
                </g>
              </g>
            </svg>
          </Button>
        </form>
      </Stack>
    </Stack>
  );
};

export default Chatbot;
