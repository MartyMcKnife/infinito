export interface User {
  username: string;
  userID: string;
  photos: Photos[];
}

interface Photos {
  id: string;
  name: string;
  link: string;
}
