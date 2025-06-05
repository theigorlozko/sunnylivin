import { LucideIcon } from "lucide-react";
import { AuthUser } from "aws-amplify/auth";
import { HighlightEnum, ProductCategoryEnum, VendorShopType } from "./prismaEnum";
import { User} from "./prismaTypes";

// Allow className on motion components
import { MotionProps as OriginalMotionProps } from "framer-motion";
declare module "framer-motion" {
  interface MotionProps extends OriginalMotionProps {
    className?: string;
  }
}

// ------------------------------
// 🌿 Global Interfaces for App
// ------------------------------
declare global {
  // ✅ User model
  interface User {
    cognitoInfo: AuthUser;
    userInfo: User;
    shops: Shop[];
  }

  // ✅ Shop model
  interface Shop {
    id: number;
    name: string;
    description: string;
    photoUrls: string[];
    productCategory: ProductCategoryEnum[];
    shopHighlight?: HighlightEnum[];
    isParkingIncluded: boolean;
    vendorShopType: VendorShopType;
    location: {
      address: string;
      city: string;
      country: string;
      postalCode: string;
      latitude?: number;
      longitude?: number;
    };
    userId: number;
    products?: Product[];
  }

  // ✅ Product model
  interface Product {
    id: number;
    name: string;
    description: string;
    category: ProductCategoryEnum[];
    subcategory?: string;
    tags?: string[];
    price: number;
    unit?: string;
    isAvailable: boolean;
    imageUrl?: string;
    externalPurchaseUrl?: string;
    vendorShopId: number;
  }

  // ✅ Shop creation form
  interface ShopFormData {
    name: string;
    description: string;
    photoUrls: File[];
    productCategory: ProductCategoryEnum[];
    shopHighlight?: HighlightEnum[];
    isParkingIncluded: boolean;
    vendorShopType: VendorShopType;
    location: {
      address: string;
      city: string;
      country: string;
      postalCode: string;
      latitude: number;
        longitude: number;
    };
    plan?: 'SEED' | 'GROWTH' | 'BLOOM'
  }

  // ✅ Product creation form
  interface ProductFormData {
    name: string;
    description: string;
    price: number;
    unit?: string;
    category: ProductCategoryEnum;
    subcategory?: string;
    tags?: string[];
    imageUrl?: string;
    externalPurchaseUrl?: string;
    isAvailable: boolean;
  }

  // ✅ Settings form
  interface SettingsFormData {
    name: string;
    email: string;
    phoneNumber: string;
  }

  // ✅ UI Component Props
  interface SidebarLinkProps {
    href: string;
    icon: LucideIcon;
    label: string;
  }
  interface AppSidebarProps {
    userType: "buyer" | "vendor" | "user";
  }


  interface ShopCardProps {
    shop: Shop;
    isFavorite: boolean;
    onFavoriteToggle: () => void;
    showFavoriteButton?: boolean;
  }

  interface ProductCardProps {
    product: Product;
    shopName?: string;
    showShopInfo?: boolean;
  }

  interface ShopLocationPinProps {
    shop: Shop;
    isHighlighted: boolean;
    onClick: () => void;
  }

  interface SearchFiltersProps {
    selectedCategories: ProductCategoryEnum[];
    selectedTags: string[];
    onChange: (categories: ProductCategoryEnum[], tags: string[]) => void;
  }

  interface SettingsFormProps {
    initialData: SettingsFormData;
    onSubmit: (data: SettingsFormData) => Promise<void>;
  }
}

export {};
