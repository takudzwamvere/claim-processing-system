import React from 'react';
import { StyleSheet, Text, View, FlatList, Platform } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { COLORS } from '../constants/colors';

export default function ClaimsTab({ claims }) {
  const renderItem = ({ item }) => (
    <View style={styles.claimCard}>
      <View style={styles.claimHeader}>
        <Text style={styles.providerName}>{item.provider}</Text>
        <View style={[styles.statusBadge, { backgroundColor: item.statusColor + '20' }]}>
          <Text style={[styles.statusText, { color: item.statusColor }]}>{item.status}</Text>
        </View>
      </View>
      <Text style={styles.claimDate}>{item.date}</Text>
      <Text style={styles.claimAmount}>{item.amount}</Text>
      
      {item.txHash && (
        <View style={styles.blockchainInfo}>
          <MaterialCommunityIcons name="link-variant" size={14} color={COLORS.primary} />
          <Text style={styles.txHash} numberOfLines={1} ellipsizeMode="middle">
            TX: {item.txHash}
          </Text>
        </View>
      )}
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.headerTitle}>My Claims</Text>
      <FlatList
        data={claims}
        renderItem={renderItem}
        keyExtractor={(item) => item.id.toString()}
        contentContainerStyle={styles.listContent}
      />
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
  claimCard: {
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
  claimHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 5,
  },
  providerName: {
    fontSize: 16,
    fontWeight: '600',
    color: COLORS.text,
    flex: 1,
  },
  statusBadge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
  },
  statusText: {
    fontSize: 12,
    fontWeight: 'bold',
  },
  claimDate: {
    fontSize: 12,
    color: COLORS.textLight,
    marginBottom: 5,
  },
  claimAmount: {
    fontSize: 18,
    fontWeight: 'bold',
    color: COLORS.primary,
    marginBottom: 8,
  },
  blockchainInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F3E5F5',
    padding: 8,
    borderRadius: 5,
  },
  txHash: {
    fontSize: 10,
    color: COLORS.primary,
    marginLeft: 5,
    flex: 1,
    fontFamily: Platform.OS === 'ios' ? 'Courier' : 'monospace',
  },
});
