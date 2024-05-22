import {create} from 'zustand';

const MAX_ZOOM = 16;
const MIN_ZOOM = 5;
const INITIAL_VIEW_STATE = {
    latitude: 0.7416668866832955,
    longitude: 0,
    zoom: 8.0,
    maxZoom: MAX_ZOOM,
    minZoom: MIN_ZOOM,
    pitch: 0,
    bearing: 0,
    transitionDuration: 1000,
  };

interface ViewState {
    latitude: number,
    longitude: number,
    zoom: number,
    maxZoom: number,
    minZoom: number,
    pitch: number,
    bearing: number,
    transitionDuration: number,
}

interface HomeStatus {
    viewState: ViewState,
    showLeftBar: Boolean,
    showMobileLeftbar: Boolean,
    drawerStatus: string,
    currentInfo: {},
    zoom: number,
    cursorState: string,
    highlightState: Boolean,
    isUserInfoModalOpen: Boolean,
}

interface HomeStatusStore {
    homeStatus: HomeStatus,
    setViewState:((ViewState:HomeStatus['viewState']) => void),
    setShowLeftbar:((showLeftbbar:HomeStatus['showLeftBar']) => void),
    setShowMobileLeftbar:((showMobileLeftbbar:HomeStatus['showMobileLeftbar']) => void),
    setDrawerStatus:((drawerStatus:HomeStatus['drawerStatus']) => void),
    setCurrentInfo:((showCurrentInfo:HomeStatus['currentInfo']) => void),
    setZoom:((zoom:HomeStatus['zoom']) => void),
    setCursorState:((cursorState:HomeStatus['cursorState']) => void),
    setHighlightState:((highlightState:HomeStatus['highlightState']) => void),
    setIsUserInfoModalOpen:((isUserInfoModalOpen:HomeStatus['isUserInfoModalOpen']) =>void)
}

const useHomeStatusStore = create<HomeStatusStore>((set) => ({
    homeStatus:
    {viewState:INITIAL_VIEW_STATE,
    showLeftBar: true,
    showMobileLeftbar: false,
    drawerStatus: '',
    currentInfo: {undefined},
    zoom: INITIAL_VIEW_STATE.zoom,
    cursorState: 'cursor',
    highlightState: false,
    isUserInfoModalOpen: false,
    },
    setViewState:((viewState) => set((store) => ({homeStatus:{...store.homeStatus, viewState}}))),
    setShowLeftbar:((showLeftbar) => set((store) => ({homeStatus:{...store.homeStatus,showLeftbar}}))),
    setShowMobileLeftbar:((showMobileLeftbar) => set ((store) => ({homeStatus:{...store.homeStatus, showMobileLeftbar}}))),
    setDrawerStatus:((drawerStatus: string) => set((store) => ({homeStatus: {...store.homeStatus, drawerStatus}}))),
    setCurrentInfo:((currentInfo) => set((store) => ({homeStatus:{...store.homeStatus, currentInfo}}))),
    setZoom:((zoom) => set((store) => ({homeStatus:{...store.homeStatus, zoom}}))),
    setCursorState:((cursorState) => set((store) => ({homeStatus:{...store.homeStatus, cursorState}}))),
    setHighlightState:((highlightState) => set((store) => ({homeStatus:{...store.homeStatus, highlightState}}))),
    setIsUserInfoModalOpen:((IsUserInfoModalOpen) => set((store) => ({homeStatus:{...store.homeStatus, IsUserInfoModalOpen}})))

}))

export default useHomeStatusStore;