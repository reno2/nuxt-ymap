<template>
  <div class="ymap">
    <div class="ymap_map" ref="map" :style="styles">
      <a
        v-if="btnNearest"
        @click.prevent="findClosest"
        class="ymap_nearest btn green"
      >
        Показать ближайшую
      </a>
    </div>
  </div>
</template>

<script>
/**

     * Компонент, выодит яндекм карту с геообъектами, даёт возможность фильтрации объектов, поиск ближайшего геообъекта.

     * Поддержка отложенной загрузки карты
     *
     * @module /component/VMap
     * @vue-prop {Array} Center - центр карты, объязательный параметр
     * @vue-prop {Boolean} [btnNearest=false] BtnNearest - вывод кнопки найти ближайший адрес
     * @vue-prop {Array} [items=null] Items - массив с геообъектами, в каждом объекте должен быть ключ с координатами
     * @vue-prop {Number} [zoom=10] Zoom - зум карты
     * @vue-prop {Array} [filter=null] Filter - массив состоящий из id геообъектов для фильтрации
     * @vue-prop {String} [styles='width: 500px; height: 500px;']

     * @vue-prop {Array} [controls=[]] Controls - массив из элементов управления картой
     * @vue-prop {String} [rootMargin='0px 0px 0px 0px'] RootMargin - свойство объекта intersectionObserver принимает значения пересечения элемента с view port
     *
     * @vue-data icon - Маркер по умолчанию для геообъектов
     * @vue-data onFindZoom - Зум для результата поиска ближайшего объекта
     * @vue-data observer - Intersection Observer
     *
     * @vue-event {Boolean} scriptIsNotAttached - Результат события скрипта апи
     * @vue-event {Boolean} scriptIsLoaded - Событие ymaps.ready
     */
import { ymapLoader, getBrowserLocation, emitter } from "~/helpers/ymaps";
export default {
  props: {
    center: {
      type: Array,
      required: true
    },
    btnNearest: {
      type: Boolean,
      default: false
    },
    items: {
      type: Array,
      default: null
    },
    zoom: {
      type: Number,
      default: 10
    },
    filter: {
      type: Array,
      default: null
    },
    styles: {
      type: String,
      default: "width: 500px; height: 500px;"
    },
    controls: {
      type: Array,
      default() {
        return [];
      }
    },
    rootMargin: {
      type: String,
      default: "0px 0px 0px 0px"
    }
  },
  data: () => ({
    icon: require("~/assets/marker.png"),
    onFindZoom: 13,
    observer: null,
    myObjects: []
  }),

  watch: {
    /**
     * Принимае массив с id элементов и фильтрует геообъекты по этои id и центрыет
     * В случаи если в результате остаётся один элемент изменяем zoom
     *
     * @function filter
     *
     * @param {Array} newVal - Массив
     * @return {void}
     *
     * */
    filter(newVal) {
      let filter = new ymaps.GeoQueryResult();

      newVal.forEach((ele, i) => {
        filter = this.myObjects.search(`options.id = ${ele}`).add(filter);
      });

      this.myMap.geoObjects.removeAll();
      const shownObjects = filter
        .addToMap(this.myMap)
        .applyBoundsToMap(this.myMap);

      shownObjects.then(() => {
        if (shownObjects.getLength() == 1) this.myMap.setZoom(this.zoom);
      });
    }
  },
  methods: {
    /**
     * Находит ближайший геообъект по координатам
     *
     * @async
     * @function
     * @name findClosest
     * @return {Promise<Array>} Устанавливает центр карты на координатах
     * полученнных из местоположения пользователя
     */
    async findClosest() {
      try {
        const coords = await getBrowserLocation();
        const storage = ymaps.geoQuery(this.myMap.geoObjects);
        const closestOdj = storage.getClosestTo(coords);
        const newCoords = closestOdj.geometry.getCoordinates();
        this.myMap.setCenter(newCoords, this.onFindZoom, {
          checkZoomRange: true
        });
      } catch (err) {
        alert(err.message);
      }
    },
    getImgUrl(pic) {
      let context = require.context("~/assets/", false, /^(?!.*\.(?:md)$).*/);
      return context("./" + pic);
    },
    getIcon(item) {
      if (item.ICON && this.getImgUrl(item.ICON)) {
        return this.getImgUrl(item.ICON);
      } else return this.icon;
    },
    /**
     * Формирует массив объектов для добавления на карту
     * @function preparePoints
     * @return {Array}
     * */
    preparePoints() {
      return this.items.map(item => {
        return {
          type: "Feature",
          geometry: {
            type: "Point",
            coordinates: item.COORD.split(","),
            id: item.ID
          },
          options: {
            id: item.ID,
            name: item.NAME,
            iconLayout: "default#image",
            iconImageHref: this.getIcon(item),
            iconImageSize: [49, 52],
            iconImageOffset: [-20, -45]
          }
        };
      });
    },
    /**
     * Инициализирует карту и выводит геообъекты
     * Если объект один то меняет зум
     * @function init
     * @return {Array}
     * */
    init() {
      const myMap = new ymaps.Map(this.$refs.map, {
        center: this.center,
        zoom: this.zoom,
        controls: this.controls
      });
      const points = this.preparePoints();
      if (points) {
        this.myObjects = ymaps
          .geoQuery({
            type: "FeatureCollection",
            features: points
          })
          .addToMap(myMap);
        this.myMap = myMap;
      }
      if (this.myObjects.getLength() == 1) {
        const oneObjCoords = myObjects.get(0).geometry.getCoordinates();
        myMap.setCenter(oneObjCoords, 10, {
          checkZoomRange: true
        });
      }
    },
    /**
     *  Проверяет подключение api карт
     *  Вызывает метод инициализации карты
     *  Для определения события подключения api использует патерн emitter
     *
     * @function startLoad
     * */
    startLoad() {
      console.info("yes");
      // Проверяем что апи подключенно
      if (emitter.scriptIsNotAttached) {
        ymapLoader();
      }
      // Проверяем карта инициализирована
      if (emitter.ymapReady) {
        ymaps.ready(this.init);
      } else {
        // Подписываемся на событие
        const unsubscribe = emitter.$on("scriptIsLoaded", () => {
          ymaps.ready(this.init);
          // Отписываемся
          unsubscribe();
        });
      }
    },
    /**
     *
     *  Callback функция объекта IntersectionObserver
     * @callback this.observer~handleIntersection
     * */
    handleIntersection(entries, observer) {
      for (let entry of entries) {
        if (entry.isIntersecting) {
          this.startLoad();
          observer.unobserve(entry.target);
        }
      }
    }
  },
  /**
   *  Проверяет и инийиализирует оъект IntersectionObserver с параметрами
   * @function mounted
   * */
  mounted() {
    if ("IntersectionObserver" in window) {
      this.observer = new IntersectionObserver(this.handleIntersection, {
        rootMargin: this.rootMargin
      });
      this.observer.observe(this.$refs.map);
    } else {
      this.startLoad();
    }
  },
  destroyed() {
    this.observer.disconnect();
  }
};
</script>

<style>
.ymap {
  position: relative;
}
.ymap_nearest {
  position: absolute;
  bottom: 32px;
  right: 8px;
}
.ymap_btn {
  background: #eae419;
}
</style>
