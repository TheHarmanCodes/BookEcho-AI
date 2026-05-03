import { auth, currentUser } from "@clerk/nextjs/server";
import { PLAN_LIMITS, PLANS, PlanType } from "@/lib/subscription-constants";

export const getUserPlan = async (): Promise<PlanType> => {
  const { has, userId } = await auth();

  if (!userId) return PLANS.FREE;

  if (has?.({ role: "pro" }) || has?.({ plan: "pro" })) {
    return PLANS.PRO;
  }

  if (has?.({ role: "standard" }) || has?.({ plan: "standard" })) {
    return PLANS.STANDARD;
  }

  const user = await currentUser();
  const metadataPlan = (
    user?.publicMetadata?.plan || user?.publicMetadata?.billingPlan
  )
    ?.toString()
    .toLowerCase();

  if (metadataPlan === PLANS.PRO) {
    return PLANS.PRO;
  }

  if (metadataPlan === PLANS.STANDARD) {
    return PLANS.STANDARD;
  }

  return PLANS.FREE;
};

export const getPlanLimits = async () => {
  const plan = await getUserPlan();
  return PLAN_LIMITS[plan];
};
