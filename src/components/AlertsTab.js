import React from 'react';
import { StyleSheet, Text, View, FlatList } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { COLORS } from '../constants/colors';

export default function AlertsTab({ alerts }) {
  const renderItem = ({ item }) => (
    <View style={styles.alertCard}>
      <View style={[styles.iconContainer, { backgroundColor: item.type === 'success' ? '#E8F5E9' : '#E3F2FD' }]}>
        <MaterialCommunityIcons 
          name={item.type === 'success' ? 'check-circle-outline' : 'information-outline'} 
          size={24} 
          color={item.type === 'success' ? COLORS.success : COLORS.secondary} 
        />
      </View>
      <View style={styles.textContainer}>
        <Text style={styles.alertTitle}>{item.title}</Text>
        <Text style={styles.alertMessage}>{item.message}</Text>
        <Text style={styles.alertTime}>{item.time}</Text>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.headerTitle}>Notifications</Text>
      {alerts.length === 0 ? (
        <View style={styles.emptyState}>
          <MaterialCommunityIcons name="bell-off-outline" size={64} color={COLORS.gray} />
          <Text style={styles.emptyText}>No new notifications</Text>
        </View>
      ) : (
        <FlatList
          data={alerts}
          renderItem={renderItem}
          keyExtractor={(item) => item.id.toString()}
          contentContainerStyle={styles.listContent}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F5F5',
    paddingTop: 20,
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#000',
    paddingHorizontal: 20,
    marginBottom: 15,
  },
  listContent: {
    paddingHorizontal: 20,
    paddingBottom: 20,
  },
  alertCard: {
    flexDirection: 'row',
    backgroundColor: COLORS.white,
    padding: 15,
    borderRadius: 10,
    marginBottom: 10,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
  },
  iconContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 15,
  },
  textContainer: {
    flex: 1,
  },
  alertTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#000',
    marginBottom: 2,
  },
  alertMessage: {
    fontSize: 14,
    color: COLORS.textLight,
    marginBottom: 5,
  },
  alertTime: {
    fontSize: 12,
    color: '#999',
  },
  emptyState: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 50,
  },
  emptyText: {
    marginTop: 10,
    color: COLORS.textLight,
    fontSize: 16,
  },
});
