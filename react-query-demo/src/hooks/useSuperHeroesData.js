import { useQuery, useMutation } from 'react-query'
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

const addSuperHero = hero => {
  return axios.post('http://localhost:4000/superheroes', hero)
}

export const useAddSuperHeroData = () => {
  return useMutation(addSuperHero)
}
