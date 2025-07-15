import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Picker } from '@react-native-picker/picker';

type Location = {
  id: number;
  name: string;
};

interface Props {
  label: string;
  selectedValue: string;
  onValueChange: (value: string) => void;
  items: Location[];
}

const LocationPicker: React.FC<Props> = ({
  label,
  selectedValue,
  onValueChange,
  items,
}) => {
  return (
    <View style={styles.container}>
      <View style={styles.pickerWrapper}>
        <Picker
          selectedValue={selectedValue}
          onValueChange={onValueChange}
          style={styles.picker}
        >
          <Picker.Item label={label} value="" />
          {items.map(item => (
            <Picker.Item key={item.id} label={item.name} value={item.name} />
          ))}
        </Picker>
      </View>
    </View>
  );
};

export default LocationPicker;

const styles = StyleSheet.create({
  container: {
    marginBottom: 10,
  },
  pickerWrapper: {
    borderWidth: 1,
    borderColor: '#fff',
    borderRadius: 8,
    backgroundColor: '#f5eded',
    marginVertical: 5,
  },
  picker: {
    height: 55,
    color: '#333333',
  },
});
