import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  Alert,
  ScrollView,
} from "react-native";
import { MenuItem, CourseType } from "../types/menu";

interface AddEditScreenProps {
  editingItem: MenuItem | null;
  onSave: (itemData: Omit<MenuItem, "id"> & { id?: string }) => void;
  onCancel: () => void;
}

export default function AddEditScreen({
  editingItem,
  onSave,
  onCancel,
}: AddEditScreenProps) {
  const [name, setName] = useState(editingItem ? editingItem.name : "");
  const [description, setDescription] = useState(
    editingItem ? editingItem.description : "",
  );
  const [course, setCourse] = useState<CourseType>(
    editingItem ? editingItem.course : "Starter",
  );
  const [price, setPrice] = useState(
    editingItem ? editingItem.price.toString() : "",
  );

  const handleSave = () => {
    if (!name.trim() || !description.trim() || !price.trim()) {
      Alert.alert("Validation Error", "Please complete all fields.");
      return;
    }

    const numericPrice = parseFloat(price);
    if (isNaN(numericPrice) || numericPrice <= 0) {
      Alert.alert(
        "Validation Error",
        "Please enter a valid price greater than zero.",
      );
      return;
    }

    onSave({
      id: editingItem ? editingItem.id : undefined,
      name: name.trim(),
      description: description.trim(),
      course,
      price: numericPrice,
    });
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>
        {editingItem ? "Edit Dish" : "Add New Dish"}
      </Text>

      <Text style={styles.label}>Dish Name</Text>
      <TextInput
        style={styles.input}
        placeholder="Enter dish name"
        placeholderTextColor="#888"
        value={name}
        onChangeText={setName}
      />

      <Text style={styles.label}>Description</Text>
      <TextInput
        style={[styles.input, styles.textArea]}
        placeholder="Enter description"
        placeholderTextColor="#888"
        value={description}
        onChangeText={setDescription}
        multiline
      />

      <Text style={styles.label}>Course Category</Text>
      <View style={styles.courseRow}>
        {(["Starter", "Main Course", "Dessert"] as CourseType[]).map((c) => (
          <TouchableOpacity
            key={c}
            style={[
              styles.courseOption,
              course === c && styles.courseOptionActive,
            ]}
            onPress={() => setCourse(c)}
          >
            <Text
              style={[
                styles.courseOptionText,
                course === c && styles.courseOptionTextActive,
              ]}
            >
              {c}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      <Text style={styles.label}>Price (R)</Text>
      <TextInput
        style={styles.input}
        placeholder="0.00"
        placeholderTextColor="#888"
        keyboardType="numeric"
        value={price}
        onChangeText={setPrice}
      />

      <TouchableOpacity style={styles.saveButton} onPress={handleSave}>
        <Text style={styles.saveButtonText}>Save Dish</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.cancelButton} onPress={onCancel}>
        <Text style={styles.cancelButtonText}>Cancel</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { padding: 20, backgroundColor: "#f8f9fa", flexGrow: 1 },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#1e272e",
    marginBottom: 20,
    textAlign: "center",
  },
  label: { fontSize: 13, fontWeight: "600", color: "#2f3640", marginBottom: 6 },
  input: {
    backgroundColor: "#fff",
    padding: 10,
    borderRadius: 8,
    fontSize: 13,
    marginBottom: 14,
    borderWidth: 1,
    borderColor: "#dcdde1",
  },
  textArea: { height: 80, textAlignVertical: "top" },
  courseRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 14,
  },
  courseOption: {
    flex: 1,
    paddingVertical: 8,
    borderWidth: 1,
    borderColor: "#dcdde1",
    borderRadius: 6,
    alignItems: "center",
    marginHorizontal: 2,
    backgroundColor: "#fff",
  },
  courseOptionActive: { backgroundColor: "#1e272e", borderColor: "#1e272e" },
  courseOptionText: { fontSize: 11, color: "#57606f", fontWeight: "600" },
  courseOptionTextActive: { color: "#fff" },
  saveButton: {
    backgroundColor: "#2ed573",
    padding: 14,
    borderRadius: 8,
    alignItems: "center",
    marginTop: 10,
  },
  saveButtonText: { color: "#fff", fontSize: 14, fontWeight: "bold" },
  cancelButton: {
    backgroundColor: "#a4b0be",
    padding: 14,
    borderRadius: 8,
    alignItems: "center",
    marginTop: 10,
  },
  cancelButtonText: { color: "#fff", fontSize: 14, fontWeight: "bold" },
});
