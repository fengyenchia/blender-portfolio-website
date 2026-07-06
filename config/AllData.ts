// config/AllData.ts

export interface WeekItem {
  name: string;
  slug: string;
  image?: string;
}

export interface CourseData {
  name: string;
  slug: string;
  weeks: WeekItem[];
}

export const AllData: Record<string, CourseData[]> = {
  homework: [
    // {
    //   name: "基礎動畫設計",
    //   slug: "threeD-computer-animation-foundation",
    //   weeks: []
    // },
    {
      name: "電腦動畫",
      slug: "computer-animation",
      weeks: [
        { name: "第二週 作業《葉子》", 
          slug: "CG_HW02",
          image: "/images/homework/computer-animation/hw02/w2-9-1_orig.png"
        },
      ]
    }
  ],


  project: [
    // {
    //   name: "基礎動畫設計",
    //   slug: "threeD-computer-animation-foundation",
    //   weeks: [
    //     { name: "PROJ02《倒數計時器》", 
    //       slug: "3D_Proj01",
    //       image: "/images/banner.png"
    //     },
    //   ]
    // },
    {
      name: "電腦動畫",
      slug: "computer-animation",
      weeks: [
        { name: "PROJ01《ARTICULATE 3D NCCU LOGO》", 
          slug: "CG_Proj01",
          image: "/images/banner.png"
        },
      ]
    }
  ],

  
  paper: [
    // {
    //   name: "基礎動畫設計",
    //   slug: "threeD-computer-animation-foundation",
    //   weeks: [
    //     { name: "PROJ02《倒數計時器》", 
    //       slug: "3D_Paper01", 
    //       image: "/images/banner.png" },
    //   ]
    // },
    {
      name: "電腦動畫",
      slug: "computer-animation",
      weeks: [
        { name: "PROJ01《ARTICULATE 3D NCCU LOGO》", 
          slug: "CG_Paper01", 
          image: "/images/banner.png" },
      ]
    }
  ]
};
