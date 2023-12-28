// Định nghĩa kiểu dữ liệu cho đối tượng Person
interface Person {
  id: number;
  name: string;
  profession: string;
  accomplishment: string;
  imageId: string;
}

// Sử dụng kiểu dữ liệu trong hàm getImageUrl
export function getImageUrl(person: Person): string {
  return "https://i.imgur.com/" + person.imageId + "s.jpg";
}
