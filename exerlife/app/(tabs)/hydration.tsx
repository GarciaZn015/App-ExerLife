import { useMemo } from 'react';
import { FlatList, Pressable, StyleSheet, View } from 'react-native';

import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { Colors } from '@/constants/theme';
import { IconSymbol } from '@/components/ui/icon-symbol';

type HydrationEntry = {
  id: string;
  volumeMl: number;
  timestamp: string;
};

export default function HydrationScreen() {
  const goalMl = 2000;
  const entries = useMemo<HydrationEntry[]>(
    () => [
      { id: '1', volumeMl: 250, timestamp: '08:15' },
      { id: '2', volumeMl: 500, timestamp: '10:30' },
      { id: '3', volumeMl: 250, timestamp: '13:00' },
      { id: '4', volumeMl: 250, timestamp: '15:45' },
    ],
    [],
  );

  const consumedMl = entries.reduce((sum, entry) => sum + entry.volumeMl, 0);
  const progress = Math.min(Math.round((consumedMl / goalMl) * 100), 100);

  return (
    <ThemedView style={styles.container}>
      <View style={styles.header}>
        <ThemedText type="title">Hidratação diária</ThemedText>
        <ThemedText style={styles.goal}>{goalMl / 1000}L meta • {progress}%</ThemedText>
      </View>

      <ThemedView style={styles.progressCard}>
        <View style={styles.progressHeader}>
          <ThemedText type="subtitle">Consumo registrado</ThemedText>
          <ThemedText style={styles.progressHighlight}>{consumedMl} ml</ThemedText>
        </View>
        <View style={styles.progressBar}>
          <View style={[styles.progressFill, { width: `${progress}%` }]} />
        </View>
        <ThemedText style={styles.progressHint}>
          Registre pelo menos 8 copos por dia. Ajuste a meta conforme orientação médica.
        </ThemedText>
      </ThemedView>

      <View style={styles.quickActions}>
        {[200, 250, 500].map((volume) => (
          <Pressable
            key={volume}
            style={styles.quickButton}
            onPress={() => alert(`Registrar ${volume}ml`)}>
            <IconSymbol name="drop.fill" color="#0057D9" size={20} />
            <ThemedText style={styles.quickButtonText}>{volume} ml</ThemedText>
          </Pressable>
        ))}
      </View>

      <ThemedText type="subtitle" style={styles.sectionTitle}>
        Histórico de hoje
      </ThemedText>
      <FlatList
        data={entries}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <ThemedView style={styles.entryRow}>
            <View>
              <ThemedText style={styles.entryVolume}>{item.volumeMl} ml</ThemedText>
              <ThemedText style={styles.entryMeta}>{item.timestamp}</ThemedText>
            </View>
            <Pressable onPress={() => alert('Editar registro')}>
              <ThemedText style={styles.entryAction}>Editar</ThemedText>
            </Pressable>
          </ThemedView>
        )}
        ItemSeparatorComponent={() => <View style={{ height: 12 }} />}
        contentContainerStyle={{ paddingBottom: 32 }}
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
    gap: 4,
    marginBottom: 16,
  },
  goal: {
    color: '#475569',
  },
  progressCard: {
    backgroundColor: '#fff',
    borderRadius: 18,
    padding: 20,
    borderWidth: 1,
    borderColor: '#E0F2FE',
    gap: 12,
  },
  progressHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  progressHighlight: {
    fontSize: 22,
    fontWeight: '700',
    color: '#0057D9',
  },
  progressBar: {
    height: 10,
    borderRadius: 999,
    backgroundColor: '#E2E8F0',
    overflow: 'hidden',
  },
  progressFill: {
    height: '100%',
    backgroundColor: '#00A8E8',
  },
  progressHint: {
    color: '#6B7280',
    fontSize: 13,
  },
  quickActions: {
    flexDirection: 'row',
    gap: 12,
    marginVertical: 20,
  },
  quickButton: {
    flex: 1,
    flexDirection: 'row',
    gap: 8,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#F1F5F9',
    paddingVertical: 12,
    borderRadius: 12,
  },
  quickButtonText: {
    color: '#0057D9',
    fontWeight: '600',
  },
  sectionTitle: {
    marginBottom: 12,
  },
  entryRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: 14,
    borderWidth: 1,
    borderColor: '#E0E7FF',
    padding: 16,
  },
  entryVolume: {
    fontWeight: '600',
  },
  entryMeta: {
    color: '#64748B',
    fontSize: 13,
  },
  entryAction: {
    color: '#0057D9',
    fontWeight: '600',
  },
});
