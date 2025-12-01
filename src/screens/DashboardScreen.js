import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, ScrollView, TouchableOpacity, SafeAreaView, Platform, StatusBar as RNStatusBar, ActivityIndicator, Alert } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { COLORS } from '../constants/colors';
import SubmitClaimModal from '../components/SubmitClaimModal';
import AlertsTab from '../components/AlertsTab';
import ClaimsTab from '../components/ClaimsTab';

const INITIAL_CLAIMS = [
  {
    id: 1,
    provider: 'Parirenyatwa Hospital',
    date: '2024-11-25',
    amount: '$245.00',
    status: 'Approved',
    statusColor: COLORS.success,
    txHash: '0x7f...3a2b',
  },
  {
    id: 2,
    provider: 'Dr. Chikwende',
    date: '2024-11-20',
    amount: '$85.00',
    status: 'In Review',
    statusColor: COLORS.primary,
    txHash: '0x8a...9c1d',
  },
  {
    id: 3,
    provider: 'MedLabs Zimbabwe',
    date: '2024-11-18',
    amount: '$120.00',
    status: 'Submitted',
    statusColor: COLORS.secondary,
    txHash: '0x1b...4e5f',
  },
];

export default function DashboardScreen() {
  const [activeTab, setActiveTab] = useState('Home');
  const [modalVisible, setModalVisible] = useState(false);
  const [claims, setClaims] = useState(INITIAL_CLAIMS);
  const [alerts, setAlerts] = useState([]);
  const [isSimulating, setIsSimulating] = useState(false);
  const [simulationStep, setSimulationStep] = useState('');

  const handleSubmitClaim = async (claimData) => {
    setModalVisible(false);
    setIsSimulating(true);

    // Simulation Steps
    const steps = [
      'Encrypting claim data...',
      'Submitting to blockchain...',
      'Validating smart contract...',
      'Recording transaction...',
    ];

    for (const step of steps) {
      setSimulationStep(step);
      await new Promise(resolve => setTimeout(resolve, 1500));
    }

    // Create new claim
    const newClaim = {
      id: Date.now(),
      provider: claimData.provider,
      date: claimData.date,
      amount: `$${claimData.amount}`,
      status: 'Pending',
      statusColor: COLORS.warning,
      txHash: `0x${Math.random().toString(16).substr(2, 10)}...${Math.random().toString(16).substr(2, 4)}`,
    };

    setClaims([newClaim, ...claims]);
    setIsSimulating(false);
    setSimulationStep('');

    // Add notification
    const newAlert = {
      id: Date.now(),
      title: 'Claim Submitted',
      message: `Your claim for ${claimData.provider} has been securely recorded on the blockchain.`,
      time: 'Just now',
      type: 'success',
    };
    setAlerts([newAlert, ...alerts]);

    // Simulate automated processing after a delay
    setTimeout(() => {
      updateClaimStatus(newClaim.id, 'In Review', COLORS.primary);
      addAlert('Claim Update', `Claim #${newClaim.id} is now being validated by the smart contract.`);
    }, 5000);

    setTimeout(() => {
      updateClaimStatus(newClaim.id, 'Approved', COLORS.success);
      addAlert('Claim Approved', `Claim #${newClaim.id} has been approved and payment settlement initiated.`);
    }, 10000);
  };

  const updateClaimStatus = (id, status, color) => {
    setClaims(prevClaims => prevClaims.map(c => 
      c.id === id ? { ...c, status, statusColor: color } : c
    ));
  };

  const addAlert = (title, message) => {
    setAlerts(prev => [{
      id: Date.now(),
      title,
      message,
      time: 'Just now',
      type: 'info',
    }, ...prev]);
  };

  const renderContent = () => {
    if (isSimulating) {
      return (
        <View style={styles.simulationContainer}>
          <ActivityIndicator size="large" color={COLORS.primary} />
          <Text style={styles.simulationText}>{simulationStep}</Text>
          <MaterialCommunityIcons name="cube-scan" size={64} color={COLORS.primary} style={{marginTop: 20, opacity: 0.5}} />
        </View>
      );
    }

    switch (activeTab) {
      case 'Home':
        return (
          <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer}>
             {/* Header Section */}
            <View style={styles.header}>
              <View>
                <Text style={styles.greeting}>Hello,</Text>
                <Text style={styles.userName}>Angelica</Text>
              </View>
              <TouchableOpacity style={styles.profileIcon} onPress={() => setActiveTab('Profile')}>
                 <MaterialCommunityIcons name="account-circle" size={40} color={COLORS.white} />
              </TouchableOpacity>
            </View>

            {/* Stats Cards */}
            <View style={styles.statsContainer}>
              <View style={styles.statCard}>
                <Text style={styles.statLabel}>Active</Text>
                <Text style={styles.statValue}>{claims.filter(c => c.status === 'Pending' || c.status === 'In Review' || c.status === 'Submitted').length}</Text>
              </View>
              <View style={[styles.statCard, styles.statCardBorder]}>
                <Text style={styles.statLabel}>Approved</Text>
                <Text style={styles.statValue}>{claims.filter(c => c.status === 'Approved').length}</Text>
              </View>
              <View style={styles.statCard}>
                <Text style={styles.statLabel}>Pending</Text>
                <Text style={styles.statValue}>{claims.filter(c => c.status === 'Pending').length}</Text>
              </View>
            </View>

            {/* Submit New Claim Banner */}
            <TouchableOpacity style={styles.banner} onPress={() => setModalVisible(true)}>
              <View style={styles.bannerIconContainer}>
                <MaterialCommunityIcons name="plus" size={30} color={COLORS.white} />
              </View>
              <View style={styles.bannerTextContainer}>
                <Text style={styles.bannerTitle}>Submit New Claim</Text>
                <Text style={styles.bannerSubtitle}>File a new medical claim</Text>
              </View>
              <MaterialCommunityIcons name="arrow-right" size={30} color={COLORS.textLight} />
            </TouchableOpacity>

            {/* Quick Actions */}
            <Text style={styles.sectionTitle}>Quick Actions</Text>
            <View style={styles.quickActionsContainer}>
              <TouchableOpacity style={styles.actionCard} onPress={() => setActiveTab('Claims')}>
                <MaterialCommunityIcons name="file-document-outline" size={40} color={COLORS.primary} />
                <Text style={styles.actionTitle}>My Claims</Text>
                <Text style={styles.actionSubtitle}>View all claims</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.actionCard} onPress={() => setActiveTab('Profile')}>
                <MaterialCommunityIcons name="account-outline" size={40} color={COLORS.primary} />
                <Text style={styles.actionTitle}>Profile</Text>
                <Text style={styles.actionSubtitle}>Manage account</Text>
              </TouchableOpacity>
            </View>

            {/* Recent Claims */}
            <View style={styles.recentClaimsHeader}>
              <Text style={styles.sectionTitle}>Recent Claims</Text>
              <TouchableOpacity onPress={() => setActiveTab('Claims')}>
                <Text style={styles.viewAllText}>View all <MaterialCommunityIcons name="chevron-right" size={16} /></Text>
              </TouchableOpacity>
            </View>

            <View style={styles.claimsList}>
              {claims.slice(0, 3).map((claim) => (
                <View key={claim.id} style={styles.claimCard}>
                  <View style={styles.claimHeader}>
                    <Text style={styles.providerName}>{claim.provider}</Text>
                    <Text style={[styles.statusText, { color: claim.statusColor }]}>{claim.status}</Text>
                  </View>
                  <Text style={styles.claimDate}>{claim.date}</Text>
                  <Text style={[styles.claimAmount, { color: COLORS.primary }]}>{claim.amount}</Text>
                </View>
              ))}
            </View>
          </ScrollView>
        );
      case 'Claims':
        return <ClaimsTab claims={claims} />;
      case 'Alerts':
        return <AlertsTab alerts={alerts} />;
      case 'Profile':
        return (
          <View style={[styles.container, { alignItems: 'center', justifyContent: 'center' }]}>
            <MaterialCommunityIcons name="account-circle" size={100} color={COLORS.primary} />
            <Text style={{ fontSize: 24, fontWeight: 'bold', marginTop: 20 }}>Angelica Mpofu</Text>
            <Text style={{ color: COLORS.textLight }}>Member ID: 63-123456A63</Text>
          </View>
        );
      default:
        return null;
    }
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.headerBackground} />
      
      {renderContent()}

      <SubmitClaimModal 
        visible={modalVisible} 
        onClose={() => setModalVisible(false)} 
        onSubmit={handleSubmitClaim} 
      />
      
      {/* Bottom Navigation */}
      <View style={styles.bottomNav}>
         <TouchableOpacity style={styles.navItem} onPress={() => setActiveTab('Home')}>
           <MaterialCommunityIcons name="home" size={28} color={activeTab === 'Home' ? COLORS.primary : COLORS.gray} />
           <Text style={[styles.navText, activeTab === 'Home' && styles.activeNavText]}>Home</Text>
         </TouchableOpacity>
         
         <TouchableOpacity style={styles.navItem} onPress={() => setActiveTab('Claims')}>
           <MaterialCommunityIcons name="format-list-bulleted" size={28} color={activeTab === 'Claims' ? COLORS.primary : COLORS.gray} />
           <Text style={[styles.navText, activeTab === 'Claims' && styles.activeNavText]}>Claims</Text>
         </TouchableOpacity>

         <TouchableOpacity style={styles.navItem} onPress={() => setActiveTab('Alerts')}>
           <View>
             <MaterialCommunityIcons name="bell-outline" size={28} color={activeTab === 'Alerts' ? COLORS.primary : COLORS.gray} />
             {alerts.length > 0 && <View style={styles.badge} />}
           </View>
           <Text style={[styles.navText, activeTab === 'Alerts' && styles.activeNavText]}>Alerts</Text>
         </TouchableOpacity>

         <TouchableOpacity style={styles.navItem} onPress={() => setActiveTab('Profile')}>
           <MaterialCommunityIcons name="account-circle-outline" size={28} color={activeTab === 'Profile' ? COLORS.primary : COLORS.gray} />
           <Text style={[styles.navText, activeTab === 'Profile' && styles.activeNavText]}>Profile</Text>
         </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: COLORS.primary,
    paddingTop: Platform.OS === 'android' ? RNStatusBar.currentHeight : 0,
  },
  headerBackground: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    height: 200,
    backgroundColor: COLORS.primary,
  },
  container: {
    flex: 1,
    backgroundColor: '#F5F5F5',
  },
  contentContainer: {
    paddingBottom: 100,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 20,
    backgroundColor: COLORS.primary,
  },
  greeting: {
    fontSize: 18,
    color: 'rgba(255,255,255,0.8)',
  },
  userName: {
    fontSize: 24,
    fontWeight: 'bold',
    color: COLORS.white,
  },
  statsContainer: {
    flexDirection: 'row',
    backgroundColor: 'rgba(255,255,255,0.1)',
    marginHorizontal: 20,
    borderRadius: 10,
    paddingVertical: 15,
    marginBottom: 20,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.2)',
  },
  statCard: {
    flex: 1,
    alignItems: 'center',
  },
  statCardBorder: {
    borderLeftWidth: 1,
    borderRightWidth: 1,
    borderColor: 'rgba(255,255,255,0.2)',
  },
  statLabel: {
    color: 'rgba(255,255,255,0.8)',
    fontSize: 12,
    marginBottom: 5,
  },
  statValue: {
    color: COLORS.white,
    fontSize: 20,
    fontWeight: 'bold',
  },
  banner: {
    backgroundColor: COLORS.white,
    marginHorizontal: 20,
    borderRadius: 10,
    flexDirection: 'row',
    alignItems: 'center',
    padding: 15,
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    marginBottom: 25,
    marginTop: 10,
  },
  bannerIconContainer: {
    backgroundColor: COLORS.primary,
    width: 50,
    height: 50,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 15,
  },
  bannerTextContainer: {
    flex: 1,
  },
  bannerTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#000',
  },
  bannerSubtitle: {
    fontSize: 12,
    color: COLORS.textLight,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#000',
    marginLeft: 20,
    marginBottom: 15,
  },
  quickActionsContainer: {
    flexDirection: 'row',
    paddingHorizontal: 15,
    marginBottom: 25,
  },
  actionCard: {
    flex: 1,
    backgroundColor: COLORS.white,
    marginHorizontal: 5,
    padding: 20,
    borderRadius: 10,
    alignItems: 'center',
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
  },
  actionTitle: {
    marginTop: 10,
    fontSize: 14,
    fontWeight: '600',
    color: COLORS.text,
  },
  actionSubtitle: {
    fontSize: 11,
    color: COLORS.textLight,
    marginTop: 2,
  },
  recentClaimsHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingRight: 20,
    marginBottom: 10,
  },
  viewAllText: {
    color: COLORS.primary,
    fontSize: 14,
    fontWeight: '600',
  },
  claimsList: {
    paddingHorizontal: 20,
  },
  claimCard: {
    backgroundColor: COLORS.white,
    padding: 15,
    borderRadius: 10,
    marginBottom: 10,
    elevation: 1,
  },
  claimHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 5,
  },
  providerName: {
    fontSize: 16,
    color: COLORS.text,
  },
  statusText: {
    fontSize: 12,
    fontWeight: '600',
  },
  claimDate: {
    fontSize: 12,
    color: COLORS.textLight,
    marginBottom: 5,
  },
  claimAmount: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  bottomNav: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: COLORS.white,
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    paddingVertical: 10,
    borderTopWidth: 1,
    borderTopColor: '#EEE',
    paddingBottom: Platform.OS === 'ios' ? 20 : 10,
  },
  navItem: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  navText: {
    fontSize: 10,
    color: COLORS.gray,
    marginTop: 4,
  },
  activeNavText: {
    color: COLORS.primary,
  },
  badge: {
    position: 'absolute',
    top: -2,
    right: -2,
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: 'red',
  },
  simulationContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#F5F5F5',
  },
  simulationText: {
    marginTop: 20,
    fontSize: 18,
    color: COLORS.primary,
    fontWeight: '600',
  },
});
