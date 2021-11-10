import { createStore } from 'vuex'

export default createStore({
  state: {
    characters : [], //save all the general characters 
    charactersFilter : [] //Do query and filter
  },
  mutations: { //the mutation is the that modify the states through actions
    setCharacters(state, payload) { //receive state and payload of characters
      state.characters = payload
    },
    setCharactersFilter(state, payload) { //receive state and payload of charactersFilter
      state.charactersFilter = payload
    }
  },
  actions: {
    async getCharacters({commit}) { //getCharacter receive a commit for access to the mutations
    try {
      const response = await fetch('https://rickandmortyapi.com/api/character')
      const data = await response.json()
      commit('setCharacters', data.results)
      commit('setCharactersFilter', data.results)
      //console.log(data) //show in console the data
    } catch (error) {
      console.error(error)
      
    }
  },
  filterByStatus({commit, state}, status) {
    const filter = state.characters.filter((character) => {
      return character.status.includes(status)
    })
    commit('setCharactersFilter', filter)
  },
  filterByName({commit, state}, name) {
    const formatName = name.toLowerCase()
    const results = state.characters.filter((character) => {
      const characterName = character.name.toLowerCase()

      if(characterName.includes(formatName)) {
        return character
      }
    })
    commit('setCharactersFilter', results)
  }
},
  modules: {
  }
})
