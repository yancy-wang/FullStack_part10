// types/index.ts
export interface Repository {
    id: string;
    fullName: string;
    description: string;
    language: string;
    forksCount: number;
    stargazersCount: number;
    ratingAverage: number;
    reviewCount: number;
    ownerAvatarUrl: string;
    url: string;
    reviews?: {
      totalCount: number;
      edges: {
        node: Review;
        cursor: string;
      }[];
      pageInfo: {
        endCursor: string;
        startCursor: string;
        hasNextPage: boolean;
      };
    };
  }
  
  export interface Review {
    id: string;
    text: string;
    rating: number;
    createdAt: string;
    repositoryId: string;
    user: {
      id: string;
      username: string;
    };
    repository?: {
      id: string;
      fullName: string;
    };
  }
  
  export interface User {
    id: string;
    username: string;
    reviews?: {
      edges: {
        node: Review;
      }[];
    };
  }
  
  export type OrderBy = 'CREATED_AT' | 'RATING_AVERAGE';
  export type OrderDirection = 'ASC' | 'DESC';