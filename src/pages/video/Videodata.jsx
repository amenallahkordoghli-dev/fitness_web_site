// Source unique de toutes les vidéos — à importer dans App.jsx

export const videoData = {
  musculation: {
    title: "💪 MUSCULATION",
    accent: "#00e6ff",
    videos: [
      {
        id: "m1", title: "Exercice Dos", icon: "🏋️",
        description: "Programme complet pour renforcer le dos et améliorer la posture.",
        duration: "12:30",
        vid: "/videos_images/musculation1.mp4",
        thumb: "/videos_images/musculation1_thumb.jpg",
      },
      {
        id: "m2", title: "Exercice Pectoraux", icon: "💪",
        description: "Développé couché, dips et push-ups pour des pectoraux puissants.",
        duration: "15:00",
        vid: "/videos_images/musculation2.mp4",
        thumb: "/videos_images/musculation2_thumb.jpg",
      },
      {
        id: "m3", title: "Exercice Jambes", icon: "🦵",
        description: "Squats, fentes et leg press pour des jambes solides.",
        duration: "18:45",
        vid: "/videos_images/musculation3.mp4",
        thumb: "/videos_images/musculation3_thumb.jpg",
      },
    ],
  },

  cardio: {
    title: "🏃 CARDIO",
    accent: "#ff6b35",
    videos: [
      {
        id: "c1", title: "HIIT Intense", icon: "🔥",
        description: "Séance HIIT à haute intensité pour brûler un maximum de calories.",
        duration: "20:00",
        vid: "/videos_images/cardio1.mp4",
        thumb: "/videos_images/cardio1_thumb.jpg",
      },
      {
        id: "c2", title: "Running Routine", icon: "🏃",
        description: "Programme de course pour améliorer votre endurance.",
        duration: "25:00",
        vid: "/videos_images/cardio2.mp4",
        thumb: "/videos_images/cardio2_thumb.jpg",
      },
      {
        id: "c3", title: "Boxe Cardio", icon: "🥊",
        description: "Enchaînements de boxe pour cardio et coordination.",
        duration: "30:00",
        vid: "/videos_images/cardio3.mp4",
        thumb: "/videos_images/cardio3_thumb.jpg",
      },
    ],
  },

  healthfood: {
    title: "🥗 NUTRITION",
    accent: "#44ff88",
    videos: [
      {
        id: "n1", title: "Petit-Déjeuner Équilibré", icon: "🥣",
        description: "Idées de petits-déjeuners riches en protéines et nutriments.",
        duration: "8:20",
        vid: "/videos_images/nutrition1.mp4",
        thumb: "/videos_images/nutrition1_thumb.jpg",
      },
      {
        id: "n2", title: "Préparation de Repas", icon: "🍱",
        description: "Meal prep hebdomadaire pour manger sainement toute la semaine.",
        duration: "22:10",
        vid: "/videos_images/nutrition2.mp4",
        thumb: "/videos_images/nutrition2_thumb.jpg",
      },
      {
        id: "n3", title: "Les Super-Aliments", icon: "🥦",
        description: "Les aliments incontournables pour optimiser vos performances.",
        duration: "14:55",
        vid: "/videos_images/nutrition3.mp4",
        thumb: "/videos_images/nutrition3_thumb.jpg",
      },
    ],
  },

  mentalhealth: {
    title: "🧠 BIEN-ÊTRE",
    accent: "#b388ff",
    videos: [
      {
        id: "mh1", title: "Méditation Guidée", icon: "🧘",
        description: "Séance de méditation de 10 minutes pour commencer la journée.",
        duration: "10:00",
        vid: "/videos_images/mental1.mp4",
        thumb: "/videos_images/mental1_thumb.jpg",
      },
      {
        id: "mh2", title: "Gestion du Stress", icon: "😌",
        description: "Techniques de respiration et relaxation pour réduire le stress.",
        duration: "16:30",
        vid: "/videos_images/mental2.mp4",
        thumb: "/videos_images/mental2_thumb.jpg",
      },
      {
        id: "mh3", title: "Sommeil et Sérénité", icon: "🌙",
        description: "Routine du soir pour améliorer la qualité de votre sommeil.",
        duration: "12:00",
        vid: "/videos_images/mental3.mp4",
        thumb: "/videos_images/mental3_thumb.jpg",
      },
    ],
  },
};