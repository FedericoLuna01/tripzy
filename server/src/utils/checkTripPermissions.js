import { UserTrip } from "../models/UserTrip.js";

export const checkTripPermissions = async (
  userOrUserId,
  permittedRolesOrTripId,
  tripIdOrUserRole
) => {
  let userId, tripId, permittedRoles, userRole;

  // Handle different calling patterns
  if (typeof userOrUserId === "object" && userOrUserId !== null) {
    // Old pattern: checkTripPermissions(user, permittedRoles, tripId)
    userId = userOrUserId.id;
    permittedRoles = permittedRolesOrTripId;
    tripId = tripIdOrUserRole;
  } else {
    // New pattern: checkTripPermissions(userId, tripId, userRole)
    userId = userOrUserId;
    tripId = permittedRolesOrTripId;
    userRole = tripIdOrUserRole;
  }

  // Validate required parameters
  if (!userId || !tripId) {
    console.error("checkTripPermissions: userId or tripId is undefined", { userId, tripId });
    return false;
  }

  try {
    const userTrip = await UserTrip.findOne({
      where: {
        userId,
        tripId,
      },
    });

    if (!userTrip) {
      // If user is admin, they have access to all trips (only for new pattern)
      if (userRole && (userRole === "admin" || userRole === "super_admin")) {
        return true;
      }
      return false;
    }

    // For old pattern, check specific roles
    if (permittedRoles && Array.isArray(permittedRoles)) {
      return permittedRoles.some((role) => userTrip.role === role);
    }

    // For new pattern, just check if user is part of trip
    return true;
  } catch (error) {
    console.error("Error in checkTripPermissions:", error);
    return false;
  }
};
