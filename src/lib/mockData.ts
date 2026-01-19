// 博客文章类型定义
export interface BlogPost {
  id: string;
  title: string;
  excerpt: string;
  content: string;
  category: string;
  tags: string[];
  date: string;
  coverImage: string;
  readTime: number;
}

// 照片集类型定义
export interface PhotoGallery {
  id: string;
  title: string;
  description: string;
  date: string;
  category: string;
  coverImage: string;
  photoCount: number;
  photos: string[];
}

// 模拟博客文章数据
export const blogPosts: BlogPost[] = [
  {
    id: "1",
    title: "2026年新年旅行：探索京都古寺与现代艺术的交融",
    excerpt: "在这次旅行中，我参观了京都的传统寺庙，同时也发现了这座古都中隐藏的现代艺术空间。",
    content: `
      <p>今年新年，我决定前往日本京都，探索这座有着千年历史的古都。京都作为日本传统文化的中心，拥有超过1600座寺庙和400座神社，每一处都蕴含着深厚的历史底蕴。</p>
      
      <h3>第一天：金阁寺与龙安寺</h3>
      <p>抵达京都的第一天，我首先参观了闻名遐迩的金阁寺。这座三层楼阁被金箔包裹，倒映在镜湖池中，景色令人叹为观止。下午，我来到了龙安寺，欣赏了著名的枯山水庭院，15块石头的排列方式蕴含着深奥的哲学思想。</p>
      
      <h3>意外发现：京都现代艺术空间</h3>
      <p>除了传统景点，我还意外发现了京都的现代艺术一面。位于河原町的"京都艺术中心"正在举办一场当代日本艺术家的展览，将传统元素与现代艺术语言相结合，给我带来了全新的视觉体验。</p>
      
      <h3>美食体验</h3>
      <p>京都的美食同样令人难以忘怀。在岚山脚下的一家百年老店，我品尝了正宗的怀石料理，每一道菜都精致得如同艺术品。此外，京都的抹茶甜点也是必尝之物，浓郁的茶香让人回味无穷。</p>
      
      <p>这次京都之行，让我在传统与现代之间找到了平衡，也为我的2026年开了一个充满灵感的好头。</p>
    `,
    category: "旅行日记",
    tags: ["日本", "京都", "旅行", "文化"],
    date: "2026-01-15",
    coverImage: "https://space.coze.cn/api/coze_space/gen_image?image_size=landscape_16_9&prompt=Kyoto%20Japan%20Kinkakuji%20Golden%20Pavilion%20temple%20traditional%20architecture&sign=4b261f2b77a0c68436b0915de0f6cf80",
    readTime: 8,
  },
  {
    id: "2",
    title: "我的晨间习惯：如何在忙碌的生活中找到宁静",
    excerpt: "每天早晨的一小时，改变了我的生活状态。分享我的晨间习惯和心得体会。",
    content: `
      <p>一年前，我决定改变自己的生活方式，从建立健康的晨间习惯开始。经过一年的实践，我发现这小小的改变给我的生活带来了巨大的影响。</p>
      
      <h3>5:30起床：拥抱清晨的宁静</h3>
      <p>每天早上5:30，我准时起床。这时候，世界还很安静，没有工作的打扰，没有手机的消息提示，只有我自己和清晨的宁静。这段时间完全属于我自己，可以用来做任何我想做的事情。</p>
      
      <h3>晨间冥想：与自己对话</h3>
      <p>起床后，我会进行15分钟的冥想。冥想帮助我清空思绪，集中注意力，为一天的工作做好准备。刚开始冥想的时候，我很难让自己安静下来，但随着时间的推移，我越来越享受这种与自己对话的感觉。</p>
      
      <h3>阅读与学习：充实心灵</h3>
      <p>冥想结束后，我会花30分钟阅读。我喜欢读一些哲学、心理学和自我成长方面的书籍，这些书籍能够拓宽我的视野，丰富我的内心世界。有时候，我也会学习一门新的语言或者一项新的技能。</p>
      
      <h3>健康早餐：为身体充电</h3>
      <p>最后，我会为自己准备一份健康的早餐。我通常会选择一些全麦面包、水果、坚果和酸奶，这些食物能够为我的身体提供充足的能量，让我在上午保持良好的状态。</p>
      
      <p>通过建立这些晨间习惯，我发现自己的工作效率提高了，心情也更加平静和愉悦。如果你也想改变自己的生活状态，不妨从建立健康的晨间习惯开始。</p>
    `,
    category: "生活日记",
    tags: ["习惯", "自我成长", "健康", "冥想"],
    date: "2026-01-10",
    coverImage: "https://space.coze.cn/api/coze_space/gen_image?image_size=landscape_16_9&prompt=Morning%20routine%20meditation%20mindfulness%20peaceful%20sunrise&sign=df488aaddb4f1139b18118cbc59328d3",
    readTime: 6,
  },
  {
    id: "3",
    title: "月度回顾：2026年1月的那些小确幸",
    excerpt: "回顾过去一个月的生活，记录那些让我感到幸福和满足的小瞬间。",
    content: `
      <p>时间过得真快，转眼间2026年的第一个月就要结束了。在这个月里，我经历了许多美好的事情，也收获了不少感悟。今天，我想回顾一下这个月的那些小确幸，让这些美好的回忆永远留在我的心中。</p>
      
      <h3>新年第一天的日出</h3>
      <p>2026年的第一天，我特意早起去看日出。当太阳从地平线缓缓升起，金色的阳光洒在大地上，我感到无比的震撼和感动。那一刻，我感受到了生命的力量和希望的美好。</p>
      
      <h3>与老友的重逢</h3>
      <p>这个月，我与一位多年未见的老友重逢了。我们一起回忆过去的美好时光，分享各自的生活经历，仿佛又回到了那些无忧无虑的日子。友情是生命中最珍贵的财富之一，我会好好珍惜。</p>
      
      <h3>学会了一道新菜</h3>
      <p>作为一个美食爱好者，我一直很喜欢尝试新的食谱。这个月，我学会了做一道正宗的意大利千层面。当我第一次成功做出这道菜时，那种成就感和满足感简直无法用言语形容。</p>
      
      <h3>读完了一本好书</h3>
      <p>这个月，我读完了《人类简史》这本书。作者尤瓦尔·赫拉利用独特的视角和深入浅出的语言，讲述了人类从石器时代到21世纪的发展历程。这本书让我对人类的历史和未来有了全新的认识。</p>
      
      <p>生活中的小确幸其实无处不在，只要我们用心去感受，就能发现身边的美好。我希望在接下来的日子里，能够继续记录这些美好的瞬间，让我的生活充满阳光和温暖。</p>
    `,
    category: "月度回顾",
    tags: ["生活", "感悟", "回忆", "幸福"],
    date: "2026-01-05",
    coverImage: "https://space.coze.cn/api/coze_space/gen_image?image_size=landscape_16_9&prompt=Monthly%20review%20journal%20reflection%20cozy%20home&sign=36c30e3d339d04108655a6ef0f075ac3",
    readTime: 5,
  },
];

// 模拟照片集数据
export const photoGalleries: PhotoGallery[] = [
  {
    id: "1",
    title: "京都之旅",
    description: "记录2026年新年在京都的美好时光",
    date: "2026年1月",
    category: "旅行相册",
    coverImage: "https://space.coze.cn/api/coze_space/gen_image?image_size=landscape_16_9&prompt=Kyoto%20Japan%20traditional%20street%20bamboo%20forest&sign=30ce8848a93000f7f0a74901711a8cb4",
    photoCount: 24,
    photos: [
      "https://space.coze.cn/api/coze_space/gen_image?image_size=landscape_16_9&prompt=Kyoto%20Japan%20Fushimi%20Inari%20shrine%20torii%20gates&sign=fa229e7dc07fb9f1b5f5070fb22bbdb4",
      "https://space.coze.cn/api/coze_space/gen_image?image_size=landscape_16_9&prompt=Kyoto%20Japan%20Arashiyama%20bamboo%20grove&sign=fc714c76253f283d1bc9a54407563b3e",
      "https://space.coze.cn/api/coze_space/gen_image?image_size=landscape_16_9&prompt=Kyoto%20Japan%20traditional%20machiya%20house&sign=fc06068b0b43e566f0ed508568baa74d",
      "https://space.coze.cn/api/coze_space/gen_image?image_size=landscape_16_9&prompt=Kyoto%20Japan%20Gion%20district%20geisha&sign=ad09879e1508e3e47b2fa4e55220081f",
    ],
  },
  {
    id: "2",
    title: "冬日里的城市风光",
    description: "记录城市在冬日里的独特魅力",
    date: "2025年12月",
    category: "城市摄影",
    coverImage: "https://space.coze.cn/api/coze_space/gen_image?image_size=landscape_16_9&prompt=Winter%20city%20landscape%20snow%20buildings&sign=bd5a03bdb95f67e610ec6528c2c9a54a",
    photoCount: 18,
    photos: [
      "https://space.coze.cn/api/coze_space/gen_image?image_size=landscape_16_9&prompt=Winter%20park%20snowy%20trees%20bench&sign=c625e2a5251d3895555ab6858be22ce7",
      "https://space.coze.cn/api/coze_space/gen_image?image_size=landscape_16_9&prompt=Urban%20winter%20street%20lights%20snowfall&sign=11c3260ff4a47c83db21678888b2ebb6",
      "https://space.coze.cn/api/coze_space/gen_image?image_size=landscape_16_9&prompt=Winter%20city%20skyline%20sunset&sign=e9ba6dc1612da4d950d36b18fc850bed",
      "https://space.coze.cn/api/coze_space/gen_image?image_size=landscape_16_9&prompt=Snowy%20city%20bridge%20river&sign=1f19a5423a3cc91fe03b9dccfd091250",
    ],
  },
  {
    id: "3",
    title: "我的植物日记",
    description: "记录家中植物的生长历程",
    date: "2025年全年",
    category: "生活记录",
    coverImage: "https://space.coze.cn/api/coze_space/gen_image?image_size=landscape_16_9&prompt=Indoor%20plants%20home%20garden%20green%20aesthetic&sign=220f6fd1ff2acae031ab3889a66e7624",
    photoCount: 32,
    photos: [
      "https://space.coze.cn/api/coze_space/gen_image?image_size=landscape_16_9&prompt=Potted%20plants%20windowsill%20sunlight&sign=21c024961e599d375add57a172d70c71",
      "https://space.coze.cn/api/coze_space/gen_image?image_size=landscape_16_9&prompt=Succulent%20collection%20variety%20pots&sign=98a2354bc2869e3a86f4328a05c25641",
      "https://space.coze.cn/api/coze_space/gen_image?image_size=landscape_16_9&prompt=Indoor%20jungle%20living%20room%20plants&sign=7415509b86a273270b60c7575abe3e9e",
      "https://space.coze.cn/api/coze_space/gen_image?image_size=landscape_16_9&prompt=Plant%20propagation%20growth%20journey&sign=fe0dbe1e83872b43f556aff3d6b80fcb",
    ],
  },
];