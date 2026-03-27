export interface NuSkinProduct {
  name: string;
  targetArea: string;
  usage: string;
  benefits: string;
  warnings: string;
}

export const nuSkinProducts: NuSkinProduct[] = [
  {
    name: "Scion Hand & Body Lotion",
    targetArea: "Hands and Body (Strictly NOT for the face)",
    usage: "Apply generously to hands and body after bathing or as needed. Do not apply to the face.",
    benefits: "Provides long-lasting moisturization, leaves skin feeling soft and smooth.",
    warnings: "Do not use on the face. If generating an image, the model should be applying it to their arms, legs, or hands, NEVER the face."
  },
  {
    name: "Scion Whitening Roll-On",
    targetArea: "Underarms",
    usage: "Apply to underarms after bathing.",
    benefits: "Provides 24-hour protection against bacterial growth and perspiration which can cause body odor. Whitens underarms.",
    warnings: "For underarm use only. If generating an image, do not show it being applied to the face."
  },
  {
    name: "Scion Feminine Wash",
    targetArea: "Intimate Area",
    usage: "Use daily as a liquid cleanser for the intimate area.",
    benefits: "Maintains natural acidic pH level, keeps you feeling fresh.",
    warnings: "External use only. Keep imagery abstract, clean, and professional."
  },
  {
    name: "ageLOC LumiSpa iO",
    targetArea: "Face",
    usage: "Use twice daily (morning and night) for two minutes with the specific treatment cleanser.",
    benefits: "Provides 7 skin benefits: softness, smoothness, radiance, clarity, purified skin, reduced pore appearance, and improved firmness.",
    warnings: "Use only on the face with the silicone head."
  },
  {
    name: "AP 24 Whitening Fluoride Toothpaste",
    targetArea: "Teeth",
    usage: "Brush teeth thoroughly, preferably after each meal.",
    benefits: "Brightens and whitens teeth, prevents cavities, removes plaque.",
    warnings: "For oral use only. Imagery should feature smiling, brushing teeth, or clean aesthetics."
  },
  {
    name: "Epoch Glacial Marine Mud",
    targetArea: "Face and Body",
    usage: "Apply a generous layer to skin, avoiding mouth and eye areas. Let dry 15-20 minutes, rinse with warm water.",
    benefits: "Draws out impurities, removes dead skin cells, nurtures skin.",
    warnings: "Avoid eye area. Imagery can show mud mask applied to the face or body."
  },
  {
    name: "Enhancer Skin Conditioning Gel",
    targetArea: "Face and Body",
    usage: "Apply liberally to keep skin comfortable. Use anytime.",
    benefits: "Soothes and moisturizes skin, great for post-shaving or sunburn.",
    warnings: "Can be applied to face or body."
  },
  {
    name: "NaPCA Moisture Mist",
    targetArea: "Face, Hair, and Body",
    usage: "Spray generously on face, hair, and body whenever you need a moisture boost.",
    benefits: "Increases moisture level, makes skin and hair feel supple and smooth.",
    warnings: "Close eyes when spraying on face. Imagery can show misting over the face or body."
  },
  {
    name: "Tegreen 97",
    targetArea: "Internal / Supplement",
    usage: "Take one to four capsules daily with water and food.",
    benefits: "Provides potent antioxidants to defend against free radicals at the cellular level.",
    warnings: "Dietary supplement. Imagery should focus on wellness, green tea aesthetics, or taking a capsule with water."
  },
  {
    name: "ageLOC Galvanic Spa",
    targetArea: "Face, Body, and Scalp",
    usage: "Use with specific ageLOC conductors and treatment products for face, body, or scalp.",
    benefits: "Visibly rejuvenates skin, smooths the appearance of cellulite, and promotes healthy-looking hair.",
    warnings: "Ensure the correct conductor is shown for the target area (e.g., face conductor for face, body conductor for body)."
  },
  {
    name: "ageLOC WellSpa iO",
    targetArea: "Body (Strictly NOT for the face)",
    usage: "Use on thighs, abdomen, and arms with ageLOC Body Serum or Activating Gel.",
    benefits: "Revitalizes skin appearance, helps contour the body, and provides a relaxing massage experience.",
    warnings: "BODY ONLY. Do not use on the face. Imagery must show application on legs, arms, or stomach."
  },
  {
    name: "Inner Focus Collagen Plus",
    targetArea: "Internal / Supplement",
    usage: "Mix one scoop or packet with water and drink daily.",
    benefits: "Boosts collagen and elastin production, supports skin hydration and healthy radiance.",
    warnings: "Dietary supplement. Imagery should show a person drinking from a glass, mixing a drink, or glowing skin aesthetics. Do not show topical application."
  },
  {
    name: "ageLOC Y-Span",
    targetArea: "Internal / Supplement",
    usage: "Take capsules daily with meals.",
    benefits: "Promotes cellular health, systemic anti-aging, and supports multiple body systems.",
    warnings: "Dietary supplement. Imagery should focus on vitality, active lifestyle, or taking capsules."
  },
  {
    name: "Nutricentials Pillow Glow Sleeping Mask",
    targetArea: "Face",
    usage: "Apply a generous layer as the last step of nighttime routine. Leave on overnight.",
    benefits: "Provides intense overnight hydration, protects from oxidative stress, and delivers a morning glow.",
    warnings: "Face application only. Imagery can show nighttime routines or glowing morning faces."
  },
  {
    name: "ageLOC Tru Face Essence Ultra",
    targetArea: "Face and Neck",
    usage: "Apply morning and night as the final treatment step before moisturizing.",
    benefits: "Firms and contours the skin, protects against free radicals, and improves skin bounce.",
    warnings: "Apply to face and neck. Imagery can show applying serum drops to the face."
  },
  {
    name: "Galvanic Spa Facial Gels",
    targetArea: "Face",
    usage: "Use with the ageLOC Galvanic Spa device. Pre-Treat gel first, then Treatment gel.",
    benefits: "Removes impurities, enhances skin hydration, and delivers anti-aging ingredients.",
    warnings: "Face only. Must be shown with the Galvanic Spa device."
  },
  {
    name: "TRME MyEDGE",
    targetArea: "Internal / Supplement",
    usage: "Mix with water or beverage and consume once daily before a meal.",
    benefits: "Helps control appetite, supports healthy blood sugar levels, and reduces cravings.",
    warnings: "Dietary supplement. Imagery should show mixing a drink or healthy lifestyle."
  },
  {
    name: "TRME Go Protein+",
    targetArea: "Internal / Supplement",
    usage: "Mix with water or milk. Consume after a workout or as a snack.",
    benefits: "Supports muscle repair, provides high-quality protein, and aids in weight management.",
    warnings: "Dietary supplement. Imagery should show protein shakes, fitness, or active lifestyle."
  },
  {
    name: "ageLOC Tru Face Peptide Retinol Complex",
    targetArea: "Face",
    usage: "Apply at night after cleansing and toning.",
    benefits: "Reduces the appearance of deep wrinkles, smooths skin texture, and evens skin tone.",
    warnings: "Face only. Nighttime application imagery."
  },
  {
    name: "ageLOC Blemish Serum",
    targetArea: "Face",
    usage: "Apply to entire face after cleansing.",
    benefits: "Helps clear acne blemishes, prevents new breakouts, and improves skin smoothness.",
    warnings: "Face only. Imagery should show clear skin or gentle application to the face."
  },
  {
    name: "ageLOC Boost",
    targetArea: "Face",
    usage: "Use daily with ageLOC Boost Activating Serum.",
    benefits: "Visibly brightens, plumps, and evens skin tone for a youthful bounce.",
    warnings: "Face only. Must be shown with the ageLOC Boost device."
  },
  {
    name: "Nutriol Scalp & Hair Serum",
    targetArea: "Scalp and Hair",
    usage: "Apply to dry or damp scalp and massage. Do not rinse.",
    benefits: "Nourishes the scalp, promotes thicker, fuller, and healthier-looking hair.",
    warnings: "Scalp and hair only. DO NOT apply to the face."
  }
];
