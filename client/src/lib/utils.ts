

import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function formatEnumString(str: string) {
  return str.replace(/([A-Z])/g, "€1").trim();
}

export function formatPriceValue(value: number | null, isMin: boolean) {
  if (value === null)
    return isMin ? "Any Min Price" : "Any Max Price";

  if (value >= 1000) {
    const kValue = value / 1000;
    return isMin ? `€${kValue}k+` : `<€${kValue}k`;
  }

  return isMin ? `€${value}+` : `<€${value}`;
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function cleanParams(params: Record<string, any>): Record<string, any> {
  return Object.fromEntries(
    Object.entries(params).filter(
      (
        [_, value] // eslint-disable-line @typescript-eslint/no-unused-vars
      ) =>
        value !== undefined &&
        value !== "any" &&
        value !== "" &&
        (Array.isArray(value) ? value.some((v) => v !== null) : value !== null)
    )
  );
}

export const createNewUserInDatabase = async (
  user: any,
  idToken: any,
  userRole: string,
  fetchWithBQ: any
) => {
  const role = userRole?.toLowerCase();

  // Route users to correct API endpoint based on role
  const createEndpoint = role === "vendor" ? "/vendors" : "/users";

  const createUserResponse = await fetchWithBQ({
    url: createEndpoint,
    method: "POST",
    body: {
      cognitoId: user.userId,
      name: user.username,
      email: idToken?.payload?.email || "",
      phoneNumber: "",
    },
  });

  if (createUserResponse.error) {
    throw new Error("Failed to create user record");
  }

  return createUserResponse;
};