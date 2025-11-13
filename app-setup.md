## Prompt Sugerido para Cursor – ExerLife

Crie o projeto **ExerLife** (app mobile com gamificação). Trabalhe em **português (Brasil)** e gere os artefatos abaixo com foco em segurança, escalabilidade e UX mobile-first.

### 1. Contexto do Produto
- Nome: ExerLife
- Propósito: monitorar treinos, hidratação, alimentação e oferecer coaching via chat de IA restrito a fitness.
- Público-alvo: praticantes de exercício, atletas, pessoas em busca de perda de peso.
- Visual: paleta azul principal (#0057D9) e branco, estilo clean/moderno, tipografia Inter ou Sora, botões com cantos 12px, cards com sombra suave, animações Lottie para conquistas.
- Mobile-first, responsivo.

### 2. Entregáveis
1. **Arquitetura do projeto** (pastas, bibliotecas, serviços; React Native + Expo + Firebase).
2. **Lista de telas** com props, estados esperados e fluxos (login → cadastro → onboarding → dashboard → módulos).
3. **Esquema de banco de dados** (Firestore preferencial, incluir alternativa SQL) com regras de segurança.
4. **Snippets de código exemplares (React Native + Firebase/Cloud Functions)** cobrindo:
   - Autenticação (email/senha, telefone, Google OAuth).
   - Validação de senha forte.
   - Envio de código por e-mail para reset de senha e fluxo completo (com expiração e bloqueio de reuso).
   - Upload/gestão de avatar em storage seguro (com verificação MIME/tamanho).
   - CRUD de treinos, registro de hidratação e refeições.
   - Sistema de pontos/conquistas e níveis (triggers em Cloud Functions).
   - Integração com OpenAI via Cloud Function intermediária com filtros de domínio, rate limit e caching/resumo de conversas.
5. **Plano de testes** (unitários e e2e) cobrindo fluxos principais: autenticação, cadastros, gamificação, chat IA, offline/online.
6. **Checklist de segurança e performance** (incluindo MFA opcional via SMS, rate limiting, monitoramento).
7. **Relatório “Erros e Atenções”** com severidade (Critical/High/Medium/Low) avaliando:
   - Regras do Firestore (isolamento por usuário).
   - Fluxo de recuperação de senha (expiração, brute force).
   - Upload de avatar (tipos, tamanho, MIME).
   - Limites da API OpenAI (quota, caching).
   - Filtragem da IA (prompt system + pós-processamento).
   - Requisitos LGPD/GDPR (consentimento, exclusão/exportação, opt-out).
   - Edge cases de autenticação Google/Phone.
   - Estratégias de rate limiting/monitoramento (Cloud Functions + Cloud Monitoring/Sentry/Datadog).
   - Metas de água (mín 1000 ml, padrão 2000 ml, máx 4000 ml).
   - Consistência de estados offline/sincronização.
   - UX das notificações (evitar spam, granularidade por tipo).
8. **Próximos passos para chegar ao MVP** (“melhorias para produção” quando algo exigir compliance médico ou análise adicional).

### 3. Requisitos Funcionais
- **Autenticação**: cadastro email/senha com regras (mín 8 caracteres, 1 número, 1 maiúscula, 1 especial); login por email, telefone, Google OAuth; recuperação de senha via código de 6 dígitos enviado por email; MFA via SMS como recomendação.
- **Perfil**: nome, email, telefone opcional, sexo (Masculino/Feminino/Outro), peso (kg), altura (cm), objetivo (emagrecimento/hipertrofia/condicionamento/manutenção), nível de atividade; edição livre; avatar com upload seguro.
- **Dados iniciais**: métricas e conquistas zeradas, exceto medalha “Bem-vindo”.
- **Dashboard**: resumo do dia (próximo treino, hidratação, refeições, pontos, conquistas) + acesso rápido ao chat IA e módulos.
- **Treinos**: planejamento semanal, criar/editar/concluir; detalhes (exercícios, séries, repetições, peso, descanso, instruções); registro manual de performance com edição.
- **Hidratação**: meta padrão 2.0 L/dia; ajuste entre 1.0 L e 4.0 L (observação médica ajustável); registro via modal (200/250/500 ml etc.).
- **Alimentação**: registro de refeições com horário, tipo, calorias (opcional), observações.
- **Chat IA**: respostas restritas ao domínio fitness; bloqueio de outros temas (“Desculpe, só posso ajudar...”); sugestões de treino com disclaimer; respostas estéticas (títulos, bullets, cards de ação); limite de tamanho de mensagem.
- **Gamificação**: pontos (+10 treino concluído, +2 a cada 250 ml etc.), níveis (iniciante/intermediário/avançado com thresholds), medalhas (incluindo “Bem-vindo”), ranking semanal opcional com ocultação, desafios automáticos/personalizados.
- **Notificações**: push/local para treinos, hidratação, alimentação; agendamento inteligente por preferência.
- **Configurações**: tema claro/escuro, notificações, privacidade, excluir conta.
- **Banco de dados**: persistir perfil, treinos, hidratação, refeições, pontos/conquistas, histórico chat IA (flag para não salvar), ranking, desafios. Firestore recomendado com rules estritas; citar alternativa SQL.

### 4. Requisitos Não Funcionais e Segurança
- Criptografia e armazenamento seguro (Firebase Auth/bcrypt).
- Validação no cliente e backend.
- Firestore rules impedindo acesso cruzado.
- Rate limiting para endpoints públicos e OpenAI.
- Middleware de proteção da IA (filtro de prompts/respostas fora do escopo).
- Política de privacidade com opt-out, consentimento, exclusão e exportação de dados.
- Resiliência offline/online.

### 5. Esquema Firestore Sugerido
```
users/{userId}
  name, email, phone, sex, height_cm, weight_kg, goal, activity_level, avatar_url, createdAt
  settings: { theme, notifications, water_goal_ml }

users/{userId}/workouts/{workoutId}
  title, date, exercises[{ name, sets, reps, weight_kg, rest_sec, notes }], completed, createdAt

users/{userId}/hydration/{entryId}
  volume_ml, timestamp

users/{userId}/meals/{mealId}
  type, calories, notes, timestamp

users/{userId}/achievements/{achId}
  key, earnedAt, meta

leaderboard/{weekId}/scores/{userId}
  points

ai_conversations/{convId}
  userId, messages[{ role, text, timestamp }], summary, savedFlag
```

### 6. Tecnologias, Dependências e Variáveis de Ambiente
- `react-native`, `expo`, `@react-native-firebase/app`, `@react-native-firebase/auth`, `firebase-admin`, `firebase-functions`, `firebase/firestore`, `firebase/storage`, `axios`, `react-navigation`, `lottie-react-native`, `formik`, `yup`, `jest`, `detox`, `sentry-expo` ou `@sentry/react-native`.
- Variáveis: `FIREBASE_API_KEY`, `FIREBASE_AUTH_DOMAIN`, `FIRESTORE_PROJECT_ID`, `FIREBASE_STORAGE_BUCKET`, `FIREBASE_MESSAGING_SENDER_ID`, `FIREBASE_APP_ID`, `OPENAI_API_KEY`, `SENTRY_DSN` (opcional). Indicar limites/quota esperada da OpenAI.

### 7. Guia de Implementação
1. Scaffold React Native + Expo + configuração do Firebase.
2. Implementar autenticação (email/telefone/Google).
3. Tela de cadastro com validações e persistência inicial (incluindo conquista “Bem-vindo”).
4. Fluxo de reset de senha (envio de código, expiração, bloqueio de reuso).
5. CRUD de treinos e registro de hidratação.
6. Cloud Function intermediária para OpenAI (filtros + rate limit + caching/resumo).
7. Gamificação: regras de pontos e triggers em Cloud Functions.
8. Testes e revisão de segurança (rodar checklist).
9. Preparar deploy e monitoramento.

### 8. Instruções Finais
- Gere todos os artefatos acima.
- Inclua “melhorias para produção” quando algo exigir compliance adicional.
- Emita relatório “Erros e Atenções” com severidade e sugestões.
- Liste próximos passos para chegar ao MVP publicável.
- Seja explícito ao listar dependências e variáveis de ambiente.
- Revise erros, vulnerabilidades e pontos de atenção antes de concluir.
