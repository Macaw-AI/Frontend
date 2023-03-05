import { registerRootComponent } from 'expo';
import { getSubjectListByLanguageAndTeacherName } from './utils/SubjectUtils';
import App from './App';
import { getTeacherListByLanguage } from './utils/TeacherUtils';
import { LANGUAGE } from './utils/Language';

// registerRootComponent calls AppRegistry.registerComponent('main', () => App);
// It also ensures that whether you load the app in Expo Go or in a native build,
// the environment is set up appropriately
registerRootComponent(App);
