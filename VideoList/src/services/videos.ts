import { getCategories } from './categories';
import { getAuthors } from './authors';
import { Author, Video, VideoFormats, VideosRes } from '../common/interfaces';

const getHighestQualityFormat = (input: VideoFormats): string => {
  let result = '';
  let maxSize = 0;
  let maxRes = 0;
   Object.entries(input).forEach(ele => {
      let {res: originalRes, size} = ele[1];
      let res = originalRes.substr(0, size.length-1);
      if(size > maxSize){
        maxSize = size;
        maxRes = res;
        result = `${ele[0]} ${originalRes}`;
      }else if(size === maxSize){
        if(maxRes < res){
          maxSize = size;
          maxRes = res;
        result = `${ele[0]} ${originalRes}`;
        }
      }
   });
  return result;
} 

export const getVideos = (): Promise<VideosRes[]> => {
  return Promise
    .all([getCategories(),getAuthors()])
    .then(([categories, authors]) => {
      const categotyMap = new Map(categories.map(obj => ([obj.id, obj.name])));
      const videos:VideosRes[] = [];
      authors.forEach((author:Author) => {
        author?.videos.forEach((video:Video) => {
          videos.push({
          authorId: author.id,
          authorName: author.name,
          categories: video.catIds.map((ele: number) => categotyMap.get(ele)),
          highestQualityFormat: getHighestQualityFormat(video.formats),
          ...video,
        })
      })
      })
      console.log(videos);
    return videos;
  });
};
