import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  Alert,
} from 'react-native';
import LocationPicker from '../components/LocationPicker';
import DateTimePicker from '@react-native-community/datetimepicker';
import AsyncStorage from '@react-native-async-storage/async-storage';

const locations = [
  { id: 1, name: 'Dhaka' },
  { id: 2, name: 'Chittagong' },
  { id: 3, name: 'Sylhet' },
  { id: 4, name: 'Khulna' },
  { id: 5, name: 'Rajshahi' },
];

const HomeScreen = () => {
  const [loadLocation, setLoadLocation] = useState('');
  const [unloadLocation, setUnloadLocation] = useState('');
  const [date, setDate] = useState<Date | null>(null);
  const [showPicker, setShowPicker] = useState(false);

  const onChange = (_event: any, selectedDate?: Date) => {
    setShowPicker(false);
    if (selectedDate) {
      setDate(selectedDate);
    }
  };

  const clearData = () => {
    setLoadLocation('');
    setUnloadLocation('');
    setDate(null);
  };

  const handleCreateTrip = async () => {
    if (!loadLocation || !unloadLocation || !date) {
      Alert.alert('Error', 'Please fill in all fields');
      return;
    }

    try {
      const newTrip = {
        id: Date.now().toString(),
        loadLocation,
        unloadLocation,
        date: date.toISOString(),
      };

      const existingTripsRaw = await AsyncStorage.getItem('tripData');
      let tripArray: any[] = [];

      if (existingTripsRaw) {
        try {
          const parsed = JSON.parse(existingTripsRaw);
          if (Array.isArray(parsed)) {
            tripArray = parsed;
          }
        } catch (err) {
          console.warn('Existing trip data is corrupted:', err);
        }
      }

      tripArray.push(newTrip);

      await AsyncStorage.setItem('tripData', JSON.stringify(tripArray));
      Alert.alert('Success', 'Trip created successfully');
      clearData();
    } catch (error) {
      console.error('Create Trip Error:', error);
      Alert.alert('Error', 'Failed to create trip');
    }
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <View style={styles.content}>
          <Text style={styles.header}>Trip Planner</Text>
          <Text style={styles.title}>Design Your Trip</Text>

          <LocationPicker
            label="Load Location"
            selectedValue={loadLocation}
            onValueChange={setLoadLocation}
            items={locations}
          />
          <LocationPicker
            label="Unload Location"
            selectedValue={unloadLocation}
            onValueChange={setUnloadLocation}
            items={locations}
          />

          <TouchableOpacity
            style={styles.dateButton}
            onPress={() => setShowPicker(true)}
          >
            <Text style={styles.dateButtonText}>
              {date ? date.toDateString() : 'Date & Time'}
            </Text>
          </TouchableOpacity>

          {showPicker && (
            <DateTimePicker
              value={date || new Date()}
              mode="date"
              display={Platform.OS === 'ios' ? 'spinner' : 'default'}
              onChange={onChange}
            />
          )}

          <TouchableOpacity style={styles.button} onPress={handleCreateTrip}>
            <Text style={styles.buttonText}>Create Trip</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: '#fff',
  },
  scrollContainer: {
    marginTop: 30,
    justifyContent: 'center',
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    paddingHorizontal: 20,
  },
  header: {
    textAlign: 'center',
    fontSize: 26,
    fontWeight: 'bold',
    marginBottom: 30,
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#000000',
  },
  dateButton: {
    borderWidth: 1,
    borderColor: '#fff',
    borderRadius: 8,
    padding: 15,
    backgroundColor: '#f5eded',
    marginVertical: 5,
  },
  dateButtonText: {
    fontSize: 16,
    color: '#333333',
  },
  button: {
    backgroundColor: '#a70f0f',
    borderRadius: 6,
    paddingVertical: 14,
    alignItems: 'center',
    marginTop: 10,
  },
  buttonText: {
    color: '#fff',
    fontWeight: '600',
    fontSize: 16,
  },
});
