export interface ReplierInfo {
  ip: string;
  device: string;
  postedAt: string;
}

export interface Reply {
  id: string;
  content: string;
  replierInfo: ReplierInfo;
}

export interface AuthorInfo {
  ip: string;
  device: string;
  postedAt: string;
}

export interface Thread {
  id: string;
  title: string;
  content: string;
  authorInfo: AuthorInfo;
  replies: Reply[];
}
