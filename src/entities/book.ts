export type Book = {
  id: string;
  title: string;
  author: string;
  year: number;
  isbn: string;
  avatar: string;
  description: string;
};
export type BookCreateDto = Omit<Book, 'id'>;
export type BookUpdateDto = Partial<BookCreateDto>;
