import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, FlatList, StyleSheet, SafeAreaView, KeyboardAvoidingView, Platform } from 'react-native';
import useFoodChatService from '../services/food.js'; // Adjust the import based on your project structure

const ChatMessage = ({ message, isUser }) => (
  <View style={[styles.messageContainer, isUser ? styles.userMessage : styles.botMessage]}>
    <Text style={styles.messageText}>{message}</Text>
  </View>
);

const FoodAIScreen = () => {
  const { sendMessageToFoodChat } = useFoodChatService();
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSend = async () => {
    if (input.trim()) {
      const newMessages = [...messages, { text: input, isUser: true }];
      setMessages(newMessages);
      setInput('');
      setLoading(true);

      try {
        const response = await sendMessageToFoodChat(input);
        setMessages([...newMessages, { text: response.response, isUser: false }]);
      } catch (error) {
        console.error('Error sending message to food chat:', error);
      } finally {
        setLoading(false);
      }
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'} style={styles.keyboardAvoidingView}>
        <FlatList
          data={messages}
          renderItem={({ item }) => <ChatMessage message={item.text} isUser={item.isUser} />}
          keyExtractor={(item, index) => index.toString()}
          style={styles.chatList}
          contentContainerStyle={styles.chatListContent}
        />
        <View style={styles.inputContainer}>
          <TextInput
            style={styles.input}
            placeholder="Type a message..."
            value={input}
            onChangeText={setInput}
            onSubmitEditing={handleSend}
            editable={!loading}
          />
          <TouchableOpacity onPress={handleSend} style={styles.sendButton} disabled={loading}>
            <Text style={styles.sendButtonText}>{loading ? 'Sending...' : 'Send'}</Text>
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  keyboardAvoidingView: {
    flex: 1,
  },
  chatList: {
    flex: 1,
    paddingHorizontal: 10,
  },
  chatListContent: {
    paddingVertical: 10,
  },
  messageContainer: {
    borderRadius: 20,
    padding: 10,
    marginVertical: 5,
    maxWidth: '80%',
  },
  userMessage: {
    alignSelf: 'flex-end',
    backgroundColor: '#DCF8C6',
  },
  botMessage: {
    alignSelf: 'flex-start',
    backgroundColor: '#E6E6E6',
  },
  messageText: {
    fontSize: 16,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
    borderTopWidth: 1,
    borderTopColor: '#E6E6E6',
  },
  input: {
    flex: 1,
    borderWidth: 1,
    borderColor: '#E6E6E6',
    borderRadius: 20,
    padding: 10,
    marginRight: 10,
    fontSize: 16,
  },
  sendButton: {
    backgroundColor: '#007AFF',
    borderRadius: 20,
    paddingVertical: 10,
    paddingHorizontal: 20,
  },
  sendButtonText: {
    color: '#fff',
    fontSize: 16,
  },
});

export default FoodAIScreen;
