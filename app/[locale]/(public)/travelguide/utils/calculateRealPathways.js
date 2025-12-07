import { pathwayTemplates } from './pathwayData';


export function calculateRealPathways(profile) {
  const pathways = [];
  const age = parseInt(profile.age);
  const workExp = parseInt(profile.workExperience);

  // Filter pathways based on conditions
  for (const template of pathwayTemplates) {
    const conditions = template.conditions;
    let matches = true;

    // Check age
    if (conditions.minAge && age < conditions.minAge) matches = false;
    if (conditions.maxAge && age > conditions.maxAge) matches = false;

    // Check education
    if (conditions.minEducation && !conditions.minEducation.includes(profile.education)) matches = false;

    // Check budget
    if (conditions.minBudget && !conditions.minBudget.includes(profile.budget)) matches = false;

    // Check work experience
    if (conditions.minWorkExp && workExp < conditions.minWorkExp) matches = false;

    // Check language
    if (conditions.languages && profile.languageType !== 'هنوز نداده‌ام') {
      const hasMatchingLang = conditions.languages.some(lang => profile.languageType.includes(lang));
      if (!hasMatchingLang && profile.languageType !== 'هنوز نداده‌ام') {
        // Don't fully exclude, but lower score
      }
    }

    // Check country preference
    if (conditions.countries && !conditions.countries.includes(profile.targetCountry)) {
      if (profile.targetCountry !== 'نمی‌دانم / باز هستم') {
        matches = false;
      }
    }

    // Check goals
    if (conditions.goals && !conditions.goals.includes(profile.immigrationGoal)) {
      // Don't fully exclude, but lower score
    }

    if (matches) {
      // Calculate match score
      let matchScore = template.baseSuccessRate;

      // Age scoring
      if (template.id.includes('ausbildung') || template.id.includes('workholiday')) {
        if (age <= 25) matchScore += 10;
        else if (age <= 30) matchScore += 5;
      }

      // Education scoring
      if (['کارشناسی‌ارشد', 'دکتری'].includes(profile.education)) {
        matchScore += 5;
      }

      // Work experience scoring
      if (template.id.includes('skilled') || template.id.includes('jobseeker')) {
        if (workExp >= 5) matchScore += 10;
        else if (workExp >= 3) matchScore += 5;
      }

      // Language scoring
      if (profile.languageLevel === 'پیشرفته') {
        matchScore += 10;
      } else if (profile.languageLevel === 'متوسط') {
        matchScore += 5;
      }

      // Budget scoring
      if (template.cost.includes('کم') || template.cost.includes('3,000')) {
        if (profile.budget === 'کم') matchScore += 5;
      }

      // Goal match scoring
      if (conditions.goals && conditions.goals.includes(profile.immigrationGoal)) {
        matchScore += 15;
      }

      // Country match scoring
      if (template.country === profile.targetCountry) {
        matchScore += 10;
      }

      // IT field bonus
      if (profile.workField === 'فناوری اطلاعات (IT)') {
        matchScore += 5;
      }

      // Normalize score
      matchScore = Math.min(matchScore, 100);

      pathways.push({
        ...template,
        successRate: template.baseSuccessRate,
        recommended: false,
        matchScore: matchScore
      });
    }
  }

  // Sort by match score
  pathways.sort((a, b) => b.matchScore - a.matchScore);

  // Mark top pathways as recommended
  if (pathways.length > 0) pathways[0].recommended = true;
  if (pathways.length > 1 && pathways[1].matchScore >= 70) pathways[1].recommended = true;
  if (pathways.length > 2 && pathways[2].matchScore >= 75) pathways[2].recommended = true;

  // Limit to top 5 pathways
  return pathways.slice(0, 5);
}
