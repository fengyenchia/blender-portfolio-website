// config/AllData.ts

export interface WeekItem {
  name: string;
  slug: string;
  image?: string;
  children?: WeekItem[];
}

export interface CourseData {
  name: string;
  slug: string;
  weeks: WeekItem[];
}

export const AllData: Record<string, CourseData[]> = {
  homework: [
    {
      name: "電腦動畫",
      slug: "computer-animation",
      weeks: [
        { name: "Homework 02_葉子",
          slug: "CG_HW02",
          image: "/thumbs/homework/computer-animation/hw02/1864196219.jpg"
        },
        { name: "Homework 03_ LOGO Animation",
          slug: "CG_HW03",
          image: "/thumbs/homework/computer-animation/hw03/661849623.jpg"
        },
        { name: "Homework 04_ Procedural LOGO Sequence Animation",
          slug: "CG_HW04",
          image: "/thumbs/homework/computer-animation/hw04/1025972753.jpg"
        },
        { name: "Homework 07_ NCCU Particle Effect",
          slug: "CG_HW07",
          image: "/thumbs/homework/computer-animation/hw07/599648330.jpg"
        },
        { name: "Homework 10_ Particle Effects With Menu Switch",
          slug: "CG_HW10",
          image: "/thumbs/homework/computer-animation/hw10/2140215680.jpg"
        },
        { name: "Homework 11_ Node Based Chain Links",
          slug: "CG_HW11",
          image: "/thumbs/homework/computer-animation/hw11/266325951.jpg"
        },
        { name: "Homework 14_ Procedural Rusty Texture",
          slug: "CG_HW14",
          image: "/thumbs/homework/computer-animation/hw14/1154842785.jpg"
        }
      ]
    }
  ],

  project: [
    {
      name: "電腦動畫",
      slug: "computer-animation",
      weeks: [
        { name: "PROJECT01",
          slug: "project01",
          image: "/thumbs/project/computer-animation/project01/752679548.jpg",
          children: [
          { name: "PROJECT01",
            slug: "CG_Proj01",
            image: "/thumbs/project/computer-animation/project01/752679548.jpg"
          }
          ]
        },
        { name: "PROJECT02",
          slug: "project02",
          image: "/thumbs/project/computer-animation/project02-w11/266325951.jpg",
          children: [
          { name: "PROJECT02_W11",
            slug: "CG_Proj02_W11",
            image: "/thumbs/project/computer-animation/project02-w11/266325951.jpg"
          },
          { name: "PROJECT02_W12",
            slug: "CG_Proj02_W12",
            image: "/thumbs/project/computer-animation/project02-w12/1590178188.jpg"
          },
          { name: "PROJECT02_W13",
            slug: "CG_Proj02_W13",
            image: "/thumbs/project/computer-animation/project02-w13/867312710.jpg"
          },
          { name: "PROJECT02_W14",
            slug: "CG_Proj02_W14",
            image: "/thumbs/project/computer-animation/project02-w14/17725491.jpg"
          },
          { name: "PROJECT02_W15",
            slug: "CG_Proj02_W15",
            image: "/thumbs/project/computer-animation/project02-w15/17725491.jpg"
          },
          { name: "PROJECT02_W16_FINAL",
            slug: "CG_Proj02_W16_Final",
            image: "/thumbs/project/computer-animation/project02-w16-final/17725491.jpg"
          }
          ]
        }
      ]
    }
  ],

  paper: [
    {
      name: "電腦動畫",
      slug: "computer-animation",
      weeks: [
        { name: "屬於我的數位學程TD技能學習之路",
          slug: "CG_Paper01",
          image: "/thumbs/paper/computer-animation/paper01/2073114.png"
        },
        { name: "3D 列印測試流程紀錄",
          slug: "CG_Paper02",
          image: "/thumbs/paper/computer-animation/paper02/2073114.png"
        },
        { name: "Professional Workflow（w12）",
          slug: "CG_Paper03",
          image: "/thumbs/paper/computer-animation/paper03/2073114.png"
        }
      ]
    }
  ]
};
