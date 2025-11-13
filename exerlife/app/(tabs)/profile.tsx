import { useMemo } from 'react';
import { Pressable, StyleSheet, Switch, View } from 'react-native';

import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { Colors } from '@/constants/theme';

type UserProfile = {
  name: string;
  email: string;
  phone?: string;
  sex: 'Masculino' | 'Feminino' | 'Outro';
  weightKg: number;
  heightCm: number;
  goal: 'Emagrecimento' | 'Hipertrofia' | 'Condicionamento' | 'Manutenção';
  activityLevel: 'Leve' | 'Moderado' | 'Intenso';
  waterGoalMl: number;
  notifications: {
    workouts: boolean;
    hydration: boolean;
    meals: boolean;
  };
};

export default function ProfileScreen() {
  const profile = useMemo<UserProfile>(
    () => ({
      name: 'Laura Andrade',
      email: 'laura.andrade@example.com',
      phone: '+55 11 91234-5678',
      sex: 'Feminino',
      weightKg: 64,
      heightCm: 168,
      goal: 'Hipertrofia',
      activityLevel: 'Moderado',
      waterGoalMl: 2000,
      notifications: {
        workouts: true,
        hydration: true,
        meals: false,
      },
    }),
    [],
  );

  return (
    <ThemedView style={styles.container}>
      <ThemedView style={styles.profileCard}>
        <View style={styles.avatar} />
        <View style={{ flex: 1, gap: 4 }}>
          <ThemedText type="title">{profile.name}</ThemedText>
          <ThemedText style={styles.muted}>{profile.email}</ThemedText>
          {profile.phone ? <ThemedText style={styles.muted}>{profile.phone}</ThemedText> : null}
        </View>
        <Pressable style={styles.editButton} onPress={() => alert('Trocar foto')}>
          <ThemedText style={styles.editButtonText}>Editar</ThemedText>
        </Pressable>
      </ThemedView>

      <ThemedView style={styles.section}>
        <SectionHeader title="Dados corporais" actionLabel="Atualizar" />
        <View style={styles.detailsGrid}>
          <DetailRow label="Sexo" value={profile.sex} />
          <DetailRow label="Peso" value={`${profile.weightKg} kg`} />
          <DetailRow label="Altura" value={`${profile.heightCm} cm`} />
          <DetailRow label="Objetivo" value={profile.goal} />
          <DetailRow label="Nível de atividade" value={profile.activityLevel} />
          <DetailRow label="Meta de água" value={`${profile.waterGoalMl / 1000} L`} />
        </View>
      </ThemedView>

      <ThemedView style={styles.section}>
        <SectionHeader title="Notificações" />
        <ToggleRow label="Lembretes de treino" value={profile.notifications.workouts} />
        <ToggleRow label="Hidratação inteligente" value={profile.notifications.hydration} />
        <ToggleRow label="Refeições e calorias" value={profile.notifications.meals} />
      </ThemedView>

      <ThemedView style={styles.section}>
        <SectionHeader title="Privacidade" />
        <Pressable style={styles.menuRow} onPress={() => alert('Gerenciar ranking')}>
          <ThemedText style={styles.menuText}>Visibilidade no ranking semanal</ThemedText>
          <ThemedText style={styles.muted}>Visível</ThemedText>
        </Pressable>
        <Pressable style={styles.menuRow} onPress={() => alert('Exportar dados')}>
          <ThemedText style={styles.menuText}>Exportar dados (LGPD)</ThemedText>
        </Pressable>
        <Pressable style={styles.menuRow} onPress={() => alert('Excluir conta')}>
          <ThemedText style={[styles.menuText, { color: '#DC2626' }]}>Excluir conta</ThemedText>
        </Pressable>
      </ThemedView>
    </ThemedView>
  );
}

const SectionHeader = ({ title, actionLabel }: { title: string; actionLabel?: string }) => (
  <View style={styles.sectionHeader}>
    <ThemedText type="subtitle">{title}</ThemedText>
    {actionLabel ? (
      <Pressable onPress={() => alert(actionLabel)}>
        <ThemedText style={styles.actionText}>{actionLabel}</ThemedText>
      </Pressable>
    ) : null}
  </View>
);

const DetailRow = ({ label, value }: { label: string; value: string }) => (
  <View style={styles.detailRow}>
    <ThemedText style={styles.detailLabel}>{label}</ThemedText>
    <ThemedText style={styles.detailValue}>{value}</ThemedText>
  </View>
);

const ToggleRow = ({ label, value }: { label: string; value: boolean }) => (
  <View style={styles.toggleRow}>
    <ThemedText style={styles.menuText}>{label}</ThemedText>
    <Switch value={value} onValueChange={() => alert('Alternar preferências')} />
  </View>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
    gap: 20,
    backgroundColor: Colors.light.background,
  },
  profileCard: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 16,
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 18,
    borderWidth: 1,
    borderColor: '#E2E8F0',
  },
  avatar: {
    width: 64,
    height: 64,
    borderRadius: 32,
    backgroundColor: '#BFDBFE',
  },
  muted: {
    color: '#64748B',
  },
  editButton: {
    backgroundColor: '#0057D9',
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 10,
  },
  editButtonText: {
    color: '#fff',
    fontWeight: '600',
  },
  section: {
    backgroundColor: '#fff',
    borderRadius: 18,
    borderWidth: 1,
    borderColor: '#E2E8F0',
    padding: 20,
    gap: 16,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  actionText: {
    color: '#0057D9',
    fontWeight: '600',
  },
  detailsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
  },
  detailRow: {
    width: '48%',
    backgroundColor: '#F8FAFC',
    borderRadius: 12,
    padding: 12,
    gap: 2,
  },
  detailLabel: {
    fontSize: 12,
    textTransform: 'uppercase',
    color: '#64748B',
  },
  detailValue: {
    fontWeight: '600',
  },
  toggleRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  menuRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#F1F5F9',
  },
  menuText: {
    fontSize: 15,
    fontWeight: '500',
  },
});
