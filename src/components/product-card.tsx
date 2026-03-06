
"use client";

import { useContext } from 'react';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { ShoppingCart, Star } from 'lucide-react';
import { type Product } from '@/lib/product-data';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { CartContext } from '@/context/cart-context';
import { useToast } from '@/hooks/use-toast';
import Link from 'next/link';
import { cn } from '@/lib/utils';

function StarRating({ rating }: { rating: number }) {
    return (
        <div className="flex items-center gap-0.5">
            {[...Array(5)].map((_, i) => (
                <Star
                    key={i}
                    className={cn(
                        "h-4 w-4",
                        rating > i ? "text-yellow-400 fill-yellow-400" : "text-gray-300 fill-gray-300"
                    )}
                />
            ))}
        </div>
    );
}

export function ProductCard({ product }: { product: Product }) {
    const { addToCart } = useContext(CartContext);
    const { toast } = useToast();
    const image = PlaceHolderImages.find(p => p.id === product.imageId);

    const handleAddToCart = (e: React.MouseEvent) => {
        e.preventDefault(); // Prevent link navigation
        e.stopPropagation(); // Stop event bubbling
        addToCart(product);
        toast({
            title: "Added to Cart",
            description: `${product.name} has been added to your cart.`,
        });
    };

    return (
        <Card className="flex flex-col overflow-hidden rounded-2xl shadow-lg transition-all duration-300 hover:shadow-2xl hover:-translate-y-2 bg-card group">
           <Link href={`/shop/${product.slug}`}>
            {image && (
                 <div className="block overflow-hidden aspect-square relative">
                    <Image
                        src={image.imageUrl}
                        alt={product.name}
                        fill
                        data-ai-hint={image.imageHint}
                        className="object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                </div>
            )}
            <CardContent className="flex flex-col flex-1 p-6">
                <h3 className="text-xl font-bold text-foreground mb-2 leading-snug">
                    {product.name}
                </h3>
                 <div className="flex items-center gap-2 mb-2">
                    <StarRating rating={product.rating} />
                    <span className="text-xs text-muted-foreground">({product.reviews})</span>
                </div>
                 <p className="text-sm text-muted-foreground flex-1 mb-4">{product.description}</p>
                 <div className="flex items-center justify-between mb-6">
                    <span className="text-2xl font-bold text-primary">UGX {product.price.toLocaleString()}</span>
                 </div>
                <Button onClick={handleAddToCart} type="button" className="w-full">
                    <ShoppingCart className="mr-2 h-4 w-4" />
                    Add to Cart
                </Button>
            </CardContent>
           </Link>
        </Card>
    );
}
 
