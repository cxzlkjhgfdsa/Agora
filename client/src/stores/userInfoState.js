import { atom } from "recoil";

const sessionStorageEffect = key => ({setSelf, onSet}) => {
    const savedValue = sessionStorage.getItem(key)
    if (savedValue != null) {
      setSelf(JSON.parse(savedValue));
    }
  
    onSet((newValue, _, isReset) => {
      isReset
        ? sessionStorage.removeItem(key)
        : sessionStorage.setItem(key, JSON.stringify(newValue));
    });
}

export const userInfoState = atom({
    key: "userInfoState",
    default: { 
      isLoggedIn: false,
      accessToken: "",
      userId: "",
      userNickname: "",
      socialType: "",
      userPhoto: "",
    },
    effects: [sessionStorageEffect('user_info')],
  });

