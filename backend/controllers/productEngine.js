const products = [
  // Oily Skin
  { id: 1, name: "Niacinamide 10% + Zinc 1%", brand: "The Ordinary", category: "Serum", description: "Reduces appearance of blemishes and pores. Controls sebum production.", price: "$6.90", link: "https://theordinary.com/en-us/niacinamide-10-zinc-1-serum-100436.html", image: "https://images.unsplash.com/photo-1620916566398-39f1143ab7be?w=300", tags: ["oily", "acne", "pores"] },
  { id: 2, name: "BHA Blackhead Power Liquid", brand: "COSRX", category: "Exfoliant", description: "2% BHA exfoliant that unclogs pores and reduces blackheads.", price: "$25", link: "https://www.cosrx.com/products/natural-bha-skin-returning-a-sol", image: "https://images.unsplash.com/photo-1556228578-8c89e6adf883?w=300", tags: ["oily", "blackheads", "pores", "acne"] },
  { id: 3, name: "Oil-Free Moisturizer SPF 35", brand: "Neutrogena", category: "Moisturizer", description: "Lightweight, oil-free formula with broad-spectrum SPF protection.", price: "$17", link: "https://www.neutrogena.com/skincare/moisturizers/oil-free-moisture-broad-spectrum-spf-35-face-moisturizer", image: "https://images.unsplash.com/photo-1598440947619-2c35fc9aa908?w=300", tags: ["oily", "spf", "lightweight"] },

  // Dry Skin
  { id: 4, name: "Ultra Facial Cream SPF 30", brand: "Kiehl's", category: "Moisturizer", description: "24-hour hydration with imperméables technology. Perfect for dry skin.", price: "$38", link: "https://www.kiehls.com/skincare/face-moisturizers/ultra-facial-cream-with-spf-30", image: "https://images.unsplash.com/photo-1608248543803-ba4f8c70ae0b?w=300", tags: ["dry", "hydration", "spf"] },
  { id: 5, name: "Hyaluronic Acid 2% + B5", brand: "The Ordinary", category: "Serum", description: "Deep hydration serum with multi-molecular Hyaluronic Acid.", price: "$9.90", link: "https://theordinary.com/en-us/hyaluronic-acid-2-b5-serum-100442.html", image: "https://images.unsplash.com/photo-1620916566398-39f1143ab7be?w=300", tags: ["dry", "hydration", "anti-aging"] },
  { id: 6, name: "Ceramide Moisturizing Cream", brand: "CeraVe", category: "Moisturizer", description: "Restores and maintains the skin's natural barrier with 3 essential ceramides.", price: "$19", link: "https://www.cerave.com/skincare/moisturizers/moisturizing-cream", image: "https://images.unsplash.com/photo-1556228578-8c89e6adf883?w=300", tags: ["dry", "sensitive", "barrier"] },

  // Combination Skin
  { id: 7, name: "Balancing Face Wash", brand: "La Roche-Posay", category: "Cleanser", description: "Gentle gel cleanser that balances combination skin without over-drying.", price: "$22", link: "https://www.laroche-posay.us/our-products/face/face-wash/effaclar-purifying-foaming-gel-cleanser", image: "https://images.unsplash.com/photo-1556228720-195a672e8a03?w=300", tags: ["combination", "oily", "normal"] },
  { id: 8, name: "Vitamin C Suspension 23%", brand: "The Ordinary", category: "Treatment", description: "High-strength Vitamin C for brightening and anti-aging.", price: "$11.90", link: "https://theordinary.com/en-us/ascorbic-acid-8-alpha-arbutin-2-serum-100466.html", image: "https://images.unsplash.com/photo-1620916566398-39f1143ab7be?w=300", tags: ["combination", "brightening", "anti-aging"] },

  // Sensitive Skin
  { id: 9, name: "Toleriane Double Repair Moisturizer", brand: "La Roche-Posay", category: "Moisturizer", description: "Restores skin barrier instantly and maintains hydration for 48 hours.", price: "$24", link: "https://www.laroche-posay.us/our-products/face/face-moisturizer/toleriane-double-repair-face-moisturizer", image: "https://images.unsplash.com/photo-1608248543803-ba4f8c70ae0b?w=300", tags: ["sensitive", "barrier", "hydration"] },
  { id: 10, name: "Avene Thermal Spring Water", brand: "Avène", category: "Mist", description: "Soothing and anti-irritating thermal spring water mist.", price: "$14", link: "https://www.eauvene.com/us/products/skincare/thermal-spring-water-products/thermal-spring-water-150ml/", image: "https://images.unsplash.com/photo-1556228720-195a672e8a03?w=300", tags: ["sensitive", "soothing", "redness"] },

  // Anti-aging
  { id: 11, name: "Retinol 0.5% in Squalane", brand: "The Ordinary", category: "Treatment", description: "Moderate-strength retinol serum for anti-aging and skin renewal.", price: "$10.90", link: "https://theordinary.com/en-us/retinol-0-5-in-squalane-serum-100373.html", image: "https://images.unsplash.com/photo-1620916566398-39f1143ab7be?w=300", tags: ["anti-aging", "wrinkles", "normal"] },
  { id: 12, name: "Advanced Génifique Youth Activating Serum", brand: "Lancôme", category: "Serum", description: "Prebiotics and probiotics microbiome serum for youthful radiance.", price: "$115", link: "https://www.lancome-usa.com/skincare/serums-and-treatments/advanced-genifique-serum", image: "https://images.unsplash.com/photo-1598440947619-2c35fc9aa908?w=300", tags: ["anti-aging", "radiance", "all-types"] },

  // Acne / Breakouts
  { id: 13, name: "Adapalene Gel 0.1%", brand: "Differin", category: "Treatment", description: "Retinoid that treats acne, clears pores, and prevents breakouts.", price: "$30", link: "https://www.differin.com/products/differin-gel", image: "https://images.unsplash.com/photo-1556228578-8c89e6adf883?w=300", tags: ["acne", "oily", "combination"] },
  { id: 14, name: "Salicylic Acid 2% Solution", brand: "Paula's Choice", category: "Exfoliant", description: "Unclogs pores and exfoliates inside them to reduce blackheads and whiteheads.", price: "$32", link: "https://www.paulaschoice.com/skin-perfecting-2pct-bha-liquid-exfoliant", image: "https://images.unsplash.com/photo-1556228720-195a672e8a03?w=300", tags: ["acne", "oily", "blackheads"] },

  // Brightening / Hyperpigmentation
  { id: 15, name: "Alpha Arbutin 2% + HA", brand: "The Ordinary", category: "Serum", description: "Reduces dark spots and hyperpigmentation for an even skin tone.", price: "$9.90", link: "https://theordinary.com/en-us/alpha-arbutin-2-ha-serum-100439.html", image: "https://images.unsplash.com/photo-1620916566398-39f1143ab7be?w=300", tags: ["hyperpigmentation", "brightening", "all-types"] },
  { id: 16, name: "C E Ferulic", brand: "SkinCeuticals", category: "Serum", description: "Vitamin C antioxidant serum with 15% pure vitamin C and ferulic acid.", price: "$182", link: "https://www.skinceuticals.com/c-e-ferulic-635494263008.html", image: "https://images.unsplash.com/photo-1598440947619-2c35fc9aa908?w=300", tags: ["brightening", "anti-aging", "normal", "combination"] },

  // Sunscreen
  { id: 17, name: "Invisible Shield SPF 35", brand: "Glossier", category: "Sunscreen", description: "Lightweight water-gel sunscreen that leaves no white cast.", price: "$34", link: "https://www.glossier.com/products/invisible-shield", image: "https://images.unsplash.com/photo-1608248543803-ba4f8c70ae0b?w=300", tags: ["spf", "all-types", "lightweight"] },
  { id: 18, name: "Mineral UV Filters SPF 30", brand: "The Ordinary", category: "Sunscreen", description: "Mineral sunscreen for sensitive and reactive skin.", price: "$9.90", link: "https://theordinary.com/en-us/mineral-uv-filters-spf-30-with-antioxidants-100044.html", image: "https://images.unsplash.com/photo-1556228578-8c89e6adf883?w=300", tags: ["spf", "sensitive", "mineral"] }
];

function getRecommendations(answers) {
  const { skinType, concern, sensitivity, age, lifestyle } = answers;
  let scored = products.map(p => ({ ...p, score: 0 }));

  scored.forEach(p => {
    // Skin type match
    if (p.tags.includes(skinType)) p.score += 3;
    if (p.tags.includes('all-types')) p.score += 1;

    // Concern match
    if (concern === 'acne' && p.tags.includes('acne')) p.score += 4;
    if (concern === 'aging' && (p.tags.includes('anti-aging') || p.tags.includes('wrinkles'))) p.score += 4;
    if (concern === 'brightening' && (p.tags.includes('brightening') || p.tags.includes('hyperpigmentation'))) p.score += 4;
    if (concern === 'hydration' && p.tags.includes('hydration')) p.score += 4;
    if (concern === 'pores' && p.tags.includes('pores')) p.score += 4;

    // Sensitivity
    if (sensitivity === 'yes' && p.tags.includes('sensitive')) p.score += 2;
    if (sensitivity === 'yes' && p.tags.includes('soothing')) p.score += 2;

    // Age
    if (age === '30+' && p.tags.includes('anti-aging')) p.score += 1;
    if (age === '40+' && p.tags.includes('anti-aging')) p.score += 2;
    if (age === '50+' && p.tags.includes('anti-aging')) p.score += 3;

    // Lifestyle
    if (lifestyle === 'outdoors' && p.tags.includes('spf')) p.score += 3;
    if (lifestyle === 'active' && p.tags.includes('lightweight')) p.score += 2;
    if (lifestyle === 'urban' && (p.tags.includes('anti-aging') || p.tags.includes('brightening'))) p.score += 1;
  });

  // Sort and take top 5
  scored.sort((a, b) => b.score - a.score);
  return scored.slice(0, 5).map(({ score, ...p }) => p);
}

module.exports = { getRecommendations };
