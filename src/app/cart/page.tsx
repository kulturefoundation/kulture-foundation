
"use client";

import { useContext } from "react";
import Header from "@/components/layout/header";
import Footer from "@/components/layout/footer";
import { CartContext } from "@/context/cart-context";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Image from "next/image";
import { PlaceHolderImages } from "@/lib/placeholder-images";
import { Trash2, ShoppingCart, ArrowLeft } from "lucide-react";
import Link from "next/link";
import { Separator } from "@/components/ui/separator";

export default function CartPage() {
  const { cartItems, removeFromCart, updateQuantity, clearCart } = useContext(CartContext);

  const subtotal = cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0);

  return (
    <div className="bg-background min-h-screen flex flex-col">
      <Header />
      <main className="flex-1">
        <section className="py-24 sm:py-32">
          <div className="container">
            <div className="max-w-4xl mx-auto">
              <div className="text-center mb-16">
                 <h1 className="text-4xl md:text-5xl font-bold tracking-tight text-foreground mb-4">
                    Shopping Cart
                </h1>
                <p className="text-lg text-muted-foreground">Review your items and proceed to checkout.</p>
              </div>

              {cartItems.length === 0 ? (
                <div className="text-center py-16 border-2 border-dashed rounded-lg">
                  <ShoppingCart className="mx-auto h-16 w-16 text-muted-foreground" />
                  <h2 className="mt-6 text-2xl font-semibold text-foreground">Your cart is empty</h2>
                  <p className="mt-2 text-muted-foreground">Looks like you haven't added anything to your cart yet.</p>
                  <Button asChild className="mt-6">
                    <Link href="/shop">Start Shopping</Link>
                  </Button>
                </div>
              ) : (
                <div>
                  <div className="space-y-6">
                    {cartItems.map(item => {
                      const image = PlaceHolderImages.find(p => p.id === item.imageId);
                      return (
                        <div key={item.id} className="flex items-center gap-6">
                          <div className="relative w-24 h-24 rounded-lg overflow-hidden">
                            {image && <Image src={image.imageUrl} alt={item.name} fill className="object-cover" />}
                          </div>
                          <div className="flex-1 grid grid-cols-1 md:grid-cols-4 items-center gap-4">
                            <h3 className="font-semibold text-lg">{item.name}</h3>
                            <div className="flex items-center gap-2">
                                <Button variant="outline" size="icon" className="h-8 w-8" onClick={() => updateQuantity(item.id, item.quantity - 1)} disabled={item.quantity <= 1}>-</Button>
                                <Input type="number" value={item.quantity} readOnly className="w-16 text-center h-8" />
                                <Button variant="outline" size="icon" className="h-8 w-8" onClick={() => updateQuantity(item.id, item.quantity + 1)}>+</Button>
                            </div>
                            <p className="font-semibold text-right">UGX {(item.price * item.quantity).toLocaleString()}</p>
                            <div className="text-right">
                                <Button variant="ghost" size="icon" onClick={() => removeFromCart(item.id)}>
                                    <Trash2 className="h-5 w-5 text-muted-foreground" />
                                    <span className="sr-only">Remove item</span>
                                </Button>
                            </div>
                          </div>
                        </div>
                      )
                    })}
                  </div>

                  <Separator className="my-8" />
                  
                  <div className="flex justify-end items-center mb-8">
                     <Button variant="outline" onClick={clearCart}>Clear Cart</Button>
                  </div>

                  <div className="bg-secondary p-8 rounded-lg">
                    <div className="flex justify-between items-center text-2xl font-bold mb-6">
                      <span>Subtotal</span>
                      <span>UGX {subtotal.toLocaleString()}</span>
                    </div>
                    <Button size="lg" className="w-full" asChild>
                      <Link href="/checkout">Proceed to Checkout</Link>
                    </Button>
                    <p className="text-xs text-muted-foreground text-center mt-4">Shipping & taxes calculated at next step.</p>
                  </div>

                   <Button variant="link" asChild className="mt-8 mx-auto flex">
                      <Link href="/shop">
                        <ArrowLeft className="mr-2 h-4 w-4" />
                        Continue Shopping
                      </Link>
                    </Button>
                </div>
              )}
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
 
