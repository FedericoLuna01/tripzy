import { UserTrip } from "../models/UserTrip.js";

export const checkTripPermissions = async (user, permittedRoles, tripId) => {
  const userTrip = await UserTrip.findOne({
    where: {
      userId: user.id,
      tripId,
    },
  });

  if (!userTrip) {
    return false;
  }

  if (permittedRoles.some((role) => userTrip.role === role)) {
    return true;
  }

  return false;
};
