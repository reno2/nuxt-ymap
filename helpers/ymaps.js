class EventEmitter {
  constructor() {
    this.events = {};
    this.IntersectionObserver = false;
    this.ymapReady = false;
    this.scriptIsNotAttached = true;
  }
  $on(eventName, fn) {
    if (!this.events[eventName]) {
      this.events[eventName] = [];
    }
    this.events[eventName].push(fn);
    return () => {
      this.events[eventName] = this.events[eventName].filter(
        eventFn => fn !== eventFn
      );
    };
  }
  $emit(eventName, data) {
    const event = this.events[eventName];
    if (event) {
      event.forEach(fn => fn(data));
    }
  }
}

export const emitter = new EventEmitter();

// Получение координат пользователя
export const getBrowserLocation = () => {
  return new Promise((resolve, reject) => {
    if (!("geolocation" in navigator)) {
      reject(new Error("Геолокация не доступна."));
    }
    if (navigator.geolocation.getCurrentPosition) {
      // если у пользователя присутствует ф-ия определения местоположения
      // найдем текущую геопозицию
      navigator.geolocation.getCurrentPosition(
        pos => {
          let {
            coords: { latitude, longitude }
          } = pos;
          resolve([latitude, longitude]);
        },
        err => {
          reject(err);
        }
      );
    }
  });
};

// Подключение api карт
export function ymapLoader(settings = {}) {
  return new Promise((res, rej) => {
    if (window.ymaps) {
      return res();
    } else {
      const yandexMapScript = document.createElement("SCRIPT");
      const {
        apiKey = "",
        lang = "ru_RU",
        version = "2.1",
        coordorder = "latlong",
        debug = false
      } = settings;
      const mode = debug ? "debug" : "release";
      const settingsPart = `lang=${lang}${apiKey &&
        `&apikey=${apiKey}`}&mode=${mode}&coordorder=${coordorder}`;
      const link = `https://api-maps.yandex.ru/${version}/?${settingsPart}`;
      yandexMapScript.setAttribute("src", link);
      yandexMapScript.setAttribute("async", "");
      yandexMapScript.setAttribute("defer", "");
      document.head.appendChild(yandexMapScript);

      emitter.scriptIsNotAttached = false;
      yandexMapScript.onload = () => {
        ymaps.ready(() => {
          emitter.ymapReady = true;
          emitter.$emit("scriptIsLoaded");
          res();
        });
      };
      yandexMapScript.onerror = rej;
    }
  });
}
