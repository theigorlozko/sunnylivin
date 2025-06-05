"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateUser = exports.createUser = exports.getUser = void 0;
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
const getUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    // If the user exists grab it by cognitoId
    try {
        const { cognitoId } = req.params;
        const user = yield prisma.user.findUnique({
            where: { cognitoId },
            include: {
                favorites: true
            },
        });
        if (user) {
            res.json(user);
        }
        else {
            res.status(404).json({ message: "User not found" });
        }
    }
    catch (error) {
        res
            .status(500)
            .json({ message: `Error fetching user: ${error.message}` });
    }
});
exports.getUser = getUser;
const createUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { cognitoId, name, email, phoneNumber } = req.body;
        // Create a new user
        const user = yield prisma.user.create({
            data: {
                cognitoId,
                name,
                email,
                phoneNumber,
                // role: "BUYER", // Default role
            },
        });
        res.status(201).json(user);
    }
    catch (error) {
        res
            .status(500)
            .json({ message: `Error creating user: ${error.message}` });
    }
});
exports.createUser = createUser;
const updateUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { cognitoId } = req.params;
        const { name, email, phoneNumber } = req.body;
        // Update user
        const updateUser = yield prisma.user.update({
            where: { cognitoId },
            data: {
                name,
                email,
                phoneNumber,
            },
        });
        res.json(updateUser);
    }
    catch (error) {
        res.status(500).json({ message: `Error updating user: ${error.message}` });
    }
});
exports.updateUser = updateUser;
// export const addFavoriteShop = async (req: Request, res: Response): Promise<void> => {
//     try {
//         const {cognitoId, vendorShopId} = req.params; // sending cognitoId and the VendorShopId 
//         const user = await prisma.user.findUnique({
//             where: { cognitoId },
//             include: {
//                 favorites: true, // Include the favorites relation
//             },
//         })
//         const shopIdNumber = Number(vendorShopId);
//         const existingFavorites: { id: number }[] = user?.favorites || [];
//         // checking is the favorite already exists
//         if(!existingFavorites.some((fav: { id: number }) => fav.id === shopIdNumber)){
//            const updatedUser = await prisma.user.update({
//             where: { cognitoId },
//             data: {
//                 favorites: {
//                     connect: { id: shopIdNumber }, // Connect the new favorite shop
//                 },
//             },
//             include: {
//                 favorites: true, // Include the updated favorites
//             },
//            }) 
//            res.json(updatedUser);
//         }else {
//             res.status(409).json({message: "Shop already in favorites"});
//         }
//     } catch (err: any) {
//       res.status(500).json({ message: `Error adding favorite shop: ${err.message}` });
//     }
// };
// export const removeFavoriteShop = async (req: Request, res: Response): Promise<void> => {
//     try {
//         const {cognitoId, vendorShopId} = req.params; // sending cognitoId and the VendorShopId 
//         const shopIdNumber = Number(vendorShopId);
//         const updatedUser = await prisma.user.update({
//             where: { cognitoId },
//             data: {
//                 favorites: {
//                     disconnect: { id: shopIdNumber }, // Connect the new favorite shop
//                 },
//             },
//             include: {
//                 favorites: true, // Include the updated favorites
//             },
//            }) 
//            res.json(updatedUser);
//     } catch (err: any) {
//       res.status(500).json({ message: `Error removing favorite shop: ${err.message}` });
//     }
// };
//  export const getUserShops = async (req: Request, res: Response): Promise<void> => {
//   try {
//     const { cognitoId } = req.params;
//     // Step 1: Find the user by Cognito ID
//     const user = await prisma.user.findUnique({
//       where: { cognitoId },
//     });
//     if (!user) {
//       res.status(404).json({ message: "User not found" });
//       return;
//     }
//     // Step 2: Get shops created by this user
//     const shops = await prisma.vendorShop.findMany({
//       where: { userId: user.id },
//       include: {
//         location: true,
//       },
//     });
//     // Step 3: Format location with lat/lon
//     const shopsWithCoordinates = await Promise.all(
//       shops.map(async (shop) => {
//         const result: { coordinates: string }[] = await prisma.$queryRaw`
//           SELECT ST_AsText(coordinates) as coordinates FROM "Location" WHERE id = ${shop.location.id}
//         `;
//         const geoJSON = wktToGeoJSON(result[0]?.coordinates || "POINT(0 0)");
//         if (geoJSON.type === "Point") {
//           const [longitude, latitude] = geoJSON.coordinates;
//           return {
//             ...shop,
//             location: {
//               ...shop.location,
//               coordinates: { longitude, latitude },
//             },
//           };
//         } else {
//           throw new Error("Invalid GeoJSON type: Expected Point");
//         }
//       })
//     );
//     res.json(shopsWithCoordinates);
//   } catch (err: any) {
//     console.error("Error retrieving vendor shops:", err);
//     res.status(500).json({ message: `Error retrieving vendor shops: ${err.message}` });
//   }
// };
