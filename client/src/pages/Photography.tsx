import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import Navigation from "@/components/Navigation";
import PayPalButton from "@/components/PayPalButton";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { formatPrice } from "@/lib/utils";
import type { Photo } from "@shared/schema";

export default function Photography() {
  const [selectedPhoto, setSelectedPhoto] = useState<Photo | null>(null);
  const [isPurchaseModalOpen, setIsPurchaseModalOpen] = useState(false);

  // Fetch photos
  const { data: photos = [], isLoading: photosLoading } = useQuery<Photo[]>({
    queryKey: ['/api/photos'],
  });

  const handlePhotoClick = (photo: Photo) => {
    setSelectedPhoto(photo);
    setIsPurchaseModalOpen(true);
  };

  return (
    <div className="min-h-screen text-gray-100" style={{backgroundColor: 'hsl(0, 0%, 6%)'}}>
      <Navigation />
      
      {/* Photography Section */}
      <section className="py-20 pt-32 circuit-bg">
        <div className="max-w-6xl mx-auto px-4">
          <h1 className="text-4xl font-bold text-center mb-16">
            <span className="text-copper">Photography</span> Portfolio
          </h1>
          
          {photosLoading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[...Array(6)].map((_, i) => (
                <div key={i} className="glass-effect p-4 rounded-lg animate-pulse">
                  <div className="bg-gray-700 h-64 rounded mb-4"></div>
                  <div className="h-4 bg-gray-700 rounded mb-2"></div>
                  <div className="h-4 bg-gray-700 rounded w-1/2"></div>
                </div>
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {photos.map((photo) => (
                <div 
                  key={photo.id} 
                  className="group cursor-pointer"
                  onClick={() => handlePhotoClick(photo)}
                >
                  <div className="relative overflow-hidden rounded-lg glass-effect">
                    <img 
                      src={photo.imageUrl} 
                      alt={photo.altText}
                      className="w-full h-64 object-cover group-hover:scale-110 transition-transform duration-500" 
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <div className="absolute bottom-4 left-4 text-white">
                        <h3 className="font-semibold">{photo.title}</h3>
                        <p className="text-sm text-gray-200">{formatPrice(photo.price)}</p>
                      </div>
                      <Button
                        className="absolute bottom-4 right-4 bg-copper text-white hover:bg-copper-dark"
                        onClick={(e) => {
                          e.stopPropagation();
                          handlePhotoClick(photo);
                        }}
                      >
                        Buy Print
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Photo Purchase Modal */}
      <Dialog open={isPurchaseModalOpen} onOpenChange={setIsPurchaseModalOpen}>
        <DialogContent className="glass-effect border-copper/20 max-w-2xl">
          <DialogHeader>
            <DialogTitle className="text-copper text-2xl">
              {selectedPhoto?.title}
            </DialogTitle>
          </DialogHeader>
          
          {selectedPhoto && (
            <div className="space-y-6">
              <div className="relative">
                <img 
                  src={selectedPhoto.imageUrl} 
                  alt={selectedPhoto.altText}
                  className="w-full h-80 object-cover rounded-lg"
                />
              </div>
              
              <div className="space-y-4">
                <p className="text-gray-300">{selectedPhoto.description}</p>
                
                <div className="flex justify-between items-center">
                  <div>
                    <p className="text-2xl font-bold text-copper">
                      {formatPrice(selectedPhoto.price)}
                    </p>
                    <p className="text-sm text-gray-400">
                      High-quality print delivered to your door
                    </p>
                  </div>
                  
                  <div className="space-y-2">
                    <PayPalButton 
                      amount={selectedPhoto.price}
                      currency="USD"
                      intent="capture"
                    />
                  </div>
                </div>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}