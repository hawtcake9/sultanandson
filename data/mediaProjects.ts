export type MediaProject = {
  slug: string
  title: string
  description: string
  images: string[]
}

export const MEDIA_PROJECTS: MediaProject[] = [
  {
    slug: "solar-energy",
    title: "5KW Inverter Setup - Kala Khiel",
    description:
      "Fri, 21 Nov 2025 - 12:00 Solar Installations ShowcaseLocated in Kala Khiel, this solar inverter installation project demonstrates our commitment to delivering efficient and reliable renewable energy solutions. The system is designed to maximize energy output while ensuring long-term performance. Explore the images to see the installation process, system setup, and the final outcome of our work",
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
      "/images/gallery7.jpeg",
    ],
  },
  {
    slug: "branch-opening",
    title: "Branch Opening Event",
    description:
      "Grand opening celebration of our new branch with team members and partners.",
    images: [
      "/images/gallery8.jpeg",
      "/images/gallery9.jpeg",
      "/images/gallery10.jpeg",
      "/images/gallery11.jpeg",
    ],
  },
]
