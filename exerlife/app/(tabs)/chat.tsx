import { useState } from 'react';
import { KeyboardAvoidingView, Platform, Pressable, StyleSheet, TextInput, View } from 'react-native';

import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { Colors } from '@/constants/theme';

type Role = 'user' | 'assistant';
type Message = {
  id: string;
  role: Role;
  text: string;
  timestamp: string;
};

const FITNESS_SAFE_TOPICS = [
  'treino',
  'exercício',
  'alimentação',
  'hidratação',
  'sono',
  'recuperação',
] as const;

export default function ChatScreen() {
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState<Message[]>(() => demoHistory);
  const [isSending, setIsSending] = useState(false);

  const canSend = input.trim().length > 0 && !isSending;

  const sendMessage = async () => {
    if (!canSend) return;

    const text = input.trim();
    setInput('');

    const userMessage: Message = {
      id: `${Date.now()}-user`,
      role: 'user',
      text,
      timestamp: new Date().toISOString(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setIsSending(true);

    // Middleware de segurança: filtra temas fora do domínio
    const normalized = text.toLowerCase();
    const isFitnessTopic = FITNESS_SAFE_TOPICS.some((topic) => normalized.includes(topic));

    const assistantResponse: Message = {
      id: `${Date.now()}-assistant`,
      role: 'assistant',
      timestamp: new Date().toISOString(),
      text: isFitnessTopic
        ? buildAssistantReply(text)
        : 'Desculpe, só posso ajudar com exercícios, hidratação e alimentação. Peça orientações sobre treinos ou hábitos saudáveis.',
    };

    setMessages((prev) => [...prev, assistantResponse]);
    setIsSending(false);
  };

  return (
    <KeyboardAvoidingView
      style={styles.flex}
      behavior={Platform.select({ ios: 'padding', android: undefined })}>
      <ThemedView style={styles.container}>
        <View>
          <ThemedText type="title">Chat ExerLife IA</ThemedText>
          <ThemedText style={styles.subtitle}>
            IA especializada em condicionamento físico. Mensagens resumidas para melhor UX mobile.
          </ThemedText>
        </View>

        <View style={styles.messages}>
          {messages.map((message) => (
            <View
              key={message.id}
              style={[
                styles.bubble,
                message.role === 'assistant' ? styles.bubbleAssistant : styles.bubbleUser,
              ]}>
              <ThemedText style={styles.bubbleText}>{message.text}</ThemedText>
              <ThemedText style={styles.bubbleTimestamp}>
                {new Date(message.timestamp).toLocaleTimeString().slice(0, 5)}
              </ThemedText>
            </View>
          ))}
        </View>

        <View style={styles.inputRow}>
          <TextInput
            value={input}
            onChangeText={setInput}
            placeholder="Pergunte sobre seu treino, hidratação ou alimentação"
            style={styles.input}
            multiline
            maxLength={480}
          />
          <Pressable
            disabled={!canSend}
            onPress={sendMessage}
            style={[styles.sendButton, !canSend && styles.sendButtonDisabled]}>
            <ThemedText style={styles.sendButtonText}>{isSending ? '...' : 'Enviar'}</ThemedText>
          </Pressable>
        </View>
        <ThemedText style={styles.disclaimer}>
          A IA não substitui profissionais de saúde. Consulte um especialista para suporte clínico.
        </ThemedText>
      </ThemedView>
    </KeyboardAvoidingView>
  );
}

const demoHistory: Message[] = [
  {
    id: 'assistant-1',
    role: 'assistant',
    timestamp: new Date().toISOString(),
    text: buildAssistantReply(
      'Quero uma sugestão de treino de superiores para hipertrofia, tenho 50 minutos livres.',
    ),
  },
];

function buildAssistantReply(question: string) {
  return [
    '📋 **Treino Sugerido (50 min)**',
    '• Aquecimento: 5 min de elíptico leve',
    '• Supino reto: 4x8 com carga progressiva (+10 pontos)',
    '• Remada curvada: 3x10 (descanso 75s)',
    '• Desenvolvimento com halteres: 3x12',
    '• Core: prancha 3x45s',
    '',
    '💧 Lembrete: registre 250 ml de água ao final.',
    '',
    '🪪 Ações: [Adicionar ao treino] [Marcar como concluído]',
    '',
    '⚠️ Consulte seu treinador para ajustes se sentir desconforto.',
  ].join('\n');
}

const styles = StyleSheet.create({
  flex: {
    flex: 1,
  },
  container: {
    flex: 1,
    padding: 24,
    backgroundColor: Colors.light.background,
    gap: 16,
  },
  subtitle: {
    color: '#475569',
    marginTop: 4,
  },
  messages: {
    flex: 1,
    gap: 12,
  },
  bubble: {
    padding: 16,
    borderRadius: 16,
    maxWidth: '85%',
  },
  bubbleAssistant: {
    backgroundColor: '#EEF2FF',
    alignSelf: 'flex-start',
  },
  bubbleUser: {
    backgroundColor: '#0057D9',
    alignSelf: 'flex-end',
  },
  bubbleText: {
    color: '#0F172A',
  },
  bubbleTimestamp: {
    fontSize: 11,
    marginTop: 8,
    textAlign: 'right',
    color: '#64748B',
  },
  inputRow: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    gap: 12,
  },
  input: {
    flex: 1,
    minHeight: 48,
    maxHeight: 120,
    borderRadius: 16,
    padding: 12,
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#E2E8F0',
    textAlignVertical: 'top',
  },
  sendButton: {
    backgroundColor: '#0057D9',
    paddingHorizontal: 18,
    paddingVertical: 14,
    borderRadius: 14,
  },
  sendButtonDisabled: {
    backgroundColor: '#94A3B8',
  },
  sendButtonText: {
    color: '#fff',
    fontWeight: '700',
  },
  disclaimer: {
    fontSize: 12,
    color: '#64748B',
    textAlign: 'center',
  },
});
