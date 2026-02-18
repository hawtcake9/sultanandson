'use client';

import { useState } from 'react';
import { ChevronLeft, ChevronRight, X } from 'lucide-react';
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"

const MEDIA_IMAGES = [
  {
    id: 1,
    src: '/images/gallery1.jpeg',
    alt: 'Where Innovation Meets Solar Power',
    title: 'Solar Energy Initiative',
  },
  {
    id: 2,
    src: '/images/gallery2.jpeg',
    alt: 'MOU Celebration with Thumbs Up',
    title: 'Partnership Celebration',
  },
  {
    id: 3,
    src: '/images/gallery3.jpeg',
    alt: 'Team Meeting and Discussion',
    title: 'Office Meeting',
  },
  {
    id: 4,
    src: '/images/gallery4.jpeg',
    alt: 'MOU Signing with Certificate',
    title: 'Agreement Signing',
  },
  {
    id: 5,
    src: '/images/gallery5.jpeg',
    alt: 'Strategic Partnership Handshake',
    title: 'Partnership Success',
  },
  {
    id: 6,
    src: '/images/gallery6.jpeg',
    alt: 'Team Signing Document',
    title: 'We Make Things Easy',
  },
  {
    id: 7,
    src: '/images/gallery7.jpeg',
    alt: 'Office Document Signing',
    title: 'Official Agreement',
  },
  {
    id: 8,
    src: '/images/gallery8.jpeg',
    alt: 'Grand Opening Cake Cutting',
    title: 'Grand Opening Celebration',
  },
  {
    id: 9,
    src: '/images/gallery9.jpeg',
    alt: 'Grand Opening Event Team',
    title: 'Branch Opening Event',
  },
];

export default function MediaPage() {
  const [selectedImageIndex, setSelectedImageIndex] = useState<number | null>(null);

  const openImage = (index: number) => setSelectedImageIndex(index);
  const closeModal = () => setSelectedImageIndex(null);

  const goToPrevious = () => {
    if (selectedImageIndex === null) return;
    setSelectedImageIndex(
      selectedImageIndex === 0 ? MEDIA_IMAGES.length - 1 : selectedImageIndex - 1
    );
  };

  const goToNext = () => {
    if (selectedImageIndex === null) return;
    setSelectedImageIndex(
      selectedImageIndex === MEDIA_IMAGES.length - 1 ? 0 : selectedImageIndex + 1
    );
  };

  return (
    <main className="min-h-screen bg-gradient-to-br from-background to-secondary/5">
<Navbar />
      {/* HEADER FIXED — Added pt-24 to prevent navbar overlap */}
      <section className="pt-24 bg-gradient-to-r from-primary to-primary/80 text-white py-20 px-4">
        <div className="max-w-6xl mx-auto text-center">
          <h1 className="text-5xl font-bold mb-4">
            Media Gallery
          </h1>
          <p className="text-lg text-white/90">
            Explore our latest events, partnerships, and milestones
          </p>
        </div>
      </section>

      {/* Gallery Grid */}
      <section className="max-w-6xl mx-auto px-4 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {MEDIA_IMAGES.map((image, index) => (
            <div
              key={image.id}
              className="group relative h-64 rounded-lg overflow-hidden shadow-lg cursor-pointer"
              onClick={() => openImage(index)}
            >
              <div className="relative w-full h-full bg-gray-200">
                <img
                  src={image.src}
                  alt={image.alt}
                  className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
                />
              </div>

              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition-all duration-300 flex items-center justify-center">
                <div className="text-white text-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <p className="text-lg font-semibold">{image.title}</p>
                  <p className="text-sm text-white/80 mt-2">Click to view</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Modal */}
      {selectedImageIndex !== null && (
        <div className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-4">

          <button
            onClick={closeModal}
            className="absolute top-4 right-4 text-white hover:bg-white/20 p-2 rounded-full transition-colors z-10"
          >
            <X size={32} />
          </button>

          <div className="relative w-full max-w-4xl h-96 md:h-screen md:max-h-[85vh]">
            <img
              src={MEDIA_IMAGES[selectedImageIndex].src}
              alt={MEDIA_IMAGES[selectedImageIndex].alt}
              className="w-full h-full object-contain"
            />

            <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black to-transparent text-white p-6">
              <p className="text-2xl font-semibold">
                {MEDIA_IMAGES[selectedImageIndex].title}
              </p>
              <p className="text-sm text-white/80 mt-1">
                {selectedImageIndex + 1} / {MEDIA_IMAGES.length}
              </p>
            </div>
          </div>

          <button
            onClick={goToPrevious}
            className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/20 hover:bg-white/30 text-white p-3 rounded-full transition-colors"
          >
            <ChevronLeft size={32} />
          </button>

          <button
            onClick={goToNext}
            className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/20 hover:bg-white/30 text-white p-3 rounded-full transition-colors"
          >
            <ChevronRight size={32} />
          </button>
        </div>
      )}
      <Footer />
    </main>
    
  );
}
