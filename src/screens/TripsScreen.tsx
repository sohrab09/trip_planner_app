import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  Image,
  SafeAreaView,
  TouchableWithoutFeedback,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { formatDate, formatTime } from '../utils/format';
import Modals from '../components/Modals';

interface Trip {
  id: string;
  date: string;
  loadLocation: string;
  unloadLocation: string;
  image: string;
}

const TripsScreen: React.FC = () => {
  const [trips, setTrips] = useState<Trip[]>([]);
  const [selectedTrip, setSelectedTrip] = useState<Trip | null>(null);
  const [modalVisible, setModalVisible] = useState(false);
  const [refreshing, setRefreshing] = useState(false);

  const getAllTrips = async (): Promise<any[]> => {
    try {
      const trip = await AsyncStorage.getItem('tripData');
      return trip ? JSON.parse(trip) : [];
    } catch (error) {
      console.error('Failed to load trips:', error);
      return [];
    }
  };

  const fetchTrips = React.useCallback(async () => {
    setRefreshing(true);
    const storedTrips = await getAllTrips();
    setTrips(storedTrips);
    setRefreshing(false);
  }, []);

  useEffect(() => {
    fetchTrips();
  }, [fetchTrips]);

  const openDeleteModal = (trip: Trip) => {
    setSelectedTrip(trip);
    setModalVisible(true);
  };

  const deleteTrip = async () => {
    if (!selectedTrip) return;

    try {
      const updatedTrips = trips.filter(trip => trip.id !== selectedTrip.id);
      setTrips(updatedTrips);
      await AsyncStorage.setItem('tripData', JSON.stringify(updatedTrips));
    } catch (error) {
      console.error('Failed to delete trip:', error);
    } finally {
      setModalVisible(false);
      setSelectedTrip(null);
    }
  };

  const renderItem = ({ item }: { item: Trip }) => (
    <TouchableWithoutFeedback onLongPress={() => openDeleteModal(item)}>
      <View style={styles.tripItem}>
        <View>
          <Text style={styles.routeText}>
            {item.loadLocation} → {item.unloadLocation}
          </Text>
          <Text style={styles.dateText}>
            {formatDate(item.date)} · {formatTime(item.date)}
          </Text>
        </View>
        <Image
          source={require('../assets/icon.png')}
          style={styles.tripImage}
        />
      </View>
    </TouchableWithoutFeedback>
  );

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.heading}>Your Trips</Text>
      <FlatList
        data={trips}
        keyExtractor={item => item.id}
        renderItem={renderItem}
        contentContainerStyle={
          trips.length === 0 ? styles.noTripContainer : styles.flatListContent
        }
        ListEmptyComponent={
          <Text style={styles.noTripHeading}>No Trips Found</Text>
        }
        refreshing={refreshing}
        onRefresh={fetchTrips}
      />
      <Modals
        deleteTrip={deleteTrip}
        modalVisible={modalVisible}
        setModalVisible={setModalVisible}
      />
    </SafeAreaView>
  );
};

export default TripsScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingTop: 16,
    paddingHorizontal: 16,
  },
  heading: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 20,
    alignSelf: 'center',
  },
  tripItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 12,
    marginBottom: 16,
    backgroundColor: '#fcf3f3ff',
    borderRadius: 10,
    elevation: 1,
    shadowColor: '#ccc',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.3,
    shadowRadius: 2,
  },
  routeText: {
    fontSize: 14,
    color: '#555',
    marginBottom: 4,
  },
  dateText: {
    fontSize: 15,
    fontWeight: 'bold',
  },
  tripImage: {
    width: 60,
    height: 60,
    borderRadius: 8,
    resizeMode: 'cover',
    paddingHorizontal: 10,
    paddingVertical: 10,
    tintColor: '#000',
  },
  flatListContent: {
    paddingBottom: 100,
  },
  noTripContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  noTripHeading: {
    fontSize: 25,
    fontWeight: 'bold',
    color: '#555',
  },
});
