// categories.ts
export const Categories = {
    Programming: 'Programming',
    Pun: 'Pun',
    Spooky: 'Spooky',
    Christmas: 'Christmas',
    Category: 'Category',
  } as const;
  
  export type Category = typeof Categories[keyof typeof Categories];
  