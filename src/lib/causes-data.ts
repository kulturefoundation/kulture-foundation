
export type Cause = {
    id: string;
    slug: string;
    title: string;
    category: string;
    goal: number;
    raised: number;
    imageId: string;
    shortDescription: string;
    longDescription: string;
    donorCount: number;
    impactStatement: string;
};

const causes: Cause[] = [
    {
        id: "school-supplies-for-100-children",
        slug: "school-supplies-for-100-children",
        title: "School Supplies for 100 Children",
        category: "Family Support",
        goal: 5000,
        raised: 1250,
        imageId: "cause-school",
        shortDescription: "Provide essential school supplies for 100 children in rural communities, ensuring they have the tools they need to succeed in their education.",
        longDescription: "Education is a fundamental right, yet many children in Uganda lack basic school supplies like books, pens, and uniforms. This cause aims to equip 100 children in underserved communities with all the necessary materials for a full school year. Your contribution will directly impact a child's ability to learn, participate in class, and build a brighter future for themselves and their community.",
        donorCount: 47,
        impactStatement: "Your $50 provides a complete school kit for one child."
    },
    {
        id: "support-a-local-musician",
        slug: "support-a-local-musician",
        title: "Support a Local Musician",
        category: "Arts & Culture",
        goal: 2500,
        raised: 700,
        imageId: "cause-music",
        shortDescription: "Help a talented local musician record their first professional album and provide them with a platform to share their music with the world.",
        longDescription: "Uganda's music scene is vibrant and full of undiscovered talent. This cause will sponsor a promising local musician, providing them with studio time, production costs, and marketing support to launch their career. By supporting this cause, you are not just helping one artist; you are preserving cultural expression and creating economic opportunities within the arts community.",
        donorCount: 23,
        impactStatement: "Your $25 supports one hour of professional studio time."
    },
    {
        id: "youth-digital-literacy-program",
        slug: "youth-digital-literacy-program",
        title: "Youth Digital Literacy Program",
        category: "Youth Empowerment",
        goal: 7500,
        raised: 3100,
        imageId: "cause-youth",
        shortDescription: "Equip 50 young adults with essential digital literacy and content creation skills, opening up new pathways to employment and entrepreneurship.",
        longDescription: "In today's digital world, computer skills are essential for economic empowerment. This program will establish a small computer lab and run a 3-month digital literacy course for 50 youths. Participants will learn everything from basic computer use to content creation and online marketing, providing them with the tools to find jobs or start their own online businesses.",
        donorCount: 62,
        impactStatement: "Your $150 trains one youth in digital literacy for 3 months."
    },
     {
        id: "preserve-elder-stories",
        slug: "preserve-elder-stories",
        title: "Preserve Elder Stories",
        category: "Storytelling",
        goal: 3000,
        raised: 1500,
        imageId: "cause-storytelling",
        shortDescription: "Fund a documentary project to record and preserve the oral histories and wisdom of village elders before their stories are lost forever.",
        longDescription: "A community's history is held in the memories and stories of its elders. This project will fund a small film crew to travel to rural villages and conduct in-depth interviews with elders, capturing their life stories, cultural knowledge, and historical accounts. The final documentary will serve as an invaluable educational resource for future generations.",
        donorCount: 31,
        impactStatement: "Your $100 funds a one-day filming trip to a rural village."
    },
    {
        id: "emergency-family-support-fund",
        slug: "emergency-family-support-fund",
        title: "Emergency Family Support Fund",
        category: "Family Support",
        goal: 10000,
        raised: 4500,
        imageId: "cause-family",
        shortDescription: "Provide a safety net for families facing unexpected crises like medical emergencies or loss of income, offering immediate relief for food and housing.",
        longDescription: "For families living on the edge, a single unexpected event can be catastrophic. This fund provides immediate, no-strings-attached financial assistance to families in crisis, helping them cover urgent needs like food, rent, or medical bills. It's a vital safety net that provides stability and dignity when it's needed most, preventing a temporary setback from becoming a lifelong struggle.",
        donorCount: 89,
        impactStatement: "Your $75 provides emergency food relief for a family for one week."
    },
    {
        id: "art-supplies-for-community-artists",
        slug: "art-supplies-for-community-artists",
        title: "Art Supplies for Community Artists",
        category: "Arts & Culture",
        goal: 2000,
        raised: 950,
        imageId: "cause-art",
        shortDescription: "Equip a collective of 20 local painters and sculptors with the high-quality materials they need to create and sell their art.",
        longDescription: "Lack of access to quality materials is a major barrier for many talented artists in Uganda. This cause will purchase a bulk supply of canvases, paints, brushes, clay, and other essential art supplies to be shared among a community art collective. This support empowers them to produce higher quality work, increase their income, and continue their artistic traditions.",
        donorCount: 18,
        impactStatement: "Your $30 provides a full set of paints for one artist."
    }
];

export function getAllCauses(): Cause[] {
    return causes;
}

export function getCauseBySlug(slug: string): Cause | undefined {
    return causes.find(cause => cause.slug === slug);
}
