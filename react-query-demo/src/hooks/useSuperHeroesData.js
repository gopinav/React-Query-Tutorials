import { useQuery, useMutation, useQueryClient } from 'react-query'
// import axios from 'axios'
import { request } from '../utils/axios-utils'

const fetchSuperHeroes = () => {
  // return axios.get('http://localhost:4000/superheroes')
  return request({ url: '/superheroes' })
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
  // return axios.post('http://localhost:4000/superheroes', hero)
  return request({ url: '/superheroes', method: 'post', data: hero })
}

export const useAddSuperHeroData = () => {
  const queryClient = useQueryClient()

  return useMutation(addSuperHero, {
    // onSuccess: data => {
    //   /** Query Invalidation Start */
    //   // queryClient.invalidateQueries('super-heroes')
    //   /** Query Invalidation End */

    //   /** Handling Mutation Response Start */
    // queryClient.setQueryData('super-heroes', oldQueryData => {
    //   return {
    //     ...oldQueryData,
    //     data: [...oldQueryData.data, data.data]
    //   }
    // })
    //   /** Handling Mutation Response Start */
    // },
    /**Optimistic Update Start */
    onMutate: async newHero => {
      await queryClient.cancelQueries('super-heroes')
      const previousHeroData = queryClient.getQueryData('super-heroes')
      queryClient.setQueryData('super-heroes', oldQueryData => {
        return {
          ...oldQueryData,
          data: [
            ...oldQueryData.data,
            { id: oldQueryData?.data?.length + 1, ...newHero }
          ]
        }
      })
      return { previousHeroData }
    },
    onError: (_err, _newTodo, context) => {
      queryClient.setQueryData('super-heroes', context.previousHeroData)
    },
    onSettled: () => {
      queryClient.invalidateQueries('super-heroes')
    }
    /**Optimistic Update End */
  })
}
