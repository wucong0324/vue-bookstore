import * as types from './mutations-types'

export const toggleNav = function ({commit, state}) {
    commit(types.SET_TOGGLE_NAV);
}

export const toggleSelectFont = function ({commit, state}) {
    commit(types.SET_TOGGLE_SELECT_FONT);
}

export const toggleMode = function ({commit, state}) {
    commit(types.SET_TOGGLE_MODE);
}

export const setCurrentChapter = function ({commit, state}) {
    commit()
}