// import defaultSettings from '@/settings'
import {useSettingsStore} from '@/stores/settings'
 
/**
 * 动态修改标题
 */
export function useDynamicTitle() {
  const settingsStore = useSettingsStore();
  if (settingsStore.dynamicTitle) {
    document.title = settingsStore.title + ' - ' + import.meta.env.VITE_APP_TITLE;
  } else {
    document.title = import.meta.env.VITE_APP_TITLE;
  }
}