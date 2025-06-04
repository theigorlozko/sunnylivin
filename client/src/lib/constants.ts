/**
 * ------------------------------
 * 🌿 CONSTANTS FILE – Purpose & Structure
 * ------------------------------
 * This file defines shared enums, icons, and reference values 
 * used across the application for consistency in form inputs, filtering, 
 * and visual rendering (e.g. icons on cards or maps).
 *
 * 📌 Why this exists:
 * - Centralizes all enums (like product categories, shop types)
 * - Ensures consistent labels across forms, filters, and UI
 * - Prevents typos or mismatches in category names
 * - Associates each type with the correct icon component
 *
 * 🧩 Main Sections:
 * 1. ✅ HighlightEnum & HighlightIcons – Unique selling points of the *shop*
 * 2. ✅ ProductCategoryEnum – Main food groups (Milk, Cheese, etc.)
 * 3. ✅ ProductSubcategories – Sub-selection options per category (e.g. Goat, Cow)
 * 4. ✅ ProductTags – Optional labels for filtering (e.g. Raw, Organic)
 * 5. ✅ VendorShopType & Icons – Type of shop (Bakery, Farm, Van, etc.)
 * 6. ✅ NAVBAR_HEIGHT – Shared layout constant
 *
 * 🔄 Usage:
 * - Used in frontend form dropdowns, filters, map rendering
 * - Makes the app easier to scale and maintain
 */

import { LucideIcon, Leaf, Handshake, Recycle, Flame, Gift, Sparkles, BadgeCheck, Users, Globe, Sun, HandPlatter, HandCoins, PackageCheck, Sprout } from "lucide-react";
import {
  FaFish, FaDrumstickBite, FaCookie, FaLeaf, FaWineBottle, FaHome, FaTruck, FaFlask, FaCarrot, FaEgg,
  FaSeedling, FaCheese, FaAppleAlt, FaSoap, FaStore, FaGlassWhiskey, FaFireAlt, FaBreadSlice, FaHammer,
  FaMugHot, FaCut
} from "react-icons/fa";

// ✅ 1. Shop Highlights (USPs shown on map/shop cards)
export enum HighlightEnum {
    Organic = "Organic",
    FreeRange = "FreeRange",
    GrassFed = "GrassFed",
    LocallySourced = "LocallySourced",
    FamilyOwned = "FamilyOwned",
    SeasonalOnly = "SeasonalOnly",
    Seasonal = "Seasonal",
    ZeroWaste = "ZeroWaste",
    RenewableEnergy = "RenewableEnergy",
    Biodynamic = "Biodynamic",
    HeritageBreeds = "HeritageBreeds",
    FarmToursAvailable = "FarmToursAvailable",
    SmallBatch = "SmallBatch",
    SustainablePackaging = "SustainablePackaging",
    HandCrafted = "HandCrafted",
    WomanOwned = "WomanOwned",
    Sustainable = "Sustainable",
  }
  
  export const HighlightIcons: Record<HighlightEnum, LucideIcon> = {
    Organic: Leaf,
    FreeRange: Handshake,
    GrassFed: Sprout,
    LocallySourced: Globe,
    FamilyOwned: Users,
    SeasonalOnly: Sun,
    Seasonal: Sun,
    ZeroWaste: Recycle,
    RenewableEnergy: Flame,
    Biodynamic: Sparkles,
    HeritageBreeds: BadgeCheck,
    FarmToursAvailable: HandPlatter,
    SmallBatch: HandCoins,
    SustainablePackaging: PackageCheck,
    HandCrafted: Handshake,
    WomanOwned: Gift,
    Sustainable: Leaf,
  };
  
  // ✅ 2. Product Categories, Subcategories & Tags
  export enum ProductCategoryEnum {
    Milk = "Milk",
    Eggs = "Eggs",
    Cheese = "Cheese",
    Vegetables = "Vegetables",
    Fruits = "Fruits",
    Honey = "Honey",
    BakedGoods = "BakedGoods",
    Meat = "Meat",
    Fish = "Fish",
    Jam = "Jam",
    Juice = "Juice",
    Kombucha = "Kombucha",
    Tea = "Tea",
    Coffee = "Coffee",
    Butter = "Butter",
    Yoghurt = "Yoghurt",
    Chutney = "Chutney",
    Pickles = "Pickles",
  }
  
  export const ProductCategoryIcons: Record<ProductCategoryEnum, React.ComponentType> = {
    Milk: FaGlassWhiskey,
    Eggs: FaEgg,
    Cheese: FaCheese,
    Vegetables: FaCarrot,
    Fruits: FaAppleAlt,
    Honey: FaSeedling,
    BakedGoods: FaBreadSlice,
    Meat: FaDrumstickBite,
    Fish: FaFish,
    Jam: FaAppleAlt,
    Juice: FaWineBottle,
    Kombucha: FaFlask,
    Tea: FaMugHot,
    Coffee: FaMugHot,
    Butter: FaBreadSlice,
    Yoghurt: FaGlassWhiskey,
    Chutney: FaFlask,
    Pickles: FaFlask,
  };
  
  export const ProductSubcategories: Record<ProductCategoryEnum, string[]> = {
    Milk: ["Cow", "Goat", "Sheep", "Buffalo", "Raw", "Pasteurised"],
    Eggs: ["Hen", "Duck", "Quail"],
    Cheese: ["Goat", "Cow", "Aged", "Soft", "Hard", "Raw Milk", "Smoked", "Blue"],
    Vegetables: ["Leafy", "Root", "Brassica", "Seasonal", "Tunnel-grown"],
    Fruits: ["Citrus", "Berries", "Pome", "Stone", "Preserved"],
    Honey: ["Raw", "Creamed", "Heather", "Infused"],
    BakedGoods: ["Sourdough", "Brown Bread", "Pastries", "Scones", "Barmbrack"],
    Meat: ["Beef", "Pork", "Lamb", "Goat", "Game", "Chicken", "Turkey"],
    Fish: ["Smoked", "Fresh", "Shellfish", "Tinned"],
    Jam: ["Raspberry", "Blackberry", "Strawberry", "Mixed", "Low Sugar"],
    Juice: ["Apple", "Beetroot", "Carrot", "Blends"],
    Kombucha: ["Original", "Flavoured", "Ginger", "Berry"],
    Tea: ["Green", "Black", "Chamomile", "Nettle", "Herbal Blend"],
    Coffee: ["Whole Bean", "Ground", "Cold Brew"],
    Butter: ["Salted", "Unsalted", "Cultured", "Goat"],
    Yoghurt: ["Natural", "Greek Style", "Goat", "Flavoured"],
    Chutney: ["Apple", "Tomato", "Spicy", "Relish"],
    Pickles: ["Onions", "Cabbage", "Beetroot", "Mixed"],
  };
  
  export const ProductTags = [
    "Organic",
    "Raw",
    "Pasteurised",
    "Grass-Fed",
    "Free-Range",
    "Local",
    "Handmade",
    "Preservative-Free",
    "Sugar-Free",
    "Gluten-Free",
    "Vegetarian",
    "Vegan",
    "Low Sugar",
    "Chilled",
    "Frozen",
    "Unfiltered",
    "Seasonal",
    "Biodynamic",
    "Small Batch",
    "Fermented",
  ];
  
  // ✅ 3. Vendor Shop Types — including UK/IE-appropriate
  export enum VendorShopType {
    Farm = "Farm",
    DairyFarm = "DairyFarm",
    Beekeeper = "Beekeeper",
    Orchard = "Orchard",
    Vineyard = "Vineyard",
    Butcher = "Butcher",
    Fishery = "Fishery",
    PoultryFarm = "PoultryFarm",
    MarketStall = "MarketStall",
    RoadsideStand = "RoadsideStand",
    SmallShop = "SmallShop",
    GardenShed = "GardenShed",
    CommunityMarket = "CommunityMarket",
    Van = "Van",
    OnlineOnly = "OnlineOnly",
    HomeKitchen = "HomeKitchen",
    Bakery = "Bakery",
    CoffeeRoaster = "CoffeeRoaster",
    Herbalist = "Herbalist",
    UrbanGrower = "UrbanGrower",
    MushroomFarm = "MushroomFarm",
  }
  
  export const VendorShopTypeIcons: Record<VendorShopType, React.ComponentType> = {
    Farm: FaSeedling,
    DairyFarm: FaGlassWhiskey,
    Beekeeper: FaSeedling,
    Orchard: FaAppleAlt,
    Vineyard: FaWineBottle,
    Butcher: FaDrumstickBite,
    Fishery: FaFish,
    PoultryFarm: FaDrumstickBite,
    MarketStall: FaStore,
    RoadsideStand: FaStore,
    SmallShop: FaStore,
    GardenShed: FaHome,
    CommunityMarket: FaStore,
    Van: FaTruck,
    OnlineOnly: FaWineBottle,
    HomeKitchen: FaCookie,
    Bakery: FaBreadSlice,
    CoffeeRoaster: FaMugHot,
    Herbalist: FaLeaf,
    UrbanGrower: FaSeedling,
    MushroomFarm: FaSeedling,
  };
  
  // ✅ Misc
  export const NAVBAR_HEIGHT = 54;



// - Product Name: Goat Cheese – Aged 12 Months
// - Main Category: Cheese (from `ProductCategoryEnum`)
// - Subcategory: Goat (from `ProductSubcategories[Cheese]`)
// - Tags: [Raw, Handmade, Seasonal] (multi-select from `ProductTags`)
// - Description: “Small batch goat cheese from our alpine herd…”
// - Price
// - Images


