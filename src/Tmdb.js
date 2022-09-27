import { type } from "@testing-library/user-event/dist/type";

const API_KEY = '6228f65c218f8b6d91510f821c2c0c36';
const API_BASE = 'https://api.themoviedb.org/3';

/*
- originais netflix
- recomendados (trending)
- em alta (top rated)
- ação 
- comédia
- terror
- romance
- documentários
*/

const basicFetch = async (endpoint) => {
    const req = await fetch(`${API_BASE}${endpoint}`);
    const json = await req.json();
    return json;
}


export async function getHomeList() {
    return [
        {
            slug: 'originals',
            title: 'Populares do Netflix',
            items: await basicFetch(`/discover/tv?with_network=213&language=pt-BR&api_key=${API_KEY}`)
        },
        {
            slug: 'trending',
            title: 'Recomendados para você',
            items: await basicFetch(`/movie/top_rated?language=pt-BR&api_key=${API_KEY}`)
        },
        {
            slug: 'toprated',
            title: 'Em Alta',
            items: await basicFetch(`/movie/top_rated?language=pt-BR&api_key=${API_KEY}`)
        },
    ];
     
}
export async function getMovieInfo  (movieId, type) {
    let info = {};

    if (movieId) {
        switch(type) {
            case 'movie':
                info = await basicFetch( `/movie/${movieId}?language=pt-BR&api_key=${API_KEY}`)
            break;
            case 'tv':
                info = await basicFetch( `/tv/${movieId}?language=pt-BR&api_key=${API_KEY}`)
            break;
            default:
                info = null
            break;
        }
    }
    console.log(info)
    return info;
}
