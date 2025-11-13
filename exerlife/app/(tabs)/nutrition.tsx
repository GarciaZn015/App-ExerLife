import { useMemo } from 'react';
import { FlatList, Pressable, StyleSheet, View } from 'react-native';

import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { Colors } from '@/constants/theme';
import { IconSymbol } from '@/components/ui/icon-symbol';

type Meal = {
  id: string;
  type: 'Café da manhã' | 'Almoço' | 'Jantar' | 'Lanche';
  calories?: number;
  timestamp: string;
  notes?: string;
};

export default function NutritionScreen() {
  const meals = useMemo<Meal[]>(
    () => [
      {
        id: '1',
        type: 'Café da manhã',
        calories: 320,
        timestamp: '08:10',
        notes: 'Ovos mexidos, tapioca com chia, café sem açúcar',
      },
      {
        id: '2',
        type: 'Almoço',
        calories: 620,
        timestamp: '12:40',
        notes: 'Frango grelhado, arroz integral, salada verde e feijão',
      },
      {
        id: '3',
        type: 'Lanche',
        calories: 180,
        timestamp: '16:20',
        notes: 'Iogurte proteico com morangos',
      },
    ],
    [],
  );

  const totalCalories = meals.reduce((sum, meal) => sum + (meal.calories ?? 0), 0);

  return (
    <ThemedView style={styles.container}>
      <View style={styles.header}>
        <View>
          <ThemedText type="title">Alimentação</ThemedText>
          <ThemedText style={styles.subtitle}>Registre calorias e observações rapidamente</ThemedText>
        </View>
        <Pressable style={styles.addButton} onPress={() => alert('Registrar refeição')}>
          <IconSymbol name="fork.knife" color="#fff" size={20} />
          <ThemedText style={styles.addText}>Adicionar</ThemedText>
        </Pressable>
      </View>

      <ThemedView style={styles.summaryCard}>
        <ThemedText type="subtitle">Calorias aproximadas</ThemedText>
        <ThemedText style={styles.summaryValue}>{totalCalories} kcal</ThemedText>
        <ThemedText style={styles.summaryHint}>
          Ajuste metas conforme orientação nutricional. Considere incluir macronutrientes.
        </ThemedText>
      </ThemedView>

      <FlatList
        data={meals}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.list}
        ItemSeparatorComponent={() => <View style={{ height: 14 }} />}
        renderItem={({ item }) => (
          <ThemedView style={styles.mealCard}>
            <View style={styles.mealHeader}>
              <ThemedText style={styles.mealType}>{item.type}</ThemedText>
              <ThemedText style={styles.mealTime}>{item.timestamp}</ThemedText>
            </View>
            {item.calories ? (
              <ThemedText style={styles.mealCalories}>{item.calories} kcal</ThemedText>
            ) : null}
            {item.notes ? <ThemedText style={styles.mealNotes}>{item.notes}</ThemedText> : null}
            <View style={styles.actions}>
              <Pressable onPress={() => alert('Editar refeição')}>
                <ThemedText style={styles.actionText}>Editar</ThemedText>
              </Pressable>
              <Pressable onPress={() => alert('Duplicar refeição')}>
                <ThemedText style={styles.actionText}>Duplicar</ThemedText>
              </Pressable>
            </View>
          </ThemedView>
        )}
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
  subtitle: {
    color: '#475569',
    marginTop: 4,
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
  addText: {
    color: '#fff',
    fontWeight: '600',
  },
  summaryCard: {
    backgroundColor: '#fff',
    borderRadius: 18,
    padding: 20,
    borderWidth: 1,
    borderColor: '#E0E7FF',
    gap: 8,
    marginBottom: 20,
  },
  summaryValue: {
    fontSize: 26,
    fontWeight: '700',
    color: '#0057D9',
  },
  summaryHint: {
    color: '#64748B',
    fontSize: 13,
  },
  list: {
    paddingBottom: 36,
  },
  mealCard: {
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 18,
    borderWidth: 1,
    borderColor: '#E2E8F0',
    gap: 8,
  },
  mealHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  mealType: {
    fontSize: 16,
    fontWeight: '600',
  },
  mealTime: {
    color: '#475569',
    fontSize: 13,
  },
  mealCalories: {
    color: '#0057D9',
    fontWeight: '600',
  },
  mealNotes: {
    color: '#4B5563',
    lineHeight: 20,
  },
  actions: {
    flexDirection: 'row',
    gap: 16,
    marginTop: 8,
  },
  actionText: {
    color: '#0057D9',
    fontWeight: '600',
  },
});
