import types from '../mutation-types'
const page: any = {
  state: {
    // isHidden: Boolean = false
    isHidden: false
  },
  mutation: {
    [types.HIDDEN] (state: any, isHidden: Boolean) {
      state.isHidden = isHidden
    }
  },
  action: {
    hidden({
      commit
    }, isHidden: Boolean) {
      commit(types.HIDDEN, isHidden)
    }
  }
}
export default page
