// Middleware to check userId and whether the user has a Premium plan
import { clerkClient } from "@clerk/express";

export const auth = async (req, res, next) => {
    try {
        // Extract userId and 'has' helper from Clerk's request auth
        const { userId, has } = await req.auth();

        // Check if the user has a premium plan
        const hasPremiumPlan = await has({ plan: 'premium' });

        // Fetch the full user object from Clerk using the userId
        const user = await clerkClient.users.getUser(userId);

        // If the user does not have a premium plan but has free usage left
        if (!hasPremiumPlan && user.privateMetadata.free_usage) {
            // Attach free_usage value to the request object
            req.free_usage = user.privateMetadata.free_usage;
        } else {
            // Otherwise, reset free_usage to 0 in Clerk's private metadata
            await clerkClient.users.updateUserMetadata(userId, {
                privateMetadata: {
                    free_usage: 0
                }
            });
            // Also set free_usage = 0 in the request object
            req.free_usage = 0;
        }

        // Set plan type ('premium' or 'free') on the request object
        req.plan = hasPremiumPlan ? 'premium' : 'free';

        // Continue to the next middleware/route handler
        next();
    } catch (error) {
        // In case of any error, return a JSON response with the error message
        res.json({ success: false, message: error.message });
    }
};
