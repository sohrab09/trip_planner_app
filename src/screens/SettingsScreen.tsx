import React, { useContext, useState } from 'react';
import { Text, Image, StyleSheet, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { AuthContext } from '../context/AuthContext';

const SettingsScreen: React.FC = () => {
  const { user, logout } = useContext(AuthContext);
  const [loading, setLoading] = useState(false);

  const handleLogout = () => {
    setLoading(true);
    logout();
  };

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.heading}>Settings</Text>
      <Image
        source={require('../assets/programmer.png')}
        style={styles.avatar}
      />

      <Text style={styles.name}>{user && user.name}</Text>
      <Text style={styles.email}>{user && user.email}</Text>

      <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
        <Text style={styles.buttonText}>
          {loading ? 'Logging out...' : 'Logout'}
        </Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

export default SettingsScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'flex-start',
    paddingTop: 20,
  },
  heading: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  avatar: {
    backgroundColor: '#fce1cd',
    width: 120,
    height: 120,
    borderRadius: 60,
    marginBottom: 16,
  },
  name: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  email: {
    fontSize: 14,
    color: '#777',
    marginBottom: 40,
  },
  logoutButton: {
    backgroundColor: '#B91C1C',
    paddingVertical: 12,
    paddingHorizontal: 150,
    borderRadius: 8,
    position: 'absolute',
    bottom: 20,
  },
  logoutText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  buttonText: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: '600',
  },
});
