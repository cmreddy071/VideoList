export interface Category {
  id: number;
  name: string;
}

export interface Video {
  id: number;
  catIds: number[];
  name: string;
  formats: VideoFormats
}

export interface Author {
  id: number;
  name: string;
  videos: Video[];
}

export interface ProcessedVideo {
  id: number;
  name: string;
  author: string;
  categories: string[];
}

export interface VideoFormat{
  res: string;
  size: number;
}

export interface VideoFormats{
  one?: VideoFormat;
  two?: VideoFormat;
  three?: VideoFormat;
}

export interface VideosRes {
  authorId?: number;
  authorName: string;
  catIds?: number[];
  categories: (string|undefined)[];
  formats: VideoFormats;
  id: number;
  name: string;
  releaseDate?: string;
  highestQualityFormat?: string;
}
