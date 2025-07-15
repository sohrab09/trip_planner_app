import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  Modal,
  TouchableWithoutFeedback,
  Alert,
} from 'react-native';
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
  const [locationType, setLocationType] = useState<'load' | 'unload' | null>(
    null,
  );
  const [locationModalVisible, setLocationModalVisible] = useState(false);

  // Error states
  const [loadError, setLoadError] = useState('');
  const [unloadError, setUnloadError] = useState('');
  const [dateError, setDateError] = useState('');

  const onChange = (event: any, selectedDate?: Date) => {
    if (event.type === 'set' && selectedDate) {
      setDate(selectedDate);
      setDateError('');
    }
    setShowPicker(false);
  };

  const clearData = () => {
    setLoadLocation('');
    setUnloadLocation('');
    setDate(null);
    setLoadError('');
    setUnloadError('');
    setDateError('');
  };

  const handleCreateTrip = async () => {
    let valid = true;

    if (!loadLocation) {
      setLoadError('Please select a load location');
      valid = false;
    } else {
      setLoadError('');
    }

    if (!unloadLocation) {
      setUnloadError('Please select an unload location');
      valid = false;
    } else {
      setUnloadError('');
    }

    if (!date) {
      setDateError('Please select a date');
      valid = false;
    } else {
      setDateError('');
    }

    if (!valid) return;

    try {
      const newTrip = {
        id: Date.now().toString(),
        loadLocation,
        unloadLocation,
        date: date?.toISOString(),
      };

      const existingTripsRaw = await AsyncStorage.getItem('tripData');
      let tripArray: any[] = [];

      if (existingTripsRaw) {
        const parsed = JSON.parse(existingTripsRaw);
        if (Array.isArray(parsed)) {
          tripArray = parsed;
        }
      }

      tripArray.push(newTrip);
      await AsyncStorage.setItem('tripData', JSON.stringify(tripArray));
      clearData();
      Alert.alert('Trip created successfully!');
    } catch (error) {
      console.error('Create Trip Error:', error);
      Alert.alert('Failed to create trip');
    }
  };

  const openLocationModal = (type: 'load' | 'unload') => {
    setLocationType(type);
    setLocationModalVisible(true);
  };

  const handleSelectLocation = (location: string) => {
    if (locationType === 'load') {
      setLoadLocation(location);
      setLoadError('');
    } else if (locationType === 'unload') {
      setUnloadLocation(location);
      setUnloadError('');
    }
    setLocationModalVisible(false);
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

          {/* Load Location */}
          <TouchableOpacity
            style={styles.locationButton}
            onPress={() => openLocationModal('load')}
          >
            <Text style={styles.locationButtonText}>
              {loadLocation || 'Load Location'}
            </Text>
          </TouchableOpacity>
          {loadError ? <Text style={styles.errorText}>{loadError}</Text> : null}

          {/* Unload Location */}
          <TouchableOpacity
            style={styles.locationButton}
            onPress={() => openLocationModal('unload')}
          >
            <Text style={styles.locationButtonText}>
              {unloadLocation || 'Unload Location'}
            </Text>
          </TouchableOpacity>
          {unloadError ? (
            <Text style={styles.errorText}>{unloadError}</Text>
          ) : null}

          {/* Date Picker */}
          <TouchableOpacity
            style={styles.dateButton}
            onPress={() => setShowPicker(true)}
          >
            <Text style={styles.dateButtonText}>
              {date ? date.toDateString() : 'Select Date & Time'}
            </Text>
          </TouchableOpacity>
          {dateError ? <Text style={styles.errorText}>{dateError}</Text> : null}

          {showPicker && (
            <DateTimePicker
              value={date || new Date()}
              mode="date"
              display={Platform.OS === 'ios' ? 'spinner' : 'default'}
              onChange={onChange}
            />
          )}

          {/* Create Button */}
          <TouchableOpacity style={styles.button} onPress={handleCreateTrip}>
            <Text style={styles.buttonText}>Create Trip</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>

      {/* Location Modal */}
      <Modal
        visible={locationModalVisible}
        animationType="slide"
        transparent
        onRequestClose={() => setLocationModalVisible(false)}
      >
        <TouchableWithoutFeedback
          onPress={() => setLocationModalVisible(false)}
        >
          <View style={styles.modalOverlay}>
            <TouchableWithoutFeedback>
              <View style={styles.bottomModal}>
                <View style={styles.modalHandle} />
                <Text style={styles.modalTitle}>
                  Select {locationType === 'load' ? 'Load' : 'Unload'} Location
                </Text>

                {locations.map(loc => (
                  <TouchableOpacity
                    key={loc.id}
                    style={styles.locationOption}
                    onPress={() => handleSelectLocation(loc.name)}
                  >
                    <Text style={styles.locationText}>{loc.name}</Text>
                    <Text style={styles.arrow}>→</Text>
                  </TouchableOpacity>
                ))}
              </View>
            </TouchableWithoutFeedback>
          </View>
        </TouchableWithoutFeedback>
      </Modal>
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
  locationButton: {
    borderWidth: 1,
    borderColor: '#fff',
    borderRadius: 8,
    padding: 15,
    backgroundColor: '#f5eded',
    marginBottom: 10,
  },
  locationButtonText: {
    fontSize: 16,
    color: '#333333',
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
  errorText: {
    color: '#d11a2a',
    marginTop: -5,
    marginBottom: 10,
    fontSize: 14,
    marginLeft: 4,
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
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'flex-end',
  },
  bottomModal: {
    backgroundColor: '#fff',
    paddingVertical: 20,
    paddingHorizontal: 16,
    maxHeight: '50%',
  },
  modalHandle: {
    width: 40,
    height: 4,
    backgroundColor: '#ccc',
    alignSelf: 'center',
    borderRadius: 2,
    marginBottom: 10,
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  locationOption: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 12,
    borderBottomColor: '#eee',
    borderBottomWidth: 1,
  },
  locationText: {
    fontSize: 16,
    color: '#000',
  },
  arrow: {
    fontSize: 18,
    color: '#999',
  },
});
