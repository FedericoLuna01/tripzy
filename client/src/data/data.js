export const DATA = [
  {
    id: 1,
    title: "Viaje a Portugal",
    description:
      "Un viaje inolvidable por las tierras de Portugal, donde la historia y la modernidad se entrelazan.",
    image:
      "https://images.unsplash.com/photo-1639162097596-212d00e5bca1?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    startDate: new Date(2025, 10, 1),
    public: false,
    friends: [],
    days: [
      {
        date: new Date(2025, 10, 1),
        activities: [
          {
            title: "Llegada a Lisboa",
            description: "Llegada al aeropuerto de Lisboa y traslado al hotel.",
            time: "10:00",
          },
          {
            title: "Visita a la Torre de Belém",
            description:
              "Visita a la emblemática Torre de Belém, símbolo de la era de los descubrimientos.",
            time: "11:00",
          },
        ],
      },
      {
        date: new Date(2025, 10, 2),
      },
    ],
  },
  {
    id: 2,
    title: "Viaje a la patagonia",
    description:
      "Un viaje inolvidable por las tierras del sur, donde la historia y la modernidad se entrelazan.",
    image:
      "https://images.unsplash.com/photo-1652254168240-c5b207f4ad12?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    startDate: new Date(2025, 6, 15),
    public: false,
    friends: [],
    days: [
      {
        date: new Date(2025, 6, 15),
        activities: [
          {
            title: "Llegada al aeropuerto",
            description: "Llegada al aeropuerto y traslado al hotel.",
            time: "10:00",
          },
          {
            title: "Vemos el Nahuel Huapi",
            description:
              "Visita al emblemático lago Nahuel Huapi, símbolo de la era de los descubrimientos.",
            time: "11:00",
          },
        ],
      },
      {
        date: new Date(2025, 6, 16),
      },
      {
        date: new Date(2025, 6, 17),
      },
      {
        date: new Date(2025, 6, 18),
      },
    ],
  },
];

export const USERS_AVATARS = [
  {
    id: 1,
    name: "Luciano Tessa",
    email: "lucianotessa@gmail.com",
    imageUrl: "https://avatar.iran.liara.run/public/girl",
    role: "User",
    status: "Bloqued",
  },
  {
    id: 2,
    name: "Federico Luna",
    email: "federicoLuna@gmail.com",
    imageUrl: "https://avatar.iran.liara.run/public/boy",
    role: "Admin",
    status: "active",
  },
  {
    id: 3,
    name: "Julian Vecchio",
    email: "julianvecchio@gmail.com",
    imageUrl: "",
    role: "User",
    status: "Suspended",
  },
];
