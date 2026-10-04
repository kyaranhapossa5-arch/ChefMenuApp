import React, { useState, useEffect } from "react";
import { StyleSheet, View, ActivityIndicator } from "react-native";
import { MenuItem } from "./src/types/menu";
import { loadMenuItems, saveMenuItems } from "./src/utils/storage";
import HomeScreen from "./src/screens/HomeScreen";
import AddEditScreen from "./src/screens/AddEditScreen";

type ScreenState = "HOME" | "ADD_EDIT";

export default function App() {
  const [menuItems, setMenuItems] = useState<MenuItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [currentScreen, setCurrentScreen] = useState<ScreenState>("HOME");
  const [editingItem, setEditingItem] = useState<MenuItem | null>(null);

  useEffect(() => {
    async function initializeApp() {
      const storedItems = await loadMenuItems();
      setMenuItems(storedItems);
      setLoading(false);
    }
    initializeApp();
  }, []);

  const handleSaveItem = async (
    itemData: Omit<MenuItem, "id"> & { id?: string },
  ) => {
    let updatedList: MenuItem[];
    if (itemData.id) {
      updatedList = menuItems.map((item) =>
        item.id === itemData.id ? ({ ...item, ...itemData } as MenuItem) : item,
      );
    } else {
      const newItem: MenuItem = {
        id: Date.now().toString(),
        name: itemData.name,
        description: itemData.description,
        course: itemData.course,
        price: itemData.price,
      };
      updatedList = [...menuItems, newItem];
    }

    setMenuItems(updatedList);
    await saveMenuItems(updatedList);
    setCurrentScreen("HOME");
    setEditingItem(null);
  };

  const handleDeleteItem = async (id: string) => {
    const updatedList = menuItems.filter((item) => item.id !== id);
    setMenuItems(updatedList);
    await saveMenuItems(updatedList);
  };

  if (loading) {
    return (
      <View style={styles.loaderContainer}>
        <ActivityIndicator size="large" color="#1e272e" />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      {currentScreen === "HOME" ? (
        <HomeScreen
          menuItems={menuItems}
          onAddPress={() => {
            setEditingItem(null);
            setCurrentScreen("ADD_EDIT");
          }}
          onEditPress={(item) => {
            setEditingItem(item);
            setCurrentScreen("ADD_EDIT");
          }}
          onDeletePress={handleDeleteItem}
        />
      ) : (
        <AddEditScreen
          editingItem={editingItem}
          onSave={handleSaveItem}
          onCancel={() => {
            setCurrentScreen("HOME");
            setEditingItem(null);
          }}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#f8f9fa" },
  loaderContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#f8f9fa",
  },
});
