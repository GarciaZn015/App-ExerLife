import { useMemo, useState } from 'react';
import { FlatList, Pressable, StyleSheet, View } from 'react-native';

import { IconSymbol } from '@/components/ui/icon-symbol';
import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { Colors } from '@/constants/theme';

type Workout = {
  id: string;
  title: string;
  focus: string;
  scheduledAt: string;
  completed: boolean;
  exercises: {
    name: string;
    sets: number;
    reps: number;
    weightKg?: number;
    restSec: number;
  }[];
};

export default function WorkoutsScreen() {
  const [selectedWorkout, setSelectedWorkout] = useState<string | null>(null);

  const workouts = useMemo<Workout[]>(
    () => [
      {
        id: 'week-01',
        title: 'Força Inferiores',
        focus: 'Hipertrofia',
        scheduledAt: 'Seg • 18:30',
        completed: false,
        exercises: [
          { name: 'Agachamento Livre', sets: 4, reps: 8, weightKg: 60, restSec: 90 },
          { name: 'Leg Press', sets: 3, reps: 12, weightKg: 120, restSec: 60 },
          { name: 'Stiff com Halteres', sets: 3, reps: 10, weightKg: 22, restSec: 60 },
        ],
      },
      {
        id: 'week-02',
        title: 'HIIT Cardio',
        focus: 'Condicionamento',
        scheduledAt: 'Qua • 07:00',
        completed: true,
        exercises: [
          { name: 'Bike Ergométrica', sets: 6, reps: 45, restSec: 30 },
          { name: 'Burpees', sets: 4, reps: 12, restSec: 45 },
          { name: 'Prancha', sets: 3, reps: 60, restSec: 30 },
        ],
      },
    ],
    [],
  );

  const renderWorkout = ({ item }: { item: Workout }) => {
    const isSelected = selectedWorkout === item.id;

    return (
      <Pressable onPress={() => setSelectedWorkout(isSelected ? null : item.id)}>
        <ThemedView style={[styles.card, isSelected && styles.cardSelected]}>
          <View style={styles.cardHeader}>
            <View>
              <ThemedText type="subtitle">{item.title}</ThemedText>
              <ThemedText style={styles.meta}>
                {item.focus} • {item.scheduledAt}
              </ThemedText>
            </View>
            <View style={styles.statusContainer}>
              <IconSymbol
                name={item.completed ? 'speedometer' : 'figure.run'}
                color={item.completed ? '#16A34A' : '#EA580C'}
                size={20}
              />
              <ThemedText style={styles.status}>
                {item.completed ? 'Concluído' : 'Pendente'}
              </ThemedText>
            </View>
          </View>

          {isSelected && (
            <View style={styles.exerciseList}>
              {item.exercises.map((exercise) => (
                <View key={exercise.name} style={styles.exerciseRow}>
                  <ThemedText style={styles.exerciseTitle}>{exercise.name}</ThemedText>
                  <ThemedText style={styles.exerciseMeta}>
                    {exercise.sets}x{exercise.reps}{' '}
                    {exercise.weightKg ? `• ${exercise.weightKg}kg` : '• peso corporal'}
                  </ThemedText>
                  <ThemedText style={styles.exerciseMeta}>Descanso: {exercise.restSec}s</ThemedText>
                </View>
              ))}
            </View>
          )}
        </ThemedView>
      </Pressable>
    );
  };

  return (
    <ThemedView style={styles.container}>
      <View style={styles.header}>
        <ThemedText type="title">Planejamento semanal</ThemedText>
        <Pressable style={styles.addButton} onPress={() => alert('Criar novo treino')}>
          <IconSymbol name="figure.run" color="#fff" size={20} />
          <ThemedText style={styles.addButtonText}>Novo treino</ThemedText>
        </Pressable>
      </View>
      <FlatList
        data={workouts}
        keyExtractor={(item) => item.id}
        renderItem={renderWorkout}
        contentContainerStyle={styles.list}
        ItemSeparatorComponent={() => <View style={{ height: 16 }} />}
      />
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
    backgroundColor: Colors.light.background,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  addButton: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    backgroundColor: '#0057D9',
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 12,
  },
  addButtonText: {
    color: '#fff',
    fontWeight: '600',
  },
  list: {
    paddingBottom: 32,
  },
  card: {
    borderRadius: 18,
    borderWidth: 1,
    borderColor: '#E0E7FF',
    backgroundColor: '#fff',
    padding: 18,
    gap: 12,
  },
  cardSelected: {
    borderColor: '#0057D9',
    shadowColor: '#0057D9',
    shadowOpacity: 0.12,
    shadowRadius: 12,
    elevation: 3,
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  meta: {
    color: '#64748B',
    marginTop: 4,
  },
  statusContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  status: {
    fontSize: 13,
    color: '#475569',
  },
  exerciseList: {
    gap: 10,
    borderTopWidth: 1,
    borderTopColor: '#F1F5F9',
    paddingTop: 12,
  },
  exerciseRow: {
    gap: 4,
  },
  exerciseTitle: {
    fontWeight: '600',
  },
  exerciseMeta: {
    color: '#475569',
    fontSize: 13,
  },
});
