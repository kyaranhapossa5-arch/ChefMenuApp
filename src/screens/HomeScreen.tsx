import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  ScrollView,
  Alert,
  Platform,
} from "react-native";
import { MenuItem, FilterType } from "../types/menu";

interface HomeScreenProps {
  menuItems: MenuItem[];
  onAddPress: () => void;
  onEditPress: (item: MenuItem) => void;
  onDeletePress: (id: string) => void;
}

export default function HomeScreen({
  menuItems,
  onAddPress,
  onEditPress,
  onDeletePress,
}: HomeScreenProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedFilter, setSelectedFilter] = useState<FilterType>("All");

  const filteredItems = menuItems.filter((item) => {
    const matchesSearch = item.name
      .toLowerCase()
      .includes(searchQuery.toLowerCase());
    const matchesFilter =
      selectedFilter === "All" || item.course === selectedFilter;
    return matchesSearch && matchesFilter;
  });

  const totalItems = menuItems.length;
  const averagePrice =
    totalItems > 0
      ? (
          menuItems.reduce((acc, curr) => acc + Number(curr.price), 0) /
          totalItems
        ).toFixed(2)
      : "0.00";

  const countStarters = menuItems.filter((i) => i.course === "Starter").length;
  const countMains = menuItems.filter((i) => i.course === "Main Course").length;
  const countDesserts = menuItems.filter((i) => i.course === "Dessert").length;

  const handleDeleteClick = (id: string) => {
    if (Platform.OS === "web") {
      // Web-safe confirmation dialog
      if (window.confirm("Are you sure you want to remove this dish?")) {
        onDeletePress(id);
      }
    } else {
      // Native mobile alert confirmation
      Alert.alert(
        "Confirm Delete",
        "Remove this dish?",
        [
          { text: "Cancel", style: "cancel" },
          {
            text: "Delete",
            style: "destructive",
            onPress: () => onDeletePress(id),
          },
        ],
        { cancelable: true },
      );
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>🍽️️ Christoffel's Kitchen</Text>
        <Text style={styles.headerSubtitle}>
          Total Menu Items: {totalItems}
        </Text>
      </View>

      <ScrollView contentContainerStyle={styles.scrollContent}>
        <View style={styles.statsCard}>
          <Text style={styles.statsTitle}>Menu Statistics</Text>
          <Text style={styles.statsText}>Average Price: R {averagePrice}</Text>
          <View style={styles.badgeRow}>
            <Text style={styles.badge}>Starters: {countStarters}</Text>
            <Text style={styles.badge}>Mains: {countMains}</Text>
            <Text style={styles.badge}>Desserts: {countDesserts}</Text>
          </View>
        </View>

        <TextInput
          style={styles.searchInput}
          placeholder="Search dish by name..."
          placeholderTextColor="#888"
          value={searchQuery}
          onChangeText={setSearchQuery}
        />

        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          style={styles.filterContainer}
        >
          {(["All", "Starter", "Main Course", "Dessert"] as FilterType[]).map(
            (cat) => (
              <TouchableOpacity
                key={cat}
                style={[
                  styles.filterButton,
                  selectedFilter === cat && styles.filterButtonActive,
                ]}
                onPress={() => setSelectedFilter(cat)}
              >
                <Text
                  style={[
                    styles.filterText,
                    selectedFilter === cat && styles.filterTextActive,
                  ]}
                >
                  {cat}
                </Text>
              </TouchableOpacity>
            ),
          )}
        </ScrollView>

        <TouchableOpacity style={styles.addButton} onPress={onAddPress}>
          <Text style={styles.addButtonText}>+ Add New Dish</Text>
        </TouchableOpacity>

        <Text style={styles.sectionTitle}>Dishes ({filteredItems.length})</Text>
        {filteredItems.length === 0 ? (
          <Text style={styles.emptyText}>No dishes found.</Text>
        ) : (
          filteredItems.map((item) => (
            <View key={item.id} style={styles.card}>
              <View style={styles.cardHeader}>
                <Text style={styles.dishName}>{item.name}</Text>
                <Text style={styles.dishPrice}>
                  R {Number(item.price).toFixed(2)}
                </Text>
              </View>
              <Text style={styles.dishCourse}>Course: {item.course}</Text>
              <Text style={styles.dishDesc}>{item.description}</Text>

              <View style={styles.cardActions}>
                <TouchableOpacity
                  style={styles.editBtn}
                  onPress={() => onEditPress(item)}
                >
                  <Text style={styles.actionText}>Edit</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={styles.deleteBtn}
                  onPress={() => handleDeleteClick(item.id)}
                >
                  <Text style={styles.actionText}>Delete</Text>
                </TouchableOpacity>
              </View>
            </View>
          ))
        )}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#f8f9fa" },
  header: { backgroundColor: "#1e272e", padding: 20, paddingTop: 45 },
  headerTitle: { color: "#fff", fontSize: 20, fontWeight: "bold" },
  headerSubtitle: { color: "#dcdde1", fontSize: 13, marginTop: 4 },
  scrollContent: { padding: 16, paddingBottom: 30 },
  statsCard: {
    backgroundColor: "#fff",
    borderRadius: 8,
    padding: 14,
    marginBottom: 14,
    elevation: 2,
  },
  statsTitle: {
    fontSize: 15,
    fontWeight: "bold",
    color: "#2f3640",
    marginBottom: 6,
  },
  statsText: {
    fontSize: 13,
    color: "#353b48",
    marginBottom: 8,
    fontWeight: "600",
  },
  badgeRow: { flexDirection: "row", justifyContent: "space-between" },
  badge: {
    fontSize: 11,
    backgroundColor: "#f1f2f6",
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 4,
    color: "#2f3640",
  },
  searchInput: {
    backgroundColor: "#fff",
    padding: 10,
    borderRadius: 8,
    fontSize: 13,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: "#dcdde1",
  },
  filterContainer: { flexDirection: "row", marginBottom: 14 },
  filterButton: {
    paddingHorizontal: 14,
    paddingVertical: 7,
    backgroundColor: "#dfe4ea",
    borderRadius: 16,
    marginRight: 8,
    height: 34,
  },
  filterButtonActive: { backgroundColor: "#1e272e" },
  filterText: { color: "#57606f", fontSize: 12, fontWeight: "600" },
  filterTextActive: { color: "#fff" },
  addButton: {
    backgroundColor: "#2ed573",
    padding: 12,
    borderRadius: 8,
    alignItems: "center",
    marginBottom: 16,
  },
  addButtonText: { color: "#fff", fontSize: 14, fontWeight: "bold" },
  sectionTitle: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#1e272e",
    marginBottom: 10,
  },
  emptyText: {
    textAlign: "center",
    color: "#718093",
    marginTop: 15,
    fontStyle: "italic",
  },
  card: {
    backgroundColor: "#fff",
    borderRadius: 8,
    padding: 14,
    marginBottom: 10,
    elevation: 1,
    borderWidth: 1,
    borderColor: "#f1f2f6",
  },
  cardHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 4,
  },
  dishName: { fontSize: 15, fontWeight: "bold", color: "#1e272e", flex: 1 },
  dishPrice: { fontSize: 15, fontWeight: "bold", color: "#ff4757" },
  dishCourse: {
    fontSize: 11,
    color: "#718093",
    marginBottom: 4,
    fontStyle: "italic",
  },
  dishDesc: { fontSize: 13, color: "#2f3640", marginBottom: 10 },
  cardActions: {
    flexDirection: "row",
    justifyContent: "flex-end",
    borderTopWidth: 1,
    borderTopColor: "#f1f2f6",
    paddingTop: 8,
  },
  editBtn: {
    backgroundColor: "#ffa502",
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 4,
    marginRight: 6,
  },
  deleteBtn: {
    backgroundColor: "#ff4757",
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 4,
  },
  actionText: { color: "#fff", fontSize: 11, fontWeight: "bold" },
});
