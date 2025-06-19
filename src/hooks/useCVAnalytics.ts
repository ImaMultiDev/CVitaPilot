// src/hooks/useCVAnalytics.ts

import { useMemo } from "react";
import { useCV } from "@/contexts/CVContext";

export function useCVAnalytics() {
  const { state } = useCV();

  return useMemo(() => {
    const totalDeliveries = state.savedCVs.reduce(
      (acc, cv) => acc + cv.deliveries.length,
      0
    );
    const totalCVs = state.savedCVs.length;

    const deliveriesByStatus = state.savedCVs.reduce((acc, cv) => {
      cv.deliveries.forEach((delivery) => {
        acc[delivery.status] = (acc[delivery.status] || 0) + 1;
      });
      return acc;
    }, {} as Record<string, number>);

    const responseRate =
      totalDeliveries > 0
        ? (((deliveriesByStatus.interview || 0) +
            (deliveriesByStatus.accepted || 0)) /
            totalDeliveries) *
          100
        : 0;

    const acceptanceRate =
      totalDeliveries > 0
        ? ((deliveriesByStatus.accepted || 0) / totalDeliveries) * 100
        : 0;

    // Most used skills across all CVs
    const skillUsage = state.savedCVs.reduce((acc, cv) => {
      cv.data.skills
        .filter((s) => s.selected)
        .forEach((skill) => {
          acc[skill.name] = (acc[skill.name] || 0) + 1;
        });
      return acc;
    }, {} as Record<string, number>);

    const topSkills = Object.entries(skillUsage)
      .sort(([, a], [, b]) => b - a)
      .slice(0, 10);

    // Most targeted companies
    const companyTargeting = state.savedCVs.reduce((acc, cv) => {
      cv.deliveries.forEach((delivery) => {
        acc[delivery.company] = (acc[delivery.company] || 0) + 1;
      });
      return acc;
    }, {} as Record<string, number>);

    const topCompanies = Object.entries(companyTargeting)
      .sort(([, a], [, b]) => b - a)
      .slice(0, 5);

    // Success rate by company type or size (could be enhanced)
    const recentActivity = state.savedCVs
      .flatMap((cv) => cv.deliveries)
      .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
      .slice(0, 10);

    return {
      totalCVs,
      totalDeliveries,
      responseRate,
      acceptanceRate,
      deliveriesByStatus,
      topSkills,
      topCompanies,
      recentActivity,
      averageDeliveresPerCV: totalCVs > 0 ? totalDeliveries / totalCVs : 0,
    };
  }, [state.savedCVs]);
}
