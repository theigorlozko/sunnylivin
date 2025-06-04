/**
 * ------------------------------
 * 🛡️ SCHEMAS FILE – Purpose & Structure
 * ------------------------------
 * This file defines Zod schemas for validating and typing the data 
 * submitted through the frontend forms (shop creation, product creation, settings).
 *
 * 📌 Why this exists:
 * - Ensures user input is valid before sending to backend
 * - Prevents malformed or incomplete data
 * - Provides strong TypeScript typing for use with React Hook Form
 *
 * 🧩 Main Schemas:
 * 1. ✅ shopSchema – Validates all fields required to create a vendor shop
 * 2. ✅ productSchema – Validates fields when adding a new product to a shop
 * 3. ✅ settingsSchema – Validates user profile/account settings
 *
 * 🔄 Usage:
 * - Used in React Hook Form with Zod Resolver
 * - Infers TypeScript types (ShopFormData, ProductFormData, etc.)
 * - Connects tightly with backend model logic
 *
 * 🚀 Benefits:
 * - Ensures a great user experience (validated feedback)
 * - Keeps frontend and backend logic in sync
 * - Enables form autocompletion and error messaging
 */

import * as z from "zod";
import { HighlightEnum, ProductCategoryEnum, VendorShopType } from "./constants";


// 🌿 SHOP SCHEMA
export const shopSchema = z.object({
  name: z.string().min(1, "Shop name is required"),
  description: z.string().min(10, "Description is required"),
  photoUrls: z
    .array(z.instanceof(File))
    .min(1, "At least one photo is required"),
  productCategory: z
    .array(z.nativeEnum(ProductCategoryEnum))
    .min(1, "Select at least one main product category"),
  shopHighlight: z.array(z.nativeEnum(HighlightEnum)).optional(),
  isParkingIncluded: z.boolean(),
  vendorShopType: z.nativeEnum(VendorShopType, {
    errorMap: () => ({ message: "Please select a shop type" }),
  }),
  location: z.object({
    address: z.string().min(1, "Address is required"),
    city: z.string().min(1, "City is required"),
    country: z.string().min(1, "Country is required"),
    postalCode: z.string().min(1, "Postal code is required"),
    coordinates: z.object({
      lat: z.number(),
      lng: z.number(),
    }),
  }),
});
export type ShopFormData = z.infer<typeof shopSchema>;

// 🥚 PRODUCT SCHEMA
export const productSchema = z.object({
  name: z.string().min(2, "Product name must be at least 2 characters"),
  description: z.string().min(5, "Description is required"),
  price: z.number().positive("Price must be a positive number"),
  unit: z.string().optional(), // e.g. "per kg", "each"
  category: z.nativeEnum(ProductCategoryEnum),
  subcategory: z.string().min(1, "Subcategory is required"),
  tags: z.array(z.string()).optional(), // e.g. ["Raw", "Organic"]
  imageUrl: z.string().url("Image must be a valid URL").optional(),
  isAvailable: z.boolean(),
  externalPurchaseUrl: z.string().url("Must be a valid URL").optional(),
});
export type ProductFormData = z.infer<typeof productSchema>;

// ⚙️ SETTINGS (User Profile/Account)
export const settingsSchema = z.object({
  name: z.string().min(1, "Name is required"),
  email: z.string().email("Invalid email address"),
  phoneNumber: z
    .string()
    .min(10, "Phone number must be at least 10 digits")
    .max(20),
});
export type SettingsFormData = z.infer<typeof settingsSchema>;
