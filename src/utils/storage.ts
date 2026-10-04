import AsyncStorage from "@react-native-async-storage/async-storage";
import { MenuItem } from "../types/menu";

const STORAGE_KEY = "@christoffels_kitchen_menu_v1";

export const INITIAL_MENU: MenuItem[] = [
  {
    id: "1",
    name: "Garlic Butter Prawns",
    description: "Sautéed king prawns in garlic, white wine, and butter sauce.",
    course: "Starter",
    price: 129.99,
  },
  {
    id: "2",
    name: "Grilled Ribeye Steak",
    description:
      "300g grass-fed beef served with rosemary jus and steak fries.",
    course: "Main Course",
    price: 245.0,
  },
  {
    id: "3",
    name: "Malva Pudding",
    description: "Traditional baked sponge pudding served with warm custard.",
    course: "Dessert",
    price: 85.0,
  },
];

export async function loadMenuItems(): Promise<MenuItem[]> {
  try {
    const data = await AsyncStorage.getItem(STORAGE_KEY);
    if (!data) {
      await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(INITIAL_MENU));
      return INITIAL_MENU;
    }
    return JSON.parse(data);
  } catch (error) {
    console.error("Failed to load menu items", error);
    return INITIAL_MENU;
  }
}

export async function saveMenuItems(items: MenuItem[]): Promise<void> {
  try {
    await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(items));
  } catch (error) {
    console.error("Failed to save menu items", error);
  }
}
