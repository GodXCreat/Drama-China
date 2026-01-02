/* =========================
   BASIC TYPES
========================= */

export interface TagV3 {
  tagId: number;
  tagName: string;
  tagEnName: string;
}

export interface Corner {
  cornerType: number;
  name: string;
  color: string;
}

export interface RankVo {
  rankType: number;
  hotCode: string;
  sort: number;
}

/* =========================
   LIST / GRID DRAMA
========================= */

export interface Drama {
  bookId: string;
  bookName: string;

  cover?: string;
  coverWap?: string;

  introduction?: string;
  protagonist?: string;

  chapterCount: number;

  // ✅ numbers (dipakai UI)
  playCount?: number;
  viewCount?: number;
  followCount?: number;

  // tags
  tags?: string[];
  tagNames?: string[];
  tagV3s?: TagV3[];

  // badges
  corner?: Corner;
  rankVo?: RankVo;

  shelfTime?: string;
  inLibrary?: boolean;
}

/* =========================
   SEARCH
========================= */

export interface SearchResult {
  bookId: string;
  bookName: string;
  introduction: string;
  author?: string;
  cover: string;
  protagonist?: string;
  tagNames: string[];
  inLibrary: boolean;
}

/* =========================
   DETAIL PAGE
========================= */

export interface Performer {
  performerId: string;
  performerName: string;
  performerFormatName?: string;
  performerAvatar: string;
  videoCount?: number;
}

export interface TypeTwo {
  id: number;
  name: string;
  replaceName?: string;
}

export interface ChapterDetail {
  id: string;
  name: string;
  index: number;
  indexStr?: string;
  unlock: boolean;
  mp4?: string;
  m3u8Url?: string;
  m3u8Flag?: boolean;
  cover?: string;
  utime?: string;
  chapterPrice?: number;
  duration?: number;
  new?: boolean;
}

export interface BookDetail {
  bookId: string;
  bookName: string;
  cover: string;

  viewCount: number;
  followCount: number;

  introduction: string;
  chapterCount: number;

  labels?: string[];
  tags?: string[];

  typeTwoNames?: string[];
  typeTwoList?: TypeTwo[];

  language?: string;
  shelfTime?: string;

  performerList?: Performer[];
}

export interface RecommendDrama {
  bookId: string;
  bookName: string;
  cover: string;
  followCount?: number;
  introduction?: string;
  chapterCount?: number;
  labels?: string[];
  tags?: string[];
  typeTwoNames?: string[];
}

export interface DramaDetailResponse {
  data: {
    book: BookDetail;
    recommends: RecommendDrama[];
    chapterList: ChapterDetail[];
  };
  status: number;
  message: string;
  success: boolean;
}

/* =========================
   EPISODE / WATCH
========================= */

export interface VideoPath {
  quality: number;
  videoPath: string;
  isDefault: number;
  isVipEquity: number;
}

export interface CdnInfo {
  cdnDomain: string;
  isDefault: number;
  videoPathList: VideoPath[];
}

export interface Episode {
  chapterId: string;
  chapterIndex: number;
  isCharge: number;
  chapterName: string;
  cdnList: CdnInfo[];
  chapterImg?: string;
  chargeChapter?: boolean;
}
