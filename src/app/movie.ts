export interface MovieItem {
    title: string
    overview: string
    id: number
    vote_average: number
    vote_count: number
    runtime?: number
    status: string
    poster_path?: string
    release_date: string
    imdb_id?: string
    year: number
    genre_ids: number [

    ]
    genres: [
      {
        name: string
    } 
  ]
  
  }
