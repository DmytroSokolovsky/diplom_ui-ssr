// import { useCallback } from 'react';

// export function useTelegram() {
//   const tg = typeof window !== 'undefined' ? window.Telegram.WebApp : null;

//   const onClose = useCallback(() => {
//     if (tg) {
//       tg.close();
//     }
//   }, [tg]);

//   const onReady = useCallback(() => {
//     if (tg) {
//       tg.ready();
//     }
//   }, [tg]);

//   const showMainButton = useCallback(() => {
//     if (tg) {
//       tg.MainButton.show();
//     }
//   }, [tg]);

//   const hideMainButton = useCallback(() => {
//     if (tg) {
//       tg.MainButton.hide();
//     }
//   }, [tg]);

//   const setButtonText = useCallback((buttonText) => {
//     if (tg) {
//       tg.MainButton.setParams({ text: buttonText });
//     }
//   }, [tg]);

//   const setEventMainButtonClicked = useCallback((callback) => {
//     if (tg) {
//       tg.onEvent('mainButtonClicked', callback);
//     }
//   }, [tg]);

//   const removeEventMainButtonClicked = useCallback((callback) => {
//     if (tg) {
//       tg.offEvent('mainButtonClicked', callback);
//     }
//   }, [tg]);

//   const sendDataToTelegram = useCallback((data) => {
//     if (tg) {
//       tg.sendData(JSON.stringify(data));
//     }
//   }, [tg]);

//   const isDarkTheme = tg ? tg.colorScheme === 'dark' : false;

//   return {
//     tg,
//     onClose,
//     onReady,
//     showMainButton,
//     hideMainButton,
//     setButtonText,
//     setEventMainButtonClicked,
//     removeEventMainButtonClicked,
//     sendDataToTelegram,
//     isDarkTheme
//   };
// }


import { useCallback } from 'react';

export function useTelegram() {
  const tg = typeof window !== 'undefined' && window.Telegram && window.Telegram.WebApp ? window.Telegram.WebApp : null;

  const onClose = useCallback(() => {
    if (tg) {
      tg.close();
    }
  }, [tg]);

  const onReady = useCallback(() => {
    if (tg) {
      tg.ready();
    }
  }, [tg]);

  const showMainButton = useCallback(() => {
    if (tg) {
      tg.MainButton.show();
    }
  }, [tg]);

  const hideMainButton = useCallback(() => {
    if (tg) {
      tg.MainButton.hide();
    }
  }, [tg]);

  const setButtonText = useCallback((buttonText) => {
    if (tg) {
      tg.MainButton.setParams({ text: buttonText });
    }
  }, [tg]);

  const setEventMainButtonClicked = useCallback((callback) => {
    if (tg) {
      tg.onEvent('mainButtonClicked', callback);
    }
  }, [tg]);

  const removeEventMainButtonClicked = useCallback((callback) => {
    if (tg) {
      tg.offEvent('mainButtonClicked', callback);
    }
  }, [tg]);

  const sendDataToTelegram = useCallback((data) => {
    if (tg) {
      tg.sendData(JSON.stringify(data));
    }
  }, [tg]);

  const isDarkTheme = tg ? tg.colorScheme === 'dark' : false;

  return {
    tg,
    onClose,
    onReady,
    showMainButton,
    hideMainButton,
    setButtonText,
    setEventMainButtonClicked,
    removeEventMainButtonClicked,
    sendDataToTelegram,
    isDarkTheme
  };
}
