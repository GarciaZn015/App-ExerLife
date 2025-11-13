import { ReactNode, useMemo } from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';

import { IconSymbol } from '@/components/ui/icon-symbol';
import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { Colors } from '@/constants/theme';

type HydrationSummary = {
  goalMl: number;
  consumedMl: number;
};

type WorkoutSummary = {
  name: string;
  startTime: string;
  status: 'scheduled' | 'completed';
};

type MealSummary = {
  type: string;
  time: string;
};

export default function DashboardScreen() {
  const hydration: HydrationSummary = useMemo(
    () => ({
      goalMl: 2000,
      consumedMl: 1250,
    }),
    [],
  );

  const workout: WorkoutSummary = useMemo(
    () => ({
      name: 'Treino HIIT - Inferiores',
      startTime: '18:30',
      status: 'scheduled',
    }),
    [],
  );

  const meals: MealSummary[] = useMemo(
    () => [
      { type: 'Café da manhã', time: '08:00' },
      { type: 'Almoço', time: '12:30' },
      { type: 'Lanche', time: '16:00' },
    ],
    [],
  );

  const hydrationProgress = Math.min(
    Math.round((hydration.consumedMl / hydration.goalMl) * 100),
    100,
  );

  return (
    <ScrollView contentInsetAdjustmentBehavior="automatic">
      <ThemedView style={styles.container}>
        <ThemedText type="title">Resumo do dia</ThemedText>
        <View style={styles.grid}>
          <SummaryCard
            title="Próximo treino"
            subtitle={workout.name}
            meta={`${workout.startTime} • ${workout.status === 'scheduled' ? 'Agendado' : 'Concluído'}`}
            icon="figure.run"
            tint="#0057D9"
          />
          <SummaryCard
            title="Hidratação"
            subtitle={`${hydration.consumedMl / 1000}L / ${hydration.goalMl / 1000}L`}
            meta={`${hydrationProgress}% da meta`}
            icon="drop.fill"
            tint="#00A8E8"
          />
        </View>
        <SummaryCard
          title="Refeições de hoje"
          subtitle="Monitore seus registros"
          icon="fork.knife"
          tint="#1E90FF">
          <View style={styles.mealList}>
            {meals.map((meal) => (
              <ThemedText key={meal.type} style={styles.mealItem}>
                {meal.type} • {meal.time}
              </ThemedText>
            ))}
          </View>
        </SummaryCard>
        <SummaryCard
          title="Chat com IA"
          subtitle="Receba orientações personalizadas"
          meta="Histórico protegido e filtrado"
          icon="bubble.left.and.bubble.right.fill"
          tint="#4F46E5"
        />
        <SummaryCard
          title="Gamificação"
          subtitle="Pontos acumulados: 1.480"
          meta="Nível atual: Intermediário"
          icon="speedometer"
          tint="#38BDF8"
        />
      </ThemedView>
    </ScrollView>
  );
}

type SummaryCardProps = {
  title: string;
  subtitle: string;
  meta?: string;
  icon: keyof typeof ICON_MAP;
  tint: string;
  children?: ReactNode;
};

const ICON_MAP = {
  'figure.run': 'figure.run',
  'drop.fill': 'drop.fill',
  'fork.knife': 'fork.knife',
  'bubble.left.and.bubble.right.fill': 'bubble.left.and.bubble.right.fill',
  speedometer: 'speedometer',
} as const;

const SummaryCard = ({ title, subtitle, meta, icon, tint, children }: SummaryCardProps) => (
  <ThemedView style={[styles.card, { borderColor: tint }]}>
    <View style={[styles.iconContainer, { backgroundColor: tint }]}>
      <IconSymbol name={ICON_MAP[icon]} color="#fff" size={20} />
    </View>
    <View style={styles.cardContent}>
      <ThemedText type="subtitle">{title}</ThemedText>
      <ThemedText style={styles.cardSubtitle}>{subtitle}</ThemedText>
      {meta ? <ThemedText style={styles.cardMeta}>{meta}</ThemedText> : null}
      {children}
    </View>
  </ThemedView>
);

const styles = StyleSheet.create({
  container: {
    padding: 24,
    gap: 16,
  },
  grid: {
    flexDirection: 'row',
    gap: 16,
    flexWrap: 'wrap',
  },
  card: {
    flex: 1,
    minWidth: '48%',
    borderRadius: 16,
    borderWidth: 1,
    padding: 16,
    backgroundColor: Colors.light.background,
    gap: 12,
  },
  iconContainer: {
    width: 36,
    height: 36,
    borderRadius: 18,
    alignItems: 'center',
    justifyContent: 'center',
  },
  cardContent: {
    gap: 4,
  },
  cardSubtitle: {
    fontSize: 16,
  },
  cardMeta: {
    fontSize: 13,
    color: '#6B7280',
  },
  mealList: {
    gap: 4,
    marginTop: 8,
  },
  mealItem: {
    fontSize: 14,
  },
});
