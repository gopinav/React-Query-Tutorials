import { useQuery } from 'react-query'
import axios from 'axios'

const fetchSuperHeroes = () => {
  return axios.get('http://localhost:4000/superheroes')
}

export const useSuperHeroesData = (onSuccess, onError) => {
  return useQuery('super-heroes', fetchSuperHeroes, {
    onSuccess,
    onError
    // select: data => {
    //   const superHeroNames = data.data.map(hero => hero.name)
    //   return superHeroNames
    // }
  })
}
