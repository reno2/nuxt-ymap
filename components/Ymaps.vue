<template>
  <div class="ymap">
    <div class="ymap_map" :id="id" :style="styles"></div>
    <a
      v-if="btnNearest"
      @click.prevent="findClosest"
      class="ymap_nearest btn green"
    >
      Показать ближайшую
    </a>
  </div>
</template>

<script>
import { ymapLoader, getBrowserLocation, emitter } from "~/helpers/ymaps";
export default {
  props: {
    coords: {
      type: Array
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
      type: Array
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
    }
  },
  data: () => ({
    icon: require("~/assets/marker.png"),
    id: `ymap_id_${Math.round(Math.random() * 100000)}`,
    onFindZoom: 13
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
      if (item.ICON && this.getImgUrl(item.ICON))
        return this.getImgUrl(item.ICON);
      else return this.icon;
    },

    prepearPoints() {
      const toMap = this.items.map(item => {
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
      return toMap;
    },
    init() {
      const myMap = new ymaps.Map(this.id, {
        center: this.coords,
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
    }
  },
  mounted() {
    if (emitter.scriptIsNotAttached) {
      ymapLoader();
    }
    if (emitter.ymapReady) {
      ymaps.ready(this.init);
    } else {
      emitter.$on("scriptIsLoaded", () => {
        ymaps.ready(this.init);
      });
    }
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
