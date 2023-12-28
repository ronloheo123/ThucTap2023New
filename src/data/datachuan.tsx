interface Film {
  id: number;
  title: string;
  pathimage: string;
  overview: string;
  profession: string;
  accomplishment: string;
}

export const films: Film[] = [
  {
    id: 0,
    title: "The Godfather",
    pathimage: "3bhkrj58Vtu7enYsRolD1fZdja1.jpg",
    overview:
      "Spanning the years 1945 to 1955, a chronicle of the fictional Italian-American Corleone crime family. When organized crime family patriarch, Vito Corleone barely survives an attempt on his life, his youngest son, Michael steps in to take care of the would-be killers, launching a campaign of bloody revenge.", // Bạn cần thay thế "Thêm mô tả ở đây" bằng mô tả thực tế cho mỗi bộ phim
    profession: "mathematician",
    accomplishment: "spaceflight calculations",
  },
  // Thêm các bộ phim khác nếu cần
];
