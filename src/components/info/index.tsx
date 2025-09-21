import HeroSection from "./HeroSection";
import StatisticsSection from "./StatisticsSection";
import WhereToGoSection from "./WhereToGoSection";
import DiagnosticOpportunitiesSection from "./DiagnosticOpportunitiesSection";
import ChartsAnalyticsSection from "./ChartsAnalyticsSection";
import AchievementsSection from "./AchievementsSection";

export default function InfoPageSections() {
  return (
    <>
      <HeroSection />
      <StatisticsSection />
      <WhereToGoSection />
      <DiagnosticOpportunitiesSection />
      <ChartsAnalyticsSection />
      <AchievementsSection />
    </>
  );
}

export {
  HeroSection,
  StatisticsSection,
  WhereToGoSection,
  DiagnosticOpportunitiesSection,
  ChartsAnalyticsSection,
  AchievementsSection,
};
