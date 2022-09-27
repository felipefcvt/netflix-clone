import React, { useEffect, useState } from 'react';
import MovieRow from './components/MovieRow';
import './App.css'

import { getHomeList, getMovieInfo } from './Tmdb'
import FeaturedMovie from './components/FeaturedMovie';
import Header from './components/Header';

const App = () => {

  const [movieList, setMovieList] = useState([]);
  const [featuredData, setFeaturedData] = useState(null);
  const [blackHeader, setBlackHeader] = useState(false);

  useEffect(() => {
    const loadAll = async () => {
      // pegando a lista total
      let list = await getHomeList();
      setMovieList(list);

      // Pegando o featured
      let originals = list.filter(i => i.slug === 'originals');
      let randomChosem = Math.floor(Math.random() * (originals[0].items.results.length - 1));
      let chosen = originals[0].items.results[randomChosem];
      let chosenInfo = await getMovieInfo(chosen.id, 'tv');
      setFeaturedData(chosen);
    }

    loadAll();
  }, []);

  useEffect(() => {
    const scrollListener = () => {
      if (window.scrollY > 10) {
        setBlackHeader(true);
      } else {
        setBlackHeader(false);
      }
    }
    window.addEventListener('scroll', scrollListener);

    return () => {
      window.removeEventListener('scroll', scrollListener)
    }
  }, []);

  return (

    <div className="page" >

      <Header black={blackHeader} />

      {featuredData &&
        <FeaturedMovie item={featuredData} />
      }

      <section className="lists" >
        {movieList.length && movieList.map((item, key) => (
          <MovieRow key={key} title={item.title} items={item.items} />
        ))}
      </section>

      <footer>
        Clonado por Felipe Ferreira<br />
        Direitos de imagem para a Netflix<br />
        Dados obtidos através do site Themoviedb.org<br />
      </footer>

      {movieList.length <= 0 &&
        <div className='loading'>
          <img src='/image/8Etj.gif' alt='carregando' />
        </div>
      }

    </div>
  );
};

export default App;