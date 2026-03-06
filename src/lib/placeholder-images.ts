import data from './placeholder-images.json';

export type ImagePlaceholder = {
  id: string;
  description: string;
  imageUrl: string;
  imageHint: string;
};

// The issue was with how the JSON module was being interpreted.
// Accessing the 'default' property and then 'placeholderImages' is the robust way to handle it.
const placeholderImagesData = (data as any).default || data;

export const PlaceHolderImages: ImagePlaceholder[] = placeholderImagesData.placeholderImages;
