import { combineReducers } from 'redux';
import navigationReducer   from './reducer_navigation';


const rootReducer = combineReducers({

	nav: navigationReducer

});

export default rootReducer;
