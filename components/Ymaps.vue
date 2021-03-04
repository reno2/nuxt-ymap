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
import { ymapLoader, getBrowserLocation, emitter } from "~/helpers/ymaps";
export default {
  props: {
    // центр карты
    center: {
      type: Array,
      required: true
    },
    // Вывод кнопки икать ближайший адрес
    btnNearest: {
      type: Boolean,
      default: false
    },
    // Объекты с одресами, в нутри каждого объекта
    // дожен находится массив с координатами
    items: {
      type: Array,
      default: null
    },
    // Зум
    zoom: {
      type: Number,
      default: 10
    },
    // Объекты с Id гео объектов на карте для фильтрации,
    // необъязатеьный параметр
    filter: {
      type: Array,
      default: null
    },
    // Стили для элемента карты
    styles: {
      type: String,
      default: "width: 500px; height: 500px;"
    },
    // Элементы управления
    controls: {
      type: Array,
      default() {
        return [];
      }
    },
    // Принимает условия для начала загрузки элемента
    // относительно вьюпорта
    rootMargin: {
      type: String,
      default: "0px 0px 0px 0px"
    }
  },
  data: () => ({
    icon: require("~/assets/marker.png"),
    onFindZoom: 13,
    observer: null
  }),

  watch: {
    filter(newVal) {
      let filter = new ymaps.GeoQueryResult();

      newVal.forEach((ele, i) => {
        filter = myObjects.search(`options.id = ${ele}`).add(filter);
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

    prepearPoints() {
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
    init() {
      const myMap = new ymaps.Map(this.$refs.map, {
        center: this.center,
        zoom: this.zoom,
        controls: this.controls
      });
      const points = this.prepearPoints();
      if (points) {
        window.myObjects = ymaps
          .geoQuery({
            type: "FeatureCollection",
            features: points
          })
          .addToMap(myMap);
        this.myMap = myMap;
      }
      if (myObjects.getLength() == 1) {
        const oneObjCoords = myObjects.get(0).geometry.getCoordinates();
        myMap.setCenter(oneObjCoords, 10, {
          checkZoomRange: true
        });
      }
    },
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
    handleIntersection(entries, observer) {
      for (let entry of entries) {
        if (entry.isIntersecting) {
          this.startLoad();
          observer.unobserve(entry.target);
        }
      }
    }
  },
  mounted() {
    this.observer = new IntersectionObserver(this.handleIntersection, {
      rootMargin: this.rootMargin
    });
    this.observer.observe(this.$refs.map);
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
