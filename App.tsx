import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  Alert,
  SafeAreaView,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
} from "react-native";

// Define Course Types
type CourseType = "Starters" | "Mains" | "Desserts";

// Define Menu Item Interface
interface MenuItem {
  id: string;
  dishName: string;
  description: string;
  course: CourseType;
  price: string;
}

const COURSES: CourseType[] = ["Starters", "Mains", "Desserts"];

export default function App() {
  // Input States
  const [dishName, setDishName] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [course, setCourse] = useState<CourseType>("Starters");
  const [price, setPrice] = useState<string>("");

  // Data State
  const [menuItems, setMenuItems] = useState<MenuItem[]>([]);

  // Validation Error State
  const [errorMessage, setErrorMessage] = useState<string>("");

  const handleAddItem = () => {
    // 1. Validation for Required Fields
    if (!dishName.trim() || !description.trim() || !price.trim()) {
      setErrorMessage("Please fill in all required fields.");
      return;
    }

    // 2. Price Validation (Must be a positive number)
    const numericPrice = parseFloat(price);
    if (isNaN(numericPrice) || numericPrice <= 0) {
      setErrorMessage("Please enter a valid price.");
      return;
    }

    // Clear any existing error
    setErrorMessage("");

    // Construct new menu item object with Rand currency symbol
    const newItem: MenuItem = {
      id: Date.now().toString(),
      dishName: dishName.trim(),
      description: description.trim(),
      course,
      price: `R ${numericPrice.toFixed(2)}`,
    };

    // Update list dynamically
    setMenuItems((prevItems) => [newItem, ...prevItems]);

    // Clear form inputs
    setDishName("");
    setDescription("");
    setCourse("Starters");
    setPrice("");

    // Confirmation Alert
    Alert.alert("Success", "Menu item added successfully!");
  };

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={{ flex: 1 }}
      >
        <ScrollView contentContainerStyle={styles.scrollContainer}>
          {/* Application Header */}
          <Text style={styles.title}>Chef's Menu Manager</Text>

          {/* Form Section */}
          <View style={styles.formContainer}>
            <Text style={styles.sectionHeader}>Add New Item</Text>

            {/* Dish Name */}
            <Text style={styles.label}>Dish Name *</Text>
            <TextInput
              style={styles.input}
              placeholder="e.g., Grilled Salmon"
              placeholderTextColor="#A0AEC0"
              value={dishName}
              onChangeText={setDishName}
            />

            {/* Description */}
            <Text style={styles.label}>Description *</Text>
            <TextInput
              style={[styles.input, styles.textArea]}
              placeholder="e.g., Served with fresh herbs and lemon butter"
              placeholderTextColor="#A0AEC0"
              value={description}
              onChangeText={setDescription}
              multiline
              numberOfLines={3}
            />

            {/* Course Selector */}
            <Text style={styles.label}>Course</Text>
            <View style={styles.courseContainer}>
              {COURSES.map((item) => (
                <TouchableOpacity
                  key={item}
                  style={[
                    styles.courseButton,
                    course === item && styles.courseButtonSelected,
                  ]}
                  onPress={() => setCourse(item)}
                >
                  <Text
                    style={[
                      styles.courseButtonText,
                      course === item && styles.courseButtonTextSelected,
                    ]}
                  >
                    {item}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>

            {/* Price Input */}
            <Text style={styles.label}>Price (R) *</Text>
            <TextInput
              style={styles.input}
              placeholder="e.g., 180.00"
              placeholderTextColor="#A0AEC0"
              value={price}
              onChangeText={setPrice}
              keyboardType="numeric"
            />

            {/* Inline Error Message */}
            {errorMessage !== "" && (
              <Text style={styles.errorText}>{errorMessage}</Text>
            )}

            {/* Action Button */}
            <TouchableOpacity style={styles.addButton} onPress={handleAddItem}>
              <Text style={styles.addButtonText}>Add Menu Item</Text>
            </TouchableOpacity>
          </View>

          {/* Display Menu Items Section */}
          <View style={styles.listContainer}>
            <Text style={styles.sectionHeader}>
              Current Menu ({menuItems.length})
            </Text>

            {menuItems.length === 0 ? (
              // Empty State Message
              <View style={styles.emptyState}>
                <Text style={styles.emptyText}>
                  No menu items added yet. Use the form above to add dishes.
                </Text>
              </View>
            ) : (
              // List Display
              menuItems.map((item) => (
                <View key={item.id} style={styles.card}>
                  <View style={styles.cardHeader}>
                    <Text style={styles.dishTitle}>{item.dishName}</Text>
                    {/* Rendered directly as R XX.XX */}
                    <Text style={styles.dishPrice}>{item.price}</Text>
                  </View>
                  <Text style={styles.courseTag}>{item.course}</Text>
                  <Text style={styles.dishDescription}>{item.description}</Text>
                </View>
              ))
            )}
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F8F9FA",
  },
  scrollContainer: {
    padding: 20,
  },
  title: {
    fontSize: 26,
    fontWeight: "bold",
    color: "#2C3E50",
    textAlign: "center",
    marginVertical: 15,
  },
  formContainer: {
    backgroundColor: "#FFFFFF",
    borderRadius: 12,
    padding: 16,
    elevation: 3,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    marginBottom: 20,
  },
  sectionHeader: {
    fontSize: 18,
    fontWeight: "600",
    color: "#34495E",
    marginBottom: 12,
  },
  label: {
    fontSize: 14,
    fontWeight: "500",
    color: "#7F8C8D",
    marginBottom: 4,
    marginTop: 8,
  },
  input: {
    borderWidth: 1,
    borderColor: "#BDC3C7",
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 10,
    fontSize: 15,
    backgroundColor: "#FAFAFA",
  },
  textArea: {
    height: 70,
    textAlignVertical: "top",
  },
  courseContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginVertical: 6,
  },
  courseButton: {
    flex: 1,
    paddingVertical: 10,
    borderWidth: 1,
    borderColor: "#BDC3C7",
    borderRadius: 8,
    alignItems: "center",
    marginHorizontal: 3,
    backgroundColor: "#FAFAFA",
  },
  courseButtonSelected: {
    backgroundColor: "#0e0d0d",
  },
  courseButtonText: {
    fontSize: 13,
    color: "#2C3E50",
    fontWeight: "500",
  },
  courseButtonTextSelected: {
    color: "#FFFFFF",
    fontWeight: "bold",
  },
  addButton: {
    backgroundColor: "#C00000",
    borderRadius: 8,
    paddingVertical: 12,
    alignItems: "center",
    marginTop: 15,
  },
  addButtonText: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "bold",
  },
  errorText: {
    color: "#E74C3C",
    fontSize: 13,
    marginTop: 8,
    fontWeight: "500",
  },
  listContainer: {
    marginTop: 10,
  },
  emptyState: {
    backgroundColor: "#FFFFFF",
    padding: 20,
    borderRadius: 12,
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#ECF0F1",
  },
  emptyText: {
    color: "#95A5A6",
    textAlign: "center",
    fontSize: 14,
  },
  card: {
    backgroundColor: "#FFFFFF",
    borderRadius: 10,
    padding: 14,
    marginBottom: 12,
    elevation: 2,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.08,
    shadowRadius: 3,
  },
  cardHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  dishTitle: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#2C3E50",
  },
  dishPrice: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#27AE60",
  },
  courseTag: {
    fontSize: 12,
    color: "#E74C3C",
    fontWeight: "600",
    marginTop: 2,
    marginBottom: 6,
    textTransform: "uppercase",
  },
  dishDescription: {
    fontSize: 14,
    color: "#7F8C8D",
    lineHeight: 18,
  },
});
