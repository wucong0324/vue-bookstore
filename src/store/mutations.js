import * as types from './mutations-types'
import {loadReader, saveReader} from '@/common/js/cache'

const mutations = {
    [types.SET_TOGGLE_NAV](state){
        state.showNav = !state.showNav;
        if(state.showSelectFont){
            state.showSelectFont = false;
        }
    },
    [types.SET_TOGGLE_SELECT_FONT](state){
        state.showSelectFont = !state.showSelectFont
    },
    [types.SET_TOGGLE_MODE](state){
        state.modeNight = !state.modeNight
    },
    [types.SET_CURRENT_COLOR](state, index){
        state.currentColor = index;
        saveReader('theme', index);
    },
    [types.ADD_FONT_SIZE](state){
        state.fontSize++;
        if(state.fontSize >=22){
            state.fontSize = 22
        }
        saveReader('size', state.fontSize);
    },
    [types.SUB_FONT_SIZE](state){
        state.fontSize--;
        if(state.fontSize <= 12){
            state.fontSize = 12
        }
        saveReader('size', state.fontSize);
    },
    [types.SET_FONT_SIZE](state, size){
        state.fontSize = size;
    },
    [types.PREV_CHAPTER](state){
        if(state.currentChapter === 1){
            return
        }
        state.currentChapter--
    },
    [types.NEXT_CHAPTER](state, max){
        state.currentChapter++;
        if(state.currentChapter >= max){
            return
        }
    },
    [types.SET_CURRENT_CHAPTER](state, chapter){
        state.currentChapter = chapter
    },
    [types.SET_MAX_CHAPTER](state, max){
        state.maxChapter = max
    }
};

export default mutations