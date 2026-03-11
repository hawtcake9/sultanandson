export type MediaProject = {
  slug: string
  title: string
  description: string
  images: string[]
}

export const MEDIA_PROJECTS: MediaProject[] = [
  {
    slug: "solar-energy",
    title: "Solar Energy Initiative",
    description:
      "Complete solar inverter installation project with hybrid energy system and smart monitoring.",
    images: [
      "/images/gallery1.jpeg",
      "/images/gallery2.jpeg",
      "/images/gallery3.jpeg",
    ],
  },
  {
    slug: "partnership-celebration",
    title: "Partnership Celebration",
    description:
      "Strategic partnership signing ceremony between Sultan & Sons and renewable energy partners.",
    images: [
      "/images/gallery4.jpeg",
      "/images/gallery5.jpeg",
      "/images/gallery6.jpeg",
    ],
  },
  {
    slug: "branch-opening",
    title: "Branch Opening Event",
    description:
      "Grand opening celebration of our new branch with team members and partners.",
    images: [
      "/images/gallery7.jpeg",
      "/images/gallery8.jpeg",
      "/images/gallery9.jpeg",
    ],
  },
]
