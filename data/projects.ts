export type ProjectMedia = {
  src: string;
  alt: string;
};

export type Project = {
  slug: string;
  index: string;
  title: string;
  category: string;
  description: string;
  liveUrl?: string;
  media: ProjectMedia | null;
  secondaryMedia?: ProjectMedia;
  highlights: readonly string[];
  technologies: readonly string[];
};

export const projects = {
  devflow: {
    slug: "devflow",
    index: "01",
    title: "DevFlow",
    category: "Issue and sprint management for small software teams.",
    description:
      "A workspace for managing projects, sprints and issues with per-project issue keys.",
    liveUrl: "https://devflow-902d.onrender.com",
    media: {
      src: "/projects/devflow/overview.png",
      alt: "DevFlow landing screen showing issue and sprint management for small software teams.",
    },
    highlights: [
      "Workspaces with owner, admin and member roles.",
      "Projects, sprints and issues with per-project issue keys.",
      "Kanban board, comments and an activity trail for every change.",
    ],
    technologies: [],
  },
  scoutlab: {
    slug: "scoutlab",
    index: "02",
    title: "ScoutLab",
    category: "Frontend software project.",
    description: "A React and TypeScript project with a stateful, client-side interface.",
    media: {
      src: "/projects/scoutlab/overview.png",
      alt: "ScoutLab scouting overview showing player coverage, shortlist metrics and position distribution.",
    },
    secondaryMedia: {
      src: "/projects/scoutlab/detail.png",
      alt: "ScoutLab player detail view showing attributes, profile shape and scouting strengths and weaknesses.",
    },
    highlights: [
      "React and TypeScript frontend architecture.",
      "Zustand state management with localStorage persistence.",
      "React Router and tests as part of the project foundation.",
    ],
    technologies: ["React", "TypeScript", "Zustand", "React Router", "localStorage", "Tests"],
  },
  analytics: {
    slug: "analytics",
    index: "03",
    title: "Pulseboard Analytics",
    category: "Frontend B2B SaaS analytics dashboard demo.",
    description:
      "A responsive analytics dashboard for revenue, customer growth, churn, acquisition and funnel review using mock data.",
    media: {
      src: "/projects/analytics/overview.png",
      alt: "Pulseboard Analytics overview showing board brief, workspace health and revenue metrics.",
    },
    secondaryMedia: {
      src: "/projects/analytics/revenue.png",
      alt: "Pulseboard Analytics revenue view showing recurring revenue, retention, acquisition cost and a growth chart.",
    },
    highlights: [
      "React and TypeScript dashboard architecture with responsive layout states.",
      "Recharts visualizations backed by typed mock dashboard datasets.",
      "Separate overview, revenue, customer, acquisition, churn, funnel and reports views.",
    ],
    technologies: ["React", "TypeScript", "Vite", "Tailwind CSS", "Recharts", "Lucide React"],
  },
  penaltyGame: {
    slug: "penalty-game",
    index: "EXP / 01",
    title: "Penalty Shootout",
    category: "Playable 2D football game experiment.",
    description: "A Phaser 3 game experiment built around aiming, charge timing and goalkeeper reads.",
    media: {
      src: "/projects/penalty-game/gameplay.png",
      alt: "Penalty Shootout gameplay showing a striker facing a goalkeeper and the power control.",
    },
    secondaryMedia: {
      src: "/projects/penalty-game/result.png",
      alt: "Penalty Shootout goal result showing the goalkeeper beaten and match feedback.",
    },
    highlights: [
      "Aim zones, shot styles and a charge-based power bar.",
      "Goalkeeper telegraphing and reactive dive behavior.",
      "A Phaser 3 and TypeScript build with fictional teams and local assets.",
    ],
    technologies: ["Phaser 3", "TypeScript", "Vite"],
  },
} satisfies Record<string, Project>;

export const devflowProject = projects.devflow;
export const scoutlabProject = projects.scoutlab;
export const analyticsProject = projects.analytics;
export const penaltyGameProject = projects.penaltyGame;
