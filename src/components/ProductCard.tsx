// src/components/ProductCard.tsx
"use client";

import Image from 'next/image';
import type { Product } from '@/types/product';
import { Card, CardContent, CardFooter, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { MessageSquare } from 'lucide-react';
import { useEffect, useState } from 'react';

interface ProductCardProps {
  product: Product;
}

// Fallback image if product.imageUrl is empty or invalid
const FALLBACK_IMAGE_URL = "https://via.placeholder.com/400x400.png?text=No+Image"; 
const FIXED_STORE_PHONE_NUMBER = "50245038620"; // Updated store phone number for Guatemala

export default function ProductCard({ product }: ProductCardProps) {
  const [currentImageUrl, setCurrentImageUrl] = useState(product.imageUrl || FALLBACK_IMAGE_URL);

  useEffect(() => {
    // Ensure imageUrl is set, fallback if empty or different from current state
    const newImageUrl = product.imageUrl || FALLBACK_IMAGE_URL;
    if (newImageUrl !== currentImageUrl) {
        setCurrentImageUrl(newImageUrl);
    }
  }, [product.imageUrl, currentImageUrl]);

  const handleImageError = () => {
    if (currentImageUrl !== FALLBACK_IMAGE_URL) { // Avoid infinite loop if fallback itself fails
      setCurrentImageUrl(FALLBACK_IMAGE_URL);
    }
  };

  const whatsappMessage = `Hola, me interesa el producto: ${product.name}`;
  const whatsappUrl = `https://wa.me/${FIXED_STORE_PHONE_NUMBER}?text=${encodeURIComponent(whatsappMessage)}`;

  return (
    <Card className="flex flex-col overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300 rounded-lg group">
      <CardHeader className="p-0">
        <div className="aspect-square relative w-full">
          <Image
            src={currentImageUrl}
            alt={product.name}
            fill={true}
            style={{ objectFit: "cover" }}
            className="transition-transform duration-300 group-hover:scale-105"
            onError={handleImageError}
            unoptimized={true} 
            data-ai-hint={currentImageUrl === FALLBACK_IMAGE_URL ? "placeholder image" : (product.name ? product.name.split(" ").slice(0,2).join(" ") : "product image")}
          />
        </div>
      </CardHeader>
      <CardContent className="p-4 flex-grow">
        <CardTitle className="text-lg font-semibold mb-1 truncate" title={product.name}>{product.name}</CardTitle>
        <CardDescription className="text-sm text-muted-foreground h-10 overflow-hidden line-clamp-2 mb-2" title={product.description}>
          {product.description}
        </CardDescription>
        <p className="text-xl font-bold text-primary">
          ${typeof product.price === 'number' ? product.price.toFixed(2) : 'N/A'}
        </p>
      </CardContent>
      <CardFooter className="p-4 border-t">
        <Button 
          asChild 
          className="w-full bg-primary hover:bg-accent text-primary-foreground"
        >
          <a 
            href={whatsappUrl} 
            target="_blank" 
            rel="noopener noreferrer" 
          >
            <MessageSquare className="mr-2 h-5 w-5" />
            Contactar por WhatsApp
          </a>
        </Button>
      </CardFooter>
    </Card>
  );
}

