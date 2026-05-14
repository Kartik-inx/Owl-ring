export const PRODUCTS = [
  {
    id: "owl-ring-s1-black",
    slug: "owl-ring-s1",
    name: "Owl Ring S1",
    variant: "Stealth Black",
    price: 399,
    oldPrice: 449,
    image: "/images/hero.png",
    description: "Experience the ultimate blend of health technology and minimalist luxury. The Series 1 features our custom OWL-X chipset for unprecedented biometric accuracy.",
    features: ["Clinical-grade sensors", "7-Day Battery", "Titanium Core", "100m Waterproof"],
    reviews: 482,
    rating: 4.9,
    colors: [
      { name: "Stealth Black", hex: "#000000", price: 399 },
      { name: "Lunar Silver", hex: "#E5E5E5", price: 399 },
      { name: "24K Gold", hex: "#C6A972", price: 499 },
    ],
    sizes: ["6", "7", "8", "9", "10", "11", "12", "13"],
  },
];

export const ORDERS = [
  {
    id: "OWL-8291-X",
    date: "May 14, 2026",
    status: "Processing",
    amount: "$399.00",
    items: [
      { name: "Owl Ring S1", variant: "Stealth Black", size: "10", price: 399, qty: 1 }
    ],
    customer: {
      name: "James Wilson",
      email: "james@example.com",
      address: "123 Innovation Drive, Suite 500, Tech Valley, CA 94043, USA"
    },
    timeline: [
      { label: "Order Placed", date: "May 14, 2:30 PM", completed: true },
      { label: "Processing", date: "May 14, 4:15 PM", completed: true, active: true },
      { label: "Shipped", date: "Pending", completed: false },
      { label: "Delivered", date: "Pending", completed: false },
    ]
  },
  {
    id: "OWL-7120-A",
    date: "Jan 12, 2026",
    status: "Delivered",
    amount: "$499.00",
    items: [
      { name: "Owl Ring S1", variant: "24K Gold", size: "9", price: 499, qty: 1 }
    ],
    customer: {
      name: "James Wilson",
      email: "james@example.com",
      address: "123 Innovation Drive, Suite 500, Tech Valley, CA 94043, USA"
    },
    timeline: [
      { label: "Order Placed", date: "Jan 12, 10:00 AM", completed: true },
      { label: "Processing", date: "Jan 12, 11:30 AM", completed: true },
      { label: "Shipped", date: "Jan 13, 09:00 AM", completed: true },
      { label: "Delivered", date: "Jan 15, 02:00 PM", completed: true },
    ]
  }
];

export const USERS = [
  {
    id: "user_1",
    name: "James Wilson",
    email: "james@example.com",
    role: "customer",
    joined: "Jan 2024",
    avatar: "JW"
  },
  {
    id: "admin_1",
    name: "Owl Admin",
    email: "admin@owlring.com",
    role: "admin",
    joined: "Oct 2023",
    avatar: "OA"
  }
];
