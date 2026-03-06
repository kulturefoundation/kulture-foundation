
"use client";

import { useEffect, useMemo } from 'react';
import { useRouter } from 'next/navigation';
import {
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from '@/components/ui/command';
import { getAllPosts } from '@/lib/blog-data';
import { getAllStories } from '@/lib/stories-data';
import { getAllPrograms } from '@/lib/programs-data';
import { getAllCauses } from '@/lib/causes-data';
import { FileText, BookOpen, Wind, Heart } from 'lucide-react';

interface SearchDialogProps {
    isOpen: boolean;
    onOpenChange: (open: boolean) => void;
}

export function SearchDialog({ isOpen, onOpenChange }: SearchDialogProps) {
    const router = useRouter();

    const allContent = useMemo(() => {
        const posts = getAllPosts().map(item => ({ ...item, type: 'Blog', path: '/blog' }));
        const stories = getAllStories().map(item => ({ ...item, type: 'Story', path: '/story-hub' }));
        const programs = getAllPrograms().map(item => ({ ...item, type: 'Program', path: '/programs' }));
        const causes = getAllCauses().map(item => ({ ...item, type: 'Cause', path: '/causes' }));
        return [...posts, ...stories, ...programs, ...causes];
    }, []);

    const runCommand = (command: () => unknown) => {
        onOpenChange(false);
        command();
    };

    return (
        <CommandDialog open={isOpen} onOpenChange={onOpenChange}>
            <CommandInput placeholder="Search for stories, causes, blog posts..." />
            <CommandList>
                <CommandEmpty>No results found.</CommandEmpty>
                <CommandGroup heading="Content">
                    {allContent.map(item => (
                        <CommandItem
                            key={`${item.type}-${item.slug}`}
                            value={`${item.title} ${item.type}`}
                            onSelect={() => {
                                runCommand(() => router.push(`${item.path}/${item.slug}`));
                            }}
                        >
                            {item.type === 'Blog' && <FileText className="mr-2 h-4 w-4" />}
                            {item.type === 'Story' && <BookOpen className="mr-2 h-4 w-4" />}
                            {item.type === 'Program' && <Wind className="mr-2 h-4 w-4" />}
                            {item.type === 'Cause' && <Heart className="mr-2 h-4 w-4" />}
                            <span>{item.title}</span>
                            <span className="ml-auto text-xs text-muted-foreground">{item.type}</span>
                        </CommandItem>
                    ))}
                </CommandGroup>
            </CommandList>
        </CommandDialog>
    );
}
