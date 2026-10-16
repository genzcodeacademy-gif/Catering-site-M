export const contact = {
  whatsappNumber: '', // Configure an international-format number without + or spaces before enabling enquiries.
  email: '',
  phone: '',
  location: '',
  instagram: '',
};

export const brand = {
  name: 'Muniyappa Caterings',
  strapline: 'A table set with care.',
  intro:
    'The best occasions are remembered in little moments: a familiar flavour, a generous second serving, a table where everyone feels at home.',
  about:
    'We bring the warmth of South Indian hospitality to gatherings of every size. From the first menu conversation to the last leaf cleared, every detail is considered.',
};

export const services = [
  { title: 'Weddings & muhurthams', text: 'A thoughtful feast for the day your families come together.', image: '/images/banana-meal.jpg', tag: 'The big day' },
  { title: 'Family celebrations', text: 'Birthdays, anniversaries and all the reasons to gather.', image: '/images/celebration-table.jpg', tag: 'Made for gathering' },
  { title: 'Buffet & corporate', text: 'Well-paced service and a generous spread for your guests.', image: '/images/buffet-service.jpg', tag: 'Easy hospitality' },
];

export const menuCategories = ['All', 'Breakfast', 'Meals', 'Sweets'] as const;

export const menuItems = [
  { name: 'Thatte idli', detail: 'Soft, generous idlis with coconut chutney', category: 'Breakfast' },
  { name: 'Ven pongal', detail: 'Pepper, cumin, curry leaf and a little ghee', category: 'Breakfast' },
  { name: 'Crisp masala dosa', detail: 'Golden dosa with a gently spiced potato filling', category: 'Breakfast' },
  { name: 'Banana leaf meals', detail: 'Rice, seasonal vegetables, sambar, rasam and accompaniments', category: 'Meals' },
  { name: 'Vegetable pulao', detail: 'Fragrant rice with garden vegetables and whole spices', category: 'Meals' },
  { name: 'Lemon rice', detail: 'Bright, tempered rice with peanuts and curry leaf', category: 'Meals' },
  { name: 'Mysore pak', detail: 'A soft, rich classic for a sweet finish', category: 'Sweets' },
  { name: 'Payasam', detail: 'A traditional celebratory dessert, served warm', category: 'Sweets' },
];

export const gallery = [
  { src: '/images/hero-feast.jpg', alt: 'A South Indian feast arranged across banana leaves', label: 'A feast worth gathering for' },
  { src: '/images/banana-meal.jpg', alt: 'A demonstration banana leaf meal with a variety of dishes', label: 'The banana leaf meal' },
  { src: '/images/buffet-service.jpg', alt: 'Brass buffet dishes set for a family celebration', label: 'Service with a little ceremony' },
  { src: '/images/celebration-table.jpg', alt: 'A festive table with brass vessels and banana leaf settings', label: 'Details make the day' },
];

export const benefits = [
  { n: '01', title: 'A menu with meaning', text: 'Familiar favourites and considered choices, shaped around your occasion.' },
  { n: '02', title: 'Hospitality, thoughtfully done', text: 'Clear conversations, careful preparation and service that feels genuinely welcoming.' },
  { n: '03', title: 'Room for your traditions', text: 'Tell us what matters to your family. We’ll begin there.' },
];
